import React, { useState, useEffect, useContext } from 'react';

import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
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
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        const snapshot = await firestore.collection(`users/${currentUser.id}/entries`)
            .orderBy("date", "desc")
            .get();
        setEntries(snapshot.docs.map(doc => {
            let data = doc.data()
            return { ...data, id: doc.id }
        }));
    }

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
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit bpm entry...</ModalHeader>
                <ModalBody>
                    <EditEntryForm
                        entry={entryToEdit}
                        toggleModal={toggleModal}
                        fetchEntries={fetchEntries}
                    />
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    )
}

export default Entries;