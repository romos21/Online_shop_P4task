import React, {useRef, useState} from 'react';
import shortId from 'short-id';
import {useHistory} from 'react-router-dom';
import '../../styles/components/FormComponent.css';
import {ErrorMsgPage} from "./ErrorMsgPage";
import classNames from 'classnames';


function FormComponent(props) {

    const history = useHistory();
    const {onChangeInputState, inputState, sendFailed, formInputs} = props;
    let inputRef = useRef('');
    let fileRef = useRef('');
    const [repPasswordState, repPasswordStateSet] = useState('');
    let repPasswordRef = useRef('');
    let [isIdentical, isIdenticalSet] = useState(false);
    let [isOnFocusPasswordsCheck, isOnFocusPasswordsCheckSet] = useState(false);
    let [errMsg, errMsgSet] = useState(false);
    const formInputsWithKeys = formInputs.map(input => ({...input, key: shortId.generate()}));

    const onChangeInputListener = (event) => {

        if (event.target.name === 'password' && history.location.pathname === '/register') {
            if (inputRef.current.value === repPasswordRef.current.value) {
                isIdenticalSet(true);
            } else {
                isIdenticalSet(false);
            }
            if (!repPasswordRef.current.value.length) {
                isIdenticalSet(false);
            }
        }
        onChangeInputState({
            ...inputState,
            [event.target.name]: event.target.value,
        })
    }

    const checkPassword = () => {
        isOnFocusPasswordsCheckSet(true);
        if (inputRef.current.value === repPasswordRef.current.value) {
            isIdenticalSet(true);
        } else {
            isIdenticalSet(false);
        }
        if (!repPasswordRef.current.value.length) {
            isIdenticalSet(false);
        }
        repPasswordStateSet(repPasswordRef.current.value);
    }

    const onSendInputs = (event) => {
        event.preventDefault();
        errMsgSet(false);

        for (let val in inputState) {
            if (!inputState[val]) {
                errMsgSet(`${val} row is required but empty`)
                return;
            }
        }

        if (props.isMultipart) {
            props.onClickListener(fileRef.current.files[0]);
        } else {
            if (history.location.pathname === '/register') {
                if (!isIdentical) {
                    errMsgSet('Password rows is not identical');
                    return;
                }
            }
            props.onClickListener();
        }
    }

    const onFocusListener = event => {
        isOnFocusPasswordsCheckSet(false);
        inputRef.current = event.target;
    }

    const onFocusListenerPasswordCheck = event => {
        inputRef.current = event.target.parentElement.previousElementSibling.lastChild;
    }

    console.log(formInputsWithKeys);
    return (
        <section className='form-sec'>
            <h1 className='form-sec-head'>{props.headTextContent}</h1>
            {errMsg ? <ErrorMsgPage errMsg={errMsg}/> : null}
            <form className='form-submit' encType={props.isMultipart ? "multipart/form-data" : null}>
                {sendFailed ? errMsg ? null : <ErrorMsgPage errMsg={sendFailed}/> : null}
                {
                    formInputsWithKeys.map(input => {
                        const isOnFocus = !isOnFocusPasswordsCheck ? (input.name === inputRef.current.name) : false;
                        return (
                            <section key={input.key}>
                                <div className='input-row'>
                                    <label className='form-label'>{input.label}</label>
                                    <input
                                        className='form-input'
                                        autoFocus={isOnFocus}
                                        type={input.type}
                                        name={input.name}
                                        onChange={onChangeInputListener}
                                        value={inputState[input.name]}
                                        onFocus={onFocusListener}
                                        required
                                    />
                                </div>

                                {(input.name === 'password' && history.location.pathname === '/register') ?
                                    <div className='input-row'>
                                        <label className='form-label'>repeat {input.label}</label>
                                        <input
                                            ref={repPasswordRef}
                                            onChange={checkPassword}
                                            autoFocus={isOnFocusPasswordsCheck}
                                            className={classNames('form-input', {
                                                'is-identical': isIdentical,
                                                'not-identical': !isIdentical,
                                            })}
                                            value={repPasswordState}
                                            type={input.type}
                                            onFocus={onFocusListenerPasswordCheck}
                                            name={input.name}
                                            required
                                        />
                                    </div>
                                    : null
                                }
                            </section>

                        )
                    })
                }
                {props.isMultipart ? (
                    <input ref={fileRef} className='form-input' type='file' name='image'/>) : null}
                <button onClick={onSendInputs} className='form-button'>Send</button>
            </form>
        </section>
    );
}

export default FormComponent;
