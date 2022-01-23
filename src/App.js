import axios from "axios";
import { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [user, setUser] = useState({});
  const logout = () => {
    setIsLoggedIn(false);
  };
  useEffect(() => {
    axios
      .get("https://www.googleapis.com/blogger/v3/users/self", {
        headers: {
          Authorization: `Bearer ${idToken}`, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      })
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [idToken]);
  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="main">
          <nav className="navbar navbar-light bg-light px-3">
            <div className="navbar-brand" href="#">
              <p className="p-0 m-0 name">{user.displayName}</p>
            </div>
            <GoogleLogout
              className="btn btn-primary btn-lg"
              clientId={process.env.REACT_APP_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
            >
              Logout
            </GoogleLogout>
          </nav>
          <Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            idToken={idToken}
          />
        </div>
      ) : (
        <Login
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIdToken={setIdToken}
        />
      )}
    </div>
  );
}

export default App;
