import React from 'react';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts';
import { ExpertProfile } from '../types';

interface ExpertProfileModalProps {
  expert: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: (expert: ExpertProfile) => void;
  onToggleBookmark: (expertId: string) => void;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomSparklineTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#001026] text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg border border-white/10">
        <span>Tháng {label}: </span>
        <span className="font-bold text-[#4edea3]">{payload[0].value} dự án</span>
      </div>
    );
  }
  return null;
};

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({
  expert,
  isOpen,
  onClose,
  onOpenConnect,
  onToggleBookmark,
}) => {
  if (!isOpen || !expert) return null;

  const sparklineData = expert.projectHistory && expert.projectHistory.length > 0
    ? expert.projectHistory
    : [
        { month: 'T4', count: 3 },
        { month: 'T5', count: 4 },
        { month: 'T6', count: 6 },
        { month: 'T7', count: 4 },
        { month: 'T8', count: 5 },
        { month: 'T9', count: 6 },
      ];

  const recentTotal = sparklineData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-[#f8f9ff] min-h-screen relative flex flex-col shadow-2xl">
        {/* Header với nút bấm lớn, dễ chạm */}
        <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-b border-slate-200/60 px-4 h-16 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Quay lại"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#eff4ff] active:scale-90 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
            <h1 className="font-headline font-bold text-base text-[#001026] truncate">
              Hồ Sơ Chuyên Gia
            </h1>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng"
            className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-slate-500 hover:text-slate-800 active:scale-90 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </header>

        {/* Nội dung hồ sơ tối ưu di động */}
        <div className="flex flex-col w-full pb-36 px-4 pt-3.5 gap-3.5">
          {/* Thông tin đại diện & Thống kê */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3.5">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  referrerPolicy="no-referrer"
                  alt={expert.name}
                  className="w-18 h-18 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm"
                  src={expert.avatarUrl}
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#4edea3] flex items-center justify-center ring-2 ring-white">
                  <span className="material-symbols-outlined text-[#002b1b] text-[13px] font-bold">check</span>
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-[#eff4ff] text-[#006399] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {expert.title}
                  </span>
                  <span className="text-[#44474e] text-xs">• {expert.yearsExperience}+ năm KN</span>
                </div>
                <h2 className="font-headline text-lg font-bold text-[#001026] truncate">{expert.name}</h2>
                <p className="text-xs text-[#44474e] line-clamp-1 mt-0.5">{expert.headline}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-[#44474e]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#006399]">location_on</span>
                    {expert.location}
                  </span>
                  <span>•</span>
                  <span className="text-[#009f6e] font-semibold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    &lt; 2h
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Chỉ số nhanh */}
            <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-xl p-2.5 text-center border border-slate-200/40">
              <div>
                <span className="block font-headline text-base font-bold text-[#001026]">{expert.consultingHours}+</span>
                <span className="block text-[11px] text-[#44474e]">Giờ tư vấn</span>
              </div>
              <div>
                <span className="block font-headline text-base font-bold text-[#001026]">{expert.b2bRating}/5</span>
                <span className="block text-[11px] text-[#44474e]">Đánh giá B2B</span>
              </div>
              <div>
                <span className="block font-headline text-base font-bold text-[#001026]">{expert.completedProjects}</span>
                <span className="block text-[11px] text-[#44474e]">Dự án xong</span>
              </div>
            </div>

            {/* Mini Sparkline Chart: Tần suất dự án 6 tháng */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#001026]">
                  <span className="material-symbols-outlined text-[16px] text-[#006399]">trending_up</span>
                  <span>Số dự án 6 tháng gần đây</span>
                </div>
                <span className="text-[11px] text-[#009f6e] font-bold bg-[#6ffbbe]/25 px-2 py-0.5 rounded-full">
                  +{recentTotal} dự án
                </span>
              </div>

              <div className="w-full h-14 bg-[#f8f9ff] rounded-xl p-1 border border-slate-200/50">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sparklineData} margin={{ top: 2, right: 6, left: 6, bottom: 0 }}>
                    <defs>
                      <linearGradient id="expertSparklineGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#006399" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#006399" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomSparklineTooltip />} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 9, fill: '#74777f' }}
                      interval={0}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="#006399"
                      strokeWidth={2}
                      dot={{ r: 2.5, fill: '#006399' }}
                      activeDot={{ r: 4.5, fill: '#001026', stroke: '#4edea3', strokeWidth: 2 }}
                      fillOpacity={1}
                      fill="url(#expertSparklineGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Minh bạch kiểm duyệt KYC (Gọn gàng, không nhiều chữ) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#006399]">verified_user</span>
                <h3 className="font-headline text-sm font-bold text-[#001026]">Đã kiểm duyệt độc lập</h3>
              </div>
              <span className="text-[10px] text-[#009f6e] font-bold bg-[#6ffbbe]/25 px-2 py-0.5 rounded-full">
                PRD v4.0
              </span>
            </div>

            {/* Dạng thẻ ngắn gọn, không nhồi nhét chữ */}
            <div className="flex flex-col gap-2 pt-0.5">
              {expert.verifications.map((v) => (
                <div
                  key={v.id}
                  className="bg-[#eff4ff] rounded-xl px-3 py-2 border border-slate-200/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-[#009f6e] shrink-0">
                      check_circle
                    </span>
                    <span className="font-bold text-[#001026] truncate">{v.title}</span>
                  </div>
                  <span className="text-[10px] text-[#44474e] bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0 font-medium">
                    {v.expiryDate ? `Đến ${v.expiryDate}` : 'Đã duyệt'}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#74777f] flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[14px] text-[#006399]">shield</span>
              <span>Bảo mật danh tính &amp; tài liệu theo NĐ 356/2025/NĐ-CP.</span>
            </p>
          </div>

          {/* Dịch vụ & Năng lực tư vấn (Súc tích) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2.5">
            <h3 className="font-headline text-sm font-bold text-[#001026] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">work</span>
              <span>Dịch vụ &amp; Năng lực chính</span>
            </h3>
            <div className="flex flex-col gap-2">
              {expert.services.map((service, idx) => (
                <div key={idx} className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/40">
                  <h4 className="text-xs font-bold text-[#001026]">{service.title}</h4>
                  <p className="text-[11px] text-[#44474e] mt-0.5 leading-snug">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hình thức & Cam kết bảo mật (2 ô vuông gọn) */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/60 flex flex-col justify-between shadow-xs">
              <span className="text-[11px] text-[#74777f]">Hình thức làm việc</span>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#006399]">desktop_windows</span>
                <span className="font-bold text-[#001026]">{expert.workMode}</span>
              </div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/60 flex flex-col justify-between shadow-xs">
              <span className="text-[11px] text-[#74777f]">Cam kết bảo mật (NDA)</span>
              <div className="mt-1.5 flex items-center gap-1.5 text-[#009f6e] font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Ký trước khi trao đổi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thanh tác vụ cố định dưới cùng: Nút to, khoảng cách thoáng (gap-4) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-5 pt-3.5 pb-6 border-t border-slate-200/70 shadow-[0_-4px_20px_rgba(11,37,69,0.08)]">
          <div className="max-w-lg mx-auto flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggleBookmark(expert.id)}
                aria-label="Lưu hồ sơ quan tâm"
                className={`h-13 w-13 min-w-[52px] min-h-[52px] rounded-2xl flex items-center justify-center transition-all shrink-0 border active:scale-95 ${
                  expert.isBookmarked
                    ? 'bg-[#eff4ff] text-[#006399] border-[#006399]/40 shadow-xs'
                    : 'bg-[#f8f9ff] text-[#001026] border-slate-200 hover:bg-[#eff4ff]'
                }`}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: expert.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenConnect(expert);
                }}
                className="h-13 min-h-[52px] flex-1 rounded-2xl bg-[#001026] text-white font-headline text-sm font-bold hover:bg-[#0b2545] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                <span>Mời kết nối</span>
              </button>
            </div>
            <p className="text-[10px] text-[#74777f] text-center">
              Thỏa thuận trực tiếp ngoài nền tảng • 0% hoa hồng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
