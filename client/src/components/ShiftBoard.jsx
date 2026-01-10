import React from 'react';
import { useTranslation } from 'react-i18next';

const ShiftBoard = () => {
  const { t } = useTranslation();

  const Section = ({ title, color, children, subTitle }) => (
    <div className={`flex flex-col border-2 rounded-xl overflow-hidden shadow-sm h-full`}>
      <div className={`${color} p-2 text-center text-white font-bold uppercase tracking-wider text-sm`}>
        {title}
        {subTitle && <div className="text-[10px] opacity-80">{subTitle}</div>}
      </div>
      <div className="bg-white p-3 flex-grow flex flex-col gap-2">
        {children}
      </div>
    </div>
  );

  const Item = ({ children, isNight, isBoth }) => (
    <div className={`p-2 rounded text-xs border ${
      isNight ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 
      isBoth ? 'bg-orange-50 border-orange-200 text-orange-800' :
      'bg-green-50 border-green-200 text-green-800'
    } font-medium`}>
      {children}
    </div>
  );

  return (
    <div className="bg-[#E5E7EB] p-6 rounded-3xl shadow-inner border border-gray-300">
      <div className="flex flex-col gap-8">
        
        {/* Header Legend */}
        <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 bg-green-500 rounded"></div>
              <span className="text-xs font-bold text-gray-600 tracking-tighter">MORNING SHIFT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-4 bg-cyan-500 rounded"></div>
              <span className="text-xs font-bold text-gray-600 tracking-tighter">NIGHT SHIFT</span>
            </div>
          </div>
          <div className="text-xl font-black text-sec-blue tracking-widest bg-white px-6 py-2 rounded-full shadow-sm border border-sec-blue/10">
            SHIFT ITEMS FORMS AND TEMPLETS
          </div>
          <div className="text-[10px] font-bold text-gray-400">YEARLY SHIFT SCHEDULE - 2024</div>
        </div>

        {/* Main Grid */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Section */}
            <Section title="Daily Shift Items" color="bg-yellow-400">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-gray-400 mb-1">MORNING</div>
                  <div className="grid gap-1">
                    <Item>Travel Screen Rotation</Item>
                    <Item>Air Compressor Drain Test</Item>
                    <Item>29-Intake Hypo Dosing</Item>
                    <Item>31-Check AVR Room</Item>
                    <Item>22-Boiler Sootblowers</Item>
                    <Item>Vent & Refill H2 Units 3 & 4</Item>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-gray-400 mb-1 uppercase">Night</div>
                  <div className="grid gap-1">
                    <Item isNight>Travel Screen Rotation</Item>
                    <Item isNight>31-Check AVR Room</Item>
                    <Item isNight>Vent & Refill H2 Units 1 & 2</Item>
                  </div>
                </div>
              </div>
            </Section>

            {/* Monthly Section */}
            <Section title="Monthly Shift Items" color="bg-yellow-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                  <div className="text-[9px] font-bold text-yellow-700 uppercase">1st Day of Month</div>
                  <div className="text-[10px]">23-Draining WTR From Oil Tanks & Check Fuel/Lube Ullage</div>
                </div>
                <div className="bg-blue-50 p-2 rounded border border-blue-200">
                  <div className="text-[9px] font-bold text-blue-700 uppercase">1st Saturday</div>
                  <div className="text-[10px]">16- Steam Trap Inspection & Clean Unit Trenches</div>
                </div>
                <div className="bg-orange-50 p-2 rounded border border-orange-200">
                  <div className="text-[9px] font-bold text-orange-700 uppercase">1st Monday</div>
                  <div className="text-[10px]">Start Seal Air Fan / 9- Boiler & Turbine Drain Valve</div>
                </div>
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="text-[9px] font-bold text-green-700 uppercase">1st Tuesday</div>
                  <div className="text-[10px]">20-Run SBFP U12 / 32-Issue Notification for Motor Megger</div>
                </div>
                <div className="bg-purple-50 p-2 rounded border border-purple-200">
                  <div className="text-[9px] font-bold text-purple-700 uppercase">1st Wednesday</div>
                  <div className="text-[10px]">Rotate Cooling/Service/Seal Water P/P & SCAH Cond P/P</div>
                </div>
                <div className="bg-red-50 p-2 rounded border border-red-200">
                  <div className="text-[9px] font-bold text-red-700 uppercase">1st Week</div>
                  <div className="text-[10px]">38-Fuel Area Fire Monitor Inspection</div>
                </div>
              </div>
            </Section>
          </div>

          {/* Weekly Section - Full Width */}
          <Section title="Weekly Shift Items" color="bg-pink-400">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 overflow-x-auto min-w-full">
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">SAT</div>
                <Item>(19) Walk Down Building</Item>
                <Item>(39) Vehicle Inspection</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">SUN</div>
                <Item>(18) MBFPT Governor</Item>
                <Item>Swap Air Compressors</Item>
                <Item>(4) Test MBFP DC</Item>
                <Item isNight>(3) EHC Accumulators</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">MON</div>
                <Item>(01) EHC Pumps Test</Item>
                <Item>(17) Test MT AC Lub Oil</Item>
                <Item>(21) Fire Alarm Test</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">TUE</div>
                <Item>(02) EDG Black Out Test</Item>
                <Item>(02) Test Run EDG</Item>
                <Item isNight>(5) Test Sump Pits</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">WED</div>
                <Item>(27) Rotate Joky Pump</Item>
                <Item>(M) Test Run EDG</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">THU</div>
                <Item>(26) Test Fuel Oil</Item>
                <Item>(12) Check Fire Fighting</Item>
                <Item>(35) Oil Gun Inspection</Item>
                <Item isNight>(25) Liquid Detector</Item>
                <Item isNight>(13) Action Plan Review</Item>
              </div>
              <div className="flex flex-col gap-1 min-w-[100px]">
                <div className="text-[10px] font-black text-sec-blue opacity-40 border-b mb-1">FRI</div>
                <Item>(22) Soot Blowing Test</Item>
                <Item isNight>(28) Walkdown Assigned Area</Item>
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Section title="Quaterly Shift Items" color="bg-orange-400">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Item isBoth>1st Fri: 8-PIV Inspection</Item>
                <Item isBoth>2nd Fri: Hanger Inspection</Item>
                <Item isBoth>1st Week: Fire Monitor</Item>
              </div>
            </Section>
            <Section title="Operational Tests" color="bg-sec-blue">
              <div className="bg-sec-blue/10 p-4 rounded text-center font-bold text-sec-blue text-xs flex items-center justify-center">
                Hypo Acid Cleaning Report
              </div>
            </Section>
          </div>
        </div>

        {/* Bottom Status Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#92400E] p-4 rounded-2xl border-b-8 border-[#78350F] shadow-lg">
            <div className="text-white font-black text-center mb-4 tracking-widest uppercase">Start-Up</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-green-500">4- Test MBFP DC & AC</div>
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-green-500">14- Test Seal Air Fan</div>
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-green-500">Mechanical Trip Test</div>
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-green-500">20/ET & 20/AST Check</div>
            </div>
          </div>
          <div className="bg-sec-blue p-4 rounded-2xl border-b-8 border-sec-blue/80 shadow-lg">
            <div className="text-white font-black text-center mb-4 tracking-widest uppercase">Shutdown</div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-cyan-500">4- Test MBFP DC & AC</div>
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-cyan-500">14- Test Seal Air Fan</div>
              <div className="bg-white/90 p-2 rounded text-[10px] font-bold text-sec-blue border-l-4 border-cyan-500 col-span-2 text-center">Over Speed Mechanical Trip Test</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShiftBoard;
