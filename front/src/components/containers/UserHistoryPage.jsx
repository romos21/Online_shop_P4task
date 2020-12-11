import React, {useEffect, useState} from 'react';
import '../../styles/components/UserHistoryPage.css';
import {ShowBuyPage} from "../pages/ShowBuyPage";

function UserHistoryPage(props) {

    const {user_id} = props;
    const [userHistory, userHistorySet] = useState([]);

    useEffect(() => {
        fetch(`/userHistory/getHistory?user_id=${user_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.buysList);
                userHistorySet(data.buysList);
            })
    }, [])

    return (
            <section className='user-history-sec'>
                {
                    userHistory.length ?
                        userHistory.map(buy => {
                            return (<ShowBuyPage buy={buy}/>)
                        })
                        : null
                }
            </section>
    );
}

export default UserHistoryPage;
