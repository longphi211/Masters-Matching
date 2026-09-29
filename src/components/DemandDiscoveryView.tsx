import React, { useState } from 'react';
import { EnterpriseDemand, MembershipPlan } from '../types';

interface DemandDiscoveryViewProps {
  demands: EnterpriseDemand[];
  membership: MembershipPlan;
  onOpenProposal: (demand: EnterpriseDemand) => void;
  onViewDemandDetails: (demand: EnterpriseDemand) => void;
  onSwitchRole: () => void;
  onUpgradePlan: () => void;
}

export const DemandDiscoveryView: React.FC<DemandDiscoveryViewProps> = ({
  demands,
  membership,
  onOpenProposal,
  onViewDemandDetails,
  onSwitchRole,
  onUpgradePlan,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tất cả bài toán', count: demands.length },
    { id: 'Kế toán & Thuế', label: 'Kế toán & Thuế' },
    { id: 'CFO & Tài chính', label: 'CFO / Tài chính' },
    { id: 'Pháp lý DN', label: 'Pháp lý' },
    { id: 'M&A / Vốn', label: 'M&A / Vốn' },
  ];

  const filteredDemands = demands.filter((demand) => {
    const matchesSearch =
      demand.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demand.enterpriseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      demand.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || demand.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const remainingInvites = membership.invitesPerMonth - membership.invitesUsed;
  const progressPercent = Math.round((remainingInvites / membership.invitesPerMonth) * 100);

  return (
    <div className="flex flex-col w-full pb-32 animate-in fade-in duration-150">
      {/* Banner Hạn mức Thành viên Pro */}
      <div className="px-4 pt-3">
        <div className="bg-gradient-to-r from-[#001026] via-[#0b2545] to-[#006399] p-4 rounded-2xl text-white shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-[#67bafd] text-[#004972] text-[10px] font-bold uppercase">
                Pro Advisor
              </span>
              <span className="text-xs font-bold text-white">Gói Chuyên gia Pro</span>
            </div>
            <button
              onClick={onUpgradePlan}
              className="text-[#cde5ff] hover:text-white text-xs font-bold underline flex items-center gap-0.5"
              type="button"
            >
              <span>Nâng cấp</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div>
              <span className="text-xs text-white/80">Lượt gửi đề xuất tháng này:</span>
              <span className="font-headline text-lg font-bold text-white block mt-0.5">
                Còn {remainingInvites} <span className="text-xs font-normal text-white/70">/ {membership.invitesPerMonth} lượt</span>
              </span>
            </div>
            <div className="w-28 flex flex-col gap-1 items-end">
              <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-0.5">
                <div
                  className="bg-[#4edea3] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-white/70">Tái lập sau {membership.resetDays} ngày</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ô tìm kiếm & Lọc bài toán */}
      <div className="px-4 pt-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-white px-3.5 py-2.5 rounded-xl border border-slate-200/80 shadow-xs focus-within:ring-2 focus-within:ring-[#006399]/20 transition-all">
            <span className="material-symbols-outlined text-[#74777f] text-[20px] mr-2">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] placeholder:text-[#74777f] text-sm outline-none"
              placeholder="Tìm theo lĩnh vực (Thuế, CFO, M&A...)"
              type="text"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <button
            onClick={() => setSelectedCategory('all')}
            title="Lọc chuyên sâu"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white text-[#001026] hover:bg-slate-50 active:scale-95 shadow-xs border border-slate-200/80 transition-all shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Category Pills với khoảng cách thoải mái */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#001026] text-white shadow-xs'
                    : 'bg-white text-[#44474e] hover:text-[#0b1c30] border border-slate-200/70'
                }`}
                type="button"
              >
                {cat.label} {cat.count ? `(${cat.count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Thông báo ngắn gọn */}
      <div className="px-4 pt-2">
        <div className="px-3.5 py-2.5 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-slate-200/60 text-xs text-[#44474e]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0">handshake</span>
            <span className="truncate">Kết nối trực tiếp, hai bên tự thỏa thuận ngoài nền tảng</span>
          </div>
          <span className="text-[10px] text-[#006399] font-bold shrink-0 pl-1">0% hoa hồng</span>
        </div>
      </div>

      {/* Danh sách bài toán */}
      <div className="px-4 pt-3.5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-base text-[#001026]">Bài toán mới đăng</span>
            <span className="px-2 py-0.5 rounded-full bg-[#d3e4fe] text-[#001026] text-[10px] font-bold">
              {filteredDemands.length} tin
            </span>
          </div>
          <span className="text-[#74777f] text-xs">Mới nhất</span>
        </div>

        {filteredDemands.map((demand) => (
          <article
            key={demand.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3 transition-all hover:border-[#006399]/40"
          >
            {/* Tiêu đề & Tên doanh nghiệp */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#006399] text-[18px]">
                  {demand.isAnonymous ? 'visibility_off' : 'storefront'}
                </span>
                <span className="text-xs font-bold text-[#001026] truncate">{demand.enterpriseName}</span>
                {demand.isVerifiedEnterprise && !demand.isAnonymous && (
                  <span className="material-symbols-outlined text-[15px] text-[#009f6e]">verified</span>
                )}
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006399] text-[10px] font-bold shrink-0">
                {demand.category}
              </span>
            </div>

            {/* Nội dung bài toán */}
            <div className="flex flex-col gap-1">
              <h3 className="font-headline font-bold text-sm text-[#001026] leading-snug">
                {demand.title}
              </h3>
              <p className="text-xs text-[#44474e] line-clamp-2 leading-relaxed">
                {demand.description}
              </p>
            </div>

            {/* Ngân sách & Hình thức */}
            <div className="bg-[#eff4ff] px-3 py-2 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[#74777f] text-[11px] block">Ngân sách:</span>
                <span className="font-bold text-[#001026]">{demand.budgetRange}</span>
              </div>
              <div className="text-right">
                <span className="text-[#74777f] text-[11px] block">Hình thức:</span>
                <span className="font-medium text-[#006399]">{demand.workMode}</span>
              </div>
            </div>

            {/* Nút bấm lớn, khoảng cách thoáng đãng (gap-3.5, h-12) */}
            <div className="grid grid-cols-2 gap-3.5 pt-1">
              <button
                onClick={() => onViewDemandDetails(demand)}
                className="h-12 rounded-xl bg-[#eff4ff] text-[#001026] text-xs font-bold hover:bg-[#dce9ff] active:scale-[0.98] transition-all flex items-center justify-center border border-slate-200/60"
                type="button"
              >
                Xem chi tiết
              </button>
              <button
                onClick={() => onOpenProposal(demand)}
                className="h-12 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-[0.98] transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[17px]">send</span>
                <span>Gửi đề xuất</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
