import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'reactstrap';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { firestore } from '../../firebase/firebase.utils';
// import { selectCurrentUser } from '../../redux/user/user.selectors';
import CurrentUserContext from '../../contexts/current-user.context';
import './entries.styles.scss';

// const entries = [
//     {
//         id: 1,
//         date: '11/10/2019 3:57 PM',
//         systolic: 116,
//         diastolic: 78,
//         pulse: 68,
//         weight: 140,
//         notes: 'Took normal morning meds and walked three miles.'
//     },
//     {
//         id: 2,
//         date: '11/11/2019 2:16 PM',
//         systolic: 121,
//         diastolic: 83,
//         pulse: 74,
//         weight: 140,
//         notes: 'Took normal morning meds.'
//     }
// ]

const Entries = (props) => {
    const [entries, setEntries] = useState([]);
    const currentUser = useContext(CurrentUserContext);
    console.log("ENTRIES-USER::", currentUser);
    // const activeUser = props.user;

    // useEffect(() => {
    //     const fetchData = async (userId) => {
    //         const data = await firestore.collection(`users/${userId}/entries`)
    //             .orderBy("date", "asc")
    //             .get();
    //         setEntries(data.docs.map(doc => doc.data()));
    //     }
    //     fetchData(activeUser.id);
    // }, [])

    // const filteredEntries = entries.filter(entry => entry.date > "12/1/2019 2:00 PM");

    return (
        <div className="entries-container">
            <Table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>BP</th>
                        <th>Pulse</th>
                        <th>Weight</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entries.map(({ id, date, systolic, diastolic, pulse, weight, notes }) => (
                            <React.Fragment key={id}>
                                <tr>
                                    <td>{date}</td>
                                    <td>{systolic}/{diastolic}</td>
                                    <td>{pulse}</td>
                                    <td>{weight}</td>
                                    <td><i className='fas fa-pencil-alt pencil-icon'></i></td>
                                </tr>
                                <tr>
                                    <td className='table-note' colSpan="12">{notes}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}


// const mapStateToProps = createStructuredSelector({
//     currentUser: selectCurrentUser
// });

// export default connect(mapStateToProps)(Entries);

export default Entries;