import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react';
import style from './Checkbox.module.scss'


type CheckboxPropsType =
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    & { labelText?: string };


const Checkbox = (props: CheckboxPropsType) => {

    return (
        <label className={style.label}>
            <input
                {...props}
                className={style.checkbox}
                type={'checkbox'}
            />
            <span> {props.labelText}</span>
        </label>
    );
}


export default Checkbox;