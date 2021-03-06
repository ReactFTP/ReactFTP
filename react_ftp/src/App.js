import Login from "./Login";
import Home from "./Home";
import CompanyManage from "./CompanyManage";
import UserManage from "./UserManage";
import SignUp from "./SignUp.js";
import IdPwSearch from "./IDPWSearch.js";
import PWCheck from "./PasswordCheck.js";
import EditUser from "./UserManager.js"; 
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import UserInfo from "./UserInfo.js";
import UserInfoPopUp from "./UserInfoPopup.js";
import DirectSignUp from "./DirectSignUp.js";
import AddCompany from "./AddCompany.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/companymanage" component={CompanyManage} />
      <Route exact path="/usermanage" component={UserManage} />
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/directsignup" component={DirectSignUp}/>
      <Route exact path="/idpwsearch" component={IdPwSearch}/>
      <Route exact path="/pwcheck" component={PWCheck}/>
      <Route exact path="/edituser" component={EditUser}/>
      <Route exact path="/userinfo" component={UserInfo}/>
      <Route exact path="/userinfoformanager" component={UserInfoPopUp}/>
      <Route exact path="/addCompany" component={AddCompany}/>
    </Router>
  );
}
export default App;
