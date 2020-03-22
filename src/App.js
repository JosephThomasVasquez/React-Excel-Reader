import React, { useState } from 'react';
import './index.css';
import View from './components/View';
import * as XLSX from 'xlsx';

function App() {

  const [fileTitle, setFileTitle] = useState('No File');

  function setTitle(getName) {
    const fileName = getName.target.files[0].name;
    setFileTitle(fileName);
  }

  const dropArea = document.getElementById('#drop-file');

    // File Reader
    function handleDrop(e) {
      console.log("File Reeceived");
        //e.stopPropogation();
        e.preventDefault();

        const files = e.target.files
        const f = files[0];

        const reader = new FileReader();
        
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});

            // Workbook setup
            const firstSheet = workbook.SheetNames[0];
            const cellAddress = 'A1';

            console.log("This is the first sheet: ", firstSheet);
            console.log("This is the cell: ", cellAddress);

            // Get sheet
            const worksheet = workbook.Sheets[firstSheet];

            console.log("This is the sheet from firstSheet: ", worksheet);

            // Get Cell
            const getCell = worksheet[cellAddress];

            console.log("This is the cell chosent: ", getCell);

            //Get Value ion Cell
            const cellValue = (getCell ? getCell.v : undefined);

            console.log("This is the value in the cell: ", cellValue);
        };

        reader.readAsArrayBuffer(f);
    };

    //dropArea.addEventListener('drop', handleDrop, false);

 

  return <div>
    <h1 className="header-title">Excel Reader</h1>
    <form className="file-area" onSubmit={handleDrop}>
      <input type="file" name="file" id="drop-file" onChange={(e) => {
        console.log(e.target.files);
        setTitle(e);
        handleDrop(e);
      }}/>
      </form>
    <View title={fileTitle}/>
    </div>

}

export default App;
