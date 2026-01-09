import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const navItems = [
    { id: 'home', label: t('home') },
    { id: 'dashboard', label: t('dashboard') },
    { id: 'analytics', label: t('analytics') },
    { id: 'admin', label: t('admin') },
  ];

  return (
    <nav className="bg-sec-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 bg-white p-2 rounded">
               <div className="text-sec-blue font-bold text-xl">SEC</div>
            </div>
            <div className="hidden md:block">
              <div className={`flex items-baseline space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id ? 'bg-sec-lightBlue text-white' : 'hover:bg-sec-lightBlue/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 hover:bg-sec-lightBlue px-3 py-2 rounded-md transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>{i18n.language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            <div className="bg-sec-lightBlue/30 p-2 rounded-full cursor-pointer hover:bg-sec-lightBlue transition-colors">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

