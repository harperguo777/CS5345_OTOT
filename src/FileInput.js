import React, { useState } from 'react';
import Papa from 'papaparse';
import MyChart from "./MyChart";

const FileInput = () => {
  const [jsonData, setJsonData] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = function() {
      const csvFile = reader.result;

      Papa.parse(csvFile, {
        header: true,
        dynamicTyping: true,

        complete: function(results) {
          setJsonData(results.data);
          console.log('test console.log(jsonData)',results.data)
         
        }
      });
    };
    reader.readAsText(file);
  };

  return (
    <div>
      
      <input type="file" onChange={handleFileInput} />
      {jsonData && (
        // Use jsonData to build chart using Recharts
       <div  style={{ width: "100%", height: 300,display:"center"}}> 
       <div>Data loaded!</div>
      
      <MyChart data= {jsonData}></MyChart>
       </div>
      )}
    </div>
  );
};

export default FileInput;