import NodePannel from "./NodePannel";
import Settings from "./Settings";
import { useNodeStores } from "../stores/nodeStore";

export default function Sidebar() {
  const { selectedNode } = useNodeStores((state) => state.selectedNode);

  return (
    <div className="w-[30%] h-full border">
      {selectedNode ? <Settings /> : <NodePannel />}
    </div>
  );
}
