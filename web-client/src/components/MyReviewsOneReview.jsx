import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import '../App.css';

function MyReviewsOneReview(props)
{
    const styles = makeStyles({
        main:
        {
            width: '100%',
            paddingBottom: '300px',
        },
        h2:
        {
            width: '90%',
            float: 'left',
            textAlign: 'left',
            margin: 'auto',
            marginTop: '2%',
        },
        panel:
        {
            width: '100%',
            float: 'left',
        },
        author:
        {
            float: 'left',
            fontSize: '12px',
        },
        photo:
        {
            float: 'left',
            width: '6%',
            height: '35px',
            borderRadius: '50%',
        },
        name:
        {
            float: 'left',
            margin: 'auto',
            marginLeft: '2%',
            marginTop: '1.2%',
            fontSize: '12px',
        },
        category:
        {
            float: 'left',
            fontSize: '12px',
            color: '#3f51b5', 
            paddingRight: '2.5%',
        },
        dot:
        {
            float: 'left',
            fontSize: '28px',
            color: '#DCDCDC', 
            paddingRight: '2.5%',
        },
        date:
        {
            float: 'left',
            fontSize: '12px',
            paddingRight: '2.5%',
        },
        text:
        {
            width: '94%',
            float: 'left',
            textAlign: 'left',
            fontSize: '14px',
            paddingBottom: '2%',
        },
        a:
        {
            textDecoration: 'none',
            color: 'black',
            fontWeight: 'bold',
        },
        buttons:
        {
            float: 'left',
            width: '100%',
        },
        btn1:
        {
            float: 'left',
            marginRight: '5%',
            textTransform: 'none',
        },
        btn2:
        {
            float: 'left',
            textTransform: 'none',
        },
    });

    const style = styles();

    //https://www.xspdf.com/resolution/50694881.html <- information for button download
    return(
        <div className={style.main}>
            <Button variant='outlined' color="primary" 
                        className={style.btn1}>Waiting for review</Button>
            <h2 className={style.h2}>{props.title}</h2>
            <div className={style.panel}>
                <a href={props.link}><p className={style.category}>{props.categories}</p></a>
                <span className={style.dot}>&bull;</span>
                <p className={style.date}>{props.data} (Edited: {props.modificationDate})</p>
                <span className={style.dot}>&bull;</span>
                <p className={style.author}>{props.authors}</p>
            </div>
            <span className={style.text}>{props.text}</span>
            <div className={style.buttons}>
                <Button variant='outlined' color="primary" 
                            className={style.btn1}>Download full work</Button>
                <Button variant='contained' color="primary" 
                            className={style.btn2}>Add review</Button>
            </div>
        </div>
    )
}

export default MyReviewsOneReview; 