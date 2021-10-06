import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Topbar from "./component/topbar/Topbar";
import HomeScreen from "./screens/Home/HomeScreen";
import ExploreSection from "./screens/Explore/ExploreSection";
function App() {
  return (
    <div className="">
      <Topbar />
      <Navbar />
      <div className="container">
        <HomeScreen />
        <ExploreSection />
      </div>
    </div>
  );
}

export default App;
