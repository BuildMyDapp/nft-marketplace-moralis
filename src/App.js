import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Topbar from "./component/topbar/Topbar";
import HomeScreen from "./screens/Home/HomeScreen";
import FrontMoney from "./screens/Frontmoney/FrontMoney";
import Balance from "./screens/Balance/Balance";
import PublishNft from "./screens/publishNft/index";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <Navbar />

      <div className="container">
        <Route path="/" exact component={HomeScreen} />
        <Route path="/my_collection" component={FrontMoney} />
        <Route path="/balance" component={Balance} />
        <Route path="/publish_nft" component={PublishNft} />

      </div>
    </Router>
  );
}

export default App;
