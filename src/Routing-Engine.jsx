import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProtectedRoutes from "./Routing/Protected_Routes";
import P_Login from "./Components/Pages/Auth/P_Login";
import P_Dashboard from "./Components/Pages/Dashboard/P_Dashboard";
import Drawer from "./App";
import P_PageEditor from "./Components/Pages/Page Editor/P_PageEditor";

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
            path="/client-editor"
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
            path="/chart-editor"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"chart-editor"}>
                  <P_PageEditor />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/products"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"products"}>
                  <P_PageEditor />
                </Drawer>
              </ProtectedRoutes>
            }
          ></Route>{" "}
          <Route
            path="/categories"
            exact
            element={
              <ProtectedRoutes>
                <Drawer activePage={"categories"}>
                  <P_PageEditor />
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
