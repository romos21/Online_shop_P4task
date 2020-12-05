import React, {useState,useRef} from 'react';
import '../styles/components/SignInPage.css';
import Loader from "./Loader,";
import {useHistory} from "react-router";
import {connect} from 'react-redux';
import {
    userAuthorization,
} from "../actions";
import {loginForm} from "../constants/forms";
import FormComponent from "./FormComponent";


const mapDispatchToProps = {
    userAuthorization,
}

function LoginPage(props) {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [loginFailed,setLoginFailed] = useState('');

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    const sendInfo = async (event) => {
        event.preventDefault();
        try {
            setLoader(true);
            setLoginFailed('');
            console.log(formLogin);
            let response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formLogin),
            })
            response = await response.json();
            if (response) {
                console.log(response);
                props.userAuthorization(response);
                history.push('/userPage');
            } else if(response.message){
                console.log(response.message)
                setLoginFailed(response.message);
                console.log(loginFailed);
            }
        } catch (err) {
            console.log(err + ' message');
        }
        setLoader(false);
    }

    return (
        <>
            {loader ? <Loader/> : null}
            <FormComponent
                formInputs={loginForm}
                onChangeInputState={setFormLogin}
                inputState={formLogin}
                onClickListener={sendInfo}
                btnTextContent='Log In'
            />
        </>
    );
}


/*{
    loginFailed?
        <p className='login-failed-paragraph'>{loginFailed}</p>
        : null
}*/

export default connect(null, mapDispatchToProps)(LoginPage);
