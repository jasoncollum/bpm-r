import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { firestore } from '../../firebase/firebase.utils';
// import { selectCurrentUser } from '../../redux/user/user.selectors';

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

const Entries = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async (userId) => {
            const data = await firestore.collection(`users/${userId}/entries`)
                .orderBy("date", "asc")
                .get();
            setEntries(data.docs.map(doc => doc.data()));
        }
        fetchData("zahKXV2wMHeJbFPbbWXLfS9wTT32");
    }, [])

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