"use client";
import React from 'react';
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
import DeleteTab from "./image/deleteTab.svg"
import DeleteTabList from "./image/deleteTabList.svg"


export default function Home() {
  const [activeTab, setActiveTab] = useState(2);
  const [showDropdown, setShowDropdown] = useState(false);
  const [tabsToShow, setTabsToShow] = useState<number[]>([]);
  const [extraTabs, setExtraTabs] = useState<number[]>([]);
  const [pinnedTabs, setPinnedTabs] = useState<number[]>([1]);
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuTabId, setContextMenuTabId] = useState<number | null>(null);
  const [contextMenuPosition, setContextMenuPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [draggingTabId, setDraggingTabId] = useState<number | null>(null);
  const [dragOverTabId, setDragOverTabId] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; icon: React.ReactNode; x: number; y: number } | null>(null);



  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const initialTabsData = [
    { id: 1, name: "Lagerverwaltung", icon: <Icon1 className="w-4 h-4  " />, url: "/Lagerverwaltung" },
    { id: 2, name: "Dashboard", icon: <Icon2 className="w-4 h-4  " />, url: "/Dashboard" },
    { id: 3, name: "Banking", icon: <Icon3 className="w-4 h-4  " />, url: "/Banking" },
    { id: 4, name: "Telefonie", icon: <Icon4 className="w-4 h-4 " />, url: "/Telefonie" },
    { id: 5, name: "Accounting", icon: <Icon5 className="w-4 h-4 " />, url: "/Accounting" },
    { id: 6, name: "Verkauf", icon: <Icon6 className="w-4 h-4 " />, url: "/Verkauf" },
    { id: 7, name: "Statistik", icon: <Icon7 className="w-4 h-4 " />, url: "/Statistik" },
    { id: 8, name: "Post Office", icon: <Icon8 className="w-4 h-4 " />, url: "/Post-Office" },
    { id: 9, name: "Administration", icon: <Icon9 className="w-4 h-4 " />, url: "/Administration" },
    { id: 10, name: "Help", icon: <Icon10 className="w-4 h-4 " />, url: "/Help" },
    { id: 11, name: "Warenbestand", icon: <Icon11 className="w-4 h-4 " />, url: "/Warenbestand" },
    { id: 12, name: "Auswahllisten", icon: <Icon12 className="w-4 h-4 " />, url: "/Auswahllisten" },
    { id: 13, name: "Einkauf", icon: <Icon13 className="w-4 h-4 " />, url: "/Einkauf" },
  ];

  const [tabsData, setTabsData] = useState(initialTabsData);
  const handleMouseEnter = (e: React.MouseEvent, tab: { id: number; name: string; icon: React.ReactNode }) => {
    if (pinnedTabs.includes(tab.id)) {
      const { clientX, clientY } = e;
      setTooltip({
        name: tab.name,
        icon: tab.icon,
        x: clientX + 10,
        y: clientY + 10,
      });
    }
  };



  const handleMouseLeave = () => {
    setTooltip(null);
  };

  useEffect(() => {
    const savedTabsOrder = localStorage.getItem("tabsOrder");
    const savedPinnedTabs = localStorage.getItem("pinnedTabs");

    if (savedTabsOrder) {
      const parsedTabsOrder = JSON.parse(savedTabsOrder);
      const orderedTabs = parsedTabsOrder.map((tab: { id: number }) =>
        tabsData.find((tabData) => tabData.id === tab.id)
      ).filter(Boolean);
      setTabsData(orderedTabs);
    } else {

      setTabsData(initialTabsData);
    }

    if (savedPinnedTabs) {
      const parsedPinnedTabs = JSON.parse(savedPinnedTabs);
      setPinnedTabs(parsedPinnedTabs);
    } else {

      setPinnedTabs([1]);
    }
  }, []);



  useEffect(() => {
    const tabsOrder = tabsData.map(tab => ({ id: tab.id, name: tab.name }));
    const pinnedTabsOrder = pinnedTabs;
    localStorage.setItem("tabsOrder", JSON.stringify(tabsOrder));
    localStorage.setItem("pinnedTabs", JSON.stringify(pinnedTabsOrder));
  }, [tabsData, pinnedTabs]);
  const handleResetTabs = () => {
    localStorage.removeItem("tabsOrder");
    localStorage.removeItem("pinnedTabs");


    setTabsData(initialTabsData);
    setPinnedTabs([1]);
  };


  const handleTabClick = (id: number, url: string) => {
    setActiveTab(id);
    router.push(url);


    const tabElement = document.getElementById(`tab-${id}`);
    if (tabElement) {
      tabElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
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

      if (!updatedPinnedTabs.includes(contextMenuTabId)) {
        updatedPinnedTabs.push(contextMenuTabId);
      }

      setPinnedTabs(updatedPinnedTabs);
      setShowContextMenu(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, tabId: number) => {
    setDraggingTabId(tabId);
  };

  const handleDragOver = (e: React.DragEvent, tabId: number) => {
    e.preventDefault();
    setDragOverTabId(tabId);
  };

  const handleDrop = (e: React.DragEvent, tabId: number) => {
    e.preventDefault();

    if (draggingTabId && dragOverTabId && draggingTabId !== dragOverTabId) {
      const newTabsData = [...tabsData];
      const draggingIndex = newTabsData.findIndex(tab => tab.id === draggingTabId);
      const dropIndex = newTabsData.findIndex(tab => tab.id === tabId);


      const [draggedTab] = newTabsData.splice(draggingIndex, 1);
      newTabsData.splice(dropIndex, 0, draggedTab);

      setTabsData(newTabsData);
    }

    setDraggingTabId(null);
    setDragOverTabId(null);
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

  const handleDeleteTab = (tabId: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setTabsData((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
  };

  return (
    <div className="flex w-full">
      <div className="hidden lg:block w-1/12 bg-white"></div>
      <div className="w-11/12 flex flex-col relative">
        <div className="h-[69px] bg-white ml-0.5 mb-0.5"></div>
        <div ref={tabsContainerRef} className="flex overflow-x-auto space-x-0.5">
          {tabsData
            .filter((tab) => pinnedTabs.includes(tab.id))
            .concat(tabsData.filter((tab) => !pinnedTabs.includes(tab.id)))
            .map((tab) => {
              const isVisible = tabsToShow.includes(tab.id);
              const isPinned = pinnedTabs.includes(tab.id);

              return (
                <div
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  className={`flex items-center p-2.5 min-w-fit cursor-pointer ${activeTab === tab.id
                    ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500"
                    : "bg-white text-gray-500"
                    } ${isPinned ? "h-12 border-t-4 rounded-e-xs rounded-l-xs border-solid border-gray-500" : ""} ${activeTab !== tab.id
                      ? "hover:bg-gray-100 hover:fill-black hover:text-black"
                      : ""
                    } ${draggingTabId === tab.id ? "opacity-20 " : ""} relative `}
                  onClick={() => handleTabClick(tab.id, tab.url)}
                  onContextMenu={(e) => handleRightClick(e, tab.id)}
                  onMouseEnter={(e) => handleMouseEnter(e, tab)}
                  onMouseLeave={handleMouseLeave}
                  draggable
                  onDragStart={(e) => handleDragStart(e, tab.id)}
                  onDragOver={(e) => handleDragOver(e, tab.id)}
                  onDrop={(e) => handleDrop(e, tab.id)}

                >
                  {isPinned ? (
                    <>{tab.icon}</>
                  ) : (
                    <>
                      {tab.icon}
                      <span className="ml-2 mr-4">{tab.name}</span>
                      <DeleteTab
                        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleDeleteTab(tab.id, e)}
                        className="w-4 h-4 mr-2 cursor-pointer opacity-0 transition-opacity duration-300 absolute right-0 top-1/2 transform -translate-y-1/2 hover:opacity-100"
                      />
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
              top: `${contextMenuPosition.top + 10}px`,
              left: `${contextMenuPosition.left - 140}px`,
            }}
          >
            <button onClick={handlePinTab} className="flex justify-center text-gray-500 cursor-pointer">
              <Pinn className="w-4 h-4 mr-2" />
              Tab anpinnen
            </button>
          </div>
        )}

        <div
          className={`p-2.5 min-w-fit h-12 absolute right-0 top-[95px] transform -translate-y-1/2 cursor-pointer z-10 flex justify-center items-center ${showDropdown ? 'bg-blue-500' : 'bg-white'}`}
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {showDropdown ? (
            <ArrowUp className="w-2.5 h-2.5" />
          ) : (
            <ArrowDown className="w-2.5 h-2.5" />
          )}
        </div>
        {tooltip && (
          <div
            className="absolute bg-white p-2 shadow-lg rounded-md border border-gray-300"
            style={{
              top: `${tooltip.y - 5}px`,
              left: `${tooltip.x - 140}px`,
              zIndex: 10,
            }}
          >
            <div className="flex items-center space-x-2">
              {tooltip.icon}
              <span>{tooltip.name}</span>
            </div>
          </div>
        )}
        {showDropdown && (
          <div className="absolute right-0 top-28 w-[225px] bg-white border-2 border-gray-300 rounded-xl shadow-lg z-50 overflow-auto">
            {tabsData
              .filter((tab) => extraTabs.includes(tab.id))
              .map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center p-2.5 min-w-fit border-b-2 border-b-gray-100 ${activeTab === tab.id
                    ? "bg-gray-100 text-black border-t-4 rounded-e-xs rounded-l-xs border-solid border-blue-500"
                    : "bg-white text-gray-500"
                    }`}
                  onClick={() => handleTabClick(tab.id, tab.url)}
                >
                  {tab.icon}
                  <span className="w-44 ml-2 flex justify-between items-start">{tab.name}  <DeleteTabList
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => handleDeleteTab(tab.id, e)}
                    className="w-4 ml-6 h-4 cursor-pointer"
                  /></span>
                </div>
              ))}
          </div>
        )}

        <div className="w-full h-[80vh] bg-white  border-gray-300/20 rounded-xl border-2 flex justify-end items-end"><button className=" w-10 h-10 rounded-4xl  bg-blue-500" onClick={handleResetTabs}></button>
        </div>
      </div>

    </div>
  );
}
