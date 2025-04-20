import { Route, Routes } from "react-router-dom";
//Routes urls
import { ROUTES } from "../constants/routes";
//Components
import { Button } from "@/components/ui/button";
export function Router({}) {
  return (
    <Routes>
      <Route
        element={
          <div className="">
            Home Page
            <Button variant="primary">Ad</Button>
          </div>
        }
        path={ROUTES.homePage}
      />
      <Route element={<h2>About</h2>} path={ROUTES.aboutPage} />
    </Routes>
  );
}
