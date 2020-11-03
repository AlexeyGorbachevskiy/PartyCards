import React, {useEffect, useState} from 'react';
import style from './Register.module.scss'
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {registerThunkCreator} from "../../../bll/state/registerReducer";
import {AppRootType} from "../../../bll/state/store";
import {Redirect} from "react-router-dom";
import obj from "../../common/preloader/Preloader.module.css";


const Register = () => {
    const registerError = useSelector<AppRootType, string>(state => state.register.registerError)
    const registerStatus = useSelector<AppRootType, number>(state => state.register.status)
    const isLoading = useSelector<AppRootType, boolean>(state => state.login.isLoading);
    const dispatch = useDispatch();
    const [errorStyle1, setErrorStyle1] = useState({})
    const [errorStyle2, setErrorStyle2] = useState({})

    useEffect(() => {
        if (registerError) {
            setErrorStyle1({
                borderColor: '#cf0c0c',
            })
            setErrorStyle2({
                borderColor: '#cf0c0c',
            })
        } else {
            setErrorStyle1({})
            setErrorStyle2({})
        }

    }, [registerError])


    const formik = useFormik({


        validate: (values) => {
            if (!values.email) {
                setErrorStyle1({
                    borderColor: '#cf0c0c',
                })
                return {
                    email: 'Email is required'
                }
            }
            else{
                setErrorStyle1({})
            }

            if (!values.password) {
                setErrorStyle2({
                    borderColor: '#cf0c0c',
                })
                return {
                    password: 'Password is required'
                }
            }
            else{
                setErrorStyle2({})
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
                        style={errorStyle1}
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className={style.input + ' ' + style.email}
                        placeholder={'Email'}

                    />
                    {formik.errors.email ? <div style={{color:'red'}}>{formik.errors.email}</div> : null}
                    <Input
                        style={errorStyle2}
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
            {
                isLoading &&
                <img style={{position: 'absolute', zIndex: 1200}} className={obj.preloader}
                     src={process.env.PUBLIC_URL + '/images/spinner.svg'} alt={'Preloader svg'}/>
            }
        </div>
    )
}

export default Register;
