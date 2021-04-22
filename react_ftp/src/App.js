// import Login from "./Login";
import Home from "./Home";
import Test from "./Test";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={Login} /> */}
      <Route path="/home" component={Home} onLoad={ Home.HomedataLoad }/>
      <Route path="/test" component={Test}/>
    </Router>
  );
}
export default App;
