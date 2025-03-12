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
import ArrowUp from "./image/Arrow_up.svg";
import ArrowDown from "./image/Arrow_down.svg";

export default function Home() {
  const [activeTab, setActiveTab] = useState(2); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const [tabsToShow, setTabsToShow] = useState<number[]>([]); 
  const [extraTabs, setExtraTabs] = useState<number[]>([]); 
  const tabsContainerRef = useRef<HTMLDivElement | null>(null); 

  const router = useRouter();

  const tabsData = [
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
    { id: 14, name: 'Rechn', icon: Icon1, url: '/Rechn' },
  ];

  const handleTabClick = (id: number, url: string) => {
    setActiveTab(id);
    router.push(url);
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
        <div
          ref={tabsContainerRef}
          className="flex overflow-x-auto space-x-0.5 items-center"
        >
          {tabsData.map((tab) => {
            const isVisible = tabsToShow.includes(tab.id);
            return (
              <div
                key={tab.id}
                className={`flex items-center p-2.5 min-w-fit ${activeTab === tab.id
                  ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500"
                  : "bg-white text-gray-500"
                  } ${activeTab !== tab.id
                    ? "hover:bg-gray-100 hover:text-black hover:border-t-4 hover:rounded-e-xs hover:rounded-l-xs hover:border-solid hover:border-gray-500"
                    : ""
                  }`}
                onClick={() => handleTabClick(tab.id, tab.url)}
                style={{ display: isVisible ? "flex" : "none" }}
              >
                <Image src={tab.icon} alt={tab.name} width={16} height={16} />
                {tab.id !== 1 && (
                  <span className="ml-2">{tab.name}</span>
                )}
              </div>
            );
          })}
        </div>


        <div
          className={`p-2.5 min-w-fit h-11 absolute right-0 top-[95px] transform -translate-y-1/2 cursor-pointer bg-white z-10 flex justify-center ${showDropdown ? 'bg-blue-500' : 'bg-white'}`}
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
