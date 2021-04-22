// import Login from "./Login";
// import Home from "./Home";
import SignUp from "./SignUp.js";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={Login} /> */}
      {/* <Route path="/home" component={Home} onLoad={ Home.HomedataLoad }/> */}
      <Route path="/testYS" component={SignUp}/>
    </Router>
  );
}
export default App;
