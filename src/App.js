import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Topbar from "./component/topbar/Topbar";
import HomeScreen from "./screens/Home/HomeScreen";
import ListNft from "./screens/ListNft/ListNft";
import FrontMoney from "./screens/Frontmoney/FrontMoney";
import Balance from "./screens/Balance/Balance";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <Navbar />

      <div className="container">
        <Route path="/" exact component={HomeScreen} />
        <Route path="/list-nft" component={ListNft} />
        <Route path="/front-money" component={FrontMoney} />
        <Route path="/balance" component={Balance} />
      </div>
    </Router>
  );
}

export default App;
