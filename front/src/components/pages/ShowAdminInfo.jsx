import React from 'react';
import '../../styles/components/ShowAdminInfo.css';
import {noImageUser} from '../../constants/constantImages';
import classNames from 'classnames';


function ShowAdminInfo(props) {

    const {user,adminToken,adminsListSet,adminsList}=props;

    const changeUserStatus=async ()=>{

        const response=await fetch(`/admin/setUserStatus?token=${adminToken}&email=${user.email}`);
        const responseJSON=await response.json();

        if(!responseJSON.status){
            const newAdminsList=adminsList.filter(admin=>admin.email!==user.email);
            adminsListSet(newAdminsList);
        } else {
            adminsListSet([...adminsList, user])
        }
    }

    return (

        <div className='admin-block'>
            <div className='admin-data'>
                <img className='admin-img' src={noImageUser}/>
                <div className='admin-info'>
                    <p>{user.name}</p>
                    <p>{user.secName}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            <button
                onClick={changeUserStatus}
                className={
                    classNames('admin-btn', {
                        'is-admin': adminsList.includes(user),
                        'not-admin': !adminsList.includes(user)
                    })}
                type='submit'>
                A
            </button>
        </div>

    )
}

export default ShowAdminInfo;
