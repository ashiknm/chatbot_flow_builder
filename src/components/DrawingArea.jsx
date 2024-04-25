/* eslint-disable react/prop-types */
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { useMemo, useEffect } from "react";
import CustomNode from "./CustomMessageNode";

import { useNodeStores } from "../stores/nodeStore";

export default function DrawingArea() {
  // get states from austand
  const { nodes } = useNodeStores((state) => state.nodes) || [];
  const { edges } = useNodeStores((state) => state.edges) || [];
  const { draggedItem } = useNodeStores((state) => state.draggedItem) || {};
  const { getLocalData } = useNodeStores((state) => state.getLocalData);
  const { selectedNode } = useNodeStores((state) => state.selectedNode);
  const { getUpdatedNotes } = useNodeStores((state) => state.getUpdatedNotes);
  const { createNewNode } = useNodeStores((state) => state.createNewNode);

  //default functions used from React Flow
  const { onNodesChange } = useNodeStores((state) => state.onNodesChange);
  const { onEdgesChange } = useNodeStores((state) => state.onEdgesChange);
  const { onConnect } = useNodeStores((state) => state.onConnect);

  // whenever component mounts get the data from local storage
  useEffect(() => {
    getLocalData();
  }, [getLocalData]);

  // to render nodes whwnever selected node is being updated
  useEffect(() => {
    if (selectedNode) {
      getUpdatedNotes();
    }
  }, [getUpdatedNotes, selectedNode]);

  //  to use in react flow
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  //   function to  handle when user drags the component from node pannel
  const onDrop = (event) => {
    // Prevent the default behavior of the drop event to avoid unwanted browser actions
    event.preventDefault();

    // Check if there is a dragged item available
    if (draggedItem) {
      // Get the bounding rectangle of the drop container to calculate offsets
      const containerRect = event.currentTarget.getBoundingClientRect();

      // Calculate percentage offsets based on the position of the drop event relative to the container
      const offsetX =
        ((event.clientX - containerRect.left) / window.innerWidth) * 100;
      const offsetY =
        ((event.clientY - containerRect.top) / window.innerHeight) * 100;

      // Generate a new node object with a random ID, custom type, and adjusted position using percentage offsets
      const newNode = {
        id: (Math.random() * 100000).toString(), 
        type: "custom", 
        position: { x: offsetX, y: offsetY }, 
        data: draggedItem, 
      };

      // Call the createNewNode function to add the new node to the graph
      createNewNode(newNode);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <main className="w-[70%] h-full">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </main>
  );
}
