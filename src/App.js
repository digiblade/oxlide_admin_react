import React from "react";
import "./App.css";
import {
  Menu,
  Dashboard as DashboardIcon,
  AddCircle,
} from "@mui/icons-material";
import user from "./Assets/Images/user.jpg";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "./Utils/utils";
import { httpPOST } from "./Utils/Api";
import { useParams } from "react-router-dom";
export default function Drawer({ children, activePage }) {
  const { sourceLabel } = useParams();
  const [isDrawerOpen, setDrawerOpen] = React.useState(true);
  const [pagesData, setPageData] = React.useState([]);
  const navigate = useNavigate();
  const getUserName = () => {
    let { user } = getUserDetails();
    return user.name;
  };
  React.useEffect(() => {
    getPage();
  }, []);
  const getPage = async () => {
    let payload = {
      sourceLabel: "page-config",
    };
    let { data } = await httpPOST("/crm-data-get", payload);
    setPageData(data);
  };
  return (
    <div className="App">
      <div className={`App-header ${isDrawerOpen ? "show" : "hide"}-dashboard`}>
        <aside className={`drawer-position-${isDrawerOpen ? "open" : "close"}`}>
          <div className="close-icon-with-logo">
            <div className="">Logo</div>
          </div>

          <div className="drawer-header">
            <Image src={user} roundedCircle width={50} height="50"></Image>
            <div className="profile-name">{getUserName()}</div>
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
            {pagesData
              ? pagesData.map((page, index) => (
                  <div
                    key={`page_${index}`}
                    className={`list-item ${
                      sourceLabel === page.pageUrl ? "active" : ""
                    }`}
                    onClick={() => {
                      navigate(`/${page.pageUrl}`);
                    }}
                  >
                    <AddCircle />
                    {page.pageName}
                  </div>
                ))
              : ""}
          </div>
        </aside>
        <main>
          <nav>
            <Menu
              onClick={() => {
                setDrawerOpen(!isDrawerOpen);
              }}
            ></Menu>
          </nav>
          <section className="main-section">{children}</section>
        </main>
      </div>
    </div>
  );
}
