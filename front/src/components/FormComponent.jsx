import React,{useRef} from 'react';
import shortId from 'short-id';
import '../styles/components/SignInPage.css';

function FormComponent(props) {

    const {onChangeInputState,inputState}=props;
    let inputRef=useRef('');
    const formInputsWithKeys=props.formInputs.map(input=>({...input,key:shortId.generate()}));

    const onChangeInputListener=(event)=>{
        onChangeInputState({
        ...inputState,
            [event.target.name]: event.target.value,
        })
    }

    const onFocusListener=event=>{
        inputRef.current=event.target;
    }

    return (
        <section className='prod-add-sec'>
            <h1 className='prod-add-head'>Add Product</h1>
            <form className='sign-in-form'>
                {
                    formInputsWithKeys.map(input => {
                        console.log(inputRef.current.name);
                        const isOnFocus=(input.name===inputRef.current.name);
                        return (
                            <input
                                key={input.key}
                                className=''
                                autoFocus={isOnFocus}
                                type={input.type}
                                name={input.name}
                                onChange={onChangeInputListener}
                                placeholder={input.name}
                                value={inputState[input.name]}
                                onFocus={onFocusListener}
                                required
                            />
                        )
                    })
                }
                <button onClick={props.onClickListener} className='sign-in-button'>{props.btnTextContent}</button>
            </form>
        </section>
    );
}

export default FormComponent;
