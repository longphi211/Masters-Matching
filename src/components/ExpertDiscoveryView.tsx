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
    { id: 'Pháp lý DN', label: 'Pháp lý' },
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
    <div className="flex flex-col w-full pb-32 animate-in fade-in duration-150">
      {/* Hạn mức gói thành viên */}
      <section className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between text-[#44474e] bg-[#eff4ff] px-3.5 py-2.5 rounded-2xl border border-slate-200/60 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#006399]">token</span>
            <p className="text-xs truncate">
              Gói {membership.name}: <span className="font-bold text-[#001026]">{remainingInvites}/{membership.invitesPerMonth}</span> lượt mời khả dụng
            </p>
          </div>
          <button
            onClick={onUpgradePlan}
            className="text-[#006399] text-xs font-bold shrink-0 hover:underline pl-2"
            type="button"
          >
            Nâng cấp
          </button>
        </div>
      </section>

      {/* Tìm kiếm & Bộ lọc nhanh với khoảng cách thoáng */}
      <section className="px-4 pt-1 flex flex-col gap-2.5">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#74777f]">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-10 bg-white rounded-xl text-sm text-[#0b1c30] placeholder:text-[#74777f] border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-[#006399]/20 transition-all shadow-xs"
            placeholder="Tìm theo tên, CFO, Thuế, Pháp lý..."
            type="search"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Scrollable Filter Chips với padding lớn */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterChips.map((chip) => {
            const isActive = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#001026] text-white shadow-xs'
                    : 'bg-white text-[#44474e] hover:text-[#0b1c30] border border-slate-200/70'
                }`}
                type="button"
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Thanh thông báo PRD v4.0 tinh giản 1 dòng */}
      <section className="px-4 pt-2">
        <div className="px-3.5 py-2.5 rounded-xl bg-[#eff4ff] border border-slate-200/60 flex items-center justify-between text-xs text-[#44474e]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0">verified</span>
            <span className="truncate">Hồ sơ đã kiểm duyệt độc lập (CCCD &amp; Chứng chỉ)</span>
          </div>
          <button
            onClick={onOpenPrdModal}
            className="text-[#006399] font-bold text-xs shrink-0 hover:underline pl-2"
            type="button"
          >
            Chi tiết
          </button>
        </div>
      </section>

      {/* Danh sách thẻ Chuyên gia (Gọn gàng, ít chữ, nút bấm rộng rãi) */}
      <section className="px-4 pt-3.5 flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-0.5">
          <h2 className="font-headline font-bold text-base text-[#001026]">Chuyên gia gợi ý</h2>
          <span className="text-xs text-[#74777f]">Phù hợp nhất</span>
        </div>

        {filteredExperts.map((expert) => (
          <article
            key={expert.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3 transition-all hover:border-[#006399]/40"
          >
            {/* Ảnh, Tên, Chuyên môn, Bookmark */}
            <div className="flex items-start justify-between gap-3">
              <div
                onClick={() => onSelectExpert(expert)}
                className="flex items-start gap-3 min-w-0 cursor-pointer group flex-1"
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
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006399] text-[10px] font-bold">
                      {expert.yearsExperience}+ năm KN
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#0b1c30] truncate mt-0.5">
                    {expert.headline}
                  </p>
                  <p className="text-[11px] text-[#74777f] truncate mt-0.5">
                    {expert.location} • {expert.workMode}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleBookmark(expert.id)}
                aria-label="Lưu hồ sơ"
                className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-all shrink-0 ${
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

            {/* Danh mục kiểm duyệt KYC dạng thẻ ngang ngắn gọn */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {expert.verifications.map((v) => (
                <span
                  key={v.id}
                  className="px-2.5 py-1 rounded-lg bg-[#eff4ff] text-[#005236] text-[11px] font-medium flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[13px] text-[#009f6e]">check_circle</span>
                  <span>{v.title.split('(')[0].trim()}</span>
                </span>
              ))}
            </div>

            {/* Các nút bấm to, cách nhau thoáng đãng (gap-3.5, h-12) */}
            <div className="grid grid-cols-2 gap-3.5 pt-1.5">
              <button
                onClick={() => onSelectExpert(expert)}
                className="h-12 rounded-xl bg-[#eff4ff] text-[#001026] text-xs font-bold hover:bg-[#dce9ff] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 border border-slate-200/60"
                type="button"
              >
                <span>Xem hồ sơ</span>
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button
                onClick={() => onOpenConnect(expert)}
                className="h-12 rounded-xl bg-[#001026] text-white text-xs font-bold hover:bg-[#0b2545] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">outgoing_mail</span>
                <span>Mời kết nối</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Nút nổi thêm nhu cầu với kích thước lớn */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          onClick={onGoToCreateDemand}
          className="flex items-center gap-2 pl-4 pr-5 h-13 min-h-[50px] rounded-full bg-[#006399] text-white shadow-xl hover:bg-[#004b74] active:scale-95 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          <span className="text-xs font-bold tracking-tight">Đăng nhu cầu mới</span>
        </button>
      </div>
    </div>
  );
};
