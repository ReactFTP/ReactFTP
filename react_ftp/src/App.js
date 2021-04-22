// import Login from "./Login";
import Home from "./Home";
import CompanyManage from "./CompanyManage";
import UserManage from "./UserManage";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Route exact path="/" component={Login} /> */}
      <Route path="/home" component={Home} onLoad={ Home.HomedataLoad }/>
      <Route exact path="/companymanage" component={CompanyManage} />
      <Route exact path="/usermanage" component={UserManage} />
    </Router>
  );
}
export default App;
