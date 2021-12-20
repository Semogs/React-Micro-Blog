import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Home from "./Pages/Home";
import { TweetsProvider } from "./Context/Context";
import Login from "./Pages/Login";
import "./App.css";

export default function App() {
  return (
    <TweetsProvider>
      <div className="bg-dark main-screen d-flex justify-content-center">
        <Router>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Router>
      </div>
    </TweetsProvider>
  );
}
