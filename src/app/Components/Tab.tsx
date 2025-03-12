import Image from 'next/image';

type TabProps = {
  tab: { id: number; name: string; icon: string; url: string };
  activeTab: number;
  isPinned: boolean;
  isVisible: boolean;
  onClick: (id: number, url: string) => void;
  onRightClick: (e: React.MouseEvent, tabId: number) => void;
};

export default function Tab({
  tab,
  activeTab,
  isPinned,
  isVisible,
  onClick,
  onRightClick,
}: TabProps) {
  if (!isVisible) return null; // Якщо таб не видимий, не рендерити його

  return (
    <div
      key={tab.id}
      className={`flex items-center p-2.5 min-w-fit ${activeTab === tab.id
        ? 'bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500'
        : 'bg-white text-gray-500'} ${isPinned ? 'h-12 border-t-4 rounded-e-xs rounded-l-xs border-solid border-gray-500' : ''}`}
      onClick={() => onClick(tab.id, tab.url)}
      onContextMenu={(e) => onRightClick(e, tab.id)}
    >
      <Image src={tab.icon} alt={tab.name} width={16} height={16} />
      {!isPinned && <span className="ml-2">{tab.name}</span>}
    </div>
  );
}
