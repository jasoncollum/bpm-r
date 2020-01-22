import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import useToggle from '../../hooks/useToggle';
import EditEntryForm from '../edit-entry-form/edit-entry-form.component';

import BpmContext from '../../contexts/bpm.context';

import '../entries/entries.styles.scss';

const Days = ({ sevenDays }) => {
    const { entries } = useContext(BpmContext);
    const [entryToEdit, setEntryToEdit] = useState(null);
    const [modal, toggleModal] = useToggle(false);

    const [numDays, setNumDays] = useState(sevenDays ? 7 : 30);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [dateFromToday, setDateFromToday] = useState(null);

    console.log("SEVEN_DAYS::", sevenDays)
    console.log("NUM_DAYS::", numDays)

    // Calculate date from today
    useEffect(() => {
        const getDateFromToday = async () => {
            let result = await moment().subtract(numDays, 'days').format("M/D/YYYY");
            setDateFromToday(result);
        }
        getDateFromToday();
    }, [numDays]);

    // Filter entries by date
    useEffect(() => {
        if (dateFromToday) {
            setFilteredEntries(
                entries.filter(entry => moment(entry.date).isSameOrAfter(dateFromToday))
            )
        }
    }, [dateFromToday])

    // Calculate averages
    const getSysAverage = () => {
        const total = filteredEntries.reduce(
            (accumulator, entry) => accumulator + parseInt(entry.systolic)
            , 0
        );
        return total / filteredEntries.length;
    }

    const getDiaAverage = () => {
        const total = filteredEntries.reduce(
            (accumulator, entry) => accumulator + parseInt(entry.diastolic)
            , 0
        );
        return total / filteredEntries.length;
    }

    // Get averages results
    const sysAvg = Math.round(getSysAverage());
    const diaAvg = Math.round(getDiaAverage());

    // Handle edit entry selection 
    const handleEditClick = entry => {
        setEntryToEdit(entry);
        toggleModal();
    }

    return (
        <div className="entries-container">
            {
                sevenDays ?
                    <p>7 Day BP Average:  {sysAvg}/{diaAvg}</p>
                    :
                    <p>30 Day BP Average:  {sysAvg}/{diaAvg}</p>
            }
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
                        filteredEntries.map(entry => (
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
                    />
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    );
};

export default Days;


// 1. filter entries:  Last 7 Days || Last 30 Days
        // DONE
// 2. calculate:  BP Average over given time period
        // DONE

// 3. chart + display:  BP, Pulse and Weight over given time period