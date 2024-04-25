import { Handle } from "reactflow";
import whatsappIcon from "../assets/social.png";
import chatIcon from "../assets/chat.png";
import { useNodeStores } from "../stores/nodeStore";

export default function CustomNode({ data, id }) {
  const { onSelectNode } = useNodeStores((state)=>state.onSelectNode);

  const handleNodeClick = () => {
    // Create a new object with the existing data and the id
    const newData = {
      ...data,
      id: id,
    };
    onSelectNode(newData);
  };

  return (
    <div
      className="w-[200px] shadow-lg rounded bg-white overflow-hidden"
      onClick={handleNodeClick}
    >
      <div className="flex flex-col">
        <div className="w-full h-6 px-2 flex justify-between items-center bg-blue-100">
          <div className="flex items-center gap-x-2">
            <img src={chatIcon} className="icon m-auto" />
            <h1 className="text-xs font-bold">Send Messages</h1>
          </div>
          <div className="icon-container flex">
            <img src={whatsappIcon} className="icon m-auto" />
          </div>
        </div>
        <div className="ml-2 py-2">
          <div className="text-sx ">{data.label}</div>
        </div>
      </div>

      <Handle type="target" position="left" className="w-1 h-1 bg-dark-100" />
      <Handle type="source" position="right" className="w-1 h-1 bg-dark-100" />
    </div>
  );
}
