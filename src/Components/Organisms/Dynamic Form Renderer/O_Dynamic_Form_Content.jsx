import React from "react";
import { Button } from "react-bootstrap";
import O_HoverContent from "../Hover Content/O_HoverContent";
import { connect } from "react-redux";
function O_Dynamic_Form_Content() {
  const [dynamicJSON, setDynamicJSON] = React.useState({});
  return (
    <div>
      <div className="navbar-content">
        <div className="breadcrumbs">home / accounts</div>
        <div className="tools">
          <O_HoverContent>
            <Button>Download</Button>
          </O_HoverContent>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    pageDetails: state.pageDetails,
  };
};
export default connect(mapStateToProps)(O_Dynamic_Form_Content);
