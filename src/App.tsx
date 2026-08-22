import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import ClaimsPage from "./pages/ClaimsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ItemDetailPage from "./pages/ItemDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* PUBLIC ROUTES */}
        <Route index element={<DashboardPage />} />

        <Route path="items" element={<ItemsPage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />

        <Route path="login" element={<LoginPage />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="claims" element={<ClaimsPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  );
}

export default App;