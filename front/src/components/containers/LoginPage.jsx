import React, {useState, useRef} from 'react';
import '../../styles/components/FormComponent.css';
import Loader from "../pages/Loader,";
import {useHistory} from "react-router";
import {connect} from 'react-redux';
import {
    userAuthorization,
} from "../../actions";
import {loginForm} from "../../constants/forms";
import FormComponent from "../pages/FormComponent";


const mapDispatchToProps = {
    userAuthorization,
}

function LoginPage(props) {
    const history = useHistory();
    const [loader, setLoader] = useState(false);
    const [loginFailed, setLoginFailed] = useState(null);

    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
    });

    const sendInfo = async () => {
        try {
            setLoader(true);
            setLoginFailed('');
            let response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formLogin),
            })
            const responseJSON = await response.json();
            if(responseJSON.errMsg){
                setLoginFailed(responseJSON.errMsg);
            } else {
                props.userAuthorization(responseJSON);
                await localStorage.setItem('userToken',responseJSON.token);
                history.push('/userPage');
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
                headTextContent='Log In Account'
                formInputs={loginForm}
                onChangeInputState={setFormLogin}
                inputState={formLogin}
                sendFailed={loginFailed}
                onClickListener={sendInfo}
            />
        </>
    );
}

export default connect(null, mapDispatchToProps)(LoginPage);
