import React from 'react';
import '../styles/components/UserPage.css';
import {connect} from 'react-redux';

const mapStateToProps = function (state){
    return {
        user: state.userReducer,
    }
};

function UserPage(props) {
    const noImageUser = 'https://img.pngio.com/user-profile-avatar-login-account-svg-png-icon-free-download-user-profile-png-980_966.png';
    return (
        <section className='user-page-sec'>
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
                    <div className='history-block-buys'/>
                </div>
            </section>
        </section>
    );
}

export default connect(mapStateToProps)(UserPage);
