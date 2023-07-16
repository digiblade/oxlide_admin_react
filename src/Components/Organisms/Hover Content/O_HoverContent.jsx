import React from "react";

export default function O_HoverContent(props) {
  const { children } = props;
  return (
    <div>
      {children}
      <div>
        <div id="noti_Container">
          <div id="notifications">
            <h3>header</h3>
            <div style={{ height: "100px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
