import React, {useEffect}  from 'react';
import '../../styles/components/UserHistoryPage.css';
import {ShowBuyPage} from "../pages/ShowBuyPage";
import {historySet} from '../../actions'
import {connect} from 'react-redux';

const mapStateToProps=state=>({
    history: state.historyReducer,
})

const mapDispatchToProps={
    historySet,
}

function UserHistoryPage(props) {

    const {token,history,historySet} = props;

    useEffect(() => {
        fetch(`/userHistory/getHistory?token=${token}`)
            .then(res => res.json())
            .then(data => {
                historySet(data.buysList);
            })
    }, [])

    return (
            <section className='user-history-sec'>
                {
                    history.length ?
                        history.map(buy => {
                            return (<ShowBuyPage key={buy.cost} buy={buy}/>)
                        })
                        : null
                }
            </section>
    );
}

export default connect(mapStateToProps,mapDispatchToProps)(UserHistoryPage);
