import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';


function GoogleMap(props) {
    const styles = makeStyles({
        maps:
        {
            padding: '2%',
            float: 'right',
            marginTop: '-34%',
            width: "40%"
        },
        map:
        {
            display: 'block',
            width: "100%",
            height: 480,
        }

    });

    const style = styles();

    return(
        <div className={style.maps}>
            <iframe className={style.map} src={props.path}></iframe>
        </div>
    )
}

export default GoogleMap; 