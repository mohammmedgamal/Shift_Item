import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, User, LogOut } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, user, onLogout, canAccess }) => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-sec-blue text-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-sec-lightBlue/50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex-shrink-0 bg-white p-1 rounded">
               <img src="/sec-logo.png" alt="SEC Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden md:block">
              <div className={`flex items-baseline space-x-4 ${isRtl ? 'space-x-reverse' : ''}`}>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id ? 'bg-sec-orange text-white shadow-md' : 'hover:bg-sec-orange/50'
                    } ${!canAccess(item.id) && item.id !== 'home' ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              className="flex items-center gap-2 hover:bg-sec-orange px-3 py-2 rounded-md transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline">{i18n.language === 'en' ? 'العربية' : 'English'}</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden lg:flex flex-col items-end">
                  <span className="text-xs opacity-70">Logged in as</span>
                  <span className="text-sm font-bold">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="bg-red-500/20 hover:bg-red-500 p-2 rounded-full transition-colors flex items-center gap-2 px-3"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleNavClick('dashboard')}
                className="bg-sec-orange/30 p-2 rounded-full cursor-pointer hover:bg-sec-orange transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-sec-blue border-t border-sec-lightBlue/30 px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-lg font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-sec-orange text-white shadow-lg' 
                    : 'text-white/80 hover:bg-white/10'
                } ${!canAccess(item.id) && item.id !== 'home' ? 'opacity-50 cursor-not-allowed' : ''} ${isRtl ? 'text-right' : ''}`}
              >
                {item.label}
              </button>
            ))}
            {user && (
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between px-4">
                <div className="flex flex-col">
                  <span className="text-xs opacity-60">User</span>
                  <span className="font-bold">{user.name}</span>
                </div>
                <button 
                  onClick={onLogout}
                  className="text-red-400 font-bold flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

