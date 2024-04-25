import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNodeStores } from "../stores/nodeStore";

export default function Settings() {
  const { selectedNode } = useNodeStores((state) => state.selectedNode);
  const { deSelectNode } = useNodeStores((state) => state.deSelectNode);
  const { handleUpdateNode } = useNodeStores((state) => state.handleUpdateNode);
  const { handleDeleteNode } = useNodeStores((state) => state.handleDeleteNode);

  return (
    <section>
      <div className="flex w-full items-center py-2 border-b border-dark gap-x-3 px-3">
        <ArrowLeftIcon className="cursor-pointer" onClick={deSelectNode} />
        <div className="flex w-full justify-center">
          <h2 className="font-semibold">Message</h2>
        </div>
      </div>
      <div className="p-4 border-b flex flex-col ">
        <h2 className="mt-4 text-gray-400">Text</h2>
        <textarea
          rows={4}
          cols={10}
          value={selectedNode?.label}
          onChange={handleUpdateNode}
          maxLength={20}
          className="w-full border mt-3 p-2"
        />

        <button
          onClick={handleDeleteNode}
          className="border w-[70px] text-center ms-auto mt-3 p-2 rounded border-red-500"
        >
          Delete
        </button>
      </div>
    </section>
  );
}
