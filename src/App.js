import React from "react";
import "./App.css";
import {
  Menu,
  Dashboard as DashboardIcon,
  BorderColor,
  Category,
  Sell,
  AddCircle,
} from "@mui/icons-material";
import user from "./Assets/Images/user.jpg";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Drawer({ children, activePage }) {
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const navigate = useNavigate();
  return (
    <div className="App">
      <div
        className={`App-header ${
          isDrawerOpen ? "show-dashboard" : "hide-dashboard"
        }`}
      >
        <aside style={{ display: `${isDrawerOpen ? "block" : "none"}` }}>
          <div className="close-icon-with-logo">
            <div className="">Logo</div>
            <div
              className="close-button"
              onClick={() => {
                setDrawerOpen(false);
              }}
            >
              X
            </div>
          </div>

          <div className="drawer-header">
            <Image src={user} roundedCircle width={50} height="50"></Image>
            <div className="profile-name">Akash Chourasia (Super Admin)</div>
          </div>
          <hr />
          <div className="list-menu">
            <div
              className={`list-item ${
                activePage === "dashboard" ? "active" : ""
              }`}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <DashboardIcon />
              Dashboard
            </div>
            <div
              className={`list-item ${
                activePage === "page-editor" ? "active" : ""
              }`}
              onClick={() => {
                navigate("/page-editor");
              }}
            >
              <AddCircle />
              Page Editor
            </div>
            <div
              className={`list-item ${
                activePage === "chart-editor" ? "active" : ""
              }`}
              onClick={() => {
                navigate("/chart-editor");
              }}
            >
              <BorderColor />
              Chart Editor
            </div>
            <div
              className={`list-item ${
                activePage === "products" ? "active" : ""
              }`}
              onClick={() => {
                navigate("/products");
              }}
            >
              <Sell />
              Product Details
            </div>
            <div
              className={`list-item ${
                activePage === "categories" ? "active" : ""
              }`}
              onClick={() => {
                navigate("/categories");
              }}
            >
              <Category />
              Category
            </div>
          </div>
        </aside>
        <main>
          <nav>
            <Menu
              onClick={() => {
                setDrawerOpen(true);
              }}
            ></Menu>
          </nav>
          <section className="main-section">{children}</section>
        </main>
      </div>
    </div>
  );
}
