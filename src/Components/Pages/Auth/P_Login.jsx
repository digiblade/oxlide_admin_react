import React from "react";
import loginImage from "../../../Assets/Images/img-01.webp";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./CSS/Authentication.css";
import { colors } from "../../../Utils/Colors";
import { checkLogin } from "./Auth.helper";
import { useNavigate } from "react-router-dom";
import { logSystemData } from "../../../Utils/utils";
export default function P_Login() {
  const [formData, setFormData] = React.useState({});
  const [isValidLogin, setIsValidLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleOnChange = (event) => {
    if (!isValidLogin) {
      setIsValidLogin(true);
    }
    let localFormData = { ...formData };
    localFormData[event.target.id] = event.target.value;
    setFormData(localFormData);
  };
  const loginAttempt = async () => {
    setIsLoading(true);
    try {
      let authResponse = await checkLogin(formData);
      if (
        authResponse &&
        authResponse.authorization &&
        authResponse.authorization.token
      ) {
        localStorage.setItem(
          process.env.REACT_APP_AUTH_TOKEN_STORAGE_KEY,
          JSON.stringify(authResponse)
        );
        navigate("/dashboard");
        setIsValidLogin(true);
      } else {
        setIsValidLogin(false);
      }
    } catch (exception) {
      logSystemData(exception);
      setIsValidLogin(false);
    }

    setIsLoading(false);
  };
  return (
    <div>
      <div className="login-background">
        <div className="login-card">
          <img className="side-image" src={loginImage} alt="" />

          <div className="login-form">
            <div className="form-title">Member Login</div>

            {!isValidLogin ? (
              <Alert
                variant="danger"
                onClose={() => setIsValidLogin(true)}
                dismissible
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Please check username/password</p>
              </Alert>
            ) : (
              ""
            )}
            <Form autoComplete="off">
              <Form.Group className="mb-3" id="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="email"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" id="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  id="password"
                  onChange={handleOnChange}
                />
              </Form.Group>
              <Button
                variant="custom"
                style={{
                  backgroundColor: colors.AccentColor,
                  color: "white",
                  width: "100%",
                }}
                disabled={isLoading}
                onClick={() => {
                  if (!isLoading) {
                    loginAttempt();
                  }
                }}
              >
                Login {isLoading ? <Spinner /> : ""}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
