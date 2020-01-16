import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'reactstrap';
// import moment from 'moment';

import { firestore } from '../../firebase/firebase.utils';

import CurrentUserContext from '../../contexts/current-user.context';
import './entries.styles.scss';

const Entries = () => {
    const [entries, setEntries] = useState([]);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        const fetchData = async (userId) => {
            const data = await firestore.collection(`users/${userId}/entries`)
                .orderBy("date", "desc")
                .get();
            setEntries(data.docs.map(doc => doc.data()));
        }
        fetchData(currentUser.id);
    }, [currentUser])

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

export default Entries;