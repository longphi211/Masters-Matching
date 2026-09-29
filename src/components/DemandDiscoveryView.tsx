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
    { id: 'CFO & Tài chính', label: 'Fractional CFO' },
    { id: 'Pháp lý DN', label: 'Pháp lý doanh nghiệp' },
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
    <div className="flex flex-col w-full pb-24 animate-in fade-in duration-150">
      {/* Role Context Bar & Status Switcher */}
      <div className="px-4 pt-2 pb-3 flex items-center justify-between bg-[#eff4ff] border-b border-[#0b2545]/5 shadow-[0_1px_4px_rgba(11,37,69,0.03)]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#001026] flex items-center justify-center text-white shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#44474e]">Góc nhìn:</span>
              <span className="font-headline font-bold text-sm text-[#001026]">Chuyên gia</span>
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
            </div>
            <span className="text-xs text-[#44474e] truncate">Sẵn sàng nhận bài toán cố vấn mới</span>
          </div>
        </div>
        <button
          onClick={onSwitchRole}
          className="px-3 py-1.5 rounded-full bg-[#d3e4fe] text-[#001026] text-xs font-semibold flex items-center gap-1 active:scale-95 transition-transform"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          <span>Đổi vai trò</span>
        </button>
      </div>

      {/* Membership Quota Status Banner */}
      <div className="px-4 pt-3">
        <div className="bg-gradient-to-r from-[#001026] via-[#0b2545] to-[#006399] p-3.5 rounded-2xl text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#67bafd]/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#67bafd] text-[#004972] text-[10px] font-bold tracking-wider uppercase">
                  Pro Advisor
                </span>
                <span className="text-xs font-semibold text-white">Gói Chuyên gia Pro</span>
              </div>
              <button
                onClick={onUpgradePlan}
                className="text-[#cde5ff] hover:text-white text-xs font-medium underline flex items-center gap-0.5"
                type="button"
              >
                <span>Nâng cấp</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex flex-col">
                <span className="text-xs text-white/80">Lượt chủ động giới thiệu tháng này</span>
                <span className="font-headline text-lg font-bold text-white">
                  Còn {remainingInvites}{' '}
                  <span className="text-xs font-normal text-white/70">/ {membership.invitesPerMonth} lượt</span>
                </span>
              </div>
              <div className="w-28 flex flex-col gap-1 items-end">
                <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-[#4edea3] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="text-[11px] text-white/70">Tái lập sau {membership.resetDays} ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Quick Filter Pills */}
      <div className="px-4 pt-3 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center bg-[#eff4ff] px-3.5 py-2.5 rounded-xl border border-slate-200/50 shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-[#006399]/20 transition-all">
            <span className="material-symbols-outlined text-[#74777f] text-[20px] mr-2">search</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[#0b1c30] placeholder:text-[#74777f] text-sm outline-none"
              placeholder="Tìm kiếm bài toán, lĩnh vực (Thuế, CFO, Pháp lý...)"
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
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-[#eff4ff] text-[#001026] hover:bg-[#e5eeff] active:scale-95 shadow-sm border border-slate-200/50 transition-all shrink-0 relative"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
            {selectedCategory !== 'all' && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#006399]"></span>
            )}
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#001026] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#44474e] hover:text-[#0b1c30] border border-slate-200/40'
                }`}
                type="button"
              >
                {cat.label} {cat.count ? `(${cat.count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transparent Marketplace Disclaimer Card (PRD Boundaries) */}
      <div className="px-4 pt-3">
        <div className="p-3 bg-[#dce9ff]/60 rounded-xl flex items-start gap-2.5 border border-[#006399]/10">
          <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0 mt-0.5">info</span>
          <p className="text-xs text-[#44474e] leading-relaxed">
            Nền tảng giúp kết nối bài toán thực; không bảo đảm ký hợp đồng hoặc thu phí dự án. Hai bên tự thỏa thuận thù
            lao và điều khoản trực tiếp.
          </p>
        </div>
      </div>

      {/* Demands Feed */}
      <div className="px-4 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-sm text-[#001026]">Nhu cầu mới công bố</span>
            <span className="px-2 py-0.5 rounded-full bg-[#d3e4fe] text-[#001026] text-[10px] font-bold">
              {filteredDemands.length} tin
            </span>
          </div>
          <div className="text-[#006399] text-xs font-medium flex items-center gap-0.5">
            <span>Gần đây nhất</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </div>
        </div>

        {/* Render demand cards */}
        {filteredDemands.map((demand) => (
          <article
            key={demand.id}
            className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(11,37,69,0.06)] border border-slate-200/60 flex flex-col gap-3 transition-all hover:border-[#006399]/30"
          >
            {/* Enterprise Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006399] font-bold shrink-0 border border-slate-200/40">
                  <span className="material-symbols-outlined text-[20px]">
                    {demand.isAnonymous ? 'visibility_off' : 'storefront'}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#0b1c30] truncate">{demand.enterpriseName}</span>
                    {demand.isVerifiedEnterprise && !demand.isAnonymous && (
                      <span className="material-symbols-outlined text-[15px] text-[#009f6e] shrink-0" title="Đã xác minh DN">
                        verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#009f6e] font-medium">
                    {demand.isAnonymous
                      ? `${demand.industry} (${demand.companySize || 'Bảo mật'})`
                      : `Đã xác minh DN • MST ${demand.taxId || '010...'}`}
                  </span>
                </div>
              </div>

              {demand.isAnonymous ? (
                <span className="px-2.5 py-1 rounded-full bg-[#cde5ff] text-[#001d32] text-[11px] font-semibold shrink-0">
                  {demand.postedAgo}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-[#002b1b] text-[#009f6e] text-[11px] font-semibold shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
                  <span>Nhận đề xuất ({demand.proposalCount}/{demand.maxProposals})</span>
                </span>
              )}
            </div>

            {/* Confidential notice if anonymous */}
            {demand.isAnonymous && (
              <div className="px-3 py-1.5 bg-[#eff4ff] rounded-xl flex items-center gap-2 text-xs text-[#44474e]">
                <span className="material-symbols-outlined text-slate-500 text-[16px]">lock</span>
                <span>Pháp nhân chi tiết sẽ mở sau khi DN chấp thuận đề xuất kết nối.</span>
              </div>
            )}

            {/* Title & Brief */}
            <div className="flex flex-col gap-1">
              <h3 className="font-headline font-bold text-base text-[#001026] leading-snug">
                {demand.title}
              </h3>
              <p className="text-xs text-[#44474e] line-clamp-3 leading-relaxed">
                {demand.description}
              </p>
            </div>

            {/* Image Preview with Fallback */}
            {demand.imageUrl && (
              <div className="w-full h-32 rounded-xl overflow-hidden relative shadow-inner bg-slate-100">
                <img
                  referrerPolicy="no-referrer"
                  alt={demand.imageAlt || demand.title}
                  src={demand.imageUrl}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-[#213145]/85 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#4edea3]">
                    {demand.requirementsBadge ? 'verified' : 'schedule'}
                  </span>
                  <span>{demand.requirementsBadge || demand.timeline}</span>
                </div>
              </div>
            )}

            {/* Metadata Chips */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <div className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[11px] font-medium text-[#44474e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006399]">account_balance</span>
                <span>{demand.category}</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[11px] font-medium text-[#44474e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006399]">laptop_mac</span>
                <span>{demand.workMode}</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[11px] font-medium text-[#44474e] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006399]">location_on</span>
                <span>{demand.location}</span>
              </div>
            </div>

            {/* Budget Box */}
            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#44474e]">Ngân sách dự kiến</span>
                <span className="font-headline font-bold text-sm text-[#001026]">
                  {demand.budgetRange}{' '}
                  <span className="text-xs font-normal text-[#44474e]">{demand.budgetType}</span>
                </span>
              </div>
              <span className="text-xs text-[#006399] font-medium">Thỏa thuận trực tiếp</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onViewDemandDetails(demand)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#dce9ff] text-[#001026] text-xs font-bold hover:bg-[#d3e4fe] active:scale-98 transition-all"
                type="button"
              >
                Xem bài toán
              </button>
              <button
                onClick={() => onOpenProposal(demand)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-98 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Gửi đề xuất</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
