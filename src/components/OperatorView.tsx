import React, { useState } from 'react';

interface OperatorViewProps {
  onBack: () => void;
}

export const OperatorView: React.FC<OperatorViewProps> = ({ onBack }) => {
  const [operatorTab, setOperatorTab] = useState<'kyc' | 'reports' | 'invites' | 'memberships'>('kyc');

  const [kycQueue, setKycQueue] = useState([
    {
      id: 'k-1',
      applicant: 'Trần Minh Anh',
      role: 'Chuyên gia CFO',
      type: 'Chứng chỉ CPA Việt Nam',
      certId: '#1209/BTC',
      submittedDate: '28/09/2026',
      status: 'pending',
      evidenceSource: 'Cổng thông tin Bộ Tài chính',
    },
    {
      id: 'k-2',
      applicant: 'Công ty CP Công nghệ Logistic Vina',
      role: 'Doanh nghiệp',
      type: 'Xác thực Pháp nhân DN',
      certId: 'MST 031789...',
      submittedDate: '27/09/2026',
      status: 'pending',
      evidenceSource: 'Cổng thông tin quốc gia ĐKKD',
    },
  ]);

  const handleApprove = (id: string) => {
    setKycQueue(kycQueue.filter((item) => item.id !== id));
    alert('Đã phê duyệt và gắn nhãn xác minh minh bạch theo PRD v4.0!');
  };

  const handleReject = (id: string) => {
    const reason = prompt('Nhập lý do từ chối để phản hồi chuyên gia nộp lại:');
    if (reason) {
      setKycQueue(kycQueue.filter((item) => item.id !== id));
      alert(`Đã gửi lý do từ chối: "${reason}". Chuyên gia có thể nộp lại giấy tờ.`);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-3 animate-in fade-in duration-150 gap-4">
      {/* Header */}
      <div className="bg-[#0b2545] rounded-2xl p-4 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#4edea3]">
            <span className="material-symbols-outlined text-[22px]">admin_panel_settings</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-sm text-white">Operator Work Queue</h2>
            <p className="text-[11px] text-[#cde5ff]">Kiểm duyệt minh bạch PRD v4.0 — Không điều phối deal</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 active:scale-95 transition-all"
          type="button"
        >
          Quay lại app
        </button>
      </div>

      {/* Operator Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[#dce9ff] rounded-xl text-center text-xs">
        <button
          onClick={() => setOperatorTab('kyc')}
          className={`py-2 rounded-lg font-bold transition-all ${
            operatorTab === 'kyc' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-[#44474e]'
          }`}
          type="button"
        >
          Cần xác minh ({kycQueue.length})
        </button>
        <button
          onClick={() => setOperatorTab('reports')}
          className={`py-2 rounded-lg font-bold transition-all ${
            operatorTab === 'reports' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-[#44474e]'
          }`}
          type="button"
        >
          Báo cáo (1)
        </button>
        <button
          onClick={() => setOperatorTab('invites')}
          className={`py-2 rounded-lg font-bold transition-all ${
            operatorTab === 'invites' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-[#44474e]'
          }`}
          type="button"
        >
          Lời mời lỗi (0)
        </button>
        <button
          onClick={() => setOperatorTab('memberships')}
          className={`py-2 rounded-lg font-bold transition-all ${
            operatorTab === 'memberships' ? 'bg-[#0b2545] text-white shadow-xs' : 'text-[#44474e]'
          }`}
          type="button"
        >
          Thu phí (3)
        </button>
      </div>

      {/* Tab 1: KYC Queue */}
      {operatorTab === 'kyc' && (
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-[#eff4ff] rounded-xl text-xs text-[#44474e] border border-slate-200/50">
            <strong>Nguyên tắc Operator:</strong> Không lưu hoặc để lộ ảnh CCCD/hồ sơ gốc lên client; đối chiếu cổng dữ liệu công khai và cấp nhãn cụ thể.
          </div>

          {kycQueue.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
              Hàng đợi trống! Tất cả hồ sơ đã được xử lý.
            </div>
          ) : (
            kycQueue.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#001026]">{item.applicant}</span>
                  <span className="text-[10px] bg-[#eff4ff] text-[#006399] px-2 py-0.5 rounded-full font-bold">
                    {item.role}
                  </span>
                </div>

                <div className="bg-[#eff4ff] p-2.5 rounded-xl text-xs text-[#0b1c30] flex flex-col gap-1">
                  <div>
                    <span className="text-[#44474e]">Loại kiểm tra: </span>
                    <strong className="text-[#001026]">{item.type}</strong>
                  </div>
                  <div>
                    <span className="text-[#44474e]">Mã / Số hiệu: </span>
                    <strong className="text-[#006399]">{item.certId}</strong>
                  </div>
                  <div>
                    <span className="text-[#44474e]">Đối chiếu nguồn: </span>
                    <span>{item.evidenceSource}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="flex-1 py-2 rounded-xl bg-[#009f6e] text-white text-xs font-bold hover:bg-[#007b55]"
                    type="button"
                  >
                    Duyệt xác minh
                  </button>
                  <button
                    onClick={() => handleReject(item.id)}
                    className="py-2 px-4 rounded-xl bg-slate-100 text-[#ba1a1a] text-xs font-bold hover:bg-red-50"
                    type="button"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Reports */}
      {operatorTab === 'reports' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <span className="font-bold text-[#ba1a1a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">report</span>
              Báo cáo: Quấy rối liên hệ ngoài phạm vi
            </span>
            <span className="text-[10px] text-slate-400">1 giờ trước</span>
          </div>
          <p className="text-[#44474e] leading-relaxed">
            Người dùng phản ánh tài khoản "Tập đoàn X" liên tục spam tin nhắn mời vay vốn thay vì tư vấn đúng đề xuất.
          </p>
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => alert('Đã khóa tạm thời tài khoản bị báo cáo theo PRD v4.0!')}
              className="py-2 px-3 rounded-xl bg-[#ba1a1a] text-white font-bold"
              type="button"
            >
              Khóa tài khoản vi phạm (BLOCKED)
            </button>
            <button
              onClick={() => alert('Đã lưu nhật ký cảnh cáo người dùng.')}
              className="py-2 px-3 rounded-xl bg-slate-100 text-[#0b1c30] font-semibold"
              type="button"
            >
              Gửi nhắc nhở
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Invites */}
      {operatorTab === 'invites' && (
        <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
          Không có lời mời nào bị lỗi kỹ thuật hay nghẽn chia sẻ liên hệ.
        </div>
      )}

      {/* Tab 4: Memberships */}
      {operatorTab === 'memberships' && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/60 flex flex-col gap-2 text-xs">
          <span className="font-bold text-[#001026]">Đối soát giao dịch phí thành viên tháng 09/2026</span>
          <p className="text-[#44474e]">
            3 giao dịch đăng ký gói Pro và Plus qua cổng đối soát; không chứa bất kỳ dòng tiền thù lao tư vấn nào của hai bên.
          </p>
          <div className="p-2 bg-[#eff4ff] rounded-xl text-[#009f6e] font-semibold flex items-center gap-1 mt-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Hệ thống đối soát khớp 100% tài khoản với ngân hàng đối tác.</span>
          </div>
        </div>
      )}
    </div>
  );
};
