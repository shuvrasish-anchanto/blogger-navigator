import React from "react";
import GoogleLogin from "react-google-login";
import "./Login.css";
import logo from "../../blogIcon.png";

export default function Login({ setIsLoggedIn, setIdToken }) {
  const responseGoogleFailure = (e) => {
    e.preventDefault();
    console.error(e);
  };
  const responseGoogleSuccess = (response) => {
    const tokenObj = response.tokenObj;
    setIdToken(tokenObj.access_token);
    setIsLoggedIn(true);
  };
  return (
    <div className="login-btn-div">
      <div className="card p-5">
        <div className="login-title">
          <p>
            <img className="logo-img" src={logo} alt="B"></img>logger Navigator
          </p>
        </div>

        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            isSignedIn={true}
            buttonText="Login"
            scope="https://www.googleapis.com/auth/blogger"
            onSuccess={responseGoogleSuccess}
            onFailure={responseGoogleFailure}
            cookiePolicy={"single_host_origin"}
            className="login-btn"
          />
        </div>
      </div>
    </div>
  );
}
