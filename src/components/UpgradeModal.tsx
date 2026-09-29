import React from 'react';
import { MembershipPlan } from '../types';
import { MEMBERSHIP_PLANS } from '../data/mockData';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: MembershipPlan;
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  currentPlan,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  const plans = Object.values(MEMBERSHIP_PLANS);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#006399]">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#001026]">
                Gói Thành Viên Nền Tảng
              </h3>
              <p className="text-xs text-[#44474e]">PRD v4.0 — Phí sử dụng dịch vụ tiếp cận, không thu hoa hồng thù lao</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-slate-500 hover:text-slate-800"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Pricing Notice */}
        <div className="p-3 bg-[#eff4ff] rounded-2xl text-xs text-[#44474e] border border-slate-200/50">
          Nền tảng chỉ thu phí quyền sử dụng và công cụ kết nối. Hai bên tự thỏa thuận thù lao tư vấn trực tiếp ngoài nền tảng, 0% chiết khấu.
        </div>

        {/* Plan Cards */}
        <div className="space-y-3">
          {plans.map((p) => {
            const isCurrent = currentPlan.id === p.id;
            return (
              <div
                key={p.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-[#006399] bg-[#eff4ff]/60 ring-2 ring-[#006399]/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-headline font-bold text-sm text-[#001026]">{p.name}</h4>
                    <span className="text-[11px] text-[#44474e]">
                      Dành cho {p.targetRole === 'expert' ? 'Chuyên gia tư vấn' : 'Doanh nghiệp'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-base text-[#001026]">
                      {p.priceMonthly === 0 ? 'Miễn phí' : `${p.priceMonthly.toLocaleString('vi-VN')} đ`}
                    </span>
                    {p.priceMonthly > 0 && <span className="text-[10px] text-[#74777f] block">/ tháng</span>}
                  </div>
                </div>

                <ul className="space-y-1.5 pt-1 text-xs text-[#44474e] border-t border-slate-100">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[15px] text-[#009f6e] shrink-0 mt-0.5">
                        check
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3">
                  {isCurrent ? (
                    <div className="w-full py-2 rounded-xl bg-white border border-[#006399] text-[#006399] text-xs font-bold text-center">
                      Đang sử dụng
                    </div>
                  ) : (
                    <button
                      onClick={() => onSelectPlan(p)}
                      className="w-full py-2.5 rounded-xl bg-[#001026] text-white text-xs font-bold hover:bg-[#0b2545] transition-colors"
                      type="button"
                    >
                      Kích hoạt ngay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
