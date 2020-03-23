import React, { useState } from 'react';
import './index.css';
import View from './components/View';
import * as XLSX from 'xlsx';

function App() {

  const [fileTitle, setFileTitle] = useState('No File');

  const [headerData, setHeaderData] = useState([]);

  function setTitle(getName) {
    const fileName = getName.target.files[0].name;
    setFileTitle(fileName);
  }

  const dropArea = document.getElementById('#drop-file');

    // File Reader
    function handleDrop(e) {
      console.log("File Received");
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

            //console.log(workbook);
            const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1'];

            headerCells.forEach(function (headerCell) {
              const tableHeader = `<th>${headerCell.v}</th>`;
              //console.log(tableHeader);
            });

            // Get sheet
            const worksheet = workbook.Sheets[firstSheet];

            // Get Cell
            const getCells = worksheet[headerCells[0,1,2,3,4]];

            //Get Value ion Cell
            const cellValue = (getCells ? getCells.v : undefined);

            function get_header_row(sheet) {
              var headers = [];
              var range = XLSX.utils.decode_range(sheet['!ref']);
              var C, R = range.s.r; /* start in the first row */
              /* walk every column in the range */
              console.log(R);
              var aoa = XLSX.utils.sheet_to_json(workbook.Sheets.RkNumber, {header:1});
              console.log(aoa);

              for(C = range.s.c; C <= range.e.c; ++C) {
                  var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

                  var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
                  if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
          
                  headers.push(hdr);
              }
              console.log(headers);
              return headers;
          }

          //get_header_row(worksheet);

            setHeaderData(get_header_row(worksheet));
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
      <table className="table-box">
        <tbody>
          <tr>
            <th>{headerData}</th>
              <th>Lastname</th>
          </tr>
        </tbody>
      </table>
    </div>

}

export default App;
