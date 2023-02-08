import React from 'react';
import FileInput from "./FileInput";


export default function App(){
    return (
    <div  style={{ width: "100%", height: 1500 }}>
      <div>
      <h1 style={{ textAlign: 'center'}}> OTOT A1</h1>
      <a href="https://data.gov.sg/dataset/resident-population-by-ethnicity-gender-and-age-group">Click to check this dataset on data.gov.sg</a>
      </div>
     
      <div>
      <FileInput></FileInput>
      </div>
    </div>
      




    );
  }