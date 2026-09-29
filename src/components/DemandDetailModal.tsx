import React from 'react';
import { EnterpriseDemand } from '../types';

interface DemandDetailModalProps {
  demand: EnterpriseDemand | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenProposal: (demand: EnterpriseDemand) => void;
}

export const DemandDetailModal: React.FC<DemandDetailModalProps> = ({
  demand,
  isOpen,
  onClose,
  onOpenProposal,
}) => {
  if (!isOpen || !demand) return null;

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
              Chi Tiết Bài Toán
            </h1>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-col w-full pb-36 px-4 pt-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#006399] bg-[#eff4ff] px-2.5 py-1 rounded-full">
                {demand.category}
              </span>
              <span className="text-[11px] text-slate-400">{demand.postedAgo}</span>
            </div>

            <h2 className="font-headline text-lg font-bold text-[#001026] leading-snug">
              {demand.title}
            </h2>

            <div className="flex items-center gap-2 text-xs text-[#44474e]">
              <span className="font-bold text-[#001026]">{demand.enterpriseName}</span>
              {demand.isVerifiedEnterprise && !demand.isAnonymous && (
                <span className="material-symbols-outlined text-[16px] text-[#009f6e]">verified</span>
              )}
              <span>•</span>
              <span>{demand.location}</span>
            </div>

            {demand.imageUrl && (
              <div className="w-full h-44 rounded-xl overflow-hidden shadow-inner">
                <img
                  referrerPolicy="no-referrer"
                  alt={demand.imageAlt || demand.title}
                  src={demand.imageUrl}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-3 bg-[#eff4ff] rounded-xl flex flex-col gap-1 text-xs">
              <span className="font-bold text-[#001026]">Hiện trạng &amp; Bài toán cần giải quyết:</span>
              <p className="text-[#44474e] leading-relaxed whitespace-pre-line">{demand.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/40">
                <span className="text-[#74777f] text-[11px]">Hình thức làm việc:</span>
                <p className="font-bold text-[#001026] mt-0.5">{demand.workMode}</p>
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-xl border border-slate-200/40">
                <span className="text-[#74777f] text-[11px]">Dự kiến ngân sách:</span>
                <p className="font-bold text-[#001026] mt-0.5">{demand.budgetRange}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-[#44474e] border border-slate-200/60 leading-relaxed">
              <strong>Ranh giới nền tảng:</strong> Nền tảng chỉ đóng vai trò kết nối ban đầu. Hai bên tự chủ động đàm phán hợp đồng, bảo mật thông tin (NDA) và chuyển giao kết quả ngoài nền tảng.
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 border-t border-slate-200/60 shadow-[0_-4px_16px_rgba(11,37,69,0.08)]">
          <div className="max-w-xl mx-auto flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenProposal(demand);
              }}
              className="h-12 w-full rounded-xl bg-[#001026] text-white font-headline text-xs font-bold hover:bg-[#0b2545] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">send</span>
              <span>Gửi lời đề xuất kết nối</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
