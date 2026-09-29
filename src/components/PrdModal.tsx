import React from 'react';

interface PrdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrdModal: React.FC<PrdModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const standards = [
    {
      badge: 'Đã xác minh Email/Số điện thoại',
      means: 'Người dùng kiểm soát kênh liên lạc đó tại thời điểm xác minh.',
      notMeans: 'Đã xác minh danh tính cá nhân hoặc năng lực nghề nghiệp.',
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      badge: 'Đã kiểm tra danh tính (CCCD)',
      means: 'Operator/đối tác đã đối chiếu giấy tờ theo quy trình được công bố.',
      notMeans: 'Chuyên gia có giấy phép hành nghề trong mọi lĩnh vực hay bảo đảm tài chính.',
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      badge: 'Đã kiểm tra chứng chỉ: CPA/CFA/...',
      means: 'Chứng chỉ cụ thể đã được kiểm tra; hiển thị ngày kiểm tra và ngày hết hạn.',
      notMeans: 'Chất lượng tư vấn được bảo đảm cho mọi dự án đặc thù.',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      badge: 'Đã kiểm tra thông tin doanh nghiệp',
      means: 'Thông tin pháp nhân và quyền đại diện đã được kiểm tra ở mức quy trình quy định.',
      notMeans: 'Tình hình tài chính hoặc khả năng thanh toán của doanh nghiệp được bảo đảm.',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#eff4ff] flex items-center justify-center text-[#006399]">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-base text-[#001026]">
                Quy chuẩn Xác thực &amp; Minh bạch KYC
              </h3>
              <p className="text-xs text-[#44474e]">PRD v4.0 — Nguyên tắc trả lời: "Đã xác minh điều gì?"</p>
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

        {/* Core explanation */}
        <div className="p-3 bg-[#eff4ff] rounded-2xl text-xs text-[#0b1c30] leading-relaxed border border-slate-200/50">
          <strong className="text-[#001026] font-bold">Nguyên tắc cốt lõi:</strong> Thay vì dùng một nhãn "APPROVED_KYC" mơ hồ, nền tảng phân định rạch ròi từng tầng kiểm tra. "Đã xác minh" không bao giờ trở thành lời bảo chứng chung về con người hay kết quả tư vấn.
        </div>

        {/* Matrix Table */}
        <div className="space-y-3">
          {standards.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#f8f9ff] border border-slate-200/60 flex flex-col gap-2">
              <span className={`self-start text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                {item.badge}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-[11px] font-bold text-[#005236] block mb-0.5">✓ Có nghĩa là:</span>
                  <p className="text-[#0b1c30] leading-snug">{item.means}</p>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-rose-100">
                  <span className="text-[11px] font-bold text-[#ba1a1a] block mb-0.5">✗ Không có nghĩa là:</span>
                  <p className="text-[#44474e] leading-snug">{item.notMeans}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal & Privacy Compliance Note */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/60 flex items-start gap-2.5 text-xs text-[#44474e]">
          <span className="material-symbols-outlined text-[#006399] text-[20px] shrink-0 mt-0.5">policy</span>
          <p className="leading-relaxed">
            Tuân thủ <strong className="text-[#001026]">Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15</strong> và <strong className="text-[#001026]">Nghị định 356/2025/NĐ-CP</strong>. Nền tảng tuyệt đối không công khai ảnh CCCD, giấy tờ gốc hoặc chia sẻ liên hệ khi chưa có sự đồng thuận từ hai bên.
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#001026] text-white text-xs font-bold hover:bg-[#0b2545] transition-colors"
          type="button"
        >
          Đã hiểu quy chuẩn
        </button>
      </div>
    </div>
  );
};
