import React from 'react';
import jsPDF from 'jspdf';
function generatePDF(data) {
  const doc = new jsPDF();
  const header = ['ID', 'Name', 'Email'];
  const rows = [];
console.log(data)
  // populate the rows array with data
 /* data.forEach((item, index) => {
    const rowData = [
      index + 1,
      item.name,
      item.email
    ];
    rows.push(rowData);
  });

  // set the y position for the header and rows
  let y = 20;

  // add the header row
  header.forEach((column, index) => {
    doc.text(column, 10, y);
    y += 10;
  });

  // add the data rows
  rows.forEach((rowData) => {
    y = Math.max(y, 20); // start at the highest y position of the header row
    rowData.forEach((columnData, index) => {
      doc.text(columnData.toString(), 10 + index * 50, y);
    });
    y += 10;
  });
*/
  doc.save('data.pdf');
}


function GeneratePdf({ data }) {
  
  const data2 = [
  { name: 'John Doe', email: 'johndoe@example.com' },
  { name: 'Jane Smith', email: 'janesmith@example.com' },
  { name: 'Bob Johnson', email: 'bobjohnson@example.com' },
];
//generatePDF(data2);

  return (
    <button onClick={() => generatePDF(data2)}>Generate PDF</button>
  );
}

export default GeneratePdf;
