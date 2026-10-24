import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import SavedLists from "./pages/SavedLists";
import SavedListDetails from "./pages/SavedListDetails";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/saved-lists" element={<SavedLists />} />
        <Route path="/saved-lists/:listId" element={<SavedListDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
