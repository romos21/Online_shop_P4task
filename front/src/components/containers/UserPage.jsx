import React from 'react';
import {useHistory} from "react-router";
import '../../styles/components/UserPage.css';
import {connect} from 'react-redux';
import {noImageUser} from '../../constants/constantImages';
import {userAuthorization} from "../../actions";

import {activeUserInfo} from '../../constants/defaultState';
import UserHistoryPage from "./UserHistoryPage";

const mapStateToProps = function (state){
    return {
        user: state.userReducer,
    }
};

const mapDispatchToProps = {
    userAuthorization,
}

function UserPage(props) {

    const history=useHistory();

    const logOut=()=>{
        props.userAuthorization(activeUserInfo);
        history.push('/login');
    }

    return (
        <section className='user-page-sec'>
            <button onClick={logOut} className='log-out-btn'>Log Out</button>
            <h1 className='user-page-sec-head'>Welcome, {props.user.name}!</h1>
            <section className='user-info-sec'>
                <div className='user-info-block'>
                    <div className='img-block'>
                        <img className='user-avatar' alt='user profile photo' src={noImageUser}/>
                        <div className='img-add'>
                            <button type='submit' className='img-plus-el'>+</button>
                        </div>
                    </div>
                    <p className='user-info-paragraph'>{props.user.name}</p>
                    <p className='user-info-paragraph'>{props.user.secName}</p>
                    <p className='user-info-paragraph'>{props.user.country}</p>
                    <p className='user-info-paragraph'>{props.user.phone}</p>
                    <p className='user-info-paragraph'>{props.user.email}</p>
                </div>
                <div className='history-block'>
                    <h1 className='history-block-head'>HISTORY</h1>
                    <div className='history-block-buys'>
                        <UserHistoryPage user_id={props.user._id}/>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);
