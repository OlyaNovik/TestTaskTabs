import { useEffect, useRef, useState } from 'react';
import Tab from './Tab';
import Dropdown from './Dropdown';

type TabsContainerProps = {
  tabsData: { id: number; name: string; icon: string; url: string }[]; // Список табів
  activeTab: number; // Активний таб
  pinnedTabs: number[]; // Закріплені таби
  onClick: (id: number, url: string) => void; // Обробник кліку по табу
  onRightClick: (e: React.MouseEvent, tabId: number) => void; // Обробник правого кліку
};

export default function TabsContainer({
  tabsData,
  activeTab,
  pinnedTabs,
  onClick,
  onRightClick,
}: TabsContainerProps) {
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  // Додаємо стани для tabsToShow та extraTabs
  const [tabsToShow, setTabsToShow] = useState<number[]>([]);
  const [extraTabs, setExtraTabs] = useState<number[]>([]);

  // Функція для оновлення видимих табів
  const updateTabsVisibility = () => {
    if (tabsContainerRef.current) {
      const containerWidth = tabsContainerRef.current.offsetWidth;
      const tabWidth = 115; // Ширина одного таба
      const visibleTabsCount = Math.floor(containerWidth / tabWidth); // Кількість видимих табів
      const visibleTabs = tabsData.slice(0, visibleTabsCount); // Видимі таби
      const hiddenTabs = tabsData.slice(visibleTabsCount); // Сховані таби

      setTabsToShow(visibleTabs.map(tab => tab.id)); // Оновлюємо стани
      setExtraTabs(hiddenTabs.map(tab => tab.id)); // Оновлюємо стани
    }
  };

  useEffect(() => {
    updateTabsVisibility();
    window.addEventListener('resize', updateTabsVisibility); // Оновлюємо при зміні розміру вікна

    return () => {
      window.removeEventListener('resize', updateTabsVisibility); // Видаляємо слухач на resize
    };
  }, [tabsData]); // Залежить від tabsData

  return (
    <div ref={tabsContainerRef} className="flex overflow-x-auto space-x-0.5">
      {tabsData
        .filter((tab) => pinnedTabs.includes(tab.id)) // Спочатку відображаємо закріплені таби
        .concat(tabsData.filter((tab) => !pinnedTabs.includes(tab.id))) // Потім інші таби
        .map((tab) => {
          const isVisible = tabsToShow.includes(tab.id); // Перевірка видимості
          const isPinned = pinnedTabs.includes(tab.id); // Перевірка закріплення

          return (
            <Tab
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              isPinned={isPinned}
              isVisible={isVisible}
              onClick={onClick}
              onRightClick={onRightClick}
            />
          );
        })}
    </div>
  );
}
