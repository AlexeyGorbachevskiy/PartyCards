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
        <div className={style.container} {...props}>
            <p>{props.children}</p>
        </div>
    );
}


export default Button;
