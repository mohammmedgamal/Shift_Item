import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, AlertCircle, HelpCircle } from 'lucide-react';

const DutyBoard = ({ duties, logs, onStatusChange, currentShift }) => {
  const { t, i18n } = useTranslation();

  const getStatus = (dutyId) => {
    const log = logs.find(l => l.duty_id === dutyId);
    return log ? log.status : 'Pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Partly Done': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Skipped': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-300" />;
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 border-green-300';
      case 'Partly Done': return 'bg-yellow-100 border-yellow-300';
      case 'Skipped': return 'bg-red-100 border-red-300';
      default: return 'bg-white border-gray-200';
    }
  };

  const DutyItem = ({ titleEn, titleAr, dutyId }) => {
    const status = getStatus(dutyId);
    const title = i18n.language === 'ar' ? titleAr : titleEn;
    
    return (
      <div 
        onClick={() => {
          const nextStatus = status === 'Done' ? 'Skipped' : status === 'Skipped' ? 'Partly Done' : 'Done';
          onStatusChange(dutyId, nextStatus);
        }}
        className={`p-2 rounded-lg border text-[10px] leading-tight cursor-pointer transition-all hover:shadow-sm flex items-center justify-between gap-1 mb-1 ${getStatusBg(status)}`}
      >
        <span className="font-medium text-gray-800">{title}</span>
        {getStatusIcon(status)}
      </div>
    );
  };

  const SectionHeader = ({ title, color }) => (
    <div className={`${color} p-2 rounded-t-xl text-center font-bold text-sm border-b shadow-sm mb-3`}>
      {title}
    </div>
  );

  const ColumnHeader = ({ title, color }) => (
    <div className={`${color} p-1 rounded-lg text-center font-bold text-[11px] mb-2 border shadow-sm`}>
      {title}
    </div>
  );

  return (
    <div className="bg-[#E5E7EB] p-6 rounded-3xl shadow-inner border-4 border-white overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Main Title */}
        <div className="bg-sec-blue text-white py-3 px-8 rounded-2xl mx-auto w-fit shadow-lg mb-8 border-2 border-white">
          <h1 className="text-2xl font-bold tracking-widest uppercase">Shift Items Forms and Templets</h1>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* DAILY COLUMN */}
          <div className="col-span-2">
            <SectionHeader title="DAILY SHIFT ITEMS" color="bg-[#FEF08A]" />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <ColumnHeader title="MORNING SHIFT" color="bg-[#BEF264]" />
                {duties.filter(d => d.frequency === 'daily' && d.shift_type === 'Morning').map(d => (
                  <DutyItem key={d.id} titleEn={d.title_en} titleAr={d.title_ar} dutyId={d.id} />
                ))}
              </div>
              <div>
                <ColumnHeader title="NIGHT SHIFT" color="bg-[#22D3EE]" />
                {duties.filter(d => d.frequency === 'daily' && d.shift_type === 'Night').map(d => (
                  <DutyItem key={d.id} titleEn={d.title_en} titleAr={d.title_ar} dutyId={d.id} />
                ))}
              </div>
            </div>

            {/* QUARTERLY (Nested under Daily Column Area in image) */}
            <div className="mt-8">
              <SectionHeader title="QUATERLY SHIFT ITEMS" color="bg-[#FACC15]" />
              <div className="space-y-4">
                <div>
                  <ColumnHeader title="1st Friday" color="bg-[#F97316]" />
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-center border">8-PIV Inspection</div>
                </div>
                <div>
                  <ColumnHeader title="2nd Friday" color="bg-[#F97316]" />
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-center border">Hanger Inspection</div>
                </div>
                <div>
                  <ColumnHeader title="1st Week" color="bg-[#F97316]" />
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-center border">38- Fuel Area Fire Monitor Inspection</div>
                </div>
              </div>
            </div>
          </div>

          {/* WEEKLY COLUMN */}
          <div className="col-span-7">
            <SectionHeader title="WEEKLY SHIFT ITEMS" color="bg-[#F472B6]" />
            <div className="grid grid-cols-7 gap-1">
              {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                <div key={day}>
                  <ColumnHeader title={day} color="bg-[#D1D5DB]" />
                  <div className="space-y-1">
                    {duties.filter(d => d.frequency === 'weekly' && d.day_of_week === day).map(d => (
                      <DutyItem key={d.id} titleEn={d.title_en} titleAr={d.title_ar} dutyId={d.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* OPERATIONAL CONDITION TESTS (Bottom center) */}
            <div className="mt-8 max-w-lg mx-auto">
              <SectionHeader title="OPERATIONAL CONDITION TESTS" color="bg-[#F97316]" />
              <div className="bg-[#1E40AF] text-[#FDE047] p-4 rounded-xl text-center font-bold text-xl border-4 border-white shadow-xl italic cursor-pointer hover:scale-105 transition-transform">
                Hypo Acid Claning Report
              </div>
            </div>
          </div>

          {/* MONTHLY COLUMN */}
          <div className="col-span-3">
            <SectionHeader title="MONTHLY SHIFT ITEMS" color="bg-[#FEF08A]" />
            <div className="space-y-4">
              {[
                { label: '1st Day Of Month', items: duties.filter(d => d.frequency === 'monthly' && d.day_of_month === 1) },
                { label: '1st Saturday', items: duties.filter(d => d.frequency === 'weekly' && d.day_of_week === 'Saturday' && d.title_en.includes('19')) },
                { label: '1st Monday', items: duties.filter(d => d.frequency === 'monthly' && d.day_of_month === 1 && d.title_en.includes('Seal Air')) },
                { label: '1st Tuesday', items: duties.filter(d => d.frequency === 'monthly' && d.day_of_month === 2) },
                { label: 'First Wednesday', items: duties.filter(d => d.frequency === 'monthly' && d.day_of_month === 3) },
                { label: '1st Week', items: [{ title_en: '38-Fuel Area Fire Monitor Inspection', title_ar: '38- فحص مراقب حريق منطقة الوقود' }] },
              ].map(sec => (
                <div key={sec.label}>
                  <ColumnHeader title={sec.label} color="bg-[#FEF08A]" />
                  <div className="space-y-1">
                    {sec.items.map((d, i) => (
                      <DutyItem key={d.id || i} titleEn={d.title_en} titleAr={d.title_ar} dutyId={d.id} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: START-UP / SHUTDOWN */}
        <div className="grid grid-cols-2 gap-8 mt-12">
          <div className="bg-[#92400E] p-4 rounded-2xl border-4 border-white shadow-lg">
            <h2 className="text-white text-center font-bold text-xl mb-4 tracking-widest">START-UP</h2>
            <div className="space-y-2">
              {['4- Test MBFP DC and AC lub oil pumps (Actual)', '14- Test Seal air booster fan (Actual)', 'Perform Mechanical Trip Test and Log the Values', 'Test turbine trip solenoid valves 20/ET and 20/AST'].map((item, i) => (
                <div key={i} className="bg-[#D1D5DB] p-2 rounded-lg text-[11px] font-bold text-center border-2 border-gray-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#92400E] p-4 rounded-2xl border-4 border-white shadow-lg">
            <h2 className="text-white text-center font-bold text-xl mb-4 tracking-widest">SHUTDOWN</h2>
            <div className="space-y-2">
              {['4- Test MBFP DC and AC lub oil pumps (Actual)', '14- Test Seal air booster fan (Actual)', 'Over Speed Mechanical Trip Test in case of Major T&I'].map((item, i) => (
                <div key={i} className="bg-[#D1D5DB] p-2 rounded-lg text-[11px] font-bold text-center border-2 border-gray-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DutyBoard;
