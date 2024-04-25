// import { useDraggedItem } from "../contexts/DraggedItemContext";
import { useEffect } from "react";
import { useNodeStores } from "../stores/nodeStore";

export default function Header() {
  // get all states from zustand
  const { saveStatus } = useNodeStores((state) => state.saveStatus);
  const { handleSaveChanges } = useNodeStores(
    (state) => state.handleSaveChanges
  );
  const { handleClear } = useNodeStores((state) => state.handleClear);
  const { getSaveStatus } = useNodeStores((state) => state.getSaveStatus);

  // get the status whenever save status changes
  useEffect(() => {
    getSaveStatus();
  }, [getSaveStatus, saveStatus]);

  return (
    <nav className="h-[60px] w-full bg-gray-200 flex align-center">
      <div className="w-[70%] flex align-center justify-center">
        {/* only show when user perform save or reset function */}
        {saveStatus && (
          <button
            className={`${
              saveStatus.error ? "bg-orange-400" : "bg-green-400"
            }  h-[45px] m-auto p-2 rounded text-white`}
          >
            {saveStatus.message}
          </button>
        )}
      </div>
      <div className="w-[30%] flex justify-center">
        <div className="flex gap-x-3">
          {/* button to save the flow to local sorage */}
          <button
            className="border border-blue-800 h-[45px] m-auto p-2 rounded text-blue-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          {/* but to clear the flow from local storage */}
          <button
            className="border border-blue-800 h-[45px] m-auto p-2 rounded text-orange-400"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </nav>
  );
}
