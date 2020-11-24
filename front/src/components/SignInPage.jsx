import React from 'react';
import '../styles/components/SignInPage.css';

function SignInPage(props) {
    console.log(props.inputRows);
    return (
        <section className='sign-in-sec'>
            <h1 className='sign-in-sec-head'>sign in now!</h1>
            <form className='sign-in-form'>
                {props.inputRows.map(el=>{
                    return <input key={el.id} required type={el.type} placeholder={el.placeholder} className='sign-in-input'/>;
                })}
                <button type='submit' className='sign-in-button'>Sign In!</button>
            </form>
        </section>
    );
}

export default SignInPage;
