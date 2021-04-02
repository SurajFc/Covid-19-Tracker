import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import "./style/App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Country from "./pages/Country";

import getVirusGloballAll from "./store/actions/virusActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVirusGloballAll());
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/news" component={News} />
          <Route exact path="/country/:slug" component={Country} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
