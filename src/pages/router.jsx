import { Route, Routes } from "react-router-dom";

// Routes URLs
import { ROUTES } from "../constants/routes";

// Components

import Home from "./Home";
import DashboardLayout from "./Layout";



export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
     
      </Route>
    </Routes>
  );
}
