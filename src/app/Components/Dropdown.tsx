import Image from 'next/image';
import ArrowUp from './image/Arrow_up.svg';
import ArrowDown from './image/Arrow_down.svg';

type DropdownProps = {
    activeTab: number;
  showDropdown: boolean;
  tabsData: { id: number; name: string; icon: string; url: string }[];
  extraTabs: number[];
  onTabClick: (id: number, url: string) => void;
  toggleDropdown: () => void;
};

export default function Dropdown({
    activeTab,
  showDropdown,
  tabsData,
  extraTabs,
  onTabClick,
  toggleDropdown,
}: DropdownProps) {
  return (
    <div>
      <div
        className={`p-2.5 min-w-fit h-12 absolute right-0 top-[95px] transform -translate-y-1/2 cursor-pointer z-10 flex justify-center ${showDropdown ? 'bg-blue-500' : 'bg-white'}`}
        onClick={toggleDropdown}
      >
        {showDropdown ? (
          <Image src={ArrowUp} alt="Arrow Up" width={10} height={6} />
        ) : (
          <Image src={ArrowDown} alt="Arrow Down" width={10} height={6} />
        )}
      </div>

      {showDropdown && (
        <div className="absolute right-0 top-28 w-[225px] bg-white border-2 border-gray-300 rounded-xl shadow-lg z-50 overflow-auto">
          {tabsData
            .filter((tab) => extraTabs.includes(tab.id))
            .map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center p-2.5 min-w-fit ${tab.id === activeTab ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500" : "bg-white text-gray-500"}`}
                onClick={() => onTabClick(tab.id, tab.url)}
              >
                <Image src={tab.icon} alt={tab.name} width={16} height={16} />
                <span className="ml-2">{tab.name}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
