/* =====================================================================
   מנתב פניות הציבור — קוד הצד־לקוח
   כל הסריקה והניתוב רצים בדפדפן. אין קריאות רשת, אין עוגיות ואין אחסון.
   ===================================================================== */

/* ---------- הגדרות להשקה ---------- */
const CONFIG = {
  /* ערוץ ייעודי לשאלות פרשנות על הוראות ועל האוגדן (היחידה לאסדרה צרכנית).
     כל עוד null — שאלות כאלה מקבלות את טופס הפנייה הכללי של היחידה לפניות הציבור.
     דוגמה: { label: 'פנייה ליחידה לאסדרה צרכנית', href: 'https://www.boi.org.il/...', note: 'זמן מענה: עד 14 ימי עבודה.' } */
  regulationChannel: null,
  /* פתיחת העמוד עם ‎#debug‎ בסוף הכתובת מציגה ניקוד, סימונים ופלט מובנה. לבדיקות פנימיות בלבד. */
  debugHash: 'debug'
};

/* ---------- Official channels ---------- */
const U = {
  unit: 'https://www.boi.org.il/information/public-enquiries-unit/',
  portal: 'https://pikuah-inquiries.boi.org.il/',
  urgentForm: 'https://boi.org.il/q-a/%D7%AA%D7%9C%D7%95%D7%A0%D7%95%D7%AA-%D7%A2%D7%9C-%D7%94%D7%91%D7%A0%D7%A7%D7%99%D7%9D/',
  generalQ: 'https://boi.org.il/information/public-enquiries-unit/tofespniya/',
  finEdu: 'https://www.boi.org.il/information/bank-paymnts/financial-education/',
  fees: 'https://www.boi.org.il/information/%D7%9E%D7%97%D7%A9%D7%91%D7%95%D7%A0%D7%99%D7%9D-%D7%95%D7%9B%D7%9C%D7%99%D7%9D/%D7%A2%D7%9E%D7%9C%D7%95%D7%AA/',
  supervision: 'https://www.boi.org.il/roles/supervisionregulation/supervisorss/',
  restricted: 'https://www.boi.org.il/information/restricted_accounts/',
  mugbalim: 'https://mugbalim.boi.org.il/',
  scam: 'https://boi.org.il/roles/supervisionregulation/scam_phone/',
  warning: 'https://boi.org.il/information/public-enquiries-unit/warning_public/',
  audit: 'https://boi.org.il/bank-of-israel/units/%D7%9E%D7%97%D7%9C%D7%A7%D7%AA-%D7%94%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%AA-%D7%94%D7%A4%D7%A0%D7%99%D7%9E%D7%99%D7%AA',
  credit: 'https://www.creditdata.org.il/',
  postal: 'https://www.gov.il/he/departments/topics/postal_bank/govil-landing-page',
  capital: 'https://www.gov.il/he/departments/capital_market_authority/govil-landing-page',
  tax: 'https://www.gov.il/he/departments/israel_tax_authority/govil-landing-page',
  isa: 'https://www.new.isa.gov.il/',
  loans: 'https://boi.org.il/information/state-loans-bonds/',
  contact: 'https://boi.org.il/contact-us/'
};

const BANKS = [
  { s: 'הפועלים', n: 'בנק הפועלים', phone: '03-5673697', form: 'https://www.bankhapoalim.co.il/he/_contact-us/public-inquiries', addr: 'שדרות רוטשילד 50, תל אביב 6688314', a: ['פועלים', 'פועלים$'] },
  { s: 'לאומי', n: 'בנק לאומי', phone: '076-8857011', form: 'https://www.leumi.co.il/Lobby/public_inquiries/39657/', addr: 'ת״ד 88, לוד 7110001', a: ['לאומי$', 'leumi'] },
  { s: 'מזרחי טפחות', n: 'בנק מזרחי טפחות', phone: '076-8170017', email: 'pzibur@umtb.co.il', form: 'https://www.mizrahi-tefahot.co.il/contact-us/public-inquiries/', addr: 'ת״ד 3450, רמת גן 5213603', a: ['מזרחי', 'טפחות'] },
  { s: 'דיסקונט', n: 'בנק דיסקונט', phone: '076-8056566', form: 'https://www.discountbank.co.il/DB/private/general-information/help/contact-us', addr: 'הרצל 156, תל אביב', a: ['דיסקונט$'] },
  { s: 'הבינלאומי', n: 'הבנק הבינלאומי (כולל יובנק, אוצר החייל ופאג״י)', phone: '03-5138700', email: 'FibiPniyot@fibi.co.il', form: 'https://apps.fibi.co.il/kpatz/index.aspx?bid=31', addr: 'הרצל 63, רמלה 7240631', a: ['בינלאומי', 'יובנק', 'אוצר החייל', 'פאגי$', 'פאג"י'] },
  { s: 'מסד', n: 'בנק מסד', phone: '03-5641347', email: 'pniyot@bankmassad.co.il', form: 'https://apps.fibi.co.il/kpatz/index.aspx?bid=46', addr: 'אבא הלל 12, רמת גן 5250606', a: ['בנק מסד', 'מסד$'] },
  { s: 'יהב', n: 'בנק יהב', phone: '02-5009956', note: 'מענה טלפוני: א׳–ה׳, 8:30–15:00.', email: 'pniyot-tzibur@yahav.co.il', form: 'https://www.bank-yahav.co.il/public-inquiries/', addr: 'ירמיהו 80, בית יהב, ירושלים', a: ['יהב$'] },
  { s: 'ירושלים', n: 'בנק ירושלים', phone: '*5727', note: 'הטלפון משמש לבירור מצב תלונה בלבד (א׳–ה׳, 9:00–14:00). את התלונה מגישים בטופס המקוון.', form: 'https://www.bankjerusalem.co.il/support/ombudsman-department', addr: 'הנגב 2, ת״ד 1076, קריית שדה התעופה', a: ['בנק ירושלים'] },
  { s: 'מרכנתיל', n: 'בנק מרכנתיל דיסקונט', phone: '076-8044151', email: 'pniotz@mdb.co.il', note: 'אין טופס מקוון. הפנייה נשלחת בדוא״ל.', addr: 'דרך מנחם בגין 125, תל אביב 6701201', a: ['מרכנתיל'] },
  { s: 'ONE ZERO', n: 'ONE ZERO הבנק הדיגיטלי', form: 'https://www.onezerobank.com/PublicInquiries', addr: 'עמינדב 3, קומה 1, תל אביב 6706703', a: ['one zero', 'onezero', 'וואן זירו', 'וואנזירו'] },
  { s: 'ישראכרט', n: 'ישראכרט', phone: '03-6364330', email: 'pniot@isracard.co.il', form: 'https://digital.isracard.co.il/wiz/front/m/98ZJR484DM', addr: 'בר כוכבא 12, בני ברק 5126105', a: ['ישראכרט', 'isracard', 'אמריקן אקספרס', 'אמקס$'] },
  { s: 'כאל', n: 'כאל (כולל דיינרס)', form: 'https://onlineforms.cal-online.co.il/index.html?token=&formId=147&systemId=3', addr: 'תפוצות ישראל 13, גבעתיים', a: ['כאל$', 'כ.א.ל', 'cal$', 'דיינרס', 'כרטיסי אשראי לישראל'] },
  { s: 'מקס', n: 'מקס', phone: '03-6178631', form: 'https://online.max.co.il/Anonymous/publicinquiries.aspx?SourceGA=contact-us', addr: 'בן גוריון 9, בני ברק', a: ['מקס$', 'max$', 'לאומי קארד'] }
];

/* ---------- Questions the chat may ask, and the 18 destinations ---------- */
const UNIT_PHONE = [
  { l: 'טלפון', v: '02-6552680', copy: 1, mono: 1 },
  { l: 'חיוג מקוצר', v: '*9086', copy: 1, mono: 1 },
  { l: 'שעות', v: 'א׳–ה׳, 9:00–13:00' }
];
const ID_DETAILS = 'שם מלא, מספר תעודת זהות, כתובת וטלפון';
const OUT_OF_SCOPE = 'פניות שאינן בסמכות היחידה, שנפתחות ונסגרות במכתב הפניה לגוף אחר.';
const COURT_NOTE = 'אם העניין נדון בבית משפט, בהוצאה לפועל או בבית דין, היחידה ככלל לא מתערבת.';

