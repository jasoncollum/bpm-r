import React from 'react';
import { Table } from 'reactstrap';

import './entries.styles.scss';

const Entries = () => (
    <div className='entries-container'>
        <Table>
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
                <tr>
                    <td>11/10/2019 3:57 PM</td>
                    <td>116/78</td>
                    <td>68</td>
                    <td>140</td>
                    {/* <td><i class='fas fa-pencil-alt'></i></td> */}
                </tr>
                <tr>
                    <td className='table-note'>
                        Took normal morning meds.
                    </td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default Entries;