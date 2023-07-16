import React from "react";
import { Tab, Tabs } from "react-bootstrap";

export default function M_Tabs(props) {
  const { key, variant, className, tabs, defaultIndex, style } = props;
  const [tabIndex, setTabIndex] = React.useState(
    defaultIndex ? defaultIndex : 0
  );
  return (
    <Tabs
      id={key || "tabs-details"}
      key={key || "tabs-details"}
      activeKey={tabIndex}
      onSelect={(selectedIndex) => setTabIndex(selectedIndex)}
      className={className || `mb-3`}
      variant={variant || "underline"}
      style={
        style || {
          boxShadow: "var(--card-shadow)",
          padding: "1rem",
        }
      }
    >
      {tabs &&
        tabs.map((tab, index) => (
          <Tab
            style={{ margin: "1rem" }}
            eventKey={index}
            title={tab.title || ""}
          >
            {tab.content || <></>}
          </Tab>
        ))}
    </Tabs>
  );
}
