import React, { useState } from 'react';
import { ExpertProfile } from '../types';

interface ConnectModalProps {
  expert: ExpertProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expertId: string, message: string, topic?: string) => void;
  remainingInvites: number;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  expert,
  isOpen,
  onClose,
  onSubmit,
  remainingInvites,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Tái cấu trúc dòng tiền');
  const [message, setMessage] = useState(
    'Kính gửi chuyên gia, doanh nghiệp chúng tôi đang chuẩn bị mở rộng chuỗi và cần rà soát lại phương án vốn lưu động. Dự kiến cần 10h tư vấn định kỳ trong 3 tháng tới.'
  );

  if (!isOpen || !expert) return null;

  const topics = ['Due Diligence', 'Tái cấu trúc dòng tiền', 'Gọi vốn Series A/B', 'Tư vấn Thuế & Pháp lý'];

  const handleSelectTopic = (topic: string) => {
    setSelectedTopic(topic);
    setMessage(
      `Chào chuyên gia, doanh nghiệp chúng tôi đang cần tư vấn trọng tâm về "${topic}". Kính mời anh/chị trao đổi để thống nhất phương án hợp tác.`
    );
  };

  const handleConfirm = () => {
    if (!message.trim()) {
      alert('Vui lòng nhập nội dung lời nhắn kết nối.');
      return;
    }
    onSubmit(expert.id, message, selectedTopic);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-4 shadow-2xl flex flex-col gap-3.5 animate-in slide-in-from-bottom-4 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#001026]">
              <span className="material-symbols-outlined text-[20px]">handshake</span>
            </div>
            <div>
              <h4 className="font-headline font-bold text-sm text-[#001026]">Mời kết nối tư vấn</h4>
              <p className="text-[11px] text-[#44474e]">Gửi tới: {expert.name} ({expert.title})</p>
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

        {/* Notice */}
        <div className="p-3 bg-[#eff4ff] rounded-2xl text-[#44474e] text-xs flex items-center gap-2 border border-slate-200/60">
          <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0">verified_user</span>
          <span className="truncate">SĐT &amp; Email chỉ mở khi cả hai bên đồng ý kết nối.</span>
        </div>

        {/* Topics */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#001026]">Chủ đề trao đổi trọng tâm</label>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => handleSelectTopic(t)}
                className={`text-xs px-3.5 py-1.5 rounded-full transition-all active:scale-95 ${
                  selectedTopic === t
                    ? 'bg-[#001026] text-white font-semibold shadow-xs'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-slate-200/50'
                }`}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#001026]" htmlFor="connectMsg">
              Lời nhắn gửi chuyên gia
            </label>
            <span className={`text-[11px] font-medium ${message.length >= 480 ? 'text-[#ba1a1a]' : 'text-slate-400'}`}>
              {message.length}/500
            </span>
          </div>
          <textarea
            id="connectMsg"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            rows={3}
            className="w-full p-3 rounded-2xl bg-[#eff4ff] text-xs text-[#001026] outline-none resize-none border border-slate-200/70 focus:bg-white focus:ring-2 focus:ring-[#006399]/20 transition-all placeholder:text-slate-400 leading-relaxed"
            placeholder="Nhập nội dung trao đổi sơ bộ..."
          ></textarea>
        </div>

        {/* Quota counter */}
        <div className="flex items-center justify-between text-xs text-[#44474e]">
          <span>
            Khả dụng: <strong className="text-[#001026] font-bold">{remainingInvites} lượt mời</strong>
          </span>
          <span className="text-[#009f6e] font-semibold text-[11px]">Đã bao gồm trong gói</span>
        </div>

        {/* Actions with comfortable gap and height */}
        <div className="grid grid-cols-2 gap-3.5 pt-2 pb-1">
          <button
            onClick={onClose}
            className="h-12 rounded-xl bg-[#eff4ff] text-[#44474e] text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all border border-slate-200/60"
            type="button"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            className="h-12 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Gửi lời mời</span>
          </button>
        </div>
      </div>
    </div>
  );
};
