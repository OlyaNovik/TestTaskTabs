import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TabType } from './types';

type TabProps = {
    tab: TabType;
    activeTab: number;
    pinnedTabs: number[];
    onClick: (id: number, url: string) => void;
    onRightClick: (e: React.MouseEvent, tabId: number) => void;
    isVisible: boolean;
};

export default function Tab({ tab, activeTab, pinnedTabs, onClick, onRightClick, isVisible }: TabProps) {
    const isPinned = pinnedTabs.includes(tab.id);

    // Якщо вкладка не видима, повертаємо null
    if (!isVisible) return null;

    return (
        <div
            key={tab.id}
            className={`flex items-center p-2.5 min-w-fit ${activeTab === tab.id ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500" : "bg-white text-gray-500"} ${isPinned ? "h-12 border-t-4 rounded-e-xs rounded-l-xs border-solid border-gray-500" : ""}`}
            onClick={() => onClick(tab.id, tab.url)}
            onContextMenu={(e) => onRightClick(e, tab.id)}
        >
            {isPinned ? (
                <Image src={tab.icon} alt={tab.name} width={16} height={16} />
            ) : (
                <>
                    <Image src={tab.icon} alt={tab.name} width={16} height={16} />
                    <span className="ml-2">{tab.name}</span>
                </>
            )}
        </div>
    );
}
