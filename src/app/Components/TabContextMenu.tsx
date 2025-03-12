import Image from 'next/image';
import Pinn from './image/Pinn.svg';

type TabContextMenuProps = {
  showContextMenu: boolean;
  contextMenuPosition: { top: number; left: number };
  handlePinTab: () => void;
};

export default function TabContextMenu({
  showContextMenu,
  contextMenuPosition,
  handlePinTab,
}: TabContextMenuProps) {
  return (
    showContextMenu && (
      <div
        className="absolute p-2 bg-white border border-gray-300 rounded-md shadow-lg"
        style={{
          top: `${contextMenuPosition.top + 10}px`,
          left: `${contextMenuPosition.left - 140}px`,
        }}
      >
        <button onClick={handlePinTab} className="flex justify-center">
          <Image src={Pinn} alt="Pin" width={15} height={15} className="mr-1" />
          Tab anpinnen
        </button>
      </div>
    )
  );
}
