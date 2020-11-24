import React, {useState} from 'react';
import '../styles/components/SignInPage.css';
import {useHistory} from "react-router";
import Loader from "./Loader,";

function RegistrationPage() {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [formRegister, setFormRegister] = useState({
        email: '',
        password: '',
        name: '',
        secName: '',
        country: '',
        phone: '',
    });

    const sendInfo = async (event) => {
        setLoader(true);
        event.preventDefault();
        try {
            console.log(formRegister);
            let response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formRegister),
            })
            response = await response.json();
            console.log(response);
            history.push('/userPage');
        } catch (err) {
            console.log(err + ' message');
        }
        setLoader(false);
    }

    const changeRow = (event) => {
        setFormRegister({
            ...formRegister,
            [event.target.name]: event.target.value,
        })
    }

    return (
        <>
            {loader?<Loader/>:null}
            <section className='sign-in-sec'>
                <h1 className='sign-in-sec-head'>sign in now!</h1>
                <form className='sign-in-form'>
                    <input name='name' type='text' required onChange={changeRow} placeholder='name'
                           className='sign-in-input'/>
                    <input name='secName' type='text' required onChange={changeRow} placeholder='second name'
                           className='sign-in-input'/>
                    <input name='country' type='text' required onChange={changeRow} placeholder='country'
                           className='sign-in-input'/>
                    <input name='phone' type='tel' required onChange={changeRow} placeholder='phone'
                           className='sign-in-input'/>
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

export default RegistrationPage;
