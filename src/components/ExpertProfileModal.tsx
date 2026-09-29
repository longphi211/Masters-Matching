import React from 'react';
import { ExpertProfile } from '../types';

interface ExpertProfileModalProps {
  expert: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenConnect: (expert: ExpertProfile) => void;
  onToggleBookmark: (expertId: string) => void;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({
  expert,
  isOpen,
  onClose,
  onOpenConnect,
  onToggleBookmark,
}) => {
  if (!isOpen || !expert) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-[#f8f9ff] min-h-screen relative flex flex-col shadow-2xl">
        {/* Sticky Header */}
        <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#0b2545]/5 px-4 h-16 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Quay lại"
              className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 transition-colors"
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
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex flex-col w-full pb-36 px-4 pt-3 gap-4">
          {/* Top Profile Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <img
                  referrerPolicy="no-referrer"
                  alt={expert.name}
                  className="w-20 h-20 rounded-2xl object-cover shadow-sm ring-2 ring-slate-100"
                  src={expert.avatarUrl}
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#6ffbbe] flex items-center justify-center shadow-xs ring-2 ring-white">
                  <span className="material-symbols-outlined text-[#002b1b] text-[14px]">check</span>
                </span>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="bg-[#eff4ff] text-[#001026] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {expert.title}
                  </span>
                  <span className="text-[#44474e] text-xs font-medium">• {expert.yearsExperience}+ năm kinh nghiệm</span>
                </div>
                <h2 className="font-headline text-lg font-bold text-[#001026] truncate">{expert.name}</h2>
                <p className="text-xs text-[#44474e] line-clamp-2 mt-0.5">{expert.headline}</p>
                <div className="flex items-center gap-2 mt-2 text-[#44474e] text-xs">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#006399]">location_on</span>
                    {expert.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#009f6e] font-bold">
                    <span className="material-symbols-outlined text-[15px] text-[#4edea3]">bolt</span>
                    Phản hồi {expert.responseSpeed}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-2 mt-4 bg-[#eff4ff] rounded-xl p-3 text-center border border-slate-200/40">
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
                <span className="block text-[11px] text-[#44474e]">Dự án hoàn tất</span>
              </div>
            </div>

            {/* Consulting Philosophy */}
            <div className="mt-3.5 bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="flex items-center gap-1.5 mb-1 text-[#006399]">
                <span className="material-symbols-outlined text-[18px]">format_quote</span>
                <span className="text-xs font-bold text-[#001026]">Tôn chỉ tư vấn</span>
              </div>
              <p className="text-xs text-[#0b1c30] leading-relaxed">
                {expert.philosophy}
              </p>
            </div>
          </div>

          {/* STANDOUT HIGHLIGHT: BẢNG MINH BẠCH XÁC MINH (PRD v4.0 Section 4) */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#001026]">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-[#001026]">Minh bạch xác minh</h3>
                  <p className="text-[11px] text-[#44474e]">Quy chuẩn kiểm chứng độc lập PRD v4.0</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 bg-[#6ffbbe] text-[#002b1b] text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[13px]">check_circle</span>
                Đã kiểm duyệt
              </span>
            </div>

            {/* Granular Verification Cards */}
            <div className="space-y-2.5">
              {expert.verifications.map((v) => (
                <div
                  key={v.id}
                  className="bg-[#eff4ff] rounded-xl p-3 transition-colors border border-slate-200/50"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#cde5ff] text-[#001d32] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[15px]">
                        {v.type === 'email_phone'
                          ? 'mark_email_read'
                          : v.type === 'identity_cccd'
                          ? 'badge'
                          : 'workspace_premium'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="text-xs font-bold text-[#001026]">{v.title}</span>
                        <span className="text-[10px] text-[#44474e] bg-white px-2 py-0.5 rounded font-medium border border-slate-200/50">
                          {v.expiryDate ? `Hạn soát: ${v.expiryDate}` : `Duyệt: ${v.verifiedDate}`}
                        </span>
                      </div>
                      <p className="text-xs text-[#0b1c30] mt-1">
                        <strong className="font-bold text-[#001026]">Ý nghĩa:</strong> {v.meaning}
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5 text-[#44474e] bg-white/80 px-2 py-1 rounded border border-slate-200/40">
                        <span className="material-symbols-outlined text-[14px] text-slate-400">info</span>
                        <span className="text-[11px] italic">Lưu ý: {v.disclaimer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy Law Guarantee Box (PRD v4.0 NĐ 356/2025/NĐ-CP) */}
            <div className="bg-[#e5eeff] rounded-xl p-3 flex items-start gap-2.5 border border-[#006399]/20">
              <span className="material-symbols-outlined text-[#001026] text-[20px] shrink-0 mt-0.5">shield</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#001026]">Bảo vệ quyền riêng tư &amp; dữ liệu doanh nghiệp</p>
                <p className="text-[11px] text-[#0b1c30] mt-0.5 leading-relaxed">
                  Nền tảng tuân thủ quy chuẩn dữ liệu <strong>NĐ 356/2025/NĐ-CP</strong>: Không bao giờ công khai ảnh chụp CCCD, số giấy tờ hoặc tài liệu KYC gốc lên môi trường công cộng.
                </p>
              </div>
            </div>
          </div>

          {/* Dịch vụ & Năng lực công khai */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#001026]">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <h3 className="font-headline text-sm font-bold text-[#001026]">Dịch vụ &amp; Năng lực công khai</h3>
            </div>
            <div className="space-y-2">
              {expert.services.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#eff4ff] rounded-xl border border-slate-200/40">
                  <span className="w-2 h-2 rounded-full bg-[#006399] mt-1.5 shrink-0"></span>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#001026]">{service.title}</h4>
                    <p className="text-xs text-[#44474e] mt-0.5 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hình thức làm việc & Cam kết */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3">
            <h3 className="font-headline text-sm font-bold text-[#001026]">Hình thức làm việc &amp; Phạm vi</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#eff4ff] p-3 rounded-xl flex flex-col justify-between border border-slate-200/40">
                <span className="text-[11px] text-[#44474e]">Hình thức</span>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#006399]">desktop_windows</span>
                  <span className="text-xs font-bold text-[#001026]">{expert.workMode}</span>
                </div>
              </div>
              <div className="bg-[#eff4ff] p-3 rounded-xl flex flex-col justify-between border border-slate-200/40">
                <span className="text-[11px] text-[#44474e]">Địa bàn phục vụ</span>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#006399]">near_me</span>
                  <span className="text-xs font-bold text-[#001026]">{expert.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#009f6e]">history_edu</span>
                <div>
                  <p className="text-xs font-bold text-[#001026]">Cam kết bảo mật thông tin (NDA)</p>
                  <p className="text-[11px] text-[#44474e]">Ký kết thỏa thuận bảo mật trước khi tiếp cận dữ liệu.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chỉ số tin cậy doanh nghiệp */}
          <div className="bg-[#dce9ff] rounded-2xl p-4 flex items-center justify-between border border-[#006399]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#001026] flex items-center justify-center text-white font-bold font-headline text-sm shadow-xs">
                {expert.trustScore}
              </div>
              <div>
                <p className="text-xs font-bold text-[#001026]">Chỉ số tin cậy doanh nghiệp</p>
                <p className="text-xs text-[#44474e]">{expert.trustNote}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#006399] text-[24px]">verified</span>
          </div>
        </div>

        {/* FIXED BOTTOM ACTION CTA (Image 5) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 border-t border-slate-200/60 shadow-[0_-4px_16px_rgba(11,37,69,0.08)]">
          <div className="max-w-xl mx-auto flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(expert.id)}
                aria-label="Lưu hồ sơ quan tâm"
                className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all shrink-0 border ${
                  expert.isBookmarked
                    ? 'bg-[#eff4ff] text-[#006399] border-[#006399]/30'
                    : 'bg-[#eff4ff] text-[#001026] border-slate-200 hover:bg-[#dce9ff]'
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
                className="h-12 flex-1 rounded-xl bg-[#001026] text-white font-headline text-xs font-bold hover:bg-[#0b2545] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">send</span>
                <span>Mời kết nối</span>
              </button>
            </div>
            <p className="text-[11px] text-[#44474e] text-center">
              Hai bên tự thỏa thuận phạm vi công việc và thanh toán bên ngoài nền tảng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
