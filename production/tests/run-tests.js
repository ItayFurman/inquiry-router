/* בדיקת ניתוב אוטומטית למנתב פניות הציבור.
   הרצה:  node tests/run-tests.js
   מריצים אחרי כל שינוי במילון מילות המפתח (LEX) או ביעדים (N) בקובץ router.js.
   כל מקרה הוא שיחה: רשימת הודעות של הפונה, והתוצאה הצפויה אחרי כל הודעה.
   תוצאה מסוג r_xxx היא יעד; ask:q_xxx היא שאלת השלמה; ‎:שם‎ אחרי היעד הוא התאגיד שזוהה. */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const CASES = [
  { say: ['לאומי חייבו אותי בעמלה כפולה, התלוננתי לנציבות לפני חודשיים ולא ענו'], expect: ['r_noans:לאומי'] },
  { say: ['הגשתי תלונה למקס לפני שבועיים ועוד אין תשובה'], expect: ['r_wait'] },
  { say: ['הבנק חייב אותי בעמלה כפולה, התלוננתי לנציבות לפני חודשיים ולא ענו'], expect: ['r_noans'] },
  { say: ['הגשתי תלונה לחברת האשראי לפני שבועיים ועוד אין תשובה'], expect: ['r_wait'] },
  { say: ['עיקלו לי את קצבת ביטוח לאומי ואין לי ממה לחיות'], expect: ['r_urgent'] },
  { say: ['הבנק סירב להעביר כסף ללוויה של אבא שלי שנפטר, זה דחוף'], expect: ['r_urgent'] },
  { say: ['הבנק חייב אותי בעמלה, זה דחוף', 'לא'], expect: ['ask:q_urgent', 'ask:q_omb'] },
  { say: ['הגשנו תביעה בבית משפט נגד הבנק על המשכנתא'], expect: ['r_court'] },
  { say: ['הבנק לא בסדר איתי', 'עוד לא פניתי'], expect: ['ask:q_omb', 'r_to_omb'] },
  { say: ['דיסקונט גבו ממני ריבית גבוהה מדי', 'קיבלתי תשובה ואני לא מסכים איתה'], expect: ['ask:q_omb', 'r_appeal'] },
  { say: ['רוצה לערער על התשובה של נציבות ישראכרט'], expect: ['r_appeal'] },
  { say: ['ת״ז שלי 123456789 ולאומי לא עונים כבר 50 יום'], expect: ['r_noans:לאומי'] },
  { say: ['אני מקצינת הציות בבנק, יש לנו שאלה על סעיף באוגדן לגבי עמלות'], expect: ['r_reg'] },
  { say: ['מה לגבי הוראה 308A?', 'אני עורכת דין מטעם הבנק'], expect: ['ask:q_who', 'r_reg'] },
  { say: ['האם מותר לבנק לגבות עמלה על משיכת מזומן?'], expect: ['r_general'] },
  { say: ['יש לי שאלה על הוראת קבע בחשבון שלי'], expect: ['r_general'] },
  { say: ['קיבלתי הודעה חשודה ומישהו משך כסף מהחשבון'], expect: ['r_fraud'] },
  { say: ['החשבון שלי מוגבל בגלל שיקים חוזרים'], expect: ['r_restricted'] },
  { say: ['פניתי ליחידה לפניות הציבור בבנק ישראל ולא ענו לי כבר חודשיים'], expect: ['r_boi'] },
  { say: ['רוצה לבדוק את דוח נתוני האשראי שלי'], expect: ['r_credit'] },
  { say: ['יש לי בעיה עם קרן הפנסיה'], expect: ['r_capital'] },
  { say: ['שלום'], expect: ['r_default'] },
  { say: ['יש לי בעיה'], expect: ['r_default'] },
  { say: ['חייבו אותי בעמלה', 'בלה בלה', 'משהו'], expect: ['ask:q_omb', 'ask:q_omb', 'r_default'] },
  /* אוצר מילים מורחב */
  { say: ['פניתי לסניף ולא עזרו לי עם רישום שגוי בחשבון'], expect: ['r_to_omb'] },
  { say: ['אני מקצינת הציות בבנק, יש לנו שאלה על יישום הוראה 433'], expect: ['r_reg'] },
  { say: ['יש לי שטר קרוע, איפה מחליפים אותו?'], expect: ['r_cash'] },
  { say: ['פניתי לסניף ולא עזרו לי עם העמלה'], expect: ['r_to_omb'] },
  { say: ['דיברתי עם מנהל הסניף והוא לא עזר, יש רישום שגוי בחשבון'], expect: ['r_to_omb'] },
  { say: ['הנציבות דחתה את התלונה שלי על המשכנתא'], expect: ['r_appeal'] },
  { say: ['הגשתי תלונה לנציבות בתחילת ספטמבר ועדיין לא הגיבו'], expect: ['r_noans'] },
  { say: ['שלחתי תלונה לבנק ב־20.10 ועוד מחכה לתשובה'], expect: ['r_wait'] },
  { say: ['איך מגישים תלונה על הבנק?'], expect: ['r_to_omb'] },
  { say: ['מישהו השתמש בכרטיס שלי ועשה עסקאות שלא ביצעתי'], expect: ['r_fraud'] },
  { say: ['לחצתי על קישור בהודעה ומשכו לי כסף מהחשבון'], expect: ['r_fraud'] },
  { say: ['עיקלו לי את קצבת הנכות ואין לי כסף לאוכל'], expect: ['r_urgent'] },
  { say: ['יש לי תיק בהוצאה לפועל בגלל ההלוואה'], expect: ['r_court'] },
  { say: ['אני רוצה להסיר את ההגבלה מהחשבון'], expect: ['r_restricted'] },
  { say: ['יש לי שטר קרוע, איפה מחליפים?'], expect: ['r_cash'] },
  { say: ['רוצה להגיש בקשה לפי חוק חופש המידע'], expect: ['r_foi'] },
  { say: ['האם זה חוקי שהבנק גובה עמלה על הוראת קבע?'], expect: ['r_general'] },
  { say: ['לקחתי הלוואה חוץ בנקאית עם ריבית מטורפת'], expect: ['r_default'] },
  { say: ['אנחנו מהמחלקה המשפטית של הבנק ויש לנו שאלה לגבי הוראת שעה'], expect: ['r_reg'] },
  { say: ['קצינת הציות כאן, איך מיישמים את הוראה 433 על רישום שגוי?'], expect: ['r_reg'] },
  { say: ['מה ההבדל בין מסלול בסיסי למסלול מורחב?'], expect: ['r_general'] },
  { say: ['אבא שלי נפטר ואני צריך לסגור את החשבון שלו'], expect: ['ask:q_urgent'] },
  { say: ['the bank charged me twice and ignores my complaint'], expect: ['ask:q_omb'] },
  { say: ['פניתי בפורטל הפניות של בנק ישראל ולא טיפלו בפנייה כבר חודשיים'], expect: ['r_boi'] },
  { say: ['ריבית של 4.5 אחוז על הלוואה, הגשתי תלונה לנציבות'], expect: ['ask:q_omb'] }
];

