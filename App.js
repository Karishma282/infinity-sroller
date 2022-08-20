import { Route, Routes } from "react-router-dom";
import { Data } from "./component/Data";
import Scroll from "./component/Scroll";


export default function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Scroll />} />
        <Route path="/data/:id" element={<Data />} />
      </Routes>
    </div>
  );
}