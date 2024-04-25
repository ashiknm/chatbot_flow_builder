// Message Node component

import chatIcon from "../assets/chat.png";
export default function MessageNode({ onDragStart }) {
  return (
    <button
      className="border flex flex-col align-center justify-center border-blue-600 py-3 px-[40px] rounded text-blue-600"
      draggable
      onDragStart={onDragStart}
    >
      <img src={chatIcon} className="m-auto message-icon" />
      Message
    </button>
  );
}
