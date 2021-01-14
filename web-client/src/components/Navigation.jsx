import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Logo from "../images/empty-image.png";
import Button from "@material-ui/core/Button";

function Navigation(props) {
  const styles = makeStyles({
    main: {
      width: "90%",
      height: "50px",
      display: "block",
      margin: "auto",
      padding: "2%",
    },
    logo: {
      height: "50px",
      width: "50px",
      float: "left",
    },
    box: {
      width: "80%",
      float: "right",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-end",
      height: "100%",
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
    activeLink: {
      color: "blue",
    },
  });

  const style = styles();
  const user = "Reviewer";
  const list = 1;

  return (
    <div className={style.main}>
      <Box>
        <NavLink exact to="/">
          <img className={style.logo} src={Logo} alt="Logo" />{" "}
        </NavLink>
      </Box>
      <Box className={style.box}>
        <Box>
          <NavLink
            exact
            to="/"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Home
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/agenda"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Agenda
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/speakers"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Keynote Speakers
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/scientific-works"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Scientific works
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/about"
            className={style.link}
            activeClassName={style.activeLink}
          >
            About
          </NavLink>
        </Box>
        <Box>
          <NavLink
            exact
            to="/contact"
            className={style.link}
            activeClassName={style.activeLink}
          >
            Contact
          </NavLink>
        </Box>

        {user === "Participant" && list === 1 ? (
          <Box>
            <NavLink exact to="/work-view" className={style.link}>
              <Button
                className={style.addButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                My work
              </Button>
            </NavLink>
          </Box>
        ) : null}

        {user === "Participant" && list === 0 ? (
          <Box>
            <NavLink exact to="/adding-work" className={style.link}>
              <Button
                className={style.addButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                Add work
              </Button>
            </NavLink>
          </Box>
        ) : null}

        {user === "Reviewer" ? (
          <Box>
            <NavLink exact to="/my-reviews" className={style.link}>
              <Button
                className={style.addButton}
                color="primary"
                type="submit"
                variant="contained"
              >
                My reviews
              </Button>
            </NavLink>
          </Box>
        ) : null}

        <Box>
          <NavLink exact to="/my-profile" className={style.link}>
            <img className={style.logo} src={Logo} alt="Avatar" />
          </NavLink>
        </Box>
        <Box>
          <span>John Smith</span>
        </Box>
      </Box>
    </div>
  );
}

export default Navigation;