const N = {
  start: { type: 'q', q: 'על מה הפנייה?', options: [
    { label: 'תלונה על בנק או חברת אשראי', k: 'complaint' },
    { label: 'שאלה כללית או שאלה על הוראה', k: 'question' },
    { label: 'חשבון מוגבל', k: 'restricted' },
    { label: 'חשד להונאה', k: 'fraud' },
    { label: 'תלונה על השירות של בנק ישראל', k: 'boi' },
    { label: 'נושא אחר', k: 'other' }
  ] },
  q_urgent: { type: 'q', q: 'האם המקרה דחוף לפי ההגדרה של היחידה?',
    help: '<p>דחוף פירושו רקע הומניטרי קשה, או נזק בלתי הפיך אם לא יטופל מיד. למשל:</p><ul><li>מצוקה כלכלית־אישית קשה</li><li>אלימות או איומים</li><li>עיקול או סירוב למשיכת קצבאות הנדרשות למחייה</li><li>סירוב לפתוח חשבון ביתרת זכות</li><li>סירוב למשיכת כספים לכבוד אחרון לנפטר</li><li>אי טיפול בפעולות של גורם עוין על רקע הונאה</li></ul><p>נזק כספי לבדו אינו נחשב דחוף.</p>',
    options: [{ label: 'כן, זה מתאים' }, { label: 'לא' }] },
  q_omb: { type: 'q', q: 'באיזה שלב התלונה מול נציבות תלונות הציבור של התאגיד?',
    options: [
      { label: 'עדיין לא פניתי לנציבות', st: 'none' },
      { label: 'התקבלה תשובה שאינה מספקת', st: 'answered' },
      { label: 'עברו יותר מ־45 ימים בלי תשובה', st: 'noans' },
      { label: 'פניתי, ועוד לא עברו 45 ימים', st: 'wait' }
    ] },
  q_who: { type: 'q', q: 'מי שואל?', options: [
    { label: 'לקוח או לקוחה של בנק', next: 'r_general' },
    { label: 'תאגיד בנקאי, יועץ או עורך דין', next: 'r_reg' }
  ] },
  q_other: { type: 'q', q: 'באיזה נושא?', options: [
    { label: 'דוח נתוני אשראי', next: 'r_credit' },
    { label: 'בנק הדואר', next: 'r_postal' },
    { label: 'ביטוח, גמל או פנסיה', next: 'r_capital' },
    { label: 'ניכוי מס', next: 'r_tax' },
    { label: 'ייעוץ להשקעות', next: 'r_isa' },
    { label: 'מלוות מדינה', next: 'r_loans' },
    { label: 'מערכות תשלומים', next: 'r_pay' }
  ] },

  r_default: { type: 'r', kind: 'go', code: '00', dest: 'פנייה כללית ליחידה לפניות הציבור',
    lead: 'היחידה לפניות הציבור ולבקרה צרכנית נותנת מענה לכל פונה, בבקשה למידע או בתלונה על בנק או על חברת כרטיסי אשראי.',
    actions: [{ l: 'טופס פנייה כללית', h: U.generalQ, p: 1 }, { l: 'דף היחידה לפניות הציבור', h: U.unit }],
    contacts: UNIT_PHONE,
    prepare: ['תיאור קצר של המקרה או של השאלה', 'שם הבנק או חברת כרטיסי האשראי, אם יש', 'האם כבר הוגשה תלונה לנציבות התאגיד, ומתי'],
    notes: ['אפשר גם לכתוב כאן עוד פרטים, והצ׳אט ינסה לנתב שוב.'],
    avoided: 'פניות שהסורק לא זיהה מגיעות לתור כללי אחד וידוע, במקום להיפתח בערוץ שגוי ולעבור בין יחידות.' },
  r_urgent: { type: 'r', kind: 'go', code: '01', dest: 'מוקד היחידה לפניות הציבור, מסלול דחוף',
    lead: 'במקרה דחוף אין צורך לחכות לתשובת הבנק. פונים ישירות למוקד, והתלונה מטופלת בלוח זמנים מקוצר.',
    contacts: [...UNIT_PHONE, { l: 'מחוץ לשעות', v: 'אפשר להשאיר הודעה, והיחידה חוזרת' }],
    actions: [{ l: 'טופס אלקטרוני לתלונה דחופה', h: U.urgentForm, p: 1 }],
    prepare: ['ציון מפורש בטופס שהמקרה דחוף, ולמה', ID_DETAILS, 'שם הבנק או חברת כרטיסי האשראי', 'תיאור המקרה עם שמות, תאריכים ומסמכים'],
    notes: ['היחידה מסווגת את התלונה לפי נסיבות המקרה. אם יימצא שאינה דחופה, הפונה יופנה למסלול הרגיל ויתבקש לפנות קודם לנציבות התאגיד.'],
    avoided: 'תלונות לא דחופות שמגיעות למוקד ומוחזרות לבנק, ותלונות דחופות שממתינות בתור הרגיל.' },
  r_court: { type: 'r', kind: 'stop', code: '02', dest: 'ככלל, היחידה לא מתערבת',
    lead: 'היחידה לפניות הציבור לא נוהגת להתערב בפנייה שעניינה נדון, בעבר או במקביל, בבית משפט, בלשכת הוצאה לפועל או בבית דין.',
    contacts: UNIT_PHONE, actions: [{ l: 'פרטים בדף היחידה', h: U.unit }],
    notes: ['לבירור ראשוני לפני פנייה אפשר להתקשר למוקד היחידה.'],
    avoided: 'פניות שנפתחות ונסגרות רק אחרי שמתברר שהעניין כבר בהליך משפטי.' },
  r_to_omb: { type: 'r', kind: 'go', code: '03', dest: 'נציבות תלונות הציבור של התאגיד',
    lead: 'השלב הראשון הוא תמיד התאגיד עצמו. הנציבות עונה בכתב תוך 45 ימים, ובנסיבות מסוימות תוך 60 ימים, בהודעה בכתב (הוראת ניהול בנקאי תקין 308A).',
    bankPicker: 'full',
    prepare: ['תיאור המקרה עם שמות ותאריכים', 'מסמכים רלוונטיים: הודעות, דפי חשבון, הסכמים', 'רישום מועד ההגשה. ממנו נספרים 45 הימים'],
    notes: [{ t: 'אם התשובה לא תספק, אפשר לערער עליה בפני הפיקוח על הבנקים.', j: 'r_appeal', jl: 'למסלול הערעור' }],
    avoided: 'תלונות שמוגשות לפיקוח לפני מיצוי מול התאגיד, ומוחזרות לפונה.' },
  r_appeal: { type: 'r', kind: 'go', code: '04', dest: 'פורטל הפניות של הפיקוח על הבנקים',
    lead: 'אפשר לערער על תשובת הנציבות בפנייה בכתב ליחידה לפניות הציבור, בצירוף התשובה ופירוט הטענות.',
    actions: [{ l: 'לפורטל הפניות', s: 'כניסה דרך הזדהות לאומית', h: U.portal, p: 1 }],
    prepare: ['תשובת נציבות התאגיד', ID_DETAILS, 'שם הבנק או חברת כרטיסי האשראי', 'תיאור מדויק עם שמות, תאריכים ומסמכים', 'ייפוי כוח, אם הפנייה מוגשת באמצעות נציג'],
    contacts: [{ l: 'בדואר', v: 'ת״ד 780, ירושלים 9100701' }, { l: 'בפקס', v: '02-6669077', copy: 1, mono: 1 }],
    notes: ['הפנייה אינה כרוכה בתשלום, ואין צורך בעורך דין או ברואה חשבון.', 'על החלטת היחידה אפשר לערער פעם אחת. הערעור נבדק בידי גורם מקצועי אחר.', COURT_NOTE],
    avoided: 'ערעורים שמגיעים בלי תשובת הנציבות או בלי פרטים מזהים, ומחייבים סבב השלמה.' },
  r_noans: { type: 'r', kind: 'go', code: '05', dest: 'בירור קצר מול הנציבות, ואז פורטל הפיקוח',
    lead: 'היחידה ממליצה לבדוק קודם מול נציבות התאגיד אם נשלחה תשובה. אם לא התקבל מענה תוך 45 ימים, אפשר לפנות לפיקוח.',
    bankPicker: 'phone',
    actions: [{ l: 'לפורטל הפניות', s: 'כניסה דרך הזדהות לאומית', h: U.portal, p: 1 }],
    prepare: ['העתק התלונה שהוגשה לתאגיד ומועד ההגשה', ID_DETAILS, 'תיאור המקרה ומסמכים'],
    notes: [COURT_NOTE],
    avoided: 'פניות על ״אין תשובה״ כשהתשובה כבר נשלחה ולא נמצאה.' },
  r_wait: { type: 'r', kind: 'wait', code: '06', dest: 'התלונה עדיין בזמן המענה של התאגיד',
    lead: 'לנציבות יש 45 ימים לענות בכתב, ובנסיבות מסוימות עד 60 ימים. פנייה לפיקוח אפשרית אחרי שמתקבלת תשובה, או אחרי שעוברים 45 ימים בלי מענה.',
    calc: true,
    notes: [{ t: 'אם המקרה נעשה דחוף, אין צורך לחכות.', j: 'r_urgent', jl: 'למסלול הדחוף' }],
    avoided: 'פניות לפיקוח לפני שתם זמן המענה של התאגיד.' },
  r_general: { type: 'r', kind: 'go', code: '07', dest: 'שאלה כללית ליחידה לפניות הציבור',
    lead: 'היחידה נותנת גם מידע ומענה לשאלות הציבור בנושאי בנקאות וצרכנות בנקאית, בלי צורך בתלונה.',
    actions: [{ l: 'טופס שאלה כללית', h: U.generalQ, p: 1 }, { l: 'מידע וחינוך פיננסי', h: U.finEdu }, { l: 'מחשבון מסלולי עמלות', h: U.fees }],
    contacts: UNIT_PHONE,
    notes: [{ t: 'אם השאלה נוגעת למקרה שבו התאגיד פגע בלקוח, זו תלונה ולא שאלה.', j: 'q_urgent', jl: 'למסלול התלונות' }],
    avoided: 'שאלות מידע שנפתחות כתלונה ומטופלות בתור התלונות.' },
  r_reg: { type: 'r', kind: 'go', code: '08', dest: 'שאלה פרשנית: תחום האסדרה, לא פניות הציבור',
    lead: 'שאלה על פרשנות או יישום של הוראת ניהול בנקאי תקין, או על תוכן האוגדן, מטופלת בתחום האסדרה ולא בתור התלונות של היחידה לפניות הציבור.',
    placeholder: 'כאן ייכנס הערוץ הייעודי של היחידה לאסדרה צרכנית לשאלות פרשנות: תיבת דוא״ל או טופס, וזמן מענה מוצהר.',
    actions: [{ l: 'הוראות וחוזרי הפיקוח על הבנקים', h: U.supervision }],
    prepare: ['מספר ההוראה והסעיף שהשאלה נוגעת אליהם', 'השאלה בניסוח אחד ממוקד', 'הנוהג הקיים בתאגיד ומה מעורר את השאלה', 'שם התאגיד ותפקיד הפונה'],
    notes: [{ t: 'אם מדובר בתלונה של לקוח על מקרה מסוים, המסלול הוא מסלול התלונות.', j: 'q_urgent', jl: 'למסלול התלונות' }],
    avoided: 'שאלות פרשנות של תאגידים ואנשי מקצוע שנכנסות לתור פניות הציבור ומועברות ידנית לאסדרה.' },
  r_restricted: { type: 'r', kind: 'go', code: '09', dest: 'המדור לטיפול בחשבונות מוגבלים',
    lead: 'שאלות על הגבלה שהטיל בנק מטופלות במדור ייעודי, לא בתור התלונות של היחידה לפניות הציבור.',
    actions: [{ l: 'חשבונות ולקוחות מוגבלים', h: U.restricted, p: 1 }, { l: 'מידע ואישורים ללקוחות הבנקים', h: U.mugbalim }],
    notes: ['הגבלה שהטיל גוף שאינו בנק מבררים ישירות מול אותו גוף.'],
    avoided: 'פניות על הגבלת חשבון שנכנסות לתור התלונות ומועברות למדור.' },
  r_fraud: { type: 'r', kind: 'go', code: '10', dest: 'מוקד ההונאות של התאגיד',
    lead: 'בחשד להונאה פונים קודם כול למוקד הייעודי של הבנק או של חברת האשראי, כדי לעצור פעולות נוספות בהקדם.',
    actions: [{ l: 'מוקדים בנקאיים לדיווח על הונאה', h: U.scam, p: 1 }, { l: 'אזהרה מפני הונאות בהתחזות', h: U.warning }],
    notes: [{ t: 'אם התאגיד לא מטפל בפעולות של גורם עוין על רקע הונאה, זו תלונה דחופה.', j: 'r_urgent', jl: 'למסלול הדחוף' }],
    avoided: 'דיווחי הונאה שמגיעים ליחידה במקום למוקד של הבנק, ומאבדים זמן יקר.' },
  r_boi: { type: 'r', kind: 'go', code: '11', dest: 'נציב תלונות הציבור של בנק ישראל',
    lead: 'תלונה על מעשה או מחדל של בנק ישראל עצמו, למשל אי מענה, עיכוב בטיפול או יחס לא ראוי, מוגשת למבקר הפנימי, שמשמש גם נציב תלונות הציבור של הבנק.',
    actions: [{ l: 'הביקורת הפנימית ונציבות התלונות', h: U.audit, p: 1 }],
    notes: ['לא יתבררו תלונות על אירוע שחלפו ממנו יותר משלוש שנים, וגם לא תלונות בעניין שהוגש עליו כבר למבקר המדינה.', { t: 'תלונה על בנק מסחרי או על חברת כרטיסי אשראי אינה מגיעה לכאן.', j: 'q_urgent', jl: 'למסלול התלונות' }],
    avoided: 'תלונות על בנקים שמגיעות לנציב של בנק ישראל, ותלונות על בנק ישראל שמגיעות ליחידה לפניות הציבור.' },
  r_credit: { type: 'r', kind: 'go', code: '12', dest: 'היחידה לפניות הציבור במערכת נתוני האשראי',
    lead: 'פנייה בנושא דוח נתוני אשראי מטופלת דרך אתר מערכת נתוני האשראי, ביחידה נפרדת לפניות הציבור.',
    actions: [{ l: 'לאתר מערכת נתוני אשראי', h: U.credit, p: 1 }],
    avoided: 'פניות על דוחות אשראי שמגיעות לפיקוח על הבנקים.' },
  r_postal: { type: 'r', kind: 'out', code: '13', dest: 'הפיקוח על בנק הדואר, משרד התקשורת',
    lead: 'בנק הדואר אינו בסמכות היחידה. תלונות עליו מטופלות באגף הפיקוח על בנק הדואר במשרד התקשורת.',
    actions: [{ l: 'בנק הדואר באתר gov.il', h: U.postal, p: 1 }], avoided: OUT_OF_SCOPE },
  r_capital: { type: 'r', kind: 'out', code: '14', dest: 'רשות שוק ההון, ביטוח וחיסכון',
    lead: 'חברות ביטוח, קופות גמל וקרנות פנסיה אינן בסמכות היחידה. פונים בעניינן לרשות שוק ההון.',
    actions: [{ l: 'רשות שוק ההון באתר gov.il', h: U.capital, p: 1 }], avoided: OUT_OF_SCOPE },
  r_tax: { type: 'r', kind: 'out', code: '15', dest: 'רשות המסים',
    lead: 'בירור בנושא ניכוי מס אינו בסמכות היחידה, ויש לפנות לרשות המסים.',
    actions: [{ l: 'רשות המסים באתר gov.il', h: U.tax, p: 1 }], avoided: OUT_OF_SCOPE },
  r_isa: { type: 'r', kind: 'out', code: '16', dest: 'הרשות לניירות ערך',
    lead: 'תלונות בנושא ייעוץ להשקעות מטופלות ברשות לניירות ערך.',
    actions: [{ l: 'לאתר הרשות לניירות ערך', h: U.isa, p: 1 }], avoided: OUT_OF_SCOPE },
  r_loans: { type: 'r', kind: 'go', code: '17', dest: 'מדור מלוות המדינה בבנק ישראל',
    lead: 'שאלות על מלוות מדינה ובונדס מטופלות בעמוד הייעודי של בנק ישראל, לא ביחידה לפניות הציבור.',
    actions: [{ l: 'מלוות חובה ובונדס', h: U.loans, p: 1 }],
    avoided: 'שאלות על מלוות מדינה שמגיעות ליחידה לפניות הציבור ומועברות.' },
  r_pay: { type: 'r', kind: 'go', code: '18', dest: 'פניות בנושא מערכות תשלומים',
    lead: 'פנייה בנושא מערכות תשלומים ואמצעי תשלום מוגשת דרך עמוד יצירת הקשר של בנק ישראל.',
    actions: [{ l: 'יצירת קשר עם בנק ישראל', h: U.contact, p: 1 }],
    avoided: 'פניות על מערכות תשלומים שנכנסות לתור התלונות על בנקים.' }
};
/* תחום האסדרה: לפי CONFIG.regulationChannel */
delete N.r_reg.placeholder;
if (CONFIG.regulationChannel) {
  N.r_reg.actions = [{ l: CONFIG.regulationChannel.label, h: CONFIG.regulationChannel.href, p: 1 }, ...N.r_reg.actions];
  if (CONFIG.regulationChannel.note) N.r_reg.notes = [CONFIG.regulationChannel.note, ...N.r_reg.notes];
} else {
  N.r_reg.actions = [{ l: 'טופס פנייה כללית', h: U.generalQ, p: 1 }, ...N.r_reg.actions];
  N.r_reg.notes = ['בטופס יש לציין שמדובר בשאלה פרשנית, ואת מספר ההוראה והסעיף.', ...N.r_reg.notes];
}

