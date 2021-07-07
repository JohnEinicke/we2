import React, { Component } from 'react';
import {connect} from "react-redux";
import './App.css';
import TopMenu from "./components/TopMenu";
import PublicPage from "./components/PublicPage";
import PrivatePage from "./components/PrivatePage";
import UserSession from "./components/UserSession";
import RegisterUser from "./components/RegisterUser";
import RegisterSucess from "./components/RegisterSucess";

const mapStateToProps = state =>{
  return state;
}

class App extends Component {


  render() {

    const accessToken = this.props.accessToken;

    let workspace;

    if(accessToken) {
      workspace = <PrivatePage />
    }
    else {
      workspace = <PublicPage />
    }

    return (
      <div className="App">
        <TopMenu />
        {workspace}
        <UserSession />
        <RegisterUser />
        <RegisterSucess />
      </div>
    );
  }
}


export default connect(mapStateToProps)(App);
