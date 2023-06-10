import React from "react";
import { useNavigate } from "react-router-dom";
export default function ProtectedRoutes({ children }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isValidURL, setIsValidURL] = React.useState();
  const navigator = useNavigate();
  React.useEffect(() => {
    setIsLoading(true);
    let userAuthentication = localStorage.getItem(
      process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY
    );
    if (userAuthentication) {
      setIsValidURL(true);
    } else {
      navigator("/login");
    }
    setIsLoading(false);
  }, []);
  return <div>{isLoading ? "Loading" : isValidURL ? children : ""}</div>;
}
