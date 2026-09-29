import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadInvitationsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadInvitationsCount = 2,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#0b2545]/5 shadow-[0_-1px_8px_rgba(11,37,69,0.05)]">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {/* Tab 1: Khám phá */}
        <button
          onClick={() => onTabChange('kham-pha')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all active:scale-95 ${
            activeTab === 'kham-pha'
              ? 'text-[#006399] font-bold'
              : 'text-[#44474e] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'kham-pha' ? "'FILL' 1" : "'FILL' 0" }}
          >
            explore
          </span>
          <span className="text-[11px] tracking-tight">Khám phá</span>
        </button>

        {/* Tab 2: Lời mời */}
        <button
          onClick={() => onTabChange('loi-moi')}
          className={`relative flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all active:scale-95 ${
            activeTab === 'loi-moi'
              ? 'text-[#006399] font-bold'
              : 'text-[#44474e] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <div className="relative flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: activeTab === 'loi-moi' ? "'FILL' 1" : "'FILL' 0" }}
            >
              handshake
            </span>
            {unreadInvitationsCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 min-w-[15px] h-[15px] flex items-center justify-center rounded-full bg-[#ba1a1a] text-white text-[9px] font-bold leading-none">
                {unreadInvitationsCount}
              </span>
            )}
          </div>
          <span className="text-[11px] tracking-tight">Lời mời</span>
        </button>

        {/* Tab 3: Nhu cầu */}
        <button
          onClick={() => onTabChange('nhu-cau')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all active:scale-95 ${
            activeTab === 'nhu-cau'
              ? 'text-[#006399] font-bold'
              : 'text-[#44474e] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'nhu-cau' ? "'FILL' 1" : "'FILL' 0" }}
          >
            business_center
          </span>
          <span className="text-[11px] tracking-tight">Nhu cầu</span>
        </button>

        {/* Tab 4: Tài khoản */}
        <button
          onClick={() => onTabChange('tai-khoan')}
          className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-all active:scale-95 ${
            activeTab === 'tai-khoan'
              ? 'text-[#006399] font-bold'
              : 'text-[#44474e] hover:text-[#0b1c30]'
          }`}
          type="button"
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: activeTab === 'tai-khoan' ? "'FILL' 1" : "'FILL' 0" }}
          >
            manage_accounts
          </span>
          <span className="text-[11px] tracking-tight">Tài khoản</span>
        </button>
      </div>
    </nav>
  );
};
