import React, { useState } from 'react';
import { ActivePerspective, MembershipPlan } from '../types';

interface AccountViewProps {
  perspective: ActivePerspective;
  onPerspectiveChange: (p: ActivePerspective) => void;
  currentPlan: MembershipPlan;
  onOpenUpgrade: () => void;
  onOpenOperator: () => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  perspective,
  onPerspectiveChange,
  currentPlan,
  onOpenUpgrade,
  onOpenOperator,
}) => {
  const [showKycForm, setShowKycForm] = useState(false);
  const [kycType, setKycType] = useState('cpa');
  const [kycNumber, setKycNumber] = useState('');
  const [submittedKyc, setSubmittedKyc] = useState(false);

  const handleSubmitKyc = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedKyc(true);
    setTimeout(() => {
      setShowKycForm(false);
      setSubmittedKyc(false);
      alert('Hồ sơ xác minh đã gửi lên hàng đợi Operator thành công!');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-3 animate-in fade-in duration-150 gap-4">
      {/* User Identity Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            alt="Profile Avatar"
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOuZdUm1g7aZ1M8yX51jtPTvJlJNLtCpCU7QQjukO7K3r_L8XwoVT2AOd0KUUyNakyMPJyr0fyI4t1KGpSW18Ggb0n7nSyO2b0V6LEFSlgNx-napfoi1v5lgOj9tyMgyh2278f0eAw-aESZ2o4Jm31DYa5ZzeTdIRCVXhn1wzNl_-BRL3UssCPQd16x8kDsM-gf-PGlHsuKjUEY-_wbfxcR013kiOrFGJekTHydKCHN0w0IE6uEu5z"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-sm text-[#001026]">dinhthuyduong86</span>
              <span className="px-2 py-0.2 rounded-full bg-[#eff4ff] text-[#006399] text-[10px] font-bold">
                Tài khoản kép (BOTH)
              </span>
            </div>
            <span className="text-xs text-[#44474e] truncate">dinhthuyduong86@gmail.com</span>
            <div className="flex items-center gap-1 text-[11px] text-[#009f6e] mt-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>Đã xác minh Email &amp; SĐT</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRD v4.0 Section 2: Dual Account Switcher (Doanh nghiệp vs Chuyên gia) */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 border border-slate-200/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#001026] uppercase tracking-wider">
            Chuyển góc nhìn tài khoản
          </span>
          <span className="text-[11px] text-[#44474e]">1 tài khoản, 2 tư cách</span>
        </div>
        <p className="text-xs text-[#44474e] leading-snug">
          Theo PRD v4.0: Bộ chuyển Doanh nghiệp / Chuyên gia chỉ thay đổi góc nhìn giao diện. Hệ thống kiểm tra quyền độc lập và chặn tự gửi lời mời cho chính mình.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onPerspectiveChange('enterprise')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
              perspective === 'enterprise'
                ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-sm'
                : 'bg-white text-[#0b1c30] border-slate-200 hover:border-slate-300'
            }`}
            type="button"
          >
            <span className="text-xs font-bold">Góc nhìn Doanh nghiệp</span>
            <span className={`text-[10px] ${perspective === 'enterprise' ? 'text-white/70' : 'text-[#44474e]'}`}>
              Đăng nhu cầu, mời chuyên gia
            </span>
          </button>

          <button
            onClick={() => onPerspectiveChange('expert')}
            className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
              perspective === 'expert'
                ? 'bg-[#0b2545] text-white border-[#0b2545] shadow-sm'
                : 'bg-white text-[#0b1c30] border-slate-200 hover:border-slate-300'
            }`}
            type="button"
          >
            <span className="text-xs font-bold">Góc nhìn Chuyên gia</span>
            <span className={`text-[10px] ${perspective === 'expert' ? 'text-white/70' : 'text-[#44474e]'}`}>
              Gửi đề xuất, nhận bài toán
            </span>
          </button>
        </div>
      </div>

      {/* Current Membership Plan Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006399] text-[20px]">workspace_premium</span>
            <span className="font-headline font-bold text-sm text-[#001026]">
              {currentPlan.name}
            </span>
          </div>
          <button
            onClick={onOpenUpgrade}
            className="text-xs text-[#006399] font-bold hover:underline"
            type="button"
          >
            Đổi gói dịch vụ
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-[#44474e] pt-1">
          <span>Lượt chủ động tháng này:</span>
          <span className="font-bold text-[#001026]">
            {currentPlan.invitesPerMonth - currentPlan.invitesUsed} / {currentPlan.invitesPerMonth} lượt
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#006399] h-full rounded-full"
            style={{
              width: `${Math.round(
                ((currentPlan.invitesPerMonth - currentPlan.invitesUsed) / currentPlan.invitesPerMonth) * 100
              )}%`,
            }}
          ></div>
        </div>
      </div>

      {/* KYC Verification Portal */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#009f6e] text-[20px]">verified_user</span>
            <span className="font-headline font-bold text-sm text-[#001026]">
              Nộp hồ sơ kiểm duyệt KYC
            </span>
          </div>
          <button
            onClick={() => setShowKycForm(!showKycForm)}
            className="text-xs text-[#006399] font-bold hover:underline"
            type="button"
          >
            {showKycForm ? 'Đóng form' : '+ Nộp bổ sung'}
          </button>
        </div>

        <p className="text-xs text-[#44474e] leading-snug">
          Gửi chứng chỉ CPA/CFA, Thẻ luật sư hoặc CCCD gắn chip để Operator đối chiếu theo quy trình PRD v4.0.
        </p>

        {showKycForm && (
          <form onSubmit={handleSubmitKyc} className="pt-2 flex flex-col gap-2.5 border-t border-slate-100">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">Loại giấy tờ kiểm tra:</label>
              <select
                value={kycType}
                onChange={(e) => setKycType(e.target.value)}
                className="p-2.5 rounded-xl bg-[#eff4ff] text-xs text-[#001026] border border-slate-200 outline-none"
              >
                <option value="cpa">Chứng chỉ CPA Việt Nam / Quốc tế</option>
                <option value="cfa">Chứng chỉ CFA Institute</option>
                <option value="lawyer">Thẻ Luật sư do Đoàn Luật sư cấp</option>
                <option value="cccd">CCCD gắn chip định danh điện tử</option>
                <option value="business">Giấy chứng nhận đăng ký kinh doanh</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#001026]">Số hiệu / Mã tra cứu:</label>
              <input
                required
                value={kycNumber}
                onChange={(e) => setKycNumber(e.target.value)}
                placeholder="VD: #1209/BTC hoặc mã số thẻ..."
                className="p-2.5 rounded-xl bg-[#eff4ff] text-xs text-[#001026] border border-slate-200 outline-none focus:bg-white"
                type="text"
              />
            </div>

            <button
              disabled={submittedKyc}
              type="submit"
              className="py-2.5 rounded-xl bg-[#001026] text-white text-xs font-bold hover:bg-[#0b2545] transition-colors mt-1"
            >
              {submittedKyc ? 'Đang gửi hồ sơ...' : 'Gửi Operator duyệt hồ sơ'}
            </button>
          </form>
        )}
      </div>

      {/* Operator Console Access Button (PRD Section 7) */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 border border-slate-200/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#0b2545] text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#001026]">Operator Work Queue</h4>
            <p className="text-[11px] text-[#44474e]">Hàng đợi duyệt KYC, xử lý báo cáo vi phạm</p>
          </div>
        </div>
        <button
          onClick={onOpenOperator}
          className="px-3 py-1.5 rounded-xl bg-[#006399] text-white text-xs font-bold hover:bg-[#004b74] active:scale-95 transition-all"
          type="button"
        >
          Mở Console
        </button>
      </div>

      {/* Legal & Regulatory Disclaimer */}
      <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 border border-slate-200/40 leading-relaxed">
        Nền tảng vận hành theo <strong className="text-slate-700">Luật Thương mại điện tử 122/2025/QH15</strong> (hiệu lực 01/07/2026). Nền tảng không thu hộ, giữ hộ, phân chia hoặc quản lý thù lao tư vấn giữa hai bên.
      </div>
    </div>
  );
};
