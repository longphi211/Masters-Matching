import React, { useState } from 'react';
import { EnterpriseDemand } from '../types';

interface ProposalModalProps {
  demand: EnterpriseDemand | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (demandId: string, message: string) => void;
  remainingInvites: number;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  demand,
  isOpen,
  onClose,
  onSubmit,
  remainingInvites,
}) => {
  const [message, setMessage] = useState(
    'Chào Ban Giám đốc, tôi có kinh nghiệm tái cấu trúc dòng tiền cho 4 chuỗi bán lẻ tương tự và sẵn sàng hỗ trợ rà soát cấu trúc vốn lưu động, xây mô hình tài chính 3 năm phục vụ thẩm định quỹ đầu tư.'
  );

  if (!isOpen || !demand) return null;

  const quickTags = [
    '+ 12 năm kinh nghiệm ngành',
    '+ Đã dẫn dắt Series A-B',
    '+ Chứng chỉ CPA & CFA',
  ];

  const handleAppendTag = (tag: string) => {
    const cleanTag = tag.replace('+', '').trim();
    if (!message.includes(cleanTag)) {
      setMessage((prev) => (prev ? `${prev}. ${cleanTag}` : cleanTag));
    }
  };

  const handleConfirm = () => {
    if (!message.trim()) {
      alert('Vui lòng nhập thư giới thiệu năng lực ngắn gọn.');
      return;
    }
    onSubmit(demand.id, message);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl mx-auto bg-white rounded-t-3xl p-4 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom-6 duration-200"
      >
        {/* Drawer Handle & Header */}
        <div className="flex flex-col gap-2">
          <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto"></div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#eff4ff] text-[#001026] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">mark_email_read</span>
              </span>
              <span className="font-headline font-bold text-base text-[#001026]">
                Gửi lời đề xuất kết nối
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-slate-500 hover:text-slate-800"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Demand Summary Preview */}
        <div className="p-3 bg-[#eff4ff] rounded-2xl flex flex-col gap-1 border border-slate-200/50">
          <span className="text-[11px] text-[#44474e]">{demand.enterpriseName}</span>
          <span className="text-xs font-bold text-[#001026] line-clamp-1">{demand.title}</span>
          <div className="flex items-center gap-1 text-[#009f6e] text-[11px] font-semibold pt-0.5">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>
              Trừ 1 lượt chủ động giới thiệu (Còn {remainingInvites}/10 lượt tháng này)
            </span>
          </div>
        </div>

        {/* Quick Strengths Selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold text-[#001026]">Điểm mạnh phù hợp nhất của bạn:</span>
          <div className="flex flex-wrap gap-1.5">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAppendTag(tag)}
                className="px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#0b1c30] text-xs font-medium hover:bg-[#dce9ff] border border-slate-200/50 active:scale-95 transition-all"
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Brief Proposal Message */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#001026]" htmlFor="proposalMessage">
              Thư giới thiệu năng lực ngắn gọn <span className="text-[#ba1a1a]">*</span>
            </label>
            <span className={`text-[11px] font-medium ${message.length >= 480 ? 'text-[#ba1a1a]' : 'text-slate-400'}`}>
              {message.length}/500
            </span>
          </div>
          <textarea
            id="proposalMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={4}
            className="w-full p-3 rounded-2xl bg-[#eff4ff] text-[#001026] text-xs outline-none resize-none border border-slate-200/70 focus:bg-white focus:ring-2 focus:ring-[#006399]/20 transition-all placeholder:text-slate-400 leading-relaxed"
            placeholder="Chào Ban Giám đốc, tôi có kinh nghiệm tư vấn trong bài toán tương tự..."
          ></textarea>
        </div>

        {/* Legal & Terms Notice */}
        <div className="p-3 bg-[#e5eeff] rounded-xl flex items-start gap-2 border border-[#006399]/15">
          <span className="material-symbols-outlined text-[16px] text-[#006399] shrink-0 mt-0.5">verified</span>
          <p className="text-xs text-[#44474e] leading-snug">
            Hồ sơ đã xác minh và thông tin liên hệ của bạn sẽ được gửi trực tiếp tới Ban lãnh đạo DN. Hai bên tự chủ động hẹn lịch trao đổi.
          </p>
        </div>

        {/* Submit CTA Buttons */}
        <div className="flex items-center gap-2 pt-1 pb-4">
          <button
            onClick={onClose}
            className="w-1/3 py-3 rounded-xl bg-[#eff4ff] text-[#44474e] text-xs font-bold hover:bg-slate-200 transition-colors"
            type="button"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            className="w-2/3 py-3 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#0b2545] active:scale-98 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Xác nhận gửi đề xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
};
