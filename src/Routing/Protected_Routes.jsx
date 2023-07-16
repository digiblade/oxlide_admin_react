import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../Utils/utils";
import { httpPOST } from "../Utils/Api";
export default function ProtectedRoutes({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isValidURL, setIsValidURL] = React.useState();
  const navigator = useNavigate();
  React.useEffect(() => {
    checkValidLogin();
  }, []);
  const checkValidLogin = async () => {
    setIsLoading(true);
    let userDetails = getUserDetails();

    if (userDetails && userDetails.authorization) {
      let payload = {
        label: process.env.REACT_APP_CLIENT_LOG_TABLE,
        properties: {
          log: "Token validation check",
        },
      };
      let response = await httpPOST("/crm-data-insert", payload);
      if (response) {
        setIsValidURL(true);
      } else {
        navigator("/login");
      }
    } else {
      navigator("/login");
    }
    setIsLoading(false);
  };
  return <div>{isLoading ? "Loading" : isValidURL ? children : ""}</div>;
}
