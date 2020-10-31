import React from 'react';
import obj from "./Preloader.module.css";


function Preloader() {
    return (
        <>
            <img className={obj.preloader} src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
        </>
    )
}


export default Preloader;
