import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import SavedLists from "./pages/SavedLists";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saved-lists" element={<SavedLists />} />
      </Route>
    </Routes>
  );
}

export default App;
