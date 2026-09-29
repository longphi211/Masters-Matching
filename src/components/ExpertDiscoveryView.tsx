import React, { useState } from 'react';
import { ExpertProfile, MembershipPlan } from '../types';

interface ExpertDiscoveryViewProps {
  experts: ExpertProfile[];
  membership: MembershipPlan;
  onSelectExpert: (expert: ExpertProfile) => void;
  onOpenConnect: (expert: ExpertProfile) => void;
  onSwitchRole: () => void;
  onUpgradePlan: () => void;
  onOpenPrdModal: () => void;
  onGoToCreateDemand: () => void;
  onToggleBookmark: (expertId: string) => void;
}

export const ExpertDiscoveryView: React.FC<ExpertDiscoveryViewProps> = ({
  experts,
  membership,
  onSelectExpert,
  onOpenConnect,
  onSwitchRole,
  onUpgradePlan,
  onOpenPrdModal,
  onGoToCreateDemand,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterChips = [
    { id: 'all', label: 'Tất cả (48)' },
    { id: 'CFO & Tài chính', label: 'CFO & Tài chính' },
    { id: 'Kế toán & Thuế', label: 'Kế toán & Thuế' },
    { id: 'Pháp lý DN', label: 'Pháp lý DN' },
    { id: 'Chuyển đổi số', label: 'Chuyển đổi số' },
  ];

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.categories.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter =
      selectedFilter === 'all' || expert.categories.some((c) => c.includes(selectedFilter));

    return matchesSearch && matchesFilter;
  });

  const remainingInvites = membership.invitesPerMonth - membership.invitesUsed;

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-150">
      {/* Top Utility Context & Subscription Quota */}
      <section className="px-4 pt-3 pb-2">
        <div className="bg-[#eff4ff] rounded-2xl p-3 shadow-sm border border-slate-200/50 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#4edea3] shrink-0"></span>
              <span className="text-xs text-[#44474e] truncate">Góc nhìn:</span>
              <span className="text-sm font-headline font-bold text-[#001026] truncate">Doanh nghiệp</span>
            </div>
            <button
              onClick={onSwitchRole}
              className="flex items-center gap-1 text-[#006399] text-xs font-semibold hover:opacity-80 active:scale-95 transition-all"
              type="button"
            >
              <span>Đổi vai trò</span>
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-1 text-[#44474e] bg-white/90 px-3 py-2 rounded-xl border border-slate-200/40">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[16px] text-[#006399]">token</span>
              <p className="text-xs truncate">
                {membership.name}: <span className="font-bold text-[#001026]">{remainingInvites}/{membership.invitesPerMonth}</span> lời mời còn lại tháng này
              </p>
            </div>
            <button
              onClick={onUpgradePlan}
              className="text-[#006399] text-xs font-bold shrink-0 hover:underline"
              type="button"
            >
              Nâng cấp
            </button>
          </div>
        </div>
      </section>

      {/* Search & Category Filters */}
      <section className="px-4 pt-1 flex flex-col gap-2.5">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#74777f]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 bg-[#eff4ff] rounded-xl text-sm text-[#0b1c30] placeholder:text-[#74777f] border border-slate-200/50 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006399]/20 transition-all shadow-sm"
            placeholder="Tìm kiếm chuyên gia CFO, Thuế, AI, Pháp lý..."
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Scrollable Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterChips.map((chip) => {
            const isActive = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#001026] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#44474e] hover:text-[#0b1c30] border border-slate-200/40'
                }`}
                type="button"
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* PRD v4.0 Trust & Transparency Notice */}
      <section className="px-4 pt-3">
        <div className="p-3.5 rounded-2xl bg-[#dce9ff]/60 border border-[#006399]/15 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#006399] text-[20px] shrink-0 mt-0.5">policy</span>
          <div className="flex flex-col gap-1 min-w-0">
            <p className="text-xs text-[#44474e] leading-relaxed">
              Nền tảng minh bạch mức xác minh hồ sơ; không bảo đảm kết quả tư vấn hay giữ tiền thù lao. Doanh nghiệp và
              chuyên gia tự thẩm định và ký kết dịch vụ.
            </p>
            <button
              onClick={onOpenPrdModal}
              className="text-xs text-[#006399] font-bold hover:underline inline-flex items-center gap-0.5 self-start pt-0.5"
              type="button"
            >
              <span>Xem quy chuẩn xác thực PRD v4.0</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Expert Cards Feed */}
      <section className="px-4 pt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-headline font-bold text-base text-[#001026]">Chuyên gia nổi bật</h2>
          <span className="text-xs text-[#44474e]">Sắp xếp: Phù hợp nhất</span>
        </div>

        {filteredExperts.map((expert) => (
          <article
            key={expert.id}
            className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(11,37,69,0.06)] border border-slate-200/60 flex flex-col gap-3 transition-all hover:border-[#006399]/30"
          >
            {/* Header: Photo, Name, Title, Bookmark */}
            <div className="flex items-start justify-between gap-3">
              <div
                onClick={() => onSelectExpert(expert)}
                className="flex items-start gap-3 min-w-0 cursor-pointer group"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-slate-100 ring-2 ring-slate-100">
                  <img
                    referrerPolicy="no-referrer"
                    alt={expert.name}
                    src={expert.avatarUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#4edea3] ring-2 ring-white"></span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-headline font-bold text-sm text-[#001026] group-hover:text-[#006399] transition-colors truncate">
                      {expert.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006399] text-[11px] font-bold">
                      {expert.yearsExperience}+ năm KN
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0b1c30] truncate mt-0.5">
                    {expert.headline}
                  </p>
                  <p className="text-[11px] text-[#44474e] truncate">
                    {expert.philosophy.slice(0, 50)}...
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleBookmark(expert.id)}
                aria-label="Lưu hồ sơ"
                className={`p-1.5 rounded-full hover:bg-slate-100 active:scale-95 transition-all shrink-0 ${
                  expert.isBookmarked ? 'text-[#006399]' : 'text-slate-400 hover:text-slate-600'
                }`}
                type="button"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: expert.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  bookmark
                </span>
              </button>
            </div>

            {/* Scope Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#44474e] text-[11px] font-medium">
                <span className="material-symbols-outlined text-[13px] text-[#006399]">public</span>
                <span>{expert.location}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#44474e] text-[11px] font-medium">
                <span className="material-symbols-outlined text-[13px] text-[#006399]">schedule</span>
                <span>Tư vấn 1:1 hoặc theo dự án</span>
              </span>
            </div>

            {/* PRD v4.0 Trust & Verification Checklist (Explicit, transparent, granular) */}
            <div className="bg-[#eff4ff]/80 rounded-xl p-3 flex flex-col gap-1.5 border border-slate-200/40">
              <span className="text-[10px] font-bold text-[#005236] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified_user</span>
                Mức độ kiểm duyệt hồ sơ
              </span>
              <div className="flex flex-col gap-1 pt-0.5">
                {expert.verifications.map((v) => (
                  <div key={v.id} className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-[15px] text-[#009f6e] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="text-xs text-[#0b1c30]">
                      {v.title} {v.expiryDate ? `(Hiệu lực ${v.expiryDate})` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onSelectExpert(expert)}
                className="w-full h-10 rounded-xl bg-[#dce9ff] text-[#001026] text-xs font-bold hover:bg-[#d3e4fe] transition-colors flex items-center justify-center gap-1.5"
                type="button"
              >
                <span>Xem hồ sơ</span>
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button
                onClick={() => onOpenConnect(expert)}
                className="w-full h-10 rounded-xl bg-[#001026] text-white text-xs font-bold hover:bg-[#0b2545] transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">outgoing_mail</span>
                <span>Mời kết nối</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Floating Quick Action for Posting Needs */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          onClick={onGoToCreateDemand}
          className="flex items-center gap-2 pl-3.5 pr-4 h-12 rounded-full bg-[#006399] text-white shadow-xl hover:bg-[#004b74] active:scale-95 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span className="text-xs font-bold tracking-tight">Đăng nhu cầu mới</span>
        </button>
      </div>
    </div>
  );
};
