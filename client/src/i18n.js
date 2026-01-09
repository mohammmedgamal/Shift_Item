import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "title": "Ghazlan Shift Duties",
          "home": "Home",
          "dashboard": "Dashboard",
          "admin": "Admin",
          "analytics": "Analytics",
          "welcome": "Welcome to Ghazlan Power Station",
          "hero_text": "Excellence in Power Generation for the Eastern Sector",
          "morning": "Morning",
          "night": "Night",
          "daily": "Daily",
          "weekly": "Weekly",
          "monthly": "Monthly",
          "status": "Status",
          "done": "Done",
          "partly_done": "Partly Done",
          "skipped": "Skipped",
          "not_due": "Not Due",
          "feedback": "Feedback",
          "submit": "Submit",
          "manager_word": "Word from the Operations Manager",
          "plant_manager_word": "Word from the Power Plant Manager",
          "shift_group": "Shift Group",
          "shift_type": "Shift Type",
        }
      },
      ar: {
        translation: {
          "title": "مهام ورديات غزلان",
          "home": "الرئيسية",
          "dashboard": "لوحة التحكم",
          "admin": "الإدارة",
          "analytics": "الإحصائيات",
          "welcome": "مرحباً بكم في محطة كهرباء غزلان",
          "hero_text": "التميز في توليد الطاقة للقطاع الشرقي",
          "morning": "صباحي",
          "night": "مسائي",
          "daily": "يومي",
          "weekly": "أسبوعي",
          "monthly": "شهري",
          "status": "الحالة",
          "done": "تم",
          "partly_done": "تم جزئياً",
          "skipped": "تم التخطي",
          "not_due": "غير مستحق",
          "feedback": "ملاحظات",
          "submit": "إرسال",
          "manager_word": "كلمة مدير العمليات",
          "plant_manager_word": "كلمة مدير المحطة",
          "shift_group": "مجموعة الوردية",
          "shift_type": "نوع الوردية",
        }
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

