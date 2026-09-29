import React, { useState } from 'react';
import { ConnectionRequest } from '../types';

interface InvitationsViewProps {
  connections: ConnectionRequest[];
  onAcceptConnection: (connId: string) => void;
  onConsentContact: (connId: string) => void;
  onDeclineConnection: (connId: string) => void;
  onRevokeInvitation: (connId: string) => void;
}

export const InvitationsView: React.FC<InvitationsViewProps> = ({
  connections,
  onAcceptConnection,
  onConsentContact,
  onDeclineConnection,
  onRevokeInvitation,
}) => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'connected'>('received');

  const receivedRequests = connections.filter(
    (c) => c.status === 'SENT' || c.status === 'CONTACT_PENDING'
  );
  const sentRequests = connections.filter((c) => c.id === 'conn-3' || c.status === 'SENT');
  const connectedRequests = connections.filter((c) => c.status === 'CONNECTED');

  return (
    <div className="flex flex-col w-full pb-24 px-4 pt-3 animate-in fade-in duration-150">
      {/* Privacy Assurance Banner - Compact */}
      <div className="mb-3.5 p-3 rounded-2xl bg-[#eff4ff] text-[#001026] flex items-center justify-between border border-slate-200/60 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-[20px] text-[#006399] shrink-0">shield_lock</span>
          <span className="text-xs font-semibold truncate">Bảo mật 2 bước: Chỉ mở SĐT/Email khi cả hai bên đồng ý</span>
        </div>
        <span className="text-[10px] font-bold text-[#009f6e] bg-[#6ffbbe]/25 px-2 py-0.5 rounded-full shrink-0">
          An toàn
        </span>
      </div>

      {/* Tab Selector with comfortable touch targets */}
      <div className="grid grid-cols-3 p-1 rounded-2xl bg-[#dce9ff] mb-4 text-center gap-1">
        <button
          onClick={() => setActiveTab('received')}
          className={`h-11 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
            activeTab === 'received'
              ? 'bg-[#001026] text-white shadow-xs'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
          type="button"
        >
          <span>Đã nhận</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'received' ? 'bg-[#006399] text-white' : 'bg-white text-[#44474e]'
            }`}
          >
            {receivedRequests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('sent')}
          className={`h-11 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
            activeTab === 'sent'
              ? 'bg-[#001026] text-white shadow-xs'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
          type="button"
        >
          <span>Đã gửi</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'sent' ? 'bg-[#006399] text-white' : 'bg-white text-[#44474e]'
            }`}
          >
            {sentRequests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('connected')}
          className={`h-11 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 ${
            activeTab === 'connected'
              ? 'bg-[#001026] text-white shadow-xs'
              : 'text-[#44474e] hover:text-[#001026]'
          }`}
          type="button"
        >
          <span>Đã kết nối</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'connected' ? 'bg-[#006399] text-white' : 'bg-white text-[#44474e]'
            }`}
          >
            {connectedRequests.length}
          </span>
        </button>
      </div>

      {/* SECTION 1: RECEIVED REQUESTS */}
      {activeTab === 'received' && (
        <div className="flex flex-col gap-3.5">
          {receivedRequests.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Chưa có lời mời nào gửi đến bạn.
            </div>
          ) : (
            receivedRequests.map((conn) => {
              if (conn.status === 'CONTACT_PENDING') {
                return (
                  <div
                    key={conn.id}
                    className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3"
                  >
                    {/* Stage Tracker */}
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-[#009f6e] text-xs font-bold">
                          <span className="material-symbols-outlined text-[16px] mr-0.5">check_circle</span>
                          <span>1. Kết nối</span>
                        </div>
                        <span className="text-slate-300 text-xs">→</span>
                        <div className="flex items-center text-[#006399] text-xs font-bold bg-[#cde5ff]/60 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006399] animate-pulse mr-1"></span>
                          <span>2. Duyệt liên hệ</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#009f6e] text-[10px] font-bold">
                        1/2 bên đã duyệt
                      </span>
                    </div>

                    {/* Sender Header */}
                    <div className="flex items-start gap-3">
                      <img
                        referrerPolicy="no-referrer"
                        alt={conn.senderName}
                        src={conn.senderAvatar}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/50"
                      />
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="font-headline text-sm font-bold text-[#001026] truncate">
                          {conn.senderName}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#44474e] text-[10px] font-medium">
                            <span className="material-symbols-outlined text-[13px] text-[#009f6e]">verified</span>
                            Đã xác thực DN
                          </span>
                          <span className="text-[11px] text-slate-400">• {conn.sentAt}</span>
                        </div>
                      </div>
                    </div>

                    {/* Demand scope */}
                    {conn.demandTitle && (
                      <div className="rounded-xl bg-[#eff4ff] p-3 flex flex-col gap-1 border border-slate-200/40">
                        <div className="flex items-center gap-1 text-[#001026]">
                          <span className="material-symbols-outlined text-[16px] text-[#006399]">work</span>
                          <span className="text-xs font-bold">Nhu cầu: {conn.demandTitle}</span>
                        </div>
                        <p className="text-xs text-[#44474e] pl-5 italic">
                          "{conn.message}"
                        </p>
                      </div>
                    )}

                      {/* 2-Step Consent Action Box */}
                    <div className="rounded-xl bg-[#eff4ff] p-3.5 flex flex-col gap-2.5 border border-[#006399]/20">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#006399] text-[20px] mt-0.5 shrink-0">
                          contact_phone
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-[#001026]">Xác nhận mở thông tin liên hệ</span>
                          <p className="text-xs text-[#44474e] mt-0.5 leading-snug">
                            Đối tác đã mở thông tin. Bạn có đồng ý chia sẻ SĐT &amp; Email để trao đổi trực tiếp?
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2.5 pt-1">
                        <button
                          onClick={() => onConsentContact(conn.id)}
                          className="w-full h-12 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all hover:bg-[#0b2545]"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">verified_user</span>
                          <span>Đồng ý chia sẻ liên hệ</span>
                        </button>
                        <button
                          onClick={() => alert('Đã chọn: Tiếp tục trao đổi qua tin nhắn nền tảng.')}
                          className="w-full h-11 rounded-xl bg-white text-[#44474e] text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200/80 active:scale-[0.98] transition-all hover:bg-slate-50"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px] text-slate-400">forum</span>
                          <span>Chỉ trao đổi qua nền tảng</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // Standard initial invite
              return (
                <div
                  key={conn.id}
                  className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#44474e] text-[10px] font-bold">
                      Lời mời mới
                    </span>
                    <span className="text-xs text-slate-400">{conn.sentAt}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <img
                      referrerPolicy="no-referrer"
                      alt={conn.senderName}
                      src={conn.senderAvatar}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/50"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="font-headline text-sm font-bold text-[#001026] truncate">
                        {conn.senderName}
                      </h3>
                      <span className="text-xs text-[#44474e]">{conn.senderTitle || 'Ban Giám đốc'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#44474e] bg-[#eff4ff] p-3 rounded-xl border border-slate-200/40 leading-relaxed">
                    "{conn.message}"
                  </p>

                  <div className="grid grid-cols-2 gap-3.5 pt-1.5">
                    <button
                      onClick={() => onDeclineConnection(conn.id)}
                      className="h-12 rounded-xl bg-[#eff4ff] text-[#44474e] text-xs font-bold hover:bg-slate-200 active:scale-[0.98] transition-all border border-slate-200/60"
                      type="button"
                    >
                      Từ chối
                    </button>
                    <button
                      onClick={() => onAcceptConnection(conn.id)}
                      className="h-12 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-[0.98] transition-all"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      <span>Chấp nhận</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* SECTION 2: SENT REQUESTS */}
      {activeTab === 'sent' && (
        <div className="flex flex-col gap-3.5">
          {sentRequests.map((conn) => (
            <div
              key={conn.id}
              className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#004972] text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#006399] animate-pulse"></span>
                  <span>Đã gửi • Chờ phản hồi</span>
                </div>
                <span className="text-[10px] text-[#ba1a1a] font-bold">
                  Hết hạn: {conn.expiresInDays || 5} ngày
                </span>
              </div>

              <div className="flex items-start gap-3">
                <img
                  referrerPolicy="no-referrer"
                  alt={conn.receiverName}
                  src={conn.receiverAvatar}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/50"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-headline text-sm font-bold text-[#001026] truncate">
                      {conn.receiverName}
                    </h3>
                    <span className="material-symbols-outlined text-[16px] text-[#009f6e]" title="Đã xác thực">
                      verified
                    </span>
                  </div>
                  <span className="text-xs text-[#44474e] truncate">
                    Cố vấn Trưởng AI Automation &amp; ERP
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">2 ngày trước</span>
                </div>
              </div>

              <div className="bg-[#eff4ff] p-3 rounded-xl text-[#44474e] text-xs border border-slate-200/40">
                <span className="font-bold text-[#001026]">Lời nhắn:</span> "{conn.message}"
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onRevokeInvitation(conn.id)}
                  className="h-10 px-3 rounded-xl text-[#ba1a1a] bg-red-50 hover:bg-red-100 text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">undo</span>
                  <span>Thu hồi lời mời</span>
                </button>
                <span className="text-[11px] text-slate-400">Bảo mật danh tính</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 3: CONNECTED REQUESTS */}
      {activeTab === 'connected' && (
        <div className="flex flex-col gap-3.5">
          {connectedRequests.map((conn) => (
            <div
              key={conn.id}
              className="rounded-2xl bg-white p-4 shadow-sm border border-slate-200/60 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6ffbbe]/30 text-[#005236] text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Đã mở thông tin liên hệ</span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">2 bước xong</span>
              </div>

              <div className="flex items-start gap-3">
                <img
                  referrerPolicy="no-referrer"
                  alt={conn.senderName}
                  src={conn.senderAvatar}
                  className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/50"
                />
                <div className="flex flex-col min-w-0 flex-1">
                  <h3 className="font-headline text-sm font-bold text-[#001026] truncate">
                    {conn.senderName}
                  </h3>
                  <span className="text-xs font-semibold text-[#0b1c30]">
                    {conn.contactDetails?.directName || 'Nguyễn Văn Hưng'}
                  </span>
                  <span className="text-[11px] text-[#44474e]">
                    {conn.contactDetails?.position || 'Giám đốc Vận hành'}
                  </span>
                </div>
              </div>

              {/* Revealed Contacts Card */}
              <div className="rounded-xl bg-[#eff4ff] p-3 flex flex-col gap-2.5 border border-slate-200/60">
                <div className="grid grid-cols-1 gap-2.5">
                  <a
                    className="flex items-center justify-between p-3 rounded-xl bg-white text-[#0b1c30] shadow-xs active:bg-slate-50 border border-slate-200/60"
                    href={`tel:${conn.contactDetails?.phone || '0912345678'}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006399]">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-[#44474e]">Điện thoại</span>
                        <span className="text-xs font-bold text-[#001026] tracking-wide">
                          {conn.contactDetails?.phone || '0912 345 678'}
                        </span>
                      </div>
                    </div>
                    <span className="h-9 px-3 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center">
                      Gọi ngay
                    </span>
                  </a>

                  <a
                    className="flex items-center justify-between p-3 rounded-xl bg-white text-[#0b1c30] shadow-xs active:bg-slate-50 border border-slate-200/60"
                    href={`mailto:${conn.contactDetails?.email || 'hung.nv@angia-retail.vn'}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006399]">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] text-[#44474e]">Email</span>
                        <span className="text-xs font-bold text-[#001026] truncate">
                          {conn.contactDetails?.email || 'hung.nv@angia-retail.vn'}
                        </span>
                      </div>
                    </div>
                    <span className="h-9 px-3 rounded-xl bg-[#eff4ff] text-[#001026] border border-slate-200 text-xs font-bold flex items-center justify-center">
                      Gửi thư
                    </span>
                  </a>
                </div>
              </div>

              {/* Quick Platform Actions with wide buttons */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <button
                  onClick={() => alert('Mở tin nhắn nền tảng')}
                  className="h-12 px-3 rounded-xl bg-[#001026] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#0b2545] active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Tin nhắn</span>
                </button>
                <button
                  onClick={() => alert('Đề xuất khung giờ hẹn gặp')}
                  className="h-12 px-3 rounded-xl bg-[#eff4ff] text-[#001026] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dce9ff] border border-slate-200/60 active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">event_note</span>
                  <span>Lên lịch</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trust Seal Footer Element */}
      <div className="mt-6 flex flex-col items-center justify-center text-center p-2">
        <div className="flex items-center gap-1.5 text-[#009f6e]">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span className="text-xs font-bold uppercase tracking-wider">Connex B2B Verified Match</span>
        </div>
      </div>
    </div>
  );
};
