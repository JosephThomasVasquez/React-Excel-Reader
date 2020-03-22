import React from 'react';

function Table() {

    return <div className="container">
        <table className="table-box">
            <tbody>
            <tr>
                <th>Firstname</th>
                <th>Lastname</th>
            </tr>
            <tr>
                <td>John</td>
                <td>Doe</td>
            </tr>
            <tr>
                <td>Emily</td>
                <td>Jackson</td>
            </tr>
            </tbody>
        </table>
    </div>
}

export default Table;