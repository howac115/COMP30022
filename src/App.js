import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import { render } from "@testing-library/react";

import Footer from "./components/Footer";
import HomePage from "./pages/homePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectPage from "./pages/ProjectPage";
import AchievementPage from "./pages/AchievementPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Portfolio",
      headerLinks: [
        { title: "Home", path: "/" },
        { title: "About", path: "/about" },
        { title: "Contact", path: "/contact" },
      ],
      home: {
        title: "Be creative",
        subTitle: "Opportunities are reserved for those who are prepared",
        text: "Your most precious and valuable things",
      },
      about: {
        title: "About Me",
      },
      contact: {
        title: "Let's Talk",
      },
    };
  }

  render() {
    return (
      <Router>
        <Container className="p-0" fluid={true}>
          <Navbar className="border-bottom" bg="transparent" expand="lg">
            <Navbar.Brand>Portfolio</Navbar.Brand>
            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
            <Navbar.Collapse id="navbar-toggle">
              <Nav className="ml-auto">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/about">
                  About Me
                </Link>
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Route
            path="/"
            exact
            render={() => (
              <HomePage
                title={this.state.home.title}
                subTitle={this.state.home.subTitle}
                text={this.state.home.text}
              />
            )}
          />

          <Route
            path="/about"
            render={() => <AboutPage title={this.state.about.title} />}
          />

          <Route
            path="/contact"
            render={() => <ContactPage title={this.state.contact.title} />}
          />

          <Route
            path="/experience"
            render={() => <ExperiencePage/>}
          /> 
          
          <Route
            path="/projects"
            render={() => <ProjectPage/>}
          />  

          <Route
            path="/achievement"
            render={() => <AchievementPage/>}
          />  

          <Footer />
        </Container>
      </Router>
    );
  }
}

export default App;
