import React, {useState} from 'react';
import '../styles/components/SignInPage.css';
import {useHistory} from "react-router";
import Loader from "./Loader,";
import {connect} from 'react-redux';
import {userAuthorization} from "../actions";
import FormComponent from "./FormComponent";
import {registrationForm} from "../constants/forms";

const mapStateToProps=function (state){
    return {
        user: state.userReducer,
    }
}

const mapDispatchToProps={
    userAuthorization,
}

function RegistrationPage(props) {
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
            let response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formRegister),
            })
            response = await response.json();
            console.log(response);
            props.userAuthorization(response);
            history.push('/userPage');
        } catch (err) {
            console.log(err + ' message');
        }
        setLoader(false);
    }

    return (
        <>
            {loader?<Loader/>:null}
            <FormComponent
                formInputs={registrationForm}
                onChangeInputState={setFormRegister}
                inputState={formRegister}
                onClickListener={sendInfo}
                btnTextContent='Create Account'
            />
        </>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationPage);
