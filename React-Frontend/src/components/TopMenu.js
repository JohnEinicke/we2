import React, { Component } from "react";

import "../layout/css/bootstrap.css";
import "../layout/css/bootstrap-grid.css";
import "../layout/css/bootstrap-reboot.css";
import "../layout/css/bootstrap.min.css";
import "../layout/css/bootstrap-grid.min.css";
import "../layout/css/colors.css";
import "../layout/css/myStyles.css";
import "../layout/css/navbar.css";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";

class TopMenu extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md fixed-top navbar-light">
                <a className="navbar-brand" href="*"><img src="/icons/logo.svg" alt="Read2Gether Logo" id="logo" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="*">Home<span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="*">Reviews</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="*" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Lesegruppen</a>
                            <div className="dropdown-menu" aria-labelledby="dropdown01">
                                <a className="dropdown-item" href="*">Meine Lesegruppen</a>
                                <a className="dropdown-item" href="*">Lesegruppe finden</a>
                                <a className="dropdown-item" href="*">Lesegruppe erstellen</a>
                            </div>
                        </li>
                    </ul>
                        <RegisterButton />
                        <LoginButton />
                </div>
            </nav>
        )
    }
}

export default TopMenu