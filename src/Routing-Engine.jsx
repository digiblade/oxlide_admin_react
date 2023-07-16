import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./Routing/Protected_Routes";
import P_Login from "./Components/Pages/Auth/P_Login";
import P_Dashboard from "./Components/Pages/Dashboard/P_Dashboard";
import Drawer from "./App";
import P_PageEditor from "./Components/Pages/Page Editor/P_PageEditor";
import P_CrudPage from "./Components/Pages/Product Page/P_CrudPage";
import {
  categoryPage,
  productPage,
  subcategoryPage,
} from "./Configs/productPageConfig";
import P_PageEditorDetails from "./Components/Pages/Page Editor/P_PageEditorDetails";
import P_TemplateEditor from "./Components/Pages/Page Editor/P_TemplateEditor";

export default function RoutingEngine() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<P_Login />}></Route>
          <Route
            path="/dashboard"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"dashboard"}>
                  <P_Dashboard />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/page-editor"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"page-editor"}>
                  <P_PageEditor />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/page-editor/:pageId"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"page-editor"}>
                  <P_PageEditorDetails />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/:sourceLabel"
            exact
            element={
              <ProtectedRoutes>
                <Drawer>
                  <P_CrudPage {...productPage} pageLabel="Product Page" />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/template-editor/:pageId"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"page-editor"}>
                  <P_TemplateEditor />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"dashboard"}>
                  <P_Dashboard />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="*"
            element={<ProtectedRoutes>404 Page Not Found</ProtectedRoutes>}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}
