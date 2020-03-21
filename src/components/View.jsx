import React from 'react';
import Table from './Table';

function View() {
    return (<div className="container-main">
        <h1 className="file-title">File: <span className="file-name">excelFile.xlsx</span></h1>
        <Table />
    </div>)
}

export default View;