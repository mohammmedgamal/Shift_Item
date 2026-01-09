import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Home = ({ settings }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden rounded-2xl mx-4 mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-sec-blue/80 to-transparent z-10" />
        <img 
          src="/ghazlan-hero.jpg" 
          alt="Ghazlan Power Station" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-4 max-w-2xl">{t('welcome')}</h1>
          <p className="text-xl max-w-lg opacity-90">{t('hero_text')}</p>
        </div>
      </section>

      {/* Managers' Words */}
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 w-full">
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-sec-blue relative overflow-hidden">
          <Quote className="absolute -top-4 -right-4 w-24 h-24 text-sec-blue/5" />
          <h3 className="text-xl font-bold text-sec-blue mb-4">{t('manager_word')}</h3>
          <p className="text-gray-700 italic">"{settings.operations_manager_word}"</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-md border-t-4 border-sec-lightBlue relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src="/plant-manager.jpg" 
              alt="Power Plant Manager" 
              className="w-32 h-32 rounded-full object-cover border-4 border-sec-lightBlue/20"
            />
          </div>
          <div>
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-sec-lightBlue/5" />
            <h3 className="text-xl font-bold text-sec-blue mb-4">{t('plant_manager_word')}</h3>
            <p className="text-gray-700 italic">"{settings.power_plant_manager_word}"</p>
          </div>
        </div>
      </div>

      {/* Stats Overview Quick View */}
      <div className="bg-sec-gray py-12 px-4 rounded-3xl mx-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
           <h2 className="text-3xl font-bold text-sec-blue mb-8">Performance Snapshot</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
             {[
               { label: 'Weekly Tasks', value: '92%' },
               { label: 'Daily Completion', value: '98%' },
               { label: 'Group Efficiency', value: 'A+' },
               { label: 'Safety Record', value: '365 Days' }
             ].map((stat, i) => (
               <div key={i} className="bg-white p-6 rounded-xl text-center shadow-sm">
                 <div className="text-sec-lightBlue text-2xl font-bold">{stat.value}</div>
                 <div className="text-gray-500 text-sm">{stat.label}</div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