const code = fs.readFileSync(path.join(__dirname, '..', 'router.js'), 'utf8');
const el = () => new Proxy(function () {}, {
  get: (t, p) => p === 'dataset' ? {} : p === 'classList' ? { add() {}, remove() {} } : p === 'style' ? {} :
    p === 'hidden' ? false : p === 'firstElementChild' ? null : p === Symbol.toPrimitive ? () => '' : el(),
  set: () => true,
  apply: () => el()
});
const sandbox = {
  document: { getElementById: el, createElement: el, addEventListener() {} },
  window: { matchMedia: () => ({ matches: true }), addEventListener() {}, scrollTo() {} },
  location: { hash: '' },
  setTimeout, console, getSelection: () => ({})
};
vm.createContext(sandbox);
vm.runInContext(code + `
;globalThis.__run = async function (turns) {
  msgs = []; ctx = fresh(); pending = null;
  const out = [];
  for (const t of turns) {
    sendUser(t);
    await new Promise(r => setTimeout(r, 200));
    const bots = msgs.filter(m => m.role === 'bot');
    const m = bots[bots.length - 1];
    out.push(m.kind === 'slip' ? m.node + (m.bank != null ? ':' + BANKS[m.bank].s : '') : 'ask:' + pending);
  }
  return out;
};`, sandbox);

(async () => {
  let failed = 0;
  for (const c of CASES) {
    const got = await sandbox.__run(c.say);
    const ok = JSON.stringify(got) === JSON.stringify(c.expect);
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.say.join(' | ')}\n      ${got.join(' → ')}${ok ? '' : `   (expected: ${c.expect.join(' → ')})`}`);
  }
  console.log(`\n${CASES.length - failed}/${CASES.length} passed`);
  process.exit(failed ? 1 : 0);
})();
