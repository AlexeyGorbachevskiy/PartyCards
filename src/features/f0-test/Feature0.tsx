import React, {ChangeEvent, useState} from 'react';
import style from './Feature0.module.scss'
import Button from "../../main/ui/common/Button/Button";
import Input from "../../main/ui/common/Input/Input";
import Checkbox from "../../main/ui/common/Checkbox/Checkbox";

const Feature0 = () => {
    const [checkboxValue, setCheckboxValue] = useState(false);
    const onCheckboxClick = () => {
        setCheckboxValue(!checkboxValue);
    }

    const [inputValue, setInputValue] = useState('');
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div className={style.feature0}>
            <h2>
                Common Components
            </h2>

            <div className={style.common}>
                <div className={style.checkbox_wrapper}>
                    <Checkbox onChange={onCheckboxClick} checked={checkboxValue} labelText={'Hello'}/>
                </div>

                <div className={style.input_wrapper}>
                    <Input onChange={onInputChange} value={inputValue} placeholder={'Hi there'}/>
                </div>

                <div className={style.btn_wrapper}>
                    <Button>Hi all</Button>
                </div>
            </div>


        </div>
    )
}

export default Feature0;