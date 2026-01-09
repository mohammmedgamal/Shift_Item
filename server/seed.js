const { db, initDb } = require('./db');

const duties = [
  // Daily Duties - Morning
  { title_en: 'Travel Screen Rotation', title_ar: 'تدوير شاشات السفر', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Intake Area Equipment Hypo Dosing', title_ar: 'جرعات الهايبو لمعدات منطقة المأخذ', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Air Compressor Drain Test', title_ar: 'اختبار تصريف ضاغط الهواء', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Vent & Refill H2 for Units 3 And 4', title_ar: 'تنفيس وإعادة تعبئة الهيدروجين للوحدات 3 و 4', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Check AVR Room Temperature for all Units', title_ar: 'فحص درجة حرارة غرفة AVR لجميع الوحدات', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Check CEMS Room Condition (Temperature and AC)', title_ar: 'فحص حالة غرفة CEMS (الحرارة والتكييف)', frequency: 'daily', shift_type: 'Morning' },
  { title_en: 'Operation of Units Boiler Sootblowers (FO firing only)', title_ar: 'تشغيل نافخ السخام لغلاية الوحدات (عند حرق الوقود فقط)', frequency: 'daily', shift_type: 'Morning' },
  
  // Daily Duties - Night
  { title_en: 'Travel Screen Rotation', title_ar: 'تدوير شاشات السفر', frequency: 'daily', shift_type: 'Night' },
  { title_en: 'Vent & Refill H2 for Units 1 And 2', title_ar: 'تنفيس وإعادة تعبئة الهيدروجين للوحدات 1 و 2', frequency: 'daily', shift_type: 'Night' },
  { title_en: 'Check AVR Room Temperature for all Units', title_ar: 'فحص درجة حرارة غرفة AVR لجميع الوحدات', frequency: 'daily', shift_type: 'Night' },

  // Weekly Duties
  { title_en: 'Walk Down for Hypo Generation Building & Intake Area', title_ar: 'جولة تفتيشية لمبنى توليد الهايبو ومنطقة المأخذ', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Saturday' },
  { title_en: 'Clean and inspection operation Vehicle', title_ar: 'تنظيف وفحص مركبة العمليات', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Saturday' },
  { title_en: 'MBFPT Governor Oil Accumulators Check', title_ar: 'فحص مجمعات زيت حاكم MBFPT', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Sunday' },
  { title_en: 'Swap between Air Compressors for U12 Side', title_ar: 'التبديل بين ضواغط الهواء لجهة الوحدات 1 و 2', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Sunday' },
  { title_en: 'Start CEMS (Blower and Analyzer) for 3 hours', title_ar: 'تشغيل CEMS (النافخ والمحلل) لمدة 3 ساعات', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Sunday' },
  { title_en: 'Test MBFP DC, lub oil pump & Rotate pumps', title_ar: 'اختبار مضخات زيت التزييت و MBFP DC وتدوير المضخات', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Sunday' },
  { title_en: 'EHC Accumulators Check', title_ar: 'فحص مجمعات EHC', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Sunday' },
  { title_en: 'EHC Pumps Test & Change Over', title_ar: 'اختبار مضخات EHC والتبديل بينها', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Monday' },
  { title_en: 'Test MT AC lub oil, seal oil backup pumps', title_ar: 'اختبار مضخات زيت تزييت MT AC وزيت الختم الاحتياطية', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Monday' },
  { title_en: 'Fire alarm test', title_ar: 'اختبار إنذار الحريق', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Monday' },
  { title_en: 'Test Run EDG / Black Out Test', title_ar: 'اختبار تشغيل مولد الديزل للطوارئ / اختبار التعتيم', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Tuesday' },
  { title_en: 'Test run EDG along with transfer pump', title_ar: 'اختبار تشغيل مولد الديزل للطوارئ مع مضخة النقل', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Tuesday' },
  { title_en: 'Test all sump pits high level switch U3/4', title_ar: 'اختبار مفاتيح المستوى العالي لجميع حفر التجميع للوحدات 3 و 4', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Tuesday' },
  { title_en: 'Test all sump pits high level switch U12', title_ar: 'اختبار مفاتيح المستوى العالي لجميع حفر التجميع للوحدات 1 و 2', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Tuesday' },
  { title_en: 'Rotate Joky pump & Electric/diesel fire pump test', title_ar: 'تدوير مضخة الجوكي واختبار مضخة الحريق الكهربائية/الديزل', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Wednesday' },
  { title_en: 'Test fuel oil system on recirculation', title_ar: 'اختبار نظام زيت الوقود في وضع إعادة التدوير', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Thursday' },
  { title_en: 'Check Fire Fighting System for Burner Deck', title_ar: 'فحص نظام مكافحة الحريق لسطح الحارق', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Thursday' },
  { title_en: 'Oil Gun-Carriage Inspection Sheet', title_ar: 'ورقة فحص عربة مدفع الزيت', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Thursday' },
  { title_en: 'Check water liquid detector', title_ar: 'فحص كاشف سائل الماء', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Thursday' },
  { title_en: 'Review of Emergency Action Plan', title_ar: 'مراجعة خطة عمل الطوارئ', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Thursday' },
  { title_en: 'Perform soot blowing testing', title_ar: 'إجراء اختبار نفخ السخام', frequency: 'weekly', shift_type: 'Morning', day_of_week: 'Friday' },
  { title_en: 'Walkdown of Assigned Area', title_ar: 'جولة تفتيشية في المنطقة المخصصة', frequency: 'weekly', shift_type: 'Night', day_of_week: 'Friday' },

  // Monthly Duties
  { title_en: 'Draining Water from Oil Tanks', title_ar: 'تصريف المياه من خزانات الزيت', frequency: 'monthly', shift_type: 'Morning', day_of_month: 1 },
  { title_en: 'Start Seal Air Booster Fan Start to Flush', title_ar: 'بدء تشغيل مروحة تعزيز هواء الختم للتنظيف', frequency: 'monthly', shift_type: 'Morning', day_of_month: 1 },
  { title_en: 'Boiler & Turbine Drain Valve Passing Check', title_ar: 'فحص صمام تصريف الغلاية والتوربين', frequency: 'monthly', shift_type: 'Night', day_of_month: 1 },
  { title_en: 'Run SBFP U12 for test', title_ar: 'تشغيل SBFP للوحدات 1 و 2 للاختبار', frequency: 'monthly', shift_type: 'Morning', day_of_month: 2 },
  { title_en: 'Issue Notification for Motor Megger', title_ar: 'إصدار إشعار لميجر المحرك', frequency: 'monthly', shift_type: 'Morning', day_of_month: 2 },
  { title_en: 'Rotate cooling water P/P', title_ar: 'تدوير مضخة مياه التبريد', frequency: 'monthly', shift_type: 'Morning', day_of_month: 3 },
  { title_en: 'Rotate Service Water P/P', title_ar: 'تدوير مضخة مياه الخدمة', frequency: 'monthly', shift_type: 'Morning', day_of_month: 3 },
  { title_en: 'Rotate Seal WTR P/P', title_ar: 'تدوير مضخة مياه الختم', frequency: 'monthly', shift_type: 'Morning', day_of_month: 3 },
  { title_en: 'Turbine V/V Test', title_ar: 'اختبار صمام التوربين', frequency: 'monthly', shift_type: 'Morning', day_of_month: 3 },
  { title_en: 'Rotate Gland Steam Exhauster', title_ar: 'تدوير ساحب بخار الغدة', frequency: 'monthly', shift_type: 'Morning', day_of_month: 3 },
  { title_en: 'PIV Inspection', title_ar: 'فحص PIV', frequency: 'monthly', shift_type: 'Morning', day_of_month: 5 },
  { title_en: 'Steam trap inspection', title_ar: 'فحص مصيدة البخار', frequency: 'monthly', shift_type: 'Morning', day_of_month: 6 },
  { title_en: 'Check and Clean unit Trenches', title_ar: 'فحص وتنظيف خنادق الوحدات', frequency: 'monthly', shift_type: 'Morning', day_of_month: 6 },
  { title_en: 'Run SBFP U34 for test', title_ar: 'تشغيل SBFP للوحدات 3 و 4 للاختبار', frequency: 'monthly', shift_type: 'Morning', day_of_month: 9 },
];

async function seed() {
  await initDb();
  
  const insertDuty = db.prepare(`INSERT INTO duties (
    title_en, title_ar, frequency, shift_type, day_of_week, day_of_month
  ) VALUES (?, ?, ?, ?, ?, ?)`);

  duties.forEach(duty => {
    insertDuty.run(
      duty.title_en,
      duty.title_ar,
      duty.frequency,
      duty.shift_type,
      duty.day_of_week || null,
      duty.day_of_month || null
    );
  });

  insertDuty.finalize();

  // Initial settings
  db.run(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, ['operations_manager_word', 'Commitment to safety and efficiency is our top priority.']);
  db.run(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, ['power_plant_manager_word', 'Ghazlan Power Station continues to lead in power generation excellence.']);
  db.run(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, ['rotation_reference_date', '2024-01-01']);
  db.run(`INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)`, ['rotation_reference_shift', 'A']);

  // Users Seeding
  const insertUser = db.prepare(`INSERT OR IGNORE INTO users (name, username, password, role) VALUES (?, ?, ?, ?)`);
  
  // The special admin requested by user
  insertUser.run('Admin Manager', 'admin', '23', 'admin');

  const operatorUsers = [
    { name: 'Yazeed Hazzazy', username: '86758', password: '123' },
    { name: 'ABDULMOHSIN MOHAMMED', username: '86995', password: '123' },
    { name: 'DHAFER MOHAMMED', username: '89034', password: '123' },
    { name: 'AYED MOHAMMED', username: '96800', password: '123' },
    { name: 'RASHED HAMOUD', username: '96871', password: '123' },
    { name: 'KHALID MOHAMMED', username: '96952', password: '123' },
    { name: 'TURKI YOUSEF', username: '81116', password: '123' },
    { name: 'ABDULRAHMAN HAMAD', username: '81132', password: '123' },
    { name: 'JASEM ALI', username: '89024', password: '123' },
    { name: 'NASSER ALAWI', username: '89065', password: '123' },
    { name: 'FALEH SALEM', username: '100941', password: '123' }
  ];

  operatorUsers.forEach(u => {
    insertUser.run(u.name, u.username, u.password, 'operator');
  });

  insertUser.finalize();

  console.log('Seeding completed.');
}

seed();

