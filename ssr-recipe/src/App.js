import { Route, Routes } from "react-router-dom";
import Menu from "./component/Menu";
import RedPage from "./component/pages/RedPage";
import BluePage from "./component/pages/BluePage";
function App() {
  return (
    <div style={{ color: "black" }}>
      hello
      <hr />
      <Menu />
      <Routes>
        <Route path="/red" element={<RedPage />}></Route>
        <Route path="/blue" element={<BluePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