const TONE = { go: 'יעד', wait: 'עדיין לא', stop: 'אין מסלול ביחידה', out: 'גוף אחר' };
const DIRECT = { restricted: 'r_restricted', fraud: 'r_fraud', boi: 'r_boi', credit: 'r_credit', postal: 'r_postal', capital: 'r_capital', tax: 'r_tax', isa: 'r_isa', loans: 'r_loans', pay: 'r_pay' };

/* ---------- Keyword lexicon ----------
   c = category that gets the weight w; f = state flag; p = priority (higher matches first and claims its words).
   A trailing $ means whole word only; a leading / is a raw pattern. Prefixes ו ה ב ל מ ש כ are allowed before any term. */
const CAT = { complaint: 'תלונה על תאגיד', question: 'שאלה כללית', regulation: 'שאלה פרשנית / אוגדן', restricted: 'חשבון מוגבל', fraud: 'הונאה', boi: 'תלונה על בנק ישראל', credit: 'נתוני אשראי', postal: 'בנק הדואר', capital: 'ביטוח ופנסיה', tax: 'מס', isa: 'ייעוץ השקעות', loans: 'מלוות מדינה', pay: 'מערכות תשלומים' };
const FLAG = { neutral: 'ביטולים', stNone: 'טרם פנו לנציבות', stNoAns: 'אין מענה מהנציבות', stAns: 'התקבלה תשובה', stFiled: 'פנו לנציבות', urgent: 'קריטריון דחיפות', urgentWord: 'מילת דחיפות (דורשת אישור)', court: 'הליך משפטי', pro: 'פונה מקצועי', customer: 'פונה פרטי', incident: 'אירוע אישי', boiEnt: 'אזכור בנק ישראל', boiNeg: 'תלונה על שירות', bank: 'שם תאגיד' };
const PICK = { complaint: 'תלונה על מקרה שקרה מול בנק או חברת אשראי', question: 'שאלה כללית, בלי מקרה מסוים', regulation: 'שאלה פרשנית על הוראה או על האוגדן', restricted: 'חשבון מוגבל', fraud: 'חשד להונאה', boi: 'תלונה על השירות של בנק ישראל', credit: 'דוח נתוני אשראי', postal: 'בנק הדואר', capital: 'ביטוח, גמל או פנסיה', tax: 'ניכוי מס', isa: 'ייעוץ להשקעות', loans: 'מלוות מדינה', pay: 'מערכות תשלומים' };
const SHOW = { '/ביטוח(?!\\s*לאומי)': 'ביטוח (לא ביטוח לאומי)', '/הוראה(?!\\s*(?:קבע|לחיוב))': 'הוראה (לא הוראת קבע)', '/הוראת(?!\\s*(?:קבע|חיוב))': 'הוראת… (לא הוראת קבע)' };

