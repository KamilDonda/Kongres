import React from "react";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tooltip } from "@material-ui/core/";
import { Page } from "react-pdf";
import { Document } from "react-pdf/dist/esm/entry.webpack";
import Categories from "../ScientificWorkList/Categories";

export default function Information(props) {
  const style = makeStyles({
    main: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    pdf: {
      width: "30%",
    },
    workInfo: {
      width: "70%",
      textAlign: "left",
    },
    status: {
      color: "#775866",
      backgroundColor: "#F0D4E0",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "16px",
    },
    date: {
      fontSize: "12px",
      color: "#767676",
      marginRight: "24px",
    },
    dateCategory: {
      display: "flex",
      marginTop: "16px",
    },
    h1: {
      marginTop: "0",
      marginBottom: "1em",
      lineHeight: "1.5em",
    },
    allAuthors: {
      display: "flex",
    },
    author: {
      marginRight: "32px",
    },
    shared: {
      fontSize: "14px",
      color: "#767676",
      marginBottom: "16px",
    },
    photo: {
      objectFit: "cover",
      width: "72px",
      height: "72px",
      borderRadius: "50px",
      boxShadow: "2px 2px 4px #C0C4E233",
    },
    authorInfo: {
      display: "flex",
    },
    authorDesc: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      lineHeight: "1.2em",
      marginLeft: "16px",
    },
    authorName: {
      fontWeight: "bold",
    },
    degree: {
      fontSize: "14px",
    },
    university: {
      fontSize: "14px",
      color: "#767676",
    },
  })();

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = props.workPDF;
    link.download = `${props.scientificWork.title.replaceAll(" ", "-")}.pdf`;
    link.click();
  };

  return (
    <div className={style.main}>
      <div className={style.pdf}>
        <Document file={props.workPDF}>
          <Page pageNumber={1} width={320} />
        </Document>
      </div>

      <div className={style.workInfo}>
        <span className={style.status}>{props.status}</span>

        {/* Panel includes status, date add work, date modification and specialization  */}
        <div className={style.dateCategory}>
          <p className={style.date}>
            {props.scientificWork.createDate}
            &nbsp; (Edited: {props.scientificWork.updateDate})
          </p>
          <Categories name={props.scientificWork.specialization} />
        </div>

        <h1 className={style.h1}>{props.scientificWork.title}</h1>

        {/* Panel includes photo, name author, degree, univeristy */}
        <div className={style.allAuthors}>
          <div className={style.author}>
            <span className={style.shared}>Shared by</span>
            <div className={style.authorInfo}>
              <img src={props.author.photo} className={style.photo} alt=""></img>
              <div className={style.authorDesc}>
                <span className={style.authorName}>{props.author.name}</span>
                <span className={style.degree}>{props.author.degree}</span>
                <span className={style.university}>{props.author.university}</span>
              </div>
            </div>
          </div>

          <div className={style.authors}>
            <p className={style.shared}>Other authors</p>
            <p className={style.authorName}>{props.scientificWork.authors}</p>
          </div>
        </div>
        <p className={style.description}>{props.scientificWork.description}</p>

        <Button
          variant="outlined"
          color="primary"
          className={style.btnDownload}
          onClick={downloadFile}
        >
          Download full work
        </Button>
        {props.mode === "Author" && (
          <Button variant="contained" color="primary" className={style.btn1}>
            Add new version
          </Button>
        )}
      </div>
    </div>
  );
}
