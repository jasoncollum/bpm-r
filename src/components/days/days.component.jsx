import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table } from 'reactstrap';

import BpmContext from '../../contexts/bpm.context';

import '../entries/entries.styles.scss';
import './days.styles.scss';

const Days = ({ days }) => {
    const { entries } = useContext(BpmContext);
    const [prevDays, setPrevDays] = useState(days);
    const [numDays, setNumDays] = useState(days);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [dateFromToday, setDateFromToday] = useState(null);

    // Calculate date from today
    useEffect(() => {
        const getDateFromToday = async () => {
            let result = await moment().subtract(numDays, 'days').format("M/D/YYYY");
            setDateFromToday(result);
        }
        getDateFromToday();
    }, [prevDays]);

    // Filter entries by date
    useEffect(() => {
        if (dateFromToday) {
            setFilteredEntries(
                entries.filter(entry => moment(entry.date).isSameOrAfter(dateFromToday))
            )
        }
    }, [dateFromToday])

    // Render Days component if sevenDays variable changes
    if (days !== prevDays) {
        setNumDays(days);
        setPrevDays(days);
    }

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

    return (
        <div className="entries-container">
            {
                (days === 7) ?
                    <p className='bp-average-message'>7 Day BP Average:  {sysAvg}/{diaAvg}</p>
                    :
                    <p className='bp-average-message'>30 Day BP Average:  {sysAvg}/{diaAvg}</p>
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
                                    <td>
                                        <Link className='icon-btn'
                                            to={`/editentryform/${entry.id}`}>
                                            <i className='fas fa-pencil-alt pencil-icon'></i>
                                        </Link>
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
        </div>
    );
};

export default Days;