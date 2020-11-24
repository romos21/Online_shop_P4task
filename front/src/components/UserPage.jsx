import React from 'react';
import '../styles/components/UserPage.css';

function UserPage() {
    const noImageUser = 'https://img.pngio.com/user-profile-avatar-login-account-svg-png-icon-free-download-user-profile-png-980_966.png';
    return (
        <section className='user-page-sec'>
            <h1 className='user-page-sec-head'>Welcome, User!</h1>
            <section className='user-info-sec'>
                <div className='user-info-block'>
                    <div className='img-block'>
                        <img className='user-avatar' alt='user profile photo' src={noImageUser}/>
                        <div className='img-add'>
                            <button type='submit' className='img-plus-el'>+</button>
                        </div>
                    </div>
                    <p className='user-info-paragraph'>Name</p>
                    <p className='user-info-paragraph'>Second Name</p>
                    <p className='user-info-paragraph'>Country</p>
                    <p className='user-info-paragraph'>Phone Number</p>
                    <p className='user-info-paragraph'>Email</p>
                </div>
                <div className='history-block'>
                    <h1 className='history-block-head'>HISTORY</h1>
                    <div className='history-block-buys'/>
                </div>
            </section>
        </section>
    );
}

export default UserPage;
