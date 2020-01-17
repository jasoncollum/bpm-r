import React, { useState, useEffect, useContext } from 'react';
import { Table, Modal, ModalHeader } from 'reactstrap';
import useToggle from '../../hooks/useToggle';
import EditEntryForm from '../edit-entry-form/edit-entry-form.component';

import { firestore } from '../../firebase/firebase.utils';

import CurrentUserContext from '../../contexts/current-user.context';
import './entries.styles.scss';

const Entries = () => {
    const [entries, setEntries] = useState([]);
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [modal, toggleModal] = useToggle(false);
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        const fetchData = async (userId) => {
            const data = await firestore.collection(`users/${userId}/entries`)
                .orderBy("id", "desc")
                .get();
            setEntries(data.docs.map(doc => doc.data()));
        }
        fetchData(currentUser.id);
    }, [currentUser]);

    const handleEditClick = entry => {
        setEntryToEdit(entry);
        toggleModal();
    }

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
                        entries.map(entry => (
                            <React.Fragment key={entry.id}>
                                <tr>
                                    <td>{entry.date}</td>
                                    <td>{entry.systolic}/{entry.diastolic}</td>
                                    <td>{entry.pulse}</td>
                                    <td>{entry.weight}</td>
                                    <td><button className='icon-btn' onClick={() => handleEditClick(entry)}>
                                        <i className='fas fa-pencil-alt pencil-icon'></i>
                                    </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='table-note' colSpan="12">
                                        {entry.notes}
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))
                    }

                </tbody>
            </Table>
            <Modal isOpen={modal}>
                <EditEntryForm entry={entryToEdit} />
            </Modal>
        </div>
    )
}

export default Entries;