import React, {useEffect} from 'react';
import style from './Register.module.scss'
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerThunkCreator} from "../../../bll/state/registerReducer";
import {AppRootType} from "../../../bll/state/store";
import {Redirect} from "react-router-dom";


const Register = () => {
    const registerError = useSelector<AppRootType, string>(state => state.register.error)
    const registerStatus = useSelector<AppRootType, number>(state => state.register.status)

    const dispatch = useDispatch();
    const formik = useFormik({


        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }

            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }


        },
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            dispatch(registerThunkCreator(values))
        },
    });

    useEffect(() => {
        if (registerStatus === 201) {
            formik.resetForm();
        }
    }, [registerStatus, registerError])

    if (registerStatus === 201) {
        return <Redirect to="/login"/>;
    }

    return (
        <div className={style.register}>
            <div className={style.register_form}>
                <h2>Registration</h2>


                <div className={style.form}>
                    <Input
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={style.input + ' ' + style.email}
                        placeholder={'Email'}

                    />
                    {formik.errors.email ? <div style={{color:'red'}}>{formik.errors.email}</div> : null}
                    <Input
                        className={style.input + ' ' + style.password}
                        placeholder={'Password'}
                        type={'password'}
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div style={{color:'red'}}>{formik.errors.password}</div> : null}
                </div>


                {registerError ? <div style={{color:'red'}}>{registerError}</div>  : ''}

                <Button onClick={() => formik.handleSubmit()} style={{width: '150px'}}>Register</Button>


            </div>
        </div>
    )
}

export default Register;
