import React from 'react';
import Table from './Table';
import SheetTest from './SheetTest';

function View(props) {
    return (<div className="container-main">
        <h1 className="file-title">File: <span className="file-name">{props.title}</span></h1>
        <Table />
    </div>)
}

export default View;