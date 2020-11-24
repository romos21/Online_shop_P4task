import React, {useState} from 'react';
import '../styles/components/SignInPage.css';
import Loader from "./Loader,";
import {useHistory} from "react-router";

function LoginPage() {
    const history=useHistory();
    const [loader, setLoader] = useState(false);

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    const sendInfo = async (event) => {
        event.preventDefault();
        try {
            setLoader(true);
            let response = await fetch('/auth/login', {
                method: 'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body: JSON.stringify(formLogin),
            })
            response=await response.json();
            console.log(response);
            history.push('/userPage');
        } catch (err) {
            console.log(err + ' message');
        }
        setLoader(false);
    }

    const changeRow = event => {
        setFormLogin({
            ...formLogin,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <>
            {loader? <Loader/>:null}
            <section className='sign-in-sec'>
                <h1 className='sign-in-sec-head'>sign in now!</h1>
                <form className='sign-in-form'>
                    <input name='email' type='email' required onChange={changeRow} placeholder='email'
                           className='sign-in-input'/>
                    <input name='password' type='password' required onChange={changeRow} placeholder='password'
                           className='sign-in-input'/>
                    <button onClick={sendInfo} className='sign-in-button'>Sign In!</button>
                </form>
            </section>
        </>
    );
}

export default LoginPage;
