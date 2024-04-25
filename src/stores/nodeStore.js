// DraggedItemContext.js
import { create } from "zustand";
import { applyEdgeChanges, applyNodeChanges, addEdge } from "reactflow";

const useNodeStore = create((set, get) => ({
  // states
  draggedItem: null,
  selectedNode: null,
  nodes: [],
  edges: [],
  saveStatus: null,

  //   Actions

//   to create a new node
  createNewNode: (newNode) => {
    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },


//   React flow funtions
  onNodesChange: (changes) => {
    const state = get();
    const updatedNodes = applyNodeChanges(changes, state.nodes);
    set({ nodes: updatedNodes });
  },

  onEdgesChange: (changes) => {
    const state = get();
    const updatedEdges = applyEdgeChanges(changes, state.edges);
    set({ edges: updatedEdges });
  },

  onConnect: (params) => {
    const state = get();
    const updatedEdges = addEdge(params, state.edges);
    set({ edges: updatedEdges });
  },

//   -------------------------------------------

// when user click on back arrow
  deSelectNode: () => {
    set(() => ({
      selectedNode: null,
    }));
  },

//  create a draggable item
  onDragStart: () => {
    const state = get();
    set(() => ({
      draggedItem: { label: `message ${state.nodes.length + 1}` },
    }));
  },


//   to handle the delete of a node
  handleDeleteNode: () => {
    const state = get();

    // Filter out the selected node
    const updatedNodes = state.nodes.filter(
      (node) => node.id !== state.selectedNode.id
    );

    set(() => ({
      nodes: updatedNodes,
    }));

    // Find the edge connected to the selected node and remove it
    const updatedEdges = state.edges.filter(
      (edge) =>
        edge.source !== state.selectedNode.id &&
        edge.target !== state.selectedNode.id
    );

    set(() => ({
      edges: updatedEdges,
      selectedNode: null,
    }));

  },


//   function to save the data
  handleSaveChanges: () => {
    const state = get();

    // check for nodes with no edges
    const hasNodeWithNoEdges = state.nodes.some(
      (node) =>
        !state.edges.some(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    //check for more than 1 node with empty edges 
    if (hasNodeWithNoEdges && state.nodes.length > 1) {
      // Display an error message or perform appropriate action
      set(() => ({
        saveStatus: { error: true, message: "Cannot Save Flow" },
      }));
    } else {
        // save in local storage
      localStorage.setItem("nodes", JSON.stringify(state.nodes));
      localStorage.setItem("edges", JSON.stringify(state.edges));
      set(() => ({
        saveStatus: { error: false, message: "Flow Saved Successfully" },
      }));
    }
  },

//   functionm to remove data from local storage
  handleClear: () => {
    set(() => ({
      nodes: [],
      edges: [],
    }));
    localStorage.setItem("nodes", JSON.stringify([]));
    localStorage.setItem("edges", JSON.stringify([]));
    set(() => ({
      saveStatus: { error: false, message: "Data Cleared Succesfully" },
    }));
  },

//   update the node based on the text added in textArea
  handleUpdateNode: (e) => {
    set((state) => ({
      selectedNode: { ...state.selectedNode, label: e.target.value },
    }));
  },

//   function to get data from local storage
  getLocalData: () => {
    const storedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
    const storedEdges = JSON.parse(localStorage.getItem("edges")) || [];
    set(() => ({
      nodes: storedNodes,
      edges: storedEdges,
    }));
  },

//   get all the updated notes
  getUpdatedNotes: () => {
    const state = get();
    const updatedNodes = state.nodes?.map((node) => {
      if (node.id == state.selectedNode.id) {
        // Update label for the selected node
        return { ...node, data: { label: state.selectedNode.label } }; 
      }
      // Return unchanged node for other nodes
      return node; 
    });
    set(() => ({
      nodes: updatedNodes,
    }));
  },

//   remove the status of the save action after 1.7 seconds
  getSaveStatus: () => {
    const timer = setTimeout(() => {
      set(() => ({
        saveStatus: null,
      }));
    }, 1700);

    // Cleanup function to clear the timer when the component unmounts or saveStatus changes
    return () => clearTimeout(timer);
  },

//   function to set the selected node
  onSelectNode: (newData) => {
    set(() => ({
      selectedNode: newData,
    }));
  }

}));

export const useNodeStores = () => useNodeStore((state) => state);
