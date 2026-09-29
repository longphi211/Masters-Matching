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

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_8px_rgba(11,37,69,0.04)]">
      <div className="max-w-2xl mx-auto flex flex-col">
        {/* Tier 1: Brand & User Controls */}
        <div className="h-14 px-4 flex items-center justify-between">
          {/* Logo & Full Brand Name - Never truncated */}
          <div className="flex items-center gap-2.5">
            <img
              alt="Connex B2B Logo"
              className="h-7 w-auto object-contain shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgIJzDP0Y7_-NYc-ryo4MBBtFcoQZZ3mAqHg_qoxaQ3tUD1UMiQaND4zcidS1q6CRXWO1CODdrllOxzUjw9EkUYxTybRE8JQQmHnlwTAxj6P63GPHGWsVFIFTfWROOLCJAq-eFURVpSw42ug447In6ZO_1qEOec6kGUBvv_RaamZSl96yj0oWPlKDtj4p-OlEm_W3FdTbyDxeQmJObJl6Oa9r6dOUFu4UREpvuYz0NYGJVspQBv2yB"
            />
            <div className="flex flex-col">
              <span className="font-headline font-bold text-base text-[#001026] tracking-tight whitespace-nowrap">
                Connex B2B
              </span>
            </div>
          </div>

          {/* Action Zone: Notifications & Avatar */}
          <div className="flex items-center gap-2">
            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Thông báo"
                className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#eff4ff] active:scale-90 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl p-3 shadow-xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-headline font-bold text-xs text-[#001026]">Thông báo</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[11px] font-semibold text-[#006399]"
                    >
                      Đã đọc
                    </button>
                  </div>
                  <div className="py-2 space-y-2">
                    <div className="p-2.5 rounded-xl bg-[#eff4ff] flex items-start gap-2 text-xs">
                      <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0 mt-0.5">
                        contact_phone
                      </span>
                      <div>
                        <p className="font-bold text-[#001026]">Đối tác mở liên hệ</p>
                        <p className="text-[#44474e] text-[11px] mt-0.5">
                          Vina Logistics đã duyệt xem SĐT &amp; Email.
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">30 phút trước</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 flex items-start gap-2 text-xs">
                      <span className="material-symbols-outlined text-[#009f6e] text-[18px] shrink-0 mt-0.5">
                        verified
                      </span>
                      <div>
                        <p className="font-bold text-[#001026]">Chứng chỉ CPA đã duyệt</p>
                        <p className="text-[#44474e] text-[11px] mt-0.5">
                          Xác thực chứng chỉ CPA #1209/BTC thành công.
                        </p>
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
              title="Quản lý tài khoản"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:ring-2 hover:ring-[#006399]/40 transition-all active:scale-90"
              type="button"
            >
              <img
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOuZdUm1g7aZ1M8yX51jtPTvJlJNLtCpCU7QQjukO7K3r_L8XwoVT2AOd0KUUyNakyMPJyr0fyI4t1KGpSW18Ggb0n7nSyO2b0V6LEFSlgNx-napfoi1v5lgOj9tyMgyh2278f0eAw-aESZ2o4Jm31DYa5ZzeTdIRCVXhn1wzNl_-BRL3UssCPQd16x8kDsM-gf-PGlHsuKjUEY-_wbfxcR013kiOrFGJekTHydKCHN0w0IE6uEu5z"
              />
            </button>
          </div>
        </div>

        {/* Tier 2: Segmented Perspective Switcher - Full width, comfortable touch targets */}
        <div className="px-4 pb-2.5">
          {activeTab === 'operator' ? (
            <div className="h-10 px-3 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#001026]">
                <span className="material-symbols-outlined text-[18px] text-[#006399]">
                  admin_panel_settings
                </span>
                <span>Operator Work Queue</span>
              </div>
              <button
                onClick={() => onPerspectiveChange('enterprise')}
                className="text-[11px] font-bold text-[#006399] hover:underline"
              >
                Về ứng dụng
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#dce9ff] text-center gap-1 shadow-2xs">
              <button
                onClick={() => onPerspectiveChange('enterprise')}
                className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  perspective === 'enterprise'
                    ? 'bg-[#001026] text-white shadow-xs'
                    : 'text-[#44474e] hover:text-[#001026]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">apartment</span>
                <span>Doanh nghiệp</span>
              </button>
              <button
                onClick={() => onPerspectiveChange('expert')}
                className={`h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
                  perspective === 'expert'
                    ? 'bg-[#001026] text-white shadow-xs'
                    : 'text-[#44474e] hover:text-[#001026]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">person_check</span>
                <span>Chuyên gia</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
