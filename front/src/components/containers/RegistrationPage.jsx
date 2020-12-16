import React, {useState} from 'react';
import '../../styles/components/FormComponent.css';
import {useHistory} from "react-router";
import Loader from "../pages/Loader,";
import {connect} from 'react-redux';
import {userAuthorization} from "../../actions";
import FormComponent from "../pages/FormComponent";
import {registrationForm} from "../../constants/forms";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";

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
    const [registerError, registerErrorSet] = useState(null);
    const [formRegister, setFormRegister] = useState({
        email: '',
        password: '',
        name: '',
        secName: '',
        country: '',
        phone: '',
    });

    const sendInfo = async () => {
        setLoader(true);
        registerErrorSet(null);
        try {
            let response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formRegister),
            })
            response = await response.json();
            if(response.errMsg){
                console.log(response.errMsg);
                registerErrorSet(response.errMsg);
            }else {
                props.userAuthorization(response);
                history.push('/userPage');
            }
        } catch (err) {
            console.log(err + ' message');
        }
        setLoader(false);
    }

    return (
        <>
            {loader?<Loader/>:null}
            <FormComponent
                headTextContent='Create Account'
                formInputs={registrationForm}
                onChangeInputState={setFormRegister}
                sendFailed={registerError}
                inputState={formRegister}
                onClickListener={sendInfo}
            />
        </>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(RegistrationPage);
