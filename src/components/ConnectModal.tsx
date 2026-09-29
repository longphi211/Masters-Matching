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
        <div className="p-3 bg-[#eff4ff] rounded-2xl text-[#44474e] text-xs flex items-center gap-2 border border-slate-200/50">
          <span className="material-symbols-outlined text-[#006399] text-[18px] shrink-0">info</span>
          <span>Sau khi chuyên gia đồng ý, hai bên sẽ trực tiếp trao đổi SĐT/Email và thống nhất hợp đồng ngoài nền tảng.</span>
        </div>

        {/* Topics */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#001026]">Chủ đề trao đổi trọng tâm</label>
          <div className="flex flex-wrap gap-1.5">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => handleSelectTopic(t)}
                className={`text-xs px-3 py-1 rounded-full transition-all ${
                  selectedTopic === t
                    ? 'bg-[#001026] text-white font-semibold shadow-xs'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-slate-200/40'
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
              Nội dung lời nhắn (tối đa 500 ký tự)
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
            rows={4}
            className="w-full p-3 rounded-2xl bg-[#eff4ff] text-xs text-[#001026] outline-none resize-none border border-slate-200/70 focus:bg-white focus:ring-2 focus:ring-[#006399]/20 transition-all placeholder:text-slate-400 leading-relaxed"
            placeholder="Kính gửi chuyên gia, doanh nghiệp chúng tôi đang cần tư vấn..."
          ></textarea>
        </div>

        {/* Quota counter */}
        <div className="flex items-center justify-between text-xs text-[#44474e] pt-1">
          <span>
            Lời mời khả dụng: <strong className="text-[#001026] font-bold">{remainingInvites} lượt</strong>
          </span>
          <span className="text-[#009f6e] font-semibold">Miễn phí theo gói</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1 pb-2">
          <button
            onClick={onClose}
            className="py-2.5 rounded-xl bg-[#eff4ff] text-[#44474e] text-xs font-bold hover:bg-slate-200"
            type="button"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleConfirm}
            className="py-2.5 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-98"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
            <span>Gửi kết nối</span>
          </button>
        </div>
      </div>
    </div>
  );
};
