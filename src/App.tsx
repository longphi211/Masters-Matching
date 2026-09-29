import { useState } from 'react';
import {
  ActivePerspective,
  ExpertProfile,
  EnterpriseDemand,
  ConnectionRequest,
  MembershipPlan,
} from './types';
import {
  INITIAL_EXPERTS,
  INITIAL_DEMANDS,
  INITIAL_CONNECTIONS,
  MEMBERSHIP_PLANS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DemandDiscoveryView } from './components/DemandDiscoveryView';
import { ExpertDiscoveryView } from './components/ExpertDiscoveryView';
import { DemandCreationView } from './components/DemandCreationView';
import { ExpertProfileModal } from './components/ExpertProfileModal';
import { InvitationsView } from './components/InvitationsView';
import { ProposalModal } from './components/ProposalModal';
import { ConnectModal } from './components/ConnectModal';
import { PrdModal } from './components/PrdModal';
import { UpgradeModal } from './components/UpgradeModal';
import { AccountView } from './components/AccountView';
import { OperatorView } from './components/OperatorView';
import { DemandDetailModal } from './components/DemandDetailModal';
import { Toast } from './components/Toast';

export default function App() {
  // Perspective: 'enterprise' | 'expert' | 'operator'
  const [perspective, setPerspective] = useState<ActivePerspective>('expert');
  // Bottom tab: 'kham-pha' | 'loi-moi' | 'nhu-cau' | 'tai-khoan' | 'operator'
  const [activeTab, setActiveTab] = useState<string>('kham-pha');

  // Application Data States
  const [experts, setExperts] = useState<ExpertProfile[]>(INITIAL_EXPERTS);
  const [demands, setDemands] = useState<EnterpriseDemand[]>(INITIAL_DEMANDS);
  const [connections, setConnections] = useState<ConnectionRequest[]>(INITIAL_CONNECTIONS);

  // Quotas & Plans
  const [expertPlan, setExpertPlan] = useState<MembershipPlan>(MEMBERSHIP_PLANS.expert_pro);
  const [enterprisePlan, setEnterprisePlan] = useState<MembershipPlan>(MEMBERSHIP_PLANS.enterprise_basic);

  // Modals
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);
  const [isExpertModalOpen, setIsExpertModalOpen] = useState(false);

  const [targetDemandForProposal, setTargetDemandForProposal] = useState<EnterpriseDemand | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const [targetExpertForConnect, setTargetExpertForConnect] = useState<ExpertProfile | null>(null);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const [selectedDemandDetail, setSelectedDemandDetail] = useState<EnterpriseDemand | null>(null);
  const [isDemandDetailOpen, setIsDemandDetailOpen] = useState(false);

  const [isPrdModalOpen, setIsPrdModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 3200);
  };

  // Toggle bookmark on expert
  const handleToggleBookmark = (expertId: string) => {
    setExperts((prev) =>
      prev.map((e) => {
        if (e.id === expertId) {
          const next = !e.isBookmarked;
          showToast(next ? `Đã lưu hồ sơ của ${e.name} vào danh sách quan tâm.` : `Đã bỏ lưu hồ sơ.`);
          return { ...e, isBookmarked: next };
        }
        return e;
      })
    );
  };

  // Handle proposal submission (from Expert -> Enterprise)
  const handleSubmitProposal = (demandId: string, message: string) => {
    setIsProposalModalOpen(false);

    // Deduct quota
    setExpertPlan((prev) => ({
      ...prev,
      invitesUsed: Math.min(prev.invitesUsed + 1, prev.invitesPerMonth),
    }));

    // Update target demand proposal count
    setDemands((prev) =>
      prev.map((d) => (d.id === demandId ? { ...d, proposalCount: d.proposalCount + 1 } : d))
    );

    const targetDemand = demands.find((d) => d.id === demandId);

    // Add to connections as SENT
    const newConn: ConnectionRequest = {
      id: `conn-${Date.now()}`,
      senderRole: 'expert',
      senderName: 'Trần Minh Anh',
      senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe_vFNNI1IOiAzZiQZvKgiFOzYVLaGmj2JBhcmX1DAjsblxKUPUn5hM_dDVrGr6tPuaIZMUlWF8vITip0TxVZgzumUuICPUREaTOg3FgH2P2J_8BcQ_LvSGWXRq3HqaGbX9vGK64XwWvkE5rMqbc4VSCDC2Kq2V65GQhBc7eY4TlwXSU9iAVwMkcbvfhPL1jti_BIcab2Nmm_rdbehzqqejQuDN4rx-QMTlpLCoKuj7vDCVz1lxbzk',
      receiverRole: 'enterprise',
      receiverName: targetDemand?.enterpriseName || 'Doanh nghiệp',
      receiverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdwfz_nqJw_K8U4JohQf1GwJUFEe4etKLjfqJ23pEGvgID-jt-3VVkFcPacj1305UmP2Hy2ypuuMGAtvRCttKxfAwDpR6fZOc5q2rGr35JYi8oILvNnTIsqnIvK8LljDgm75igDdm1TRqpYHd6UOT2NOGzWrNpsx97YlNb1owHps6m2lTXjlwy3WeiEiT6zoRHGJ20_k0hX9NMXqZr6IL3k3M3bFyrcaf4CV8ttbFbBDoYOBKIIuFE',
      demandTitle: targetDemand?.title,
      message,
      status: 'SENT',
      sentAt: 'Vừa xong',
      expiresInDays: 7,
      senderConsentShared: true,
      receiverConsentShared: false,
    };

    setConnections([newConn, ...connections]);
    showToast('Đề xuất đã gửi thành công! Doanh nghiệp sẽ phản hồi trong mục Lời mời.');
  };

  // Handle invitation submission (from Enterprise -> Expert)
  const handleSubmitConnect = (expertId: string, message: string, topic?: string) => {
    setIsConnectModalOpen(false);

    // Deduct enterprise quota
    setEnterprisePlan((prev) => ({
      ...prev,
      invitesUsed: Math.min(prev.invitesUsed + 1, prev.invitesPerMonth),
    }));

    const target = experts.find((e) => e.id === expertId);

    const newConn: ConnectionRequest = {
      id: `conn-${Date.now()}`,
      senderRole: 'enterprise',
      senderName: 'Doanh nghiệp của bạn',
      senderAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOuZdUm1g7aZ1M8yX51jtPTvJlJNLtCpCU7QQjukO7K3r_L8XwoVT2AOd0KUUyNakyMPJyr0fyI4t1KGpSW18Ggb0n7nSyO2b0V6LEFSlgNx-napfoi1v5lgOj9tyMgyh2278f0eAw-aESZ2o4Jm31DYa5ZzeTdIRCVXhn1wzNl_-BRL3UssCPQd16x8kDsM-gf-PGlHsuKjUEY-_wbfxcR013kiOrFGJekTHydKCHN0w0IE6uEu5z',
      receiverRole: 'expert',
      receiverName: target?.name || 'Chuyên gia',
      receiverAvatar: target?.avatarUrl || '',
      demandTitle: topic ? `Tư vấn trọng tâm: ${topic}` : 'Tư vấn giải pháp quản trị',
      message,
      status: 'SENT',
      sentAt: 'Vừa xong',
      expiresInDays: 7,
      senderConsentShared: true,
      receiverConsentShared: false,
    };

    setConnections([newConn, ...connections]);
    showToast('Lời mời kết nối đã được gửi thành công!');
  };

  // Two-step consent handlers
  const handleAcceptConnection = (connId: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.id === connId) {
          return {
            ...c,
            status: 'CONTACT_PENDING',
          };
        }
        return c;
      })
    );
    showToast('Đã chấp nhận kết nối! Chuyển sang bước 2: Xác nhận cấp quyền mở thông tin.');
  };

  const handleConsentContact = (connId: string) => {
    setConnections((prev) =>
      prev.map((c) => {
        if (c.id === connId) {
          return {
            ...c,
            status: 'CONNECTED',
            receiverConsentShared: true,
            contactDetails: {
              email: 'minhanh.cfo@expertmatch.vn',
              phone: '0903 888 999',
              directName: 'Trần Minh Anh',
              position: 'Fractional CFO',
            },
          };
        }
        return c;
      })
    );
    showToast('Đã chấp thuận chia sẻ liên hệ! Danh bạ hai bên đã mở khóa.');
  };

  const handleDeclineConnection = (connId: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== connId));
    showToast('Đã từ chối lời mời kết nối.');
  };

  const handleRevokeInvitation = (connId: string) => {
    setConnections((prev) => prev.filter((c) => c.id !== connId));
    showToast('Đã thu hồi lời mời kết nối.');
  };

  // Handle new demand created
  const handleDemandCreated = (newDemand: EnterpriseDemand) => {
    setDemands([newDemand, ...demands]);
    setActiveTab('kham-pha');
    showToast('Đã công bố bài toán tư vấn thành công!');
  };

  // Current plan based on active perspective
  const currentPlan = perspective === 'expert' ? expertPlan : enterprisePlan;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col antialiased selection:bg-[#006399]/20">
      {/* Top Header */}
      <Header
        perspective={perspective}
        onPerspectiveChange={(newRole) => {
          setPerspective(newRole);
          if (newRole === 'operator') {
            setActiveTab('operator');
          } else if (activeTab === 'operator') {
            setActiveTab('kham-pha');
          }
        }}
        activeTab={activeTab}
        onOpenAccount={() => setActiveTab('tai-khoan')}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-20">
        {/* Render Tab Views */}
        {activeTab === 'kham-pha' && (
          <>
            {perspective === 'expert' ? (
              <DemandDiscoveryView
                demands={demands}
                membership={expertPlan}
                onOpenProposal={(demand) => {
                  setTargetDemandForProposal(demand);
                  setIsProposalModalOpen(true);
                }}
                onViewDemandDetails={(demand) => {
                  setSelectedDemandDetail(demand);
                  setIsDemandDetailOpen(true);
                }}
                onSwitchRole={() => setPerspective('enterprise')}
                onUpgradePlan={() => setIsUpgradeModalOpen(true)}
              />
            ) : (
              <ExpertDiscoveryView
                experts={experts}
                membership={enterprisePlan}
                onSelectExpert={(expert) => {
                  setSelectedExpert(expert);
                  setIsExpertModalOpen(true);
                }}
                onOpenConnect={(expert) => {
                  setTargetExpertForConnect(expert);
                  setIsConnectModalOpen(true);
                }}
                onSwitchRole={() => setPerspective('expert')}
                onUpgradePlan={() => setIsUpgradeModalOpen(true)}
                onOpenPrdModal={() => setIsPrdModalOpen(true)}
                onGoToCreateDemand={() => setActiveTab('nhu-cau')}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
          </>
        )}

        {activeTab === 'nhu-cau' && (
          <DemandCreationView
            onDemandCreated={handleDemandCreated}
            onBack={() => setActiveTab('kham-pha')}
          />
        )}

        {activeTab === 'loi-moi' && (
          <InvitationsView
            connections={connections}
            onAcceptConnection={handleAcceptConnection}
            onConsentContact={handleConsentContact}
            onDeclineConnection={handleDeclineConnection}
            onRevokeInvitation={handleRevokeInvitation}
          />
        )}

        {activeTab === 'tai-khoan' && (
          <AccountView
            perspective={perspective}
            onPerspectiveChange={(role) => setPerspective(role)}
            currentPlan={currentPlan}
            onOpenUpgrade={() => setIsUpgradeModalOpen(true)}
            onOpenOperator={() => setActiveTab('operator')}
          />
        )}

        {activeTab === 'operator' && (
          <OperatorView onBack={() => setActiveTab('kham-pha')} />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'operator') {
            setPerspective('operator');
          } else if (perspective === 'operator') {
            setPerspective('expert');
          }
        }}
        unreadInvitationsCount={
          connections.filter((c) => c.status === 'SENT' || c.status === 'CONTACT_PENDING').length
        }
      />

      {/* MODALS */}
      {/* 1. Expert Profile Modal (Image 5.png) */}
      <ExpertProfileModal
        expert={selectedExpert}
        isOpen={isExpertModalOpen}
        onClose={() => setIsExpertModalOpen(false)}
        onOpenConnect={(exp) => {
          setTargetExpertForConnect(exp);
          setIsConnectModalOpen(true);
        }}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* 2. Proposal Drawer Modal (Image 1.png) */}
      <ProposalModal
        demand={targetDemandForProposal}
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleSubmitProposal}
        remainingInvites={expertPlan.invitesPerMonth - expertPlan.invitesUsed}
      />

      {/* 3. Connect Modal (Image 5 & 9) */}
      <ConnectModal
        expert={targetExpertForConnect}
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onSubmit={handleSubmitConnect}
        remainingInvites={enterprisePlan.invitesPerMonth - enterprisePlan.invitesUsed}
      />

      {/* 4. Demand Detail Modal */}
      <DemandDetailModal
        demand={selectedDemandDetail}
        isOpen={isDemandDetailOpen}
        onClose={() => setIsDemandDetailOpen(false)}
        onOpenProposal={(d) => {
          setTargetDemandForProposal(d);
          setIsProposalModalOpen(true);
        }}
      />

      {/* 5. PRD Verification Standards Educational Modal */}
      <PrdModal
        isOpen={isPrdModalOpen}
        onClose={() => setIsPrdModalOpen(false)}
      />

      {/* 6. Membership Packages Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={currentPlan}
        onSelectPlan={(newPlan) => {
          if (newPlan.targetRole === 'expert') {
            setExpertPlan(newPlan);
          } else {
            setEnterprisePlan(newPlan);
          }
          setIsUpgradeModalOpen(false);
          showToast(`Đã kích hoạt ${newPlan.name} thành công!`);
        }}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}
