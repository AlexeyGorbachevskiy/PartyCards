import React, {DetailedHTMLProps, ButtonHTMLAttributes, HTMLAttributes} from 'react';
import style from './Button.module.scss'



//
// type ButtonPropsType = {
//     children: string
//     onClick?: () => void
// }

type ButtonPropsType=DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


const Button = (props: ButtonPropsType) => {

    return (
        <div {...props} className={style.container}>
            <p>{props.children}</p>
        </div>
    );
}


export default Button;