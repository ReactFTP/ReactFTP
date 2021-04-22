// import Login from "./Login";
// import Home from "./Home";
import userManager from "./UserManager";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={Login} /> */}
      {/* <Route path="/home" component={Home} onLoad={ Home.HomedataLoad }/> */}
      <Route path="/testYS" component={userManager}/>
    </Router>
  );
}
export default App;
