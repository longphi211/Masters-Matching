import React, { useState } from 'react';
import { EnterpriseDemand } from '../types';

interface DemandCreationViewProps {
  onDemandCreated: (demand: EnterpriseDemand) => void;
  onBack: () => void;
}

export const DemandCreationView: React.FC<DemandCreationViewProps> = ({
  onDemandCreated,
  onBack,
}) => {
  const [selectedField, setSelectedField] = useState('cfo');
  const [title, setTitle] = useState(
    'Tìm CFO cố vấn tái cấu trúc bảng cân đối kế toán và chuẩn bị gọi vốn vòng Pre-Series A'
  );
  const [description, setDescription] = useState(
    'Doanh nghiệp chuẩn bị mở rộng mô hình bán lẻ đa kênh trong Q3. Cần chuyên gia tài chính rà soát cấu trúc dòng tiền, tối ưu chi phí vận hành và chuẩn bị bộ hồ sơ tài chính chuẩn mực để thẩm định vòng gọi vốn tiếp theo.'
  );
  const [workMode, setWorkMode] = useState('online');
  const [location, setLocation] = useState('tphcm');
  const [budget, setBudget] = useState('30 - 50 triệu VNĐ/tháng');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const newDemand: EnterpriseDemand = {
        id: `dm-${Date.now()}`,
        title: title || 'Nhu cầu cố vấn quản trị doanh nghiệp',
        enterpriseName: visibility === 'private' ? 'Doanh nghiệp Ẩn danh (Bán lẻ)' : 'Công ty CP Đầu tư & Dịch vụ Ánh Dương',
        isAnonymous: visibility === 'private',
        industry: 'Bán lẻ & Thương mại dịch vụ',
        companySize: '50-100 NV',
        isVerifiedEnterprise: true,
        taxId: '031589...',
        location: location === 'hanoi' ? 'Hà Nội' : location === 'tphcm' ? 'TP. Hồ Chí Minh' : 'Toàn quốc',
        description,
        category:
          selectedField === 'cfo'
            ? 'CFO & Tài chính'
            : selectedField === 'ke-toan'
            ? 'Kế toán & Thuế'
            : selectedField === 'phap-ly'
            ? 'Pháp lý DN'
            : 'Chuyển đổi số',
        workMode:
          workMode === 'online'
            ? 'Online 100%'
            : workMode === 'office'
            ? 'Gặp tại VP'
            : 'Hybrid (VP + Online)',
        budgetRange: budget.split('/')[0] || '30 - 50 triệu',
        budgetType: '/ tháng (Thỏa thuận trực tiếp)',
        timeline: 'Bắt đầu: Trong vòng 2 tuần',
        proposalCount: 0,
        maxProposals: 5,
        postedAgo: 'Vừa xong',
        createdAt: new Date().toISOString(),
      };

      setTimeout(() => {
        onDemandCreated(newDemand);
      }, 1200);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-28 animate-in fade-in duration-150">
      {/* Step Subheader */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between bg-white border-b border-slate-200/60 shadow-xs">
        <div className="flex flex-col min-w-0">
          <span className="text-[10px] text-[#006399] font-bold uppercase tracking-wider">
            Bước 1/2 • Khởi tạo hồ sơ
          </span>
          <h2 className="font-headline text-base font-bold text-[#001026]">Tạo nhu cầu tư vấn mới</h2>
        </div>
        <button
          onClick={onBack}
          aria-label="Đóng"
          className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30] hover:bg-[#dce9ff] active:scale-95 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Progress Bar & Security Notice */}
      <div className="px-4 py-3 bg-white">
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#006399] h-full w-3/4 rounded-full transition-all duration-300"></div>
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-xs text-[#44474e] font-medium">Hoàn tất 75% thông tin cốt lõi</span>
          <span className="text-xs text-[#006399] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-[#4edea3]">verified</span>
            Bảo mật 2 lớp
          </span>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-4 py-3 flex flex-col gap-5">
        {/* Field Category Chips */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">category</span>
              Lĩnh vực bài toán
            </label>
            <span className="text-[10px] text-[#005236] bg-[#6ffbbe]/30 px-2 py-0.5 rounded-full font-bold">
              Bắt buộc
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ke-toan', label: 'Kế toán & Thuế' },
              { id: 'cfo', label: 'CFO / Tài chính' },
              { id: 'phap-ly', label: 'Pháp lý' },
              { id: 'digital', label: 'Chuyển đổi số' },
            ].map((field) => {
              const isSelected = selectedField === field.id;
              return (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(field.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#001026] text-white shadow-sm'
                      : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-slate-200/50'
                  }`}
                  type="button"
                >
                  {isSelected && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                  <span>{field.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title Summary */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5" htmlFor="demand-title">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">short_text</span>
              Tóm tắt bài toán cần giải quyết
            </label>
            <span className="text-[10px] text-[#74777f]">Tiêu đề ngắn</span>
          </div>
          <input
            id="demand-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl bg-white text-[#0b1c30] text-sm shadow-sm border border-slate-200/80 outline-none focus:ring-2 focus:ring-[#006399]/20 transition-all placeholder:text-[#74777f]"
            placeholder="Nhập mục tiêu trọng tâm cần cố vấn..."
            type="text"
          />
        </div>

        {/* Detailed Description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5" htmlFor="demand-desc">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">description</span>
              Mô tả chi tiết vấn đề &amp; bối cảnh
            </label>
            <span className="text-[10px] text-[#74777f] font-medium">{description.length}/1000</span>
          </div>
          <textarea
            id="demand-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={1000}
            rows={4}
            className="w-full px-3.5 py-3 rounded-xl bg-white text-[#0b1c30] text-sm shadow-sm border border-slate-200/80 outline-none focus:ring-2 focus:ring-[#006399]/20 transition-all resize-none placeholder:text-[#74777f]"
            placeholder="Trình bày cụ thể hiện trạng, phạm vi tư vấn, kết quả kỳ vọng..."
          ></textarea>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#eff4ff] text-[#44474e] border border-slate-200/50 mt-0.5">
            <span className="material-symbols-outlined text-[16px] text-[#006399] shrink-0 mt-0.5">lock</span>
            <p className="text-xs leading-snug">
              Lưu ý: Không nhập bí mật kinh doanh; tài liệu mật chia sẻ sau khi ký NDA.
            </p>
          </div>
        </div>

        {/* Work Mode & Location */}
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">laptop_mac</span>
              Hình thức làm việc
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[
                { id: 'online', label: 'Online từ xa', icon: 'videocam' },
                { id: 'office', label: 'Tại văn phòng', icon: 'apartment' },
                { id: 'hybrid', label: 'Linh hoạt (Hybrid)', icon: 'sync_alt' },
              ].map((item) => {
                const isSelected = workMode === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setWorkMode(item.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#001026] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-slate-200/50'
                    }`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">location_on</span>
              Khu vực ưu tiên
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'hanoi', label: 'Hà Nội' },
                { id: 'tphcm', label: 'TP.HCM' },
                { id: 'national', label: 'Toàn quốc' },
              ].map((loc) => {
                const isSelected = location === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-semibold text-center transition-all flex items-center justify-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'bg-[#001026] text-white shadow-xs'
                        : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff] border border-slate-200/50'
                    }`}
                    type="button"
                  >
                    {isSelected && <span className="material-symbols-outlined text-[14px]">check</span>}
                    <span className="truncate">{loc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5" htmlFor="budget-input">
              <span className="material-symbols-outlined text-[18px] text-[#006399]">payments</span>
              Khoảng ngân sách dự kiến
            </label>
            <span className="text-[10px] text-[#74777f]">Tùy chọn</span>
          </div>
          <input
            id="budget-input"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3.5 py-3 rounded-xl bg-white text-[#0b1c30] text-sm font-semibold shadow-xs border border-slate-200/80 outline-none focus:ring-2 focus:ring-[#006399]/20 transition-all"
            type="text"
          />
        </div>

        {/* Visibility */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#0b1c30] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#006399]">visibility</span>
            Mức độ hiển thị
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setVisibility('public')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all active:scale-95 ${
                visibility === 'public'
                  ? 'border-[#006399] bg-[#eff4ff] ring-2 ring-[#006399]/20'
                  : 'border-slate-200/80 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#001026]">Công khai</span>
                <span className="material-symbols-outlined text-[15px] text-[#009f6e]">verified</span>
              </div>
              <span className="text-[11px] text-[#44474e]">Hiện tên &amp; bài toán</span>
            </button>

            <button
              type="button"
              onClick={() => setVisibility('private')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all active:scale-95 ${
                visibility === 'private'
                  ? 'border-[#006399] bg-[#eff4ff] ring-2 ring-[#006399]/20'
                  : 'border-slate-200/80 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#001026]">Ẩn danh DN</span>
                <span className="material-symbols-outlined text-[15px] text-[#006399]">visibility_off</span>
              </div>
              <span className="text-[11px] text-[#44474e]">Chỉ hiện ngành nghề</span>
            </button>
          </div>
        </div>

        {/* Actions with generous spacing and height */}
        <div className="flex flex-col gap-3.5 pt-3">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className="w-full h-13 min-h-[50px] px-4 rounded-xl bg-[#001026] text-white font-headline font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-[#0b2545] active:scale-[0.98] transition-all disabled:opacity-70"
            type="button"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                <span>Đang xử lý đăng tin...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-[#4edea3]">check_circle</span>
                <span>Đã đăng thành công!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                <span>Đăng nhu cầu tìm chuyên gia</span>
              </>
            )}
          </button>
          <button
            onClick={onBack}
            className="w-full h-12 px-4 rounded-xl bg-[#eff4ff] text-[#001026] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#dce9ff] active:scale-[0.98] transition-all border border-slate-200/60"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
            <span>Lưu bản nháp</span>
          </button>
        </div>

        {/* Existing Demands Preview */}
        <div className="mt-4 pt-3 flex flex-col gap-3 border-t border-slate-200/60">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-sm font-bold text-[#001026]">Nhu cầu đang tìm kiếm (2)</h3>
            <span className="text-xs text-[#006399] font-bold cursor-pointer hover:underline">Xem tất cả</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white shadow-sm border border-slate-200/60 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#cde5ff] text-[#001d32] font-bold">
                ĐANG MỞ KẾT NỐI
              </span>
              <span className="text-xs text-[#44474e]">3 đề xuất mới</span>
            </div>
            <h4 className="text-xs font-bold text-[#001026] line-clamp-1">
              Tư vấn rà soát tuân thủ thuế TNCN &amp; TNDN năm quyết toán 2024
            </h4>
            <div className="flex items-center justify-between text-[#44474e] text-xs pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 3 ngày trước
              </span>
              <span className="text-[#006399] font-semibold">Chi tiết →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
