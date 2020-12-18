import React, {useState} from 'react';
import {useHistory} from "react-router";
import '../../styles/components/UserPage.css';
import {connect} from 'react-redux';
import {noImageUser} from '../../constants/constantImages';
import {userAuthorization} from "../../actions";

import {activeUserInfo} from '../../constants/defaultState';
import UserHistoryPage from "./UserHistoryPage";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
    }
};

const mapDispatchToProps = {
    userAuthorization,
}

function UserPage(props) {

    const {user} = props;
    const [isPopupOpen, isPopupOpenSet] = useState(false);
    const history = useHistory();
    const logOut = () => {
        props.userAuthorization(activeUserInfo);
        localStorage.clear();
        isPopupOpenSet(false);
        history.push('/login');
    }

    const closePopUp=()=>{
        isPopupOpenSet(false);
    }

    const OpenLogOutPopup = () => {
        isPopupOpenSet(true);
    }

    return (
        <section className='user-page-sec'>
            {isPopupOpen ?
                (<section className='popup-sec'>
                    <div className='popup-block'>
                        <div className='popup-question'>Are you sure to Log Out?</div>
                        <div className='popup-variants'>
                            <button onClick={logOut} className='popup-variants-btn'>Yes</button>
                            <button onClick={closePopUp} className='popup-variants-btn'>No</button>
                        </div>
                    </div>
                </section>)
                : null
            }
            <button onClick={OpenLogOutPopup} className='log-out-btn'>Log Out</button>
            <h1 className='user-page-sec-head'>Welcome, {user.name}!</h1>
            <section className='user-info-sec'>
                <div className='user-info-block'>
                    <div className='img-block'>
                        <img className='user-avatar' alt='user profile photo' src={noImageUser}/>
                        <div className='img-add'>
                            <button type='submit' className='img-plus-el'>+</button>
                        </div>
                    </div>
                    <p className='user-info-paragraph'>{user.name}</p>
                    <p className='user-info-paragraph'>{user.secName}</p>
                    <p className='user-info-paragraph'>{user.country}</p>
                    <p className='user-info-paragraph'>{user.phone}</p>
                    <p className='user-info-paragraph'>{user.email}</p>
                </div>
                <div className='history-block'>
                    <h1 className='history-block-head'>HISTORY</h1>
                    <div className='history-block-buys'>
                        <UserHistoryPage token={user.token}/>
                    </div>
                </div>
            </section>
        </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
