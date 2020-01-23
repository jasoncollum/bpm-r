import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Table } from 'reactstrap';



import BpmContext from '../../contexts/bpm.context';
import './entries.styles.scss';

const Entries = () => {
    const { entries } = useContext(BpmContext);

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
    )
}

export default Entries;