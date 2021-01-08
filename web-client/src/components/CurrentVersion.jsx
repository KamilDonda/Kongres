import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

function CurrentVersion(props){

    const styles = makeStyles({
        currentVersion:
        {
            width: '80%',
            float: 'left',
            marginTop: '2.5%',
            marginBottom: '2.5%',
            textAlign: 'left',
            marginLeft: '5%',
        },
        review:
        {
            width: '100%',
            float: 'left',
        },
        leftReview:
        {
            width: '15%',
            float: 'left',
        },
        rightReview:
        {
            width: '80%',
            float: 'right',
        },
        labelVersion:
        {
            paddingLeft: '10%',
        },
        image:
        {
            width: 80,
            height: 80,
            borderRadius: '50%',
            float: 'center',
            marginLeft: '20%',
        },
        me:
        {
            width: '100%',
            float: 'left',
            textAlign: 'center',
            paddingLeft: '10px',
        },
        rightDate:
        {
            float: 'right',
            color: 'grey',
        },
        textReview:
        {
            width: '95%',
            float: 'left',
            paddingLeft: '2%',
            fontSize: '16px',
            paddingBottom: '2%',
        },
        answerParticipant:
        {
            width: '80%',
            float: 'left',
            marginLeft: '20%',
            marginTop: '5%',
        },
        leftAnswer:
        {
            width: '18%',
            float: 'left',
            marginTop: '2.5%',
        },
        rightAnswer:
        {
            width: '80%',
            float: 'right',
            marginTop: '2.5%',
        },
        dateAnswer:
        {
            width: '100%',
            float: 'left',
            textAlign: 'right',
        },
        answer:
        {
            width: '100%',
            float: 'left',
            marginTop: '2.5%',
        },
    });

    const style = styles();

    let d = new Date();
    let hours = `${d.getHours()}:${(d.getMinutes()<10?'0':'')+d.getMinutes()}`;
    let date = `${(d.getDate()<10?'0':'')+d.getDate()}/${(d.getMonth()+1<10?'':'')+d.getMonth()+1}/${d.getFullYear()}`;

    const labels = {
        1: 'rejected',
        2: 'correct',
        3: 'accepted'
    };

    return(
        <div className={style.currentVersion}>
            <div className={style.review}>
                <div className={style.leftReview}>
                    <img src={props.path} className={style.image} alt={props.alternativeText}></img>
                    <span className={style.me}> Me </span>
                </div>
                <div className={style.rightReview}>
                    <Tooltip title={labels[props.stars]} placement='top-start'>
                        <Box component="fieldset" borderColor="transparent">
                            <Rating name="read-only" max={3} value={props.stars} readOnly />
                            <span className={style.rightDate}>{date} {hours}</span>
                        </Box>
                    </Tooltip>
                    <span className={style.textReview}>{props.review}</span>
                    <Button variant='outlined' color="primary" 
                        className={style.btn}>Download review</Button>
                </div>
                {props.dateAnswer !== null && props.answer !== null ?
                <div className={style.answerParticipant}>
                    <div className={style.leftAnswer}>
                        <img src={props.pathParticipant} className={style.image} alt={props.alternativeTextParticipant}></img>
                        <span className={style.me}> {props.author} </span>
                    </div>
                    <div className={style.rightAnswer}>
                    <span className={style.dateAnswer}>{props.dateAnswer} {hours}</span>
                    <span className={style.answer}>{props.answer}</span>
                    </div>
                </div>
                : null}
            </div>
        </div>
    )
}

export default CurrentVersion;