const LEX = [
  { f: 'neutral', p: 3, t: ['לא דחוף', 'לא דחופה', 'לא בדחיפות', 'לא מקרה דחוף', 'לא הונאה', 'לא מוגבל', 'לא מוגבלת', 'אינו מוגבל'] },
  { f: 'stNone', p: 2, t: ['עוד לא פניתי', 'עדיין לא פניתי', 'לא פניתי', 'לא התלוננתי', 'עוד לא התלוננתי', 'לא הגשתי', 'עוד לא הגשתי'] },
  { f: 'stNoAns', p: 2, t: ['לא ענו', 'לא עונים', 'לא עונה', 'לא קיבלתי תשובה', 'לא קיבלנו תשובה', 'לא התקבלה תשובה', 'אין תשובה', 'אין מענה', 'לא קיבלתי מענה', 'לא חזרו', 'לא חוזרים', 'עדיין מחכה', 'עוד מחכה', 'עדיין מחכים', 'מתעלמים', 'התעלמו', 'לא נענתה', 'לא נענה'] },
  { f: 'stAns', p: 1, t: ['קיבלתי תשובה', 'קיבלנו תשובה', 'התקבלה תשובה', 'ענו לי', 'השיבו לי', 'תשובת הנציב', 'תשובת הנציבות', 'התשובה של הנציב', 'התשובה של הנציבות', 'התשובה של הבנק', 'תשובת הבנק', 'דחו את התלונה', 'דחו את הפנייה', 'דחו אותי', 'התלונה נדחתה', 'נדחתה', 'לערער', 'ערעור', 'לא מסכים עם התשובה', 'לא מסכימה עם התשובה', 'לא מרוצה מהתשובה', 'לא מרוצה מהתשובה', 'תשובה לא מספקת', 'לא מקבל את התשובה'] },
  { f: 'stFiled', p: 1, t: ['פניתי לנציב', 'פניתי לנציבות', 'הגשתי תלונה', 'התלוננתי', 'פניתי לבנק', 'שלחתי תלונה', 'פנייה לנציבות', 'נציב תלונות הציבור', 'נציבות תלונות', 'פניות הציבור של הבנק', 'פניתי לפניות הציבור'] },
  { f: 'urgent', c: 'complaint', w: 2, p: 1, t: ['מצוקה', 'אלימות', 'איום', 'איומים', 'מאיים', 'מאיימים', 'קצבה', 'קצבת', 'קצבאות', 'ביטוח לאומי', 'נפטר$', 'נפטרה$', 'הלוויה', 'לוויה', 'כבוד אחרון', 'קבורה', 'אין לי כסף לאוכל', 'אין לי ממה לחיות', 'אין לנו ממה לחיות', 'לא יכול לקנות אוכל', 'לא יכולה לקנות אוכל', 'רעב$', 'מחייה'] },
  { f: 'urgentWord', p: 0, t: ['דחוף', 'דחופה', 'בדחיפות', 'מיידי', 'חירום'] },
  { f: 'court', c: 'complaint', w: 1, p: 1, t: ['בית משפט', 'בית המשפט', 'תביעה', 'תבעתי', 'תביעות קטנות', 'הוצאה לפועל', 'הוצל"פ', 'הוצלפ', 'לשכת ההוצאה', 'בית דין', 'פסק דין', 'פס"ד'] },
  { f: 'pro', c: 'regulation', w: 3, p: 1, t: ['קצין ציות', 'קצינת ציות', 'קצין הציות', 'קצינת הציות', 'מחלקת ציות', 'מחלקת הציות', 'אנחנו בנק', 'אני מבנק', 'אני עובד בבנק', 'אני עובדת בבנק', 'הבנק שלנו', 'הלקוחות שלנו', 'לקוחות שלנו', 'לקוח שלנו', 'יועץ משפטי', 'יועצת משפטית', 'משרד עורכי דין', 'מטעם הבנק', 'מטעם התאגיד', 'תאגיד בנקאי', 'התאגיד שלנו', 'אנחנו חברת כרטיסי אשראי'] },
  { f: 'customer', p: 1, t: ['אני לקוח', 'אני לקוחה', 'הבנק שלי', 'החשבון שלי', 'בחשבון שלי', 'הכרטיס שלי'] },
  { c: 'regulation', w: 3, t: ['אוגדן', 'ניהול בנקאי תקין', 'נב"ת', 'נבת$', 'הוראת ניהול', 'פרשנות', 'לפרש', 'חוזר המפקח', 'חוזר הפיקוח', 'עמדת הפיקוח', 'יישום ההוראה', 'תחולת ההוראה', 'מכתב המפקח'] },
  { c: 'regulation', w: 2, t: ['/הוראה(?!\\s*(?:קבע|לחיוב))', '/הוראת(?!\\s*(?:קבע|חיוב))', 'סעיף', 'רגולציה', 'רגולטורי', 'הבהרה', 'דיווח לפיקוח', 'הנחיה', 'הנחיית'] },
  { c: 'question', w: 3, t: ['יש לי שאלה', 'רציתי לשאול', 'רוצה לשאול', 'שאלה כללית', 'מה הזכויות', 'האם מותר', 'האם הבנק רשאי', 'האם הבנק יכול', 'האם חובה', 'זכאי$', 'זכאית$', 'כמה עולה', 'מה ההבדל', 'איך עושים', 'איך פותחים', 'מסלול עמלות', 'איך מחשבים', 'מה זה'] },
  { c: 'question', w: 1, t: ['שאלה$', 'לשאול', 'מידע$', 'להבין', 'מותר$', 'מה עושים'] },
  { c: 'complaint', w: 3, f: 'incident', t: ['חייבו אותי', 'חייב אותי', 'חייבה אותי', 'חויבתי', 'גבו ממני', 'גבו לי', 'לקחו לי', 'סגרו לי', 'סגרו את החשבון', 'סירבו', 'מסרבים', 'מסרב$', 'חיוב כפול', 'חיוב שגוי', 'חיוב יתר'] },
  { c: 'complaint', w: 3, t: ['עמלה', 'עמלות', 'החזר כספי', 'משכנתא', 'הלוואה', 'הלוואות', 'ריבית', 'מינוס', 'אוברדראפט', 'שיק$', 'שיקים$', "צ'ק", "צ'קים", 'פיקדון', 'פקדון', 'פיקדונות', 'עו"ש', 'עוש$', 'כרטיס אשראי', 'כרטיס חיוב', 'כרטיס דביט', 'סגירת חשבון', 'פתיחת חשבון', 'סירוב', 'גבייה', 'גביה'] },
  { c: 'complaint', w: 2, t: ['הוראת קבע', 'תלונה', 'להתלונן', 'מתלונן', 'מתלוננת', 'חיוב', 'חיובים', 'חשבון הבנק', 'חשבון בנק', 'סניף', 'פקיד', 'פקידה', 'מט"ח', 'מטבע חוץ', 'העברה בנקאית', 'העברת כספים', 'משיכה', 'משיכת מזומן', 'כספומט', 'לא בסדר', 'עוול', 'לא הוגן', 'עושק'] },
  { c: 'complaint', w: 1, t: ['הבנק$', 'בנק$', 'חשבון$', 'כסף$'] },
  { c: 'restricted', w: 4, t: ['חשבון מוגבל', 'לקוח מוגבל', 'לקוחה מוגבלת', 'מוגבל$', 'מוגבלת$', 'הגבלה חמורה', 'הגבלת חשבון', 'הגבילו', 'הגבלה$', 'שיקים חוזרים', 'שיקים שחזרו', "צ'קים חוזרים", 'שיקים שלא כובדו', 'חזרו לי שיקים'] },
  { c: 'fraud', w: 4, t: ['הונאה', 'הונאות', 'הונו', 'התחזות', 'מתחזה', 'התחזו', 'פישינג', 'עוקץ', 'עקצו', 'נעקצתי', 'גנבו', 'נגנב', 'נגנבו', 'גניבה', 'גניבת זהות', 'לא ביצעתי', 'לא אני ביצעתי', 'פעולה שלא ביצעתי', 'לא מורשה', 'לא מורשית', 'לא מורשות', 'פרצו', 'נפרץ', 'פריצה', 'קוד אימות', 'קישור חשוד', 'לינק חשוד', 'הודעה חשודה', 'סמס חשוד', 'שיחה חשודה', 'נוכל', 'נוכלים', 'רמאי', 'רמאות'] },
  { c: 'fraud', w: 2, t: ['חשוד$', 'חשודה$', 'חשודות$', 'משך כסף', 'משכו כסף', 'משכו לי', 'מישהו משך', 'זר$'] },
  { f: 'boiEnt', p: 1, t: ['בנק ישראל', 'הפיקוח על הבנקים', 'הפיקוח$', 'המפקח$', 'היחידה לפניות הציבור', 'המוקד של בנק ישראל'] },
  { f: 'boiNeg', p: 1, t: ['יחס לא ראוי', 'יחס גרוע', 'יחס משפיל', 'יחס מזלזל', 'מזלזל', 'זלזול', 'גס$', 'גסה$', 'לא מקצועי', 'לא מקצועית', 'עיכוב בטיפול', 'עיכוב$', 'לא טיפלו', 'לא מטפלים', 'לא מטפלת', 'סחבת'] },
  { c: 'credit', w: 4, t: ['נתוני אשראי', 'נתוני האשראי', 'דוח האשראי', 'דירוג האשראי', 'מערכת נתוני אשראי', 'דוח אשראי', 'דו"ח אשראי', 'דירוג אשראי', 'ניקוד אשראי', 'דירוג$', 'bdi', 'לשכת אשראי', 'חברת מידע אשראי', 'מאגר נתוני אשראי', 'דוח נתוני אשראי'] },
  { c: 'postal', w: 4, t: ['בנק הדואר', 'דואר ישראל', 'הדואר$', 'סניף דואר'] },
  { c: 'capital', w: 4, t: ['/ביטוח(?!\\s*לאומי)', 'חברת ביטוח', 'פוליסה', 'פנסיה', 'קרן פנסיה', 'קופת גמל', 'קופות גמל', 'גמל$', 'קרן השתלמות', 'השתלמות$'] },
  { c: 'tax', w: 4, t: ['ניכוי מס', 'מס במקור', 'רשות המסים', 'רשות המיסים', 'מס הכנסה', 'החזר מס', 'מס על ריבית', 'מס על הפיקדון'] },
  { c: 'tax', w: 1, t: ['מס$', 'מיסים$', 'מסים$'] },
  { c: 'isa', w: 4, t: ['ייעוץ השקעות', 'ייעוץ להשקעות', 'יועץ השקעות', 'יועצת השקעות', 'ניירות ערך', 'תיק השקעות', 'מנהל תיקים', 'בית השקעות', 'ברוקר'] },
  { c: 'loans', w: 4, t: ['מלווה מדינה', 'מלוות מדינה', 'מלוות$', 'מלווה חובה', 'מלוות חובה', 'בונדס', 'איגרות חוב של המדינה', 'אג"ח מדינה'] },
  { c: 'pay', w: 3, t: ['מערכות תשלומים', 'מערכת תשלומים', 'אמצעי תשלום', 'ביט$', 'bit$', 'פייבוקס', 'paybox', 'אפליקציית תשלום', 'ארנק דיגיטלי', 'apple pay', 'google pay', 'זה"ב', 'העברה מיידית', 'מסלקה', 'סליקה', 'סולק$'] },
  ...BANKS.map((b, i) => ({ f: 'bank', c: 'complaint', w: 2, b: i, t: b.a }))
];

