import React, {useState, useEffect, useRef} from 'react';
import '../../styles/components/SetAdminStatusPage.css';
import {connect} from 'react-redux';
import ShowAdminInfo from "../pages/ShowAdminInfo";
import {ErrorMsgPage} from "../pages/ErrorMsgPage";

const mapStateToProps = function (state) {
    return {
        user: state.userReducer,
    }
};

function SetAdminStatusPage(props) {

    const {user} = props;

    const [searchResult, searchResultSet] = useState([]);
    const [errMsg, errMsgSet] = useState(null);
    const searchInputRef = useRef(null);
    const [adminsList, adminsListSet] = useState([]);

    useEffect(() => {
        fetch(`/admin/getAdmins?_id=${user._id}`)
            .then(res => res.json())
            .then(data => {
                if (data.errMsg) {
                    errMsgSet(data.errMsg);
                } else {
                    adminsListSet(data.admins);
                }
            })
    }, [])

    const searchUsers = async (event) => {
        event.preventDefault();
        if(!searchInputRef.current.value.length){
            searchResultSet([]);
            return;
        }
        const response = await fetch(`/admin/getUsers?inputValue=${searchInputRef.current.value}&_id=${user._id}`)
        const responseJSON = await response.json();
        searchResultSet(responseJSON.users);
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
                            searchResult.map(user => {
                                return (
                                    <ShowAdminInfo
                                        user={user}
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
                            adminsList.map(user => {
                                return (
                                    <ShowAdminInfo
                                        key={user.email}
                                        user={user}
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
