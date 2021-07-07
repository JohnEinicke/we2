import React, { Component } from "react";

import "../layout/css/bootstrap.css";
import "../layout/css/bootstrap-grid.css";
import "../layout/css/bootstrap-reboot.css";
import "../layout/css/bootstrap.min.css";
import "../layout/css/bootstrap-grid.min.css";
import "../layout/css/colors.css";
import "../layout/css/myStyles.css";

class PublicPage extends Component {

    render() {
        return (
            <div className="myColor1">
                <main role="main">
                    <div className="jumbotron rounded-0" id="backgroundImg">
                        <div className="container mt-4 text-center" id="welcomeText">
                            <h1>Read2Gether!</h1>
                            <h3>Deine Büchercommunity!</h3>
                        </div>
                    </div>
                    <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                        <div className="myColor2 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                            <div className="my-3 py-3">
                                <h2><u>Review des Tages:</u></h2>
                                <h3>Harry Potter und der Stein der Weisen</h3>
                                <img src="/pictures/hp-stw.jpg" alt="Harry Potter und der Stein der Weisen" id="bookCover" />
                                <p className="lead">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="myColor4 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                            <div className="my-3 p-3">
                                <h2><u>Neueste Review:</u></h2>
                                <h3>Harry Potter und der Stein der Weisen</h3>
                                <img src="/pictures/hp-stw.jpg" alt="Harry Potter und der Stein der Weisen" id="bookCover" />
                                <p className="lead">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                        <div className="myColor4 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                            <div className="my-3 p-3">
                                <h2><u>Kategorie des Tages:</u></h2>
                                <h3>Fantasy</h3>
                                <img src="/pictures/dragon.jpg" alt="Harry Potter und der Stein der Weisen" id="bookCover" />
                                <p className="lead">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                        <div className="myColor2 mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                            <div className="my-3 py-3">
                                <h2><u>Zufälliges Review:</u></h2>
                                <h3>Harry Potter und der Stein der Weisen</h3>
                                <img src="/pictures/hp-stw.jpg" alt="Harry Potter und der Stein der Weisen" id="bookCover" />
                                <p className="lead">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                </main>
            </div>
        )
    }
}

export default PublicPage