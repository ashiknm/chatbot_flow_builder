// Node Pannel Component
import MessageNode from "./MessageNode";
import { useNodeStores } from "../stores/nodeStore";

export default function NodePannel() {
  const { onDragStart } = useNodeStores((state)=>state.onDragStart);
  return (
    <div className="p-3">
        {/* list all the nodes */}
      <MessageNode onDragStart={onDragStart} />
    </div>
  );
}
