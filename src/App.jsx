import DrawingArea from "./components/DrawingArea";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
      <div className="w-[100%] ">
        <Header />
        <div className="flex w-full mainArea">
          <DrawingArea />
          <Sidebar />
        </div>
      </div>
  );
}

export default App;
