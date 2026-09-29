import React, { useState } from 'react';
import { ActivePerspective } from '../types';

interface HeaderProps {
  perspective: ActivePerspective;
  onPerspectiveChange: (role: ActivePerspective) => void;
  activeTab: string;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  perspective,
  onPerspectiveChange,
  activeTab,
  onOpenAccount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getSubtitle = () => {
    switch (activeTab) {
      case 'kham-pha':
        return 'Khám Phá';
      case 'loi-moi':
        return 'Lời Mời';
      case 'nhu-cau':
        return 'Nhu Cầu';
      case 'tai-khoan':
        return 'Tài Khoản';
      case 'operator':
        return 'Operator Console';
      default:
        return 'Khám Phá';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#0b2545]/5 shadow-[0_1px_8px_rgba(11,37,69,0.04)]">
      <div className="max-w-2xl mx-auto h-20 px-4 flex items-center justify-between gap-2">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="ExpertMatch B2B Logo"
            className="h-8 w-auto object-contain shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgIJzDP0Y7_-NYc-ryo4MBBtFcoQZZ3mAqHg_qoxaQ3tUD1UMiQaND4zcidS1q6CRXWO1CODdrllOxzUjw9EkUYxTybRE8JQQmHnlwTAxj6P63GPHGWsVFIFTfWROOLCJAq-eFURVpSw42ug447In6ZO_1qEOec6kGUBvv_RaamZSl96yj0oWPlKDtj4p-OlEm_W3FdTbyDxeQmJObJl6Oa9r6dOUFu4UREpvuYz0NYGJVspQBv2yB"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline font-bold text-lg text-[#001026] tracking-tight truncate">
              Connex B2B
            </span>
            <span className="text-[11px] font-semibold text-[#44474e] truncate">
              {getSubtitle()}
            </span>
          </div>
        </div>

        {/* Action Zone: Role Switcher & Notifications & Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Role Pill Switcher */}
          <div className="flex items-center bg-[#dce9ff] p-0.5 rounded-full">
            <button
              onClick={() => onPerspectiveChange('enterprise')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                perspective === 'enterprise'
                  ? 'bg-[#0b2545] text-white shadow-[0_1px_3px_rgba(11,37,69,0.12)]'
                  : 'text-[#44474e] hover:text-[#0b1c30]'
              }`}
              type="button"
            >
              Doanh nghiệp
            </button>
            <button
              onClick={() => onPerspectiveChange('expert')}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                perspective === 'expert'
                  ? 'bg-[#0b2545] text-white shadow-[0_1px_3px_rgba(11,37,69,0.12)]'
                  : 'text-[#44474e] hover:text-[#0b1c30]'
              }`}
              type="button"
            >
              Chuyên gia
            </button>
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Thông báo"
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#eff4ff] active:scale-95 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f8f9ff]"></span>
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-headline font-bold text-sm text-[#001026]">Thông báo mới</span>
                  <span className="text-[11px] font-semibold text-[#006399]">Đánh dấu đã đọc</span>
                </div>
                <div className="py-2 space-y-2">
                  <div className="p-2 rounded-xl bg-[#eff4ff] flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0 mt-0.5">contact_phone</span>
                    <div>
                      <p className="font-semibold text-[#001026]">Đối tác đã đồng ý mở liên hệ</p>
                      <p className="text-[#44474e] mt-0.5">Công ty CP Công nghệ Logistic Vina đã cấp quyền xem SĐT & Email.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">30 phút trước</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-[#009f6e] text-[18px] shrink-0 mt-0.5">verified</span>
                    <div>
                      <p className="font-semibold text-[#001026]">Hồ sơ chứng chỉ CPA đã duyệt</p>
                      <p className="text-[#44474e] mt-0.5">Operator đã xác nhận chứng chỉ #1209/BTC có hiệu lực đến 12/2027.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">Hôm qua</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <button
            onClick={onOpenAccount}
            title="Quản lý tài khoản kép & cài đặt"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#006399]/40 transition-all active:scale-95"
            type="button"
          >
            <img
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c4c6cf]/40"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOuZdUm1g7aZ1M8yX51jtPTvJlJNLtCpCU7QQjukO7K3r_L8XwoVT2AOd0KUUyNakyMPJyr0fyI4t1KGpSW18Ggb0n7nSyO2b0V6LEFSlgNx-napfoi1v5lgOj9tyMgyh2278f0eAw-aESZ2o4Jm31DYa5ZzeTdIRCVXhn1wzNl_-BRL3UssCPQd16x8kDsM-gf-PGlHsuKjUEY-_wbfxcR013kiOrFGJekTHydKCHN0w0IE6uEu5z"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
