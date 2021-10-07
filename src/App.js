import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Topbar from "./component/topbar/Topbar";
import HomeScreen from "./screens/Home/HomeScreen";
import ListNft from "./screens/ListNft/ListNft";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Topbar />
      <Navbar />

      <div className="container">
        <Route path="/" exact component={HomeScreen} />
        <Route path="/list-nft" component={ListNft} />
      </div>
    </Router>
  );
}

export default App;
