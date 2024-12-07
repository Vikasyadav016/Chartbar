// import React, { useState, useEffect, useMemo } from "react";
// import { Container, Row, Col, Form, Card } from "react-bootstrap";
// import ReactApexChart from "react-apexcharts";
// import { format } from "date-fns"; // Added format for date formatting
// import { getWeeksInMonth } from "./dateHelper";

// const Dashboard = () => {
//   const [month, setMonth] = useState(new Date());
//   const [selectedWeek, setSelectedWeek] = useState(1);
// const [realData, setRealData] = useState([]);

// useMemo(() =>{

// },[])

//   const [chartData, setChartData] = useState({
//     series: [
//       {
//         name: "Total Registered",
//         data: [60, 75, 85, 50, 49, 60, 70],
//       },
//       {
//         name: "Successfully Completed",
//         data: [20, 35, 25, 40, 38, 50, 60],
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "bar",
//       },
//       plotOptions: {
//         bar: {
//           columnWidth: "60%",
//         },
//       },
//       xaxis: {
//         categories: [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ],
//       },
//     },
//   });

//   // Get weeks in the selected month
//   const weeksInMonth = getWeeksInMonth(month);

//   // Ensure weeksInMonth is an array before rendering the select options
//   const handleWeeksOptions = () => {
//     if (Array.isArray(weeksInMonth)) {
//       return weeksInMonth.map((week, index) => (
//         <option key={index} value={index + 1}>
//           Week {index + 1} ({format(week.start, "MMM dd")} -{" "}
//           {format(week.end, "MMM dd")})
//         </option>
//       ));
//     }
//     return <option>No Weeks Available</option>;
//   };

//   useEffect(() => {
// //     // Simulate fetching data when month or week changes
//     const fetchData = () => {
//       const newTotalRegistered = [
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//         Math.floor(Math.random() * 100),
//       ];
//       const newSuccessfullyCompleted = [
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//         Math.floor(Math.random() * 70),
//       ];

//       setChartData((prev) => ({
//         ...prev,
//         series: [
//           { name: "Total Registered", data: newTotalRegistered },
//           { name: "Successfully Completed", data: newSuccessfullyCompleted },
//         ],
//       }));
//     };

//     fetchData();
//   }, [month, selectedWeek]);

//   return (
//     <Container>
//       <h2 className="text-center my-4">Dashboard</h2>
//       <Card>
//         <Row className="mb-4">
//           <Col md={6}>
//             <Form.Group controlId="formMonthSelect">
//               <Form.Label>Select Month</Form.Label>
//               <Form.Control
//                 type="month"
//                 value={format(month, "yyyy-MM")}
//                 onChange={(e) => setMonth(new Date(e.target.value))}
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group controlId="formWeekSelect">
//               <Form.Label>Select Week</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedWeek}
//                 onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
//               >
//                 {handleWeeksOptions()}
//               </Form.Control>
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <ReactApexChart
//               options={chartData.options}
//               series={chartData.series}
//               type="bar"
//               height={350}
//             />
//           </Col>
//         </Row>
//       </Card>
//     </Container>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { format } from "date-fns";
import axios from "axios";
import { getWeeksInMonth } from "./dateHelper";

const Dashboard = () => {
  const [month, setMonth] = useState(new Date("2024-08-15"));
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [clubData, setClubData] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log("startDate", startDate);
  console.log("endDate", endDate);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Total Registered",
        data: [10, 0, 0, 0, 0, 0, 0], // Placeholder for total registered
      },
      {
        name: "Successfully Completed",
        data: [4, 0, 0, 0, 0, 0, 0], // Placeholder for successfully completed
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
      },
    },
  });
  const fetchClubData = async () => {
    const clubDataBasedOnDate = new FormData();
    clubDataBasedOnDate.append("startDate", startDate);
    clubDataBasedOnDate.append("endDate", endDate);
    const response = await axios.post(
      "http://localhost:5000/api/get/all/club/details/for/chart",
      clubDataBasedOnDate
    );
    setClubData(response.data);
    console.log(response);
  };

  useEffect(() => {
      fetchClubData(); // Fetch club data on load
  }, [startDate,endDate]);

  useEffect(() => {
    if (clubData) {
      const totalRegistered = clubData?.registrationCount;
      const successfullyCompleted = clubData?.registrationCountSuccess;
      setChartData((prev) => ({
        ...prev,
        series: [
          { name: "Total Registered", data: totalRegistered },
          { name: "Successfully Completed", data: successfullyCompleted },
        ],
      }));
    }
  }, [clubData]);

  const weeksInMonth = getWeeksInMonth(month);

  const handleWeeksOptions = () => {
    if (Array.isArray(weeksInMonth)) {
      return weeksInMonth.map((week, index) => (
        <option key={index} value={index + 1}>
          Week {index + 1} ({format(week.start, "MMM dd")} -{" "}
          {format(week.end, "MMM dd")})
        </option>
      ));
    }
    return <option>No Weeks Available</option>;
  };
  useEffect(() => {
    if (weeksInMonth && weeksInMonth[selectedWeek - 1]) {
      const selectedWeekData = weeksInMonth[selectedWeek - 1];
      const startDate = format(selectedWeekData.start, "yyyy-MM-dd");
      const endDate = format(selectedWeekData.end, "yyyy-MM-dd");
      setStartDate(startDate);
      setEndDate(endDate);
      console.log(`Start Date of Selected Week: ${startDate}`);
      console.log(`End Date of Selected Week: ${endDate}`);
    }
  }, [selectedWeek, month]);

  const handleMonthChange = (e) => {
    const selectedDate = new Date(e.target.value);
    if (
      selectedDate >= new Date("2024-08-15") &&
      selectedDate <= new Date("2024-10-14")
    ) {
      setMonth(selectedDate);
    } else if (selectedDate < new Date("2024-08-15")) {
      setMonth(new Date("2024-08-15")); // Set to minimum date if earlier
    } else if (selectedDate > new Date("2024-10-14")) {
      setMonth(new Date("2024-10-14")); // Set to maximum valid date
    }
  };
  return (
    <Container>
      <h2 className="text-center my-4">Dashboard</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group controlId="formMonthSelect">
            <Form.Label>Select Month</Form.Label>
            <Form.Control
              type="month"
              value={format(month, "yyyy-MM")}
              min="2024-08" // Minimum valid month
              max="2024-10" // Maximum valid month (October 2024)
              onChange={handleMonthChange}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formWeekSelect">
            <Form.Label>Select Week</Form.Label>
            <Form.Control
              as="select"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            >
              {handleWeeksOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
