import React, {useState, useEffect, useRef} from 'react';
import '../../styles/components/SetAdminStatusPage.css';
import {connect} from 'react-redux';
import ShowAdminInfo from "../pages/ShowAdminInfo";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";
import Loader from "../pages/Loader,";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
    }
};

function SetAdminStatusPage(props) {

    const {user} = props;

    const [searchResult, searchResultSet] = useState([]);
    const [isLoaderAdmins, isLoaderAdminsSet] = useState(false);
    const [isLoaderUsers, isLoaderUsersSet] = useState(false);
    const [errMsg, errMsgSet] = useState(null);
    const searchInputRef = useRef(null);
    const [adminsList, adminsListSet] = useState([]);

    useEffect(() => {
        isLoaderAdminsSet(true);
        errMsgSet(null);
        fetch(`/admin/getAdmins?token=${user.token}`)
            .then(res => res.json())
            .then(data => {
                if (data.errMsg) {
                    errMsgSet(data.errMsg);
                } else {
                    adminsListSet(data.admins);
                }
            })
        isLoaderAdminsSet(false);
    }, [user.token])

    const searchUsers = async (event) => {
        isLoaderUsersSet(true);
        event.preventDefault();
        if(!searchInputRef.current.value.length){
            searchResultSet([]);
            return;
        }
        const response = await fetch(`/admin/getUsers?token=${user.token}&inputValue=${searchInputRef.current.value}`)
        const responseJSON = await response.json();
        searchResultSet(responseJSON.users);
        isLoaderUsersSet(false);
    }

    return (
        <>
            {errMsg
                ? <ErrorMsgPage errMsg={errMsg}/>
                : <section className='admin-page-sec'>
                    <form className='search-user-form' type='submit'>
                        <input ref={searchInputRef}
                               onChange={searchUsers}
                               className='search-user-input'
                               placeholder='search by user email'/>
                        <button onClick={searchUsers} className='search-user-btn' type='submit'>search</button>
                    </form>
                    <div className='search-result-list'>
                        {
                            isLoaderUsers? <Loader/>:
                            searchResult.map(userToMap => {
                                return (
                                    <ShowAdminInfo
                                        key={userToMap.email}
                                        user={userToMap}
                                        adminToken={user.token}
                                        adminsListSet={adminsListSet}
                                        adminsList={adminsList}
                                        searchResult={searchResult}
                                        searchResultSet={searchResultSet}
                                    />
                                );
                            })
                        }
                    </div>
                    <section className='admins-list'>
                        {
                            isLoaderAdmins?<Loader/>:
                            adminsList.map(userToMap => {
                                return (
                                    <ShowAdminInfo
                                        key={userToMap.email}
                                        user={userToMap}
                                        adminToken={user.token}
                                        adminsListSet={adminsListSet}
                                        adminsList={adminsList}
                                        searchResult={searchResult}
                                        searchResultSet={searchResultSet}
                                    />
                                );
                            })
                        }
                    </section>
                </section>
            }
        </>
    );
}

export default connect(mapStateToProps)(SetAdminStatusPage);
