import React from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Logo from "../images/empty-image.png";

function Footer() {
  const styles = makeStyles({
    main: {
      display: "flex",
      justifyContent: "space-between",
      textAlign: "left",
      marginTop: "80px",
      paddingTop: "24px",
      paddingBottom: "24px",
    },
    left: {
      justifyContent: "flex-start",
    },
    logo: {
      height: "80px",
      width: "200px",
    },

    link: {
      textDecoration: "none",
      color: "black",
      "&:hover": {
        color: "#6069A9",
      },
    },
  });

  const style = styles();

  return (
    <div className={style.main}>
      <div className={style.left}>
        <img className={style.logo} src={Logo} alt="Logo" />
        <div className={style.text}>Scienture conference &copy; 2021</div>
      </div>
      <div className={style.centrum}>
        <div className={style.text}>
          <a href="privacy-policy" className={style.link}>
            Polityka prywatności
          </a>
        </div>
        <div className={style.text}>
          <a href="cookies-policy" className={style.link}>
            Polityka cokkies
          </a>
        </div>
        <div className={style.text}>
          <a href="https://github.com/WyimaginowaneKoniki/Kongres" className={style.link}>
            Github
          </a>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.text}>tel:123456789</div>
        <div className={style.text}>ul.Kaszubska 23, Gliwice</div>
        <div className={style.text}>e-mail: scientureconf@gmail.com</div>
      </div>
    </div>
  );
}

export default Footer;
