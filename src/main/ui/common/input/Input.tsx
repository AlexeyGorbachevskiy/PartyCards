import React, {DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';
import style from './Input.module.scss'

// type InputPropsType={
//     placeholder?: string
//     value?:string
//     onChange?:()=>void
// }

export type InputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { onEnter?: () => void };


const Input = (propsI: InputPropsType) => {

    const {onEnter, ...props} = propsI;

    const onEnterCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onEnter && onEnter();
        }
    }
    return (
            <input
                onKeyPress={onEnterCallback}
                className={style.input}
                type={'text'}
                {...propsI}
            />
    );
}


export default Input;
