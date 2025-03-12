"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Icon1 from "./image/icon1.svg";
import Icon2 from "./image/icon2.svg";
import Icon3 from "./image/icon3.svg";
import Icon4 from "./image/icon4.svg";
import Icon5 from "./image/icon5.svg";
import Icon6 from "./image/icon6.svg";
import Icon7 from "./image/icon7.svg";
import Icon8 from "./image/icon8.svg";
import Icon9 from "./image/icon9.svg";
import Icon10 from "./image/icon10.svg";
import Icon11 from "./image/icon11.svg";
import Icon12 from "./image/icon12.svg";
import Icon13 from "./image/icon13.svg";
import Pinn from "./image/Pinn.svg";
import ArrowUp from "./image/Arrow_up.svg";
import ArrowDown from "./image/Arrow_down.svg";

export default function Home() {
  const [activeTab, setActiveTab] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tabsToShow, setTabsToShow] = useState<number[]>([]);
  const [extraTabs, setExtraTabs] = useState<number[]>([]);
  const [pinnedTabs, setPinnedTabs] = useState<number[]>([1]); // Початково закріплюємо перший таб
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuTabId, setContextMenuTabId] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const [tabsData, setTabsData] = useState([
    { id: 1, name: 'Lagerverwaltung', icon: Icon1, url: '/Lagerverwaltung' },
    { id: 2, name: 'Dashboard', icon: Icon2, url: '/Dashboard' },
    { id: 3, name: 'Banking', icon: Icon3, url: '/Banking' },
    { id: 4, name: 'Telefonie', icon: Icon4, url: '/Telefonie' },
    { id: 5, name: 'Accounting', icon: Icon5, url: '/Accounting' },
    { id: 6, name: 'Verkauf', icon: Icon6, url: '/Verkauf' },
    { id: 7, name: 'Statistik', icon: Icon7, url: '/Statistik' },
    { id: 8, name: 'Post Office', icon: Icon8, url: '/Post-Office' },
    { id: 9, name: 'Administration', icon: Icon9, url: '/Administration' },
    { id: 10, name: 'Help', icon: Icon10, url: '/Help' },
    { id: 11, name: 'Warenbestand', icon: Icon11, url: '/Warenbestand' },
    { id: 12, name: 'Auswahllisten', icon: Icon12, url: '/Auswahllisten' },
    { id: 13, name: 'Einkauf', icon: Icon13, url: '/Einkauf' },
  ]);


  const handleTabClick = (id: number, url: string) => {
    setActiveTab(id);
    router.push(url);
  };

  const handleRightClick = (e: React.MouseEvent, tabId: number) => {
    e.preventDefault();
    setContextMenuTabId(tabId);
    setShowContextMenu(true);


    const mouseEvent = e.nativeEvent as MouseEvent;
    const { clientX, clientY } = mouseEvent;


    setContextMenuPosition({ top: clientY, left: clientX });
  };

  const handlePinTab = () => {
    if (contextMenuTabId !== null) {
      const updatedPinnedTabs = [...pinnedTabs];

      // Додаємо таб до закріплених, якщо його ще немає
      if (!updatedPinnedTabs.includes(contextMenuTabId)) {
        updatedPinnedTabs.push(contextMenuTabId);
      }

      // Оновлюємо закріплені таби
      setPinnedTabs(updatedPinnedTabs);

      // Закриваємо контекстне меню після кліку
      setShowContextMenu(false);
    }
  };





  const updateTabsVisibility = () => {
    if (tabsContainerRef.current) {
      const containerWidth = tabsContainerRef.current.offsetWidth;
      const tabWidth = 115;
      const visibleTabsCount = Math.floor(containerWidth / tabWidth);

      const visibleTabs = tabsData.slice(0, visibleTabsCount);
      const hiddenTabs = tabsData.slice(visibleTabsCount);

      setTabsToShow(visibleTabs.map(tab => tab.id));
      setExtraTabs(hiddenTabs.map(tab => tab.id));
    }
  };

  useEffect(() => {
    updateTabsVisibility();
    window.addEventListener("resize", updateTabsVisibility);

    return () => {
      window.removeEventListener("resize", updateTabsVisibility);
    };
  }, []);

  return (
    <div className="flex w-full">
      <div className="w-1/12 bg-white"></div>
      <div className="w-11/12 flex flex-col relative">
        <div className="h-[69px] bg-white ml-0.5 mb-0.5"></div>
        <div ref={tabsContainerRef} className="flex overflow-x-auto space-x-0.5 ">
          {tabsData
            .filter((tab) => pinnedTabs.includes(tab.id)) // Фільтруємо закріплені таби
            .concat(tabsData.filter((tab) => !pinnedTabs.includes(tab.id))) // Додаємо інші таби
            .map((tab) => {
              const isVisible = tabsToShow.includes(tab.id);
              const isPinned = pinnedTabs.includes(tab.id); // Перевірка на закріплений таб

              return (
                <div
                  key={tab.id}
                  className={`flex items-center p-2.5 min-w-fit ${activeTab === tab.id
                      ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500"
                      : "bg-white text-gray-500"
                    } ${isPinned ? "h-12 border-t-4 rounded-e-xs rounded-l-xs border-solid border-gray-500" : ""} ${activeTab !== tab.id
                      ? "hover:bg-gray-100 hover:text-black "
                      : ""
                    }`}
                  onClick={() => handleTabClick(tab.id, tab.url)}
                  onContextMenu={(e) => handleRightClick(e, tab.id)} // Обробляємо правий клік
                  style={{ display: isVisible ? "flex" : "none" }}
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
            })}


        </div>


        {showContextMenu && contextMenuTabId !== null && (
  <div
    className="absolute p-2 bg-white border border-gray-300 rounded-md shadow-lg"
    style={{
      top: `${contextMenuPosition.top + 10}px`, // додаємо невеликий відступ вниз
      left: `${contextMenuPosition.left - 140}px`, // додаємо невеликий відступ вправо
    }}
  >
    <button onClick={handlePinTab} className="flex justify-center">
      <Image src={Pinn} alt="Arrow Up" width={15} height={15} className="mr-1" />
      Tab anpinnen
    </button>
  </div>
)}

        <div
          className={`p-2.5 min-w-fit h-12 absolute right-0 top-[95px] transform -translate-y-1/2 cursor-pointer z-10 flex justify-center ${showDropdown ? 'bg-blue-500' : 'bg-white'}`}
          onClick={() => setShowDropdown((prev) => !prev)}
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
                  className={`flex items-center p-2.5 min-w-fit ${activeTab === tab.id
                    ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500"
                    : "bg-white text-gray-500"
                    }`}
                  onClick={() => handleTabClick(tab.id, tab.url)}
                >
                  <Image src={tab.icon} alt={tab.name} width={16} height={16} />
                  <span className="ml-2">{tab.name}</span>
                </div>
              ))}
          </div>
        )}

        <div className="w-full h-[80vh] bg-white mt-4 ml-4 border-gray-300/20 rounded-xl border-2"></div>
      </div>
    </div>
  );
}