const LETTER = '[\\u0590-\\u05FFa-z0-9]';
function norm(s) { return s.toLowerCase().replace(/[״“”„]/g, '"').replace(/[׳‘’`´]/g, "'"); }
function buildRe(term) {
  let core, word = false;
  if (term.startsWith('/')) core = term.slice(1);
  else {
    let t = term;
    if (t.endsWith('$')) { word = true; t = t.slice(0, -1); }
    core = norm(t).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
  }
  return new RegExp(`(?<!${LETTER})(?:[והבלמשכ]{0,3})(?:${core})${word ? `(?!${LETTER})` : ''}`, 'g');
}
const ENTRIES = [];
LEX.forEach(g => g.t.forEach(term => ENTRIES.push({ c: g.c, f: g.f, w: g.w || 0, p: g.p || 0, b: g.b, term, re: buildRe(term), len: term.length })));
ENTRIES.sort((a, b) => (b.p - a.p) || (b.len - a.len));

function elapsedDays(t) {
  const H = '(?![\\u0590-\\u05FF])';
  const rules = [
    [/(\d+)\s*(?:ימים|יום|ימי)/, m => +m[1]],
    [/(\d+)\s*(?:שבועות|שבוע)/, m => +m[1] * 7],
    [/(\d+)\s*(?:חודשים|חודש)/, m => +m[1] * 30],
    [/חודש\s+ו?חצי/, () => 45],
    [/(?:שלושה|כמה)\s+חודשים/, () => 90],
    [/חודשיים/, () => 60],
    [/שלושה\s+שבועות/, () => 21],
    [/שבועיים/, () => 14],
    [new RegExp('(?:לפני|כבר|מזה|במשך)\\s+כ?חודש' + H), () => 30],
    [new RegExp('(?:לפני|כבר|מזה|במשך)\\s+כ?שבוע' + H), () => 7],
    [/(?:לפני|כבר)\s+כמה\s+ימים|אתמול|שלשום/, () => 3]
  ];
  for (const [re, fn] of rules) { const m = t.match(re); if (m) return fn(m); }
  return null;
}

function scan(text) {
  const t = norm(text);
  const taken = [], hits = [];
  for (const e of ENTRIES) {
    e.re.lastIndex = 0;
    let m;
    while ((m = e.re.exec(t))) {
      if (!m[0].length) { e.re.lastIndex++; continue; }
      const s = m.index, en = s + m[0].length;
      if (taken.some(([a, b]) => s < b && en > a)) continue;
      taken.push([s, en]);
      hits.push({ s, e: en, c: e.c, f: e.f, w: e.w, b: e.b, surface: text.slice(s, en) });
    }
  }
  const scores = {}, flags = {};
  let bank = null, urgentCount = 0;
  for (const h of hits) {
    if (h.c && h.w) scores[h.c] = (scores[h.c] || 0) + h.w;
    if (h.f) {
      flags[h.f] = true;
      if (h.f === 'urgent') urgentCount++;
      if (h.f === 'bank' && bank == null) bank = h.b;
    }
  }
  if (flags.stAns || flags.stNoAns || flags.stFiled || flags.stNone) scores.complaint = (scores.complaint || 0) + 2;
  if (flags.boiEnt && (flags.boiNeg || flags.stNoAns) && bank == null && !flags.stAns) scores.boi = 5;
  hits.sort((a, b) => a.s - b.s);
  return { scores, flags, bank, days: elapsedDays(t), hits, urgentCount };
}

function decide(sc) {
  const s = sc.scores, f = sc.flags;
  const hasStatus = f.stAns || f.stNoAns || f.stFiled || f.stNone;
  if (f.pro) return { intent: 'regulation', top: 9 };
  if ((s.question || 0) >= 3 && !f.incident && !hasStatus && !((s.fraud || 0) >= 4) && !((s.restricted || 0) >= 4)) return { intent: 'question', top: s.question };
  const r = Object.entries(s).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  if (!r.length || r[0][1] < 2) return { low: true, top: r.length ? r[0][1] : 0 };
  const [k1, v1] = r[0], second = r[1];
  if (second && second[1] >= 2 && v1 - second[1] < 1) {
    const pair = [k1, second[0]].sort().join('|');
    if (pair === 'complaint|fraud') return { intent: hasStatus ? 'complaint' : 'fraud', top: v1 };
    if (pair === 'question|regulation') return { intent: 'regulation', top: v1 };
    return { amb: [k1, second[0]], top: v1 };
  }
  return { intent: k1, top: v1 };
}

function statusOf(fl, days) {
  if (fl.stNone) return 'none';
  if (fl.stAns) return 'answered';
  if (fl.stNoAns || fl.stFiled) {
    if (days != null) return days >= 45 ? (fl.stNoAns ? 'noans' : null) : 'wait';
  }
  return null;
}

/* ---------- Conversation state ---------- */
const todayISO = (() => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); })();
function isoMinus(days) { const d = new Date(todayISO + 'T00:00:00'); d.setDate(d.getDate() - days); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
const fresh = () => ({ intent: null, bank: null, days: null, fl: {}, urgent: null, status: null, urgentCount: 0, scores: {} });
let ctx = fresh();
let pending = null;
let msgs = [];
let seq = 0;
let presenter = typeof location !== 'undefined' && location.hash === '#' + CONFIG.debugHash;

const log = document.getElementById('log');
const lab = document.getElementById('lab');
const presBtn = document.getElementById('presenter');
const input = document.getElementById('msg-input');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function esc(s) { return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }
function mask(s) { return s.replace(/(?:\d[\s-]?){7,}/g, m => '•••••' + (/\s$/.test(m) ? ' ' : '')); }

function merge(sc) {
  if (sc.bank != null) ctx.bank = sc.bank;
  if (sc.days != null) ctx.days = sc.days;
  Object.keys(sc.flags).forEach(k => { ctx.fl[k] = true; });
  ctx.urgentCount += sc.urgentCount;
  ctx.scores = sc.scores;
}

/* ---------- Rendering ---------- */
function ext(a) {
  return `<a class="btn ${a.p ? 'primary' : 'secondary'}" href="${a.h}" target="_blank" rel="noopener"><span class="ext">${a.l}</span>${a.s ? `<small>${a.s}</small>` : ''}</a>`;
}
function kv(c) {
  const val = `<span class="val${c.mono ? ' mono' : ''}"${c.mono ? ' dir="ltr"' : ''}>${c.v}</span>`;
  return `<div class="kv"><dt>${c.l}</dt><dd>${val}${c.copy ? `<button class="copy" type="button" data-copy="${c.v}">העתקה</button>` : ''}</dd></div>`;
}
function sec(title, inner) { return `<div class="sec"><h3>${title}</h3>${inner}</div>`; }

function bankCard(b, mode) {
  const rows = [];
  if (b.phone) rows.push({ l: 'טלפון', v: b.phone, copy: 1, mono: 1 });
  if (b.email) rows.push({ l: 'דוא״ל', v: b.email, copy: 1, mono: 1 });
  if (mode === 'full') rows.push({ l: 'כתובת', v: b.addr });
  const formBtn = b.form ? `<div class="actions">${ext({ l: mode === 'full' ? 'לטופס המקוון של הנציבות' : 'לטופס המקוון', h: b.form, p: mode === 'full' })}</div>` : '';
  return `<div class="bank-card"><h4>נציבות תלונות הציבור · ${b.n}</h4>${b.note ? `<p class="hint">${b.note}</p>` : ''}${mode === 'full' ? formBtn : ''}<dl class="kvs">${rows.map(kv).join('')}</dl>${mode !== 'full' ? formBtn : ''}</div>`;
}
function banksHTML(m, mode) {
  const head = mode === 'phone' ? 'לאיזה תאגיד הוגשה התלונה?' : 'על איזה בנק או חברת כרטיסי אשראי התלונה?';
  return `<div class="panel"><div class="panel-h">${head}</div>
    <div class="chips">${BANKS.map((b, i) => `<button class="chip" type="button" data-bank="${i}" aria-pressed="${m.bank === i}">${b.s}</button>`).join('')}</div>
    ${m.bank != null ? bankCard(BANKS[m.bank], mode) : `<p class="hint">בחירת תאגיד תציג את פרטי הנציבות שלו.</p>`}</div>`;
}
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function fmt(d) { return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }); }
function calcOut(v) {
  if (!v) return '<div>יש לבחור תאריך.</div>';
  const d = new Date(v + 'T00:00:00'), t = new Date(todayISO + 'T00:00:00');
  if (isNaN(d)) return '<div>התאריך אינו תקין.</div>';
  if (d > t) return '<div>התאריך שנבחר עוד לא הגיע.</div>';
  const d45 = addDays(d, 45), d60 = addDays(d, 60);
  const left = Math.round((d45 - t) / 864e5);
  if (left > 0) return `<div class="big">${left}</div><div>ימים עד מועד המענה: <b>${fmt(d45)}</b>. אם הנציבות הודיעה בכתב על הארכה, המועד הוא ${fmt(d60)}.</div>`;
  return `<div class="big">0</div><div>מועד 45 הימים עבר ב־${fmt(d45)}. <button class="link" type="button" data-jump="r_noans">למסלול: עברו 45 ימים בלי תשובה</button></div>`;
}
function noteHTML(x) {
  if (typeof x === 'string') return `<li>${x}</li>`;
  return `<li>${x.t} <button class="link" type="button" data-jump="${x.j}">${x.jl}</button></li>`;
}
function slipHTML(m) {
  const n = N[m.node];
  return `<article class="slip ${n.kind}">
    <div class="slip-top"><span>${TONE[n.kind]}</span>${presenter ? `<span class="code">מסלול ${n.code}</span>` : ''}</div>
    <div class="slip-body">
      <h2 class="dest">${n.dest}</h2>
      <p class="lead">${n.lead}</p>
      ${n.calc ? `<div class="panel calc"><label class="panel-h" for="filed-${m.id}">מתי הוגשה התלונה לתאגיד?</label><input type="date" id="filed-${m.id}" data-filed value="${m.filed}" max="${todayISO}"><div class="calc-out">${calcOut(m.filed)}</div></div>` : ''}
      ${n.bankPicker ? banksHTML(m, n.bankPicker) : ''}
      ${n.placeholder ? `<div class="placeholder"><b>להשלמה לפני השקה</b>${n.placeholder}</div>` : ''}
      ${n.actions ? sec('מה עושים עכשיו', `<div class="actions">${n.actions.map(ext).join('')}</div>`) : ''}
      ${n.contacts ? sec('פרטי קשר', `<dl class="kvs">${n.contacts.map(kv).join('')}</dl>`) : ''}
      ${n.prepare ? sec('מה להכין', `<ul class="list">${n.prepare.map(p => `<li>${p}</li>`).join('')}</ul>`) : ''}
      ${n.notes ? sec('חשוב לדעת', `<ul class="list">${n.notes.map(noteHTML).join('')}</ul>`) : ''}
      ${presenter && n.avoided ? `<div class="avoided"><span>ניתוב שגוי שנמנע</span>${n.avoided}</div>` : ''}
    </div></article>`;
}

function hlHTML(text, hits) {
  if (!presenter || !hits || !hits.length) return esc(text);
  let out = '', i = 0;
  for (const h of hits) {
    if (h.f === 'neutral') continue;
    out += esc(text.slice(i, h.s)) + `<mark class="hl${h.c ? '' : ' f'}">${esc(text.slice(h.s, h.e))}</mark>`;
    i = h.e;
  }
  return out + esc(text.slice(i));
}
function whyHTML(m) {
  if (!m.scan) return '';
  const terms = [...new Set(m.scan.hits.filter(h => h.f !== 'neutral').map(h => h.surface.trim()))].slice(0, 10);
  let out = terms.length ? `<div class="why"><span>זוהה לפי:</span>${terms.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';
  if (presenter) out += scoresHTML(m);
  return out;
}
function scoresHTML(m) {
  const sc = m.scan;
  const rows = Object.entries(sc.scores).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const max = Math.max(8, ...rows.map(r => r[1]));
  const fl = Object.keys(sc.flags).filter(k => !['neutral', 'bank'].includes(k)).map(k => FLAG[k]);
  if (sc.bank != null) fl.push('תאגיד: ' + BANKS[sc.bank].s);
  if (sc.days != null) fl.push(`זמן שעבר: ${sc.days} ימים`);
  const payload = m.payload ? `<pre class="payload">${esc(JSON.stringify(m.payload, null, 2))}</pre>` : '';
  return `<div class="scores"><div class="scores-h">ניקוד לפי סוג פנייה</div>
    ${rows.length ? rows.map(([k, v], i) => `<div class="srow${i === 0 && m.win === k ? ' win' : ''}"><span>${CAT[k]}</span><progress class="bar" max="${max}" value="${v}" aria-hidden="true"></progress><span class="mono">${v}</span></div>`).join('') : '<div class="flags">לא נמצאו מילות מפתח לסוג פנייה.</div>'}
    ${fl.length ? `<div class="flags">סימונים: ${fl.join(' · ')}</div>` : ''}
    ${payload ? `<div class="scores-h">פלט מובנה לפנייה</div>${payload}` : ''}</div>`;
}
function repliesHTML(m) {
  if (!m.replies) return '';
  return `<div class="replies${m.examples ? ' examples' : ''}">${m.replies.map((r, i) => `<button class="reply${m.used === i ? ' chosen' : ''}" type="button" data-reply="${i}"${m.used != null ? ' disabled' : ''}>${esc(r.label)}</button>`).join('')}</div>`;
}
function msgHTML(m) {
  if (m.role === 'user') return `<div class="bubble">${hlHTML(m.text, m.hits)}</div>`;
  if (m.kind === 'slip') {
    return `${m.intro ? `<div class="bubble"><p>${m.intro}</p></div>` : ''}${slipHTML(m)}${whyHTML(m)}<button class="link small" type="button" data-manual>לא מדויק? בחירת נושא ידנית</button>`;
  }
  return `<div class="bubble">${m.html}</div>${repliesHTML(m)}${whyHTML(m)}`;
}
function makeEl(m) {
  const d = document.createElement('div');
  d.className = `msg ${m.role}`;
  d.dataset.mid = m.id;
  d.innerHTML = msgHTML(m);
  return d;
}
function push(m) {
  m.id = ++seq;
  msgs.push(m);
  const d = makeEl(m);
  if (!reduced) d.classList.add('enter');
  log.appendChild(d);
  d.scrollIntoView({ block: m.role === 'bot' && m.kind === 'slip' ? 'start' : 'nearest', behavior: reduced ? 'auto' : 'smooth' });
  return d;
}
function rerender(m) { const d = log.querySelector(`[data-mid="${m.id}"]`); if (d) d.innerHTML = msgHTML(m); }
function renderAll() { log.innerHTML = ''; msgs.forEach(m => log.appendChild(makeEl(m))); }
function renderLab() {
  lab.hidden = !presenter;
  if (presBtn) presBtn.setAttribute('aria-pressed', String(presenter));
  if (!presenter) return;
  document.getElementById('lex').innerHTML = LEX.filter(g => g.f !== 'bank').map(g => {
    const label = g.f ? FLAG[g.f] + (g.c ? ` → ${CAT[g.c]}` : '') : CAT[g.c];
    return `<div class="lex-g"><div class="lex-h">${label}${g.w ? `<span class="w">+${g.w}</span>` : ''}</div><div class="lex-t">${g.t.map(t => `<span>${esc(SHOW[t] || t.replace(/\$$/, ''))}</span>`).join('')}</div></div>`;
  }).join('') + `<div class="lex-g"><div class="lex-h">${FLAG.bank} → ${CAT.complaint}<span class="w">+2</span></div><div class="lex-t">${BANKS.flatMap(b => b.a).map(t => `<span>${esc(t.replace(/\$$/, ''))}</span>`).join('')}</div></div>`;
  document.getElementById('map-list').innerHTML = Object.keys(N).filter(k => N[k].type === 'r')
    .map(k => `<button class="map-item" type="button" data-goto="${k}"><span class="code">${N[k].code}</span><span>${N[k].dest}</span></button>`).join('');
}

/* ---------- Bot actions ---------- */
let typingEl = null;
function later(fn) {
  typingEl = document.createElement('div');
  typingEl.className = 'msg bot';
  typingEl.innerHTML = '<div class="bubble"><span class="typing" aria-label="מקליד"><span></span><span></span><span></span></span></div>';
  log.appendChild(typingEl);
  typingEl.scrollIntoView({ block: 'nearest' });
  setTimeout(() => { if (typingEl) { typingEl.remove(); typingEl = null; } fn(); }, reduced ? 120 : 420);
}
function say(html, extra = {}) { return push({ role: 'bot', kind: 'text', html, ...extra }); }
function payloadFor(node) {
  const st = ctx.status || statusOf(ctx.fl, ctx.days);
  return {
    inquiryType: ctx.intent || 'general',
    routeCode: N[node].code,
    destination: N[node].dest,
    corporation: ctx.bank != null ? BANKS[ctx.bank].n : null,
    ombudsmanStage: st || null,
    daysSinceFiled: ctx.days,
    urgentSignal: ctx.urgentCount > 0 || !!ctx.fl.urgentWord,
    legalProceeding: !!ctx.fl.court
  };
}
function slip(node, intro, scan) {
  const m = { role: 'bot', kind: 'slip', node, intro, scan, win: ctx.intent, bank: N[node].bankPicker && ctx.bank != null ? ctx.bank : null, filed: ctx.days != null ? isoMinus(ctx.days) : todayISO };
  if (scan) m.payload = payloadFor(node);
  pending = null;
  push(m);
}
const DEFAULT_INTRO = 'לא זוהו בטקסט מספיק פרטים כדי לקבוע את סוג הפנייה, ולכן היא מופנית לערוץ הכללי של היחידה לפניות הציבור:';
function toDefault(scan, intro) { ctx.intent = ctx.intent || 'general'; slip('r_default', intro || DEFAULT_INTRO, scan); }
function ask(q, lead, scan) {
  const n = N[q];
  if (ctx.lastAsk === q) {
    if (ctx.misses >= 1) return toDefault(scan, 'לא הצלחתי להשלים את הפרט החסר, ולכן הפנייה מופנית לערוץ הכללי של היחידה:');
    ctx.misses = (ctx.misses || 0) + 1;
  }
  ctx.lastAsk = q;
  pending = q;
  say(`${lead ? `<p>${lead}</p>` : ''}<p><b>${n.q}</b></p>${n.help || ''}`, { scan, win: ctx.intent, replies: n.options.map((o, i) => ({ label: o.label, a: { t: 'q', q, i } })) });
}
function askStart(lead, scan) {
  pending = 'start';
  say(`<p>${lead}</p>`, { scan, replies: N.start.options.map((o, i) => ({ label: o.label, a: { t: 'start', i } })) });
}
function whoTo() { if (ctx.bank == null) return null; const n = BANKS[ctx.bank].n; return /^[a-z]/i.test(n) ? 'ל־' + n : 'ל' + n; }
function introFor(node) {
  const b = ctx.bank != null ? BANKS[ctx.bank].n : null;
  switch (node) {
    case 'r_urgent': return 'לפי מה שתואר, ייתכן שזו תלונה דחופה. הסיווג הסופי הוא של היחידה. זה הערוץ:';
    case 'r_court': return 'הבנתי שהעניין נדון בהליך משפטי.';
    case 'r_to_omb': return `הבנתי שמדובר בתלונה${b ? ` על ${b}` : ''}, ועדיין לא הוגשה תלונה לנציבות התאגיד. זה הערוץ:`;
    case 'r_appeal': return `הבנתי שהתקבלה תשובה מהנציבות${b ? ` של ${b}` : ''}, ושהיא אינה מספקת. זה הערוץ:`;
    case 'r_noans': return `הבנתי שהתלונה${whoTo() ? ' ' + whoTo() : ''} לא נענתה יותר מ־45 ימים. זה הערוץ:`;
    case 'r_wait': return `הבנתי שהתלונה${whoTo() ? ' ' + whoTo() : ''} הוגשה ${ctx.days != null ? `לפני כ־${ctx.days} ימים` : 'לאחרונה'}, ועוד לא עברו 45 ימים.`;
    case 'r_general': return 'זו נראית כמו שאלה כללית, לא תלונה. זה הערוץ:';
    case 'r_reg': return 'זו נראית כמו שאלה פרשנית של גורם מקצועי. זה הערוץ:';
    default: return `זה נשמע כמו פנייה בנושא ${PICK[ctx.intent] || N[node].dest}. זה הערוץ:`;
  }
}

function routeComplaint(sc) {
  ctx.intent = 'complaint';
  const b = ctx.bank != null ? ` על ${BANKS[ctx.bank].n}` : '';
  if (ctx.urgent === true) return slip('r_urgent', introFor('r_urgent'), sc);
  if (ctx.urgent == null && (ctx.urgentCount >= 2 || (ctx.urgentCount >= 1 && ctx.fl.urgentWord))) return slip('r_urgent', introFor('r_urgent'), sc);
  if (ctx.urgent == null && (ctx.urgentCount >= 1 || ctx.fl.urgentWord)) return ask('q_urgent', `הבנתי שמדובר בתלונה${b}, ויש בטקסט סימן לדחיפות.`, sc);
  if (ctx.fl.court) return slip('r_court', introFor('r_court'), sc);
  const st = ctx.status || statusOf(ctx.fl, ctx.days);
  if (st) {
    ctx.status = st;
    const node = { none: 'r_to_omb', answered: 'r_appeal', noans: 'r_noans', wait: 'r_wait' }[st];
    return slip(node, introFor(node), sc);
  }
  const hint = (ctx.fl.stFiled || ctx.fl.stNoAns) ? ' כדי לדעת אם כבר אפשר לפנות לפיקוח, חסר לי כמה זמן עבר.' : '';
  ask('q_omb', `הבנתי שמדובר בתלונה${b}.${hint}`, sc);
}
function dispatch(sc) {
  const k = ctx.intent;
  if (k === 'complaint') return routeComplaint(sc);
  if (k === 'question') {
    if ((ctx.scores.regulation || 0) >= 3 && !ctx.fl.customer) return ask('q_who', 'זו נראית כמו שאלה על הוראה או על האוגדן.', sc);
    return slip('r_general', introFor('r_general'), sc);
  }
  if (k === 'regulation') {
    if (ctx.fl.pro) return slip('r_reg', introFor('r_reg'), sc);
    if (ctx.fl.customer) { ctx.intent = 'question'; return slip('r_general', introFor('r_general'), sc); }
    return ask('q_who', 'זו נראית כמו שאלה על הוראה או על האוגדן.', sc);
  }
  if (k === 'other') return ask('q_other', null, sc);
  if (DIRECT[k]) return slip(DIRECT[k], introFor(DIRECT[k]), sc);
  toDefault(sc);
}

function answerPending(t, sc) {
  const n = norm(t).trim();
  if (pending === 'q_urgent') {
    let v = null;
    if (/^(כן|נכון|בהחלט|מתאים|אכן|דחוף)/.test(n) || sc.flags.urgent) v = true;
    else if (/^(לא|ממש לא|אין|לא ממש)/.test(n)) v = false;
    if (v == null) return false;
    merge(sc); ctx.urgent = v; pending = null; routeComplaint(sc); return true;
  }
  if (pending === 'q_omb') {
    merge(sc);
    let st = statusOf(ctx.fl, ctx.days);
    if (!st && /^(לא|עוד לא|עדיין לא)/.test(n)) st = 'none';
    if (!st) return false;
    ctx.status = st; pending = null; routeComplaint(sc); return true;
  }
  if (pending === 'q_who') {
    if (sc.flags.customer || /(לקוח|לקוחה|פרטי|פרטית|אזרח)/.test(n)) { ctx.intent = 'question'; slip('r_general', introFor('r_general'), sc); return true; }
    if (sc.flags.pro || /(בנק|תאגיד|יועץ|יועצת|עורך דין|עורכת דין|עו"ד|ציות|חברת|משרד)/.test(n)) { ctx.intent = 'regulation'; ctx.fl.pro = true; slip('r_reg', introFor('r_reg'), sc); return true; }
    return false;
  }
  return false;
}

function handleText(t, sc) {
  const prev = pending;
  if (prev && answerPending(t, sc)) return;
  const d = decide(sc);
  if (prev && ['q_urgent', 'q_omb', 'q_who'].includes(prev)) {
    if (d.intent && d.intent === ctx.intent) { merge(sc); return dispatch(sc); }
    if (!(d.intent && d.top >= 3)) return ask(prev, 'לא הצלחתי להבין מהתשובה.', sc);
  }
  if (d.low) { ctx = fresh(); merge(sc); return toDefault(sc); }
  ctx = fresh(); merge(sc);
  if (d.amb) {
    pending = 'pick';
    return say('<p>הטקסט מתאים לשני סוגי פנייה. מה מתאים יותר?</p>', { scan: sc, replies: [...d.amb.map(k => ({ label: PICK[k], a: { t: 'pick', k } })), { label: 'לא בטוח, לערוץ הכללי', a: { t: 'default' } }] });
  }
  ctx.intent = d.intent;
  dispatch(sc);
}

function freezeReplies() {
  msgs.forEach(m => { if (m.replies && m.used == null) { m.used = -1; rerender(m); } });
}
function sendUser(raw) {
  const text = raw.trim();
  if (!text) return;
  const masked = mask(text);
  const sc = scan(masked);
  freezeReplies();
  push({ role: 'user', text: masked, hits: sc.hits });
  later(() => {
    if (masked !== text) say('<p>הסתרתי רצף ספרות שנראה כמו מספר מזהה, חשבון או טלפון. אין צורך בפרטים כאלה כאן.</p>');
    handleText(masked, sc);
  });
}
function echo(label) { freezeReplies(); push({ role: 'user', text: label }); }

function onReply(m, i) {
  const r = m.replies[i];
  m.used = i; rerender(m);
  const a = r.a;
  if (a.t === 'send') return sendUser(a.text);
  echo(r.label);
  later(() => {
    if (a.t === 'start') {
      const k = N.start.options[a.i].k;
      ctx = fresh();
      if (k === 'complaint') { ctx.intent = 'complaint'; return ask('q_urgent'); }
      if (k === 'question') return ask('q_who');
      ctx.intent = k; return dispatch();
    }
    if (a.t === 'pick') { ctx.intent = a.k; return dispatch(); }
    if (a.t === 'default') return toDefault(null, 'זה הערוץ הכללי של היחידה לפניות הציבור:');
    if (a.t === 'q') {
      const o = N[a.q].options[a.i];
      if (a.q === 'q_urgent') { ctx.urgent = a.i === 0; return routeComplaint(); }
      if (a.q === 'q_omb') { ctx.status = o.st; return routeComplaint(); }
      if (a.q === 'q_who') { ctx.intent = o.next === 'r_reg' ? 'regulation' : 'question'; if (o.next === 'r_reg') ctx.fl.pro = true; return slip(o.next, introFor(o.next)); }
      if (a.q === 'q_other') { const k = Object.keys(DIRECT).find(x => DIRECT[x] === o.next); ctx.intent = k; return slip(o.next, introFor(o.next)); }
    }
  });
}

const EXAMPLES = [
  'לאומי חייבו אותי בעמלה כפולה, התלוננתי לנציבות לפני חודשיים ולא ענו',
  'הגשתי תלונה למקס לפני שבועיים ועוד אין תשובה',
  'עיקלו לי את קצבת ביטוח לאומי ואין לי ממה לחיות',
  'אני מקצינת הציות בבנק, יש לנו שאלה על סעיף באוגדן לגבי עמלות',
  'קיבלתי הודעה חשודה ומישהו משך כסף מהחשבון',
  'האם מותר לבנק לגבות עמלה על משיכת מזומן?'
];
function intro() {
  say('<p>שלום. אפשר לכתוב כאן במילים שלך במה מדובר, ואפנה לערוץ הנכון. אם חסר פרט חשוב, אשאל שאלה קצרה.</p><p>אפשר גם לנסות אחת מהדוגמאות:</p>', { examples: true, replies: EXAMPLES.map(t => ({ label: t, a: { t: 'send', text: t } })) });
}

/* ---------- Events ---------- */
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-reply],[data-bank],[data-copy],[data-jump],[data-goto],[data-manual],#presenter,#reset');
  if (!t) return;
  if (t.id === 'presenter') {
    presenter = !presenter;
    renderLab(); renderAll(); return;
  }
  if (t.id === 'reset') { msgs = []; log.innerHTML = ''; ctx = fresh(); pending = null; intro(); return; }
  if (t.dataset.goto) { ctx = fresh(); slip(t.dataset.goto, null); return; }
  const host = t.closest('[data-mid]');
  const m = host ? msgs.find(x => String(x.id) === host.dataset.mid) : null;
  if (t.dataset.reply != null && m && m.used == null) return onReply(m, +t.dataset.reply);
  if (t.dataset.bank != null && m) { m.bank = +t.dataset.bank; rerender(m); return; }
  if (t.dataset.copy) {
    const btn = t, text = t.dataset.copy;
    const done = () => { btn.textContent = 'הועתק'; setTimeout(() => { btn.textContent = 'העתקה'; }, 1400); };
    const fallback = () => { try { const r = document.createRange(); r.selectNodeContents(btn.parentElement.querySelector('.val')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'סומן להעתקה'; } catch (err) {} };
    try { navigator.clipboard.writeText(text).then(done, fallback); } catch (err) { fallback(); }
    return;
  }
  if (t.dataset.jump) {
    const j = t.dataset.jump;
    if (j === 'q_urgent') { ctx = fresh(); ctx.intent = 'complaint'; ask('q_urgent'); }
    else slip(j, null);
    return;
  }
  if (t.dataset.manual != null) { ctx = fresh(); askStart('בסדר. על מה הפנייה?'); }
});
log.addEventListener('input', onDate);
log.addEventListener('change', onDate);
function onDate(e) {
  if (!e.target.matches('[data-filed]')) return;
  const host = e.target.closest('[data-mid]');
  const m = msgs.find(x => String(x.id) === host.dataset.mid);
  if (!m) return;
  m.filed = e.target.value;
  const out = host.querySelector('.calc-out');
  if (out) out.innerHTML = calcOut(m.filed);
}

const form = document.getElementById('composer');
form.addEventListener('submit', (e) => { e.preventDefault(); const v = input.value; input.value = ''; grow(); sendUser(v); });
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && window.matchMedia('(pointer: fine)').matches) { e.preventDefault(); form.requestSubmit(); }
});
function grow() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 160) + 'px'; }
input.addEventListener('input', grow);

window.addEventListener('hashchange', () => {
  const on = location.hash === '#' + CONFIG.debugHash;
  if (on !== presenter) { presenter = on; renderLab(); renderAll(); }
});

renderLab();
intro();
log.firstElementChild && log.firstElementChild.classList.remove('enter');
window.scrollTo(0, 0);

