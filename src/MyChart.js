import React  from "react";
import { LineChart, Line,BarChart, Bar,PieChart, Pie, Cell , XAxis, YAxis, CartesianGrid, Tooltip, Legend,Label} from "recharts";

const MyChart = (props) => {
    const { data } = props;
    const data2 = data.filter(d => d.value !== 'na');
    const data3 = data.filter(d => d.year === 2019);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const ethnicData = [{ Chinese:0, Malays:0, Indians:0, Other_Ethnic_Groups:0 }];
    data3.forEach(d => {
      for (let i = 0; i < ethnicData.length; i++) {

          if (d.level_1 === 'Total Malays') {
            ethnicData[i].Malays += d.value;
          } else if(d.level_1 === 'Total Chinese') {
            ethnicData[i].Chinese += d.value;
          }
          else if(d.level_1 === 'Total Indians') {
            ethnicData[i].Indians += d.value;
          }
          else if(d.level_1 === 'Other Ethnic Groups (Total)') {
            ethnicData[i].Other_Ethnic_Groups += d.value;
      }
          

    }}   
    );
    
    const ethnicData2 = Object.entries(ethnicData[0]).map(([name, value]) => ({ name, value }));
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: 15}}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const filteredData = [];
data2.forEach(d => {
  let found = false;
  for (let i = 0; i < filteredData.length; i++) {
      
    if (filteredData[i].year === d.year ) {
      if (d.level_1 === 'Total Female Residents') {
        filteredData[i].femaleValue += d.value;
      } else if(d.level_1 === 'Total Male Residents') {
        filteredData[i].maleValue += d.value;
      }
      found = true;
      break;
    }
  }
  if (!found) {
    
    let obj = { year: d.year, maleValue:0, femaleValue:0 };

    if (d.level_1 === 'Total Female Residents') {
      obj.femaleValue = d.value;
    } else if(d.level_1 === 'Total Male Residents'){
      obj.maleValue = d.value;
      
    }

    filteredData.push(obj);
    found =true
  }
}

  
);



  return (
    <div>
    <div style={{ width: "100%", height: 800}}  >
        <h3 style={{ textAlign: 'center'}}> The Growth of Singapore Resident Population by Gender from 1957 to 2019</h3>
        <LineChart width={1200} height={600}  data={filteredData} margin={{ top: 5, left: 100, bottom: 5 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
          <Line type="monotone" dataKey="femaleValue" stroke="#8884d8" />
          <Line type="monotone" dataKey="maleValue" stroke="#82ca9d" />
     
        </LineChart>
    
    </div>

    <div style={{ width: "100%", height: 800}}>
      <h3 style={{ textAlign: 'center'}}> The Population of Singapore Residents by Gender from 1957 to 2019 </h3>
      <BarChart width={1200} height={600} data={filteredData} margin={{ top: 5,  left: 100, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
        <Bar dataKey="femaleValue" fill="#8884d8" />
        <Bar dataKey="maleValue" fill="#82ca9d"/>
      </BarChart>
      </div>
   <div style={{ display:"flex"}}  >
    <div style={{ width: "50%", height: 400 }}>
        <h3 style={{ textAlign: 'center'}}> Ethnic Distribution of Singapore Resident Population(number) in 2019</h3>
        <PieChart width={420} height={500} margin={{  left: 50 }}>
        <Pie data={ethnicData2} cx={200} cy={200} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label  margin={{ top: 5, left: 40, bottom: 5 }}>
        {
          data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
        }
        <Label position="center">
        </Label>    
        </Pie>
        <Tooltip />
        </PieChart>
    </div>
    
    <div style={{ width: "50%", height: 200}}>
        <h3 style={{ textAlign: 'center'}}>  Ethnic Distribution of Singapore Resident Population(%) in 2019</h3>
        <PieChart width={500} height={400}>
          <Pie
            data={ethnicData2}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={5}
            margin={{ top: 5, left: 600, bottom: 5 }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
   
    </div>
    </div>
    

    </div>
  );
};

export default MyChart;
