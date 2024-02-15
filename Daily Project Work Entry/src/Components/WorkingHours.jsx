import React, { useContext, useEffect, useState } from 'react'; // Importing necessary modules
import noteContext from '../Context/notes/notecontext'; // Importing noteContext
import WeekBox from './WeekBox'; // Importing WeekBox component
import WorkSummaryBox from './WorkSummaryBox'; // Importing WorkSummaryBox component

const WorkingHours = () => {
  const context = useContext(noteContext); // Initializing context
  const { DPRS, getdprs } = context; // Destructuring values from context
  const [weekly, setWeekly] = useState([]); // Initializing state for weekly data
  const [daily, setDaily] = useState([]); // Initializing state for daily data

  // Function to format date
  const getDate = (date) => {
    let d = date.toString().split(' '); // Splitting date string
    let Month = new Date(date).getMonth() + 1; // Getting month
    return `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`; // Returning formatted date
  };

  // Function to fetch data
  const datafetch = () => {
    setWeekly([]); // Resetting weekly data
    setDaily([]); // Resetting daily data
    if (DPRS !== undefined && DPRS.length !== 0) {
      let weeklyData = []; // Initializing array for weekly data
      let today = new Date(); // Getting today's date
      let priorDate = new Date(new Date().setMonth(today.getMonth() - 6)); // Getting date 6 months ago

      // Loop for weekly data calculation
      while (priorDate <= today) {
        let start = new Date(priorDate); // Setting start date of the week
        start.setDate(start.getDate() - start.getDay()); // Setting start date to Sunday of the week
        let end = new Date(priorDate); // Setting end date of the week
        end.setDate(end.getDate() - end.getDay() + 6); // Setting end date to Saturday of the week

        // Filtering DPRS data for the current week
        let filteredDPRS = DPRS.filter((dprs) => {
          return new Date(dprs.date).getTime() >= new Date(start).getTime(); // Filtering start date
        }).filter((dprs) => {
          return new Date(dprs.date).getTime() <= new Date(end).getTime(); // Filtering end date
        });

        let projectData = []; // Initializing array for project data
        let totalWorkHours = 0; // Initializing total work hours
        let totalManagementHours = 0; // Initializing total management hours

        // Loop for calculating project-wise data
        filteredDPRS.forEach((dprs) => {
          const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1]); // Calculating work hours in minutes
          const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1]); // Calculating management hours in minutes
          let projectExists = projectData.find(project => project.name === dprs.project); // Checking if project exists in projectData array
          if (projectExists) {
            projectExists.workHours += workHourInMinutes; // Adding work hours to existing project
            projectExists.managementHours += managementHourInMinutes; // Adding management hours to existing project
          } else {
            projectData.push({ // Adding new project
              workHours: workHourInMinutes,
              managementHours: managementHourInMinutes
            });
          }
          totalWorkHours += workHourInMinutes; // Adding work hours to total work hours
          totalManagementHours += managementHourInMinutes; // Adding management hours to total management hours
        });

        // Pushing weekly data to weeklyData array
        weeklyData.push({
          startDate: start,
          endDate: end,
          totalWorkHours: totalWorkHours,
          totalManagementHours: totalManagementHours
        });

        priorDate.setDate(priorDate.getDate() + 7); // Moving to next week
        if (priorDate >= today) {
          break; // Breaking loop if priorDate is greater than or equal to today
        }
      }
      setWeekly(weeklyData.reverse()); // Setting weekly data
    }

    // Calculating daily data
    if (DPRS !== undefined && DPRS.length !== 0) {
      let DailyData = []; // Initializing array for daily data
      let today = new Date(); // Getting today's date
      let priorDate = new Date(new Date().setDate(today.getDate() - 14)); // Getting date 14 days ago

      // Loop for daily data calculation
      while (priorDate <= today) {
        let filteredDPRS = DPRS.filter((dprs) => {
          return new Date(dprs.date).getTime() === new Date(getDate(priorDate)).getTime(); // Filtering DPRS for the specific date
        });
        let projectData = []; // Initializing array for project data
        let totalWorkHours = 0; // Initializing total work hours
        let totalManagementHours = 0; // Initializing total management hours
        let entry = 0; // Initializing entry count

        // Loop for calculating project-wise data
        filteredDPRS.forEach((dprs, index) => {
          entry++; // Incrementing entry count
          const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1]); // Calculating work hours in minutes
          const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1]); // Calculating management hours in minutes
          let projectExists = projectData.find(project => project.name === dprs.project); // Checking if project exists in projectData array
          if (projectExists) {
            projectExists.workHours += workHourInMinutes; // Adding work hours to existing project
            projectExists.managementHours += managementHourInMinutes; // Adding management hours to existing project
            projectExists.entry = entry; // Updating entry count
          } else {
            projectData.push({ // Adding new project
              workHours: workHourInMinutes,
              managementHours: managementHourInMinutes,
              entry: entry
            });
          }
          totalWorkHours += workHourInMinutes; // Adding work hours to total work hours
          totalManagementHours += managementHourInMinutes; // Adding management hours to total management hours
        });

        // Pushing daily data to DailyData array
        DailyData.push({
          date: getDate(priorDate),
          entry: entry,
          totalWorkHours: totalWorkHours,
          totalManagementHours: totalManagementHours
        });

        priorDate.setDate(priorDate.getDate() + 1); // Moving to next day
        if (priorDate > today) {
          const initialValue = { entrySum: 0, workHourSum: 0, managementHourSum: 0 }; // Initializing object for reducing daily data
          const totals = DailyData.reduce((acc, data) => {
            return {
              entrySum: acc.entrySum + data.entry,
              workHourSum: acc.workHourSum + data.totalWorkHours,
              managementHourSum: acc.managementHourSum + data.totalManagementHours,
            };
          }, initialValue); // Reducing daily data to get totals
          DailyData.push({ date: 'Week', entry: totals.entrySum, totalWorkHours: totals.workHourSum, totalManagementHours: totals.managementHourSum }); // Pushing weekly totals
          break; // Breaking loop
        }
      }
      setDaily(DailyData); // Setting daily data
    }
  };

  useEffect(() => {
    getdprs(); // Fetching DPRS data
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    datafetch(); // Fetching data
    // eslint-disable-next-line 
  }, [DPRS]); // Watching for changes in DPRS

  return (
    <>
      {/* Worked Summary Details */}
      <div className="pt-2">
        <div className="workHour-title">
          Worked Summary Details
        </div>
        <div className="workHour-container">
          <div className='d-flex flex-wrap justify-content-between  pt-1 '>
            {
              Object.entries(daily).length > 0 ?
                (Object.entries(daily).map(([index, data]) => {
                  return <WorkSummaryBox key={index} date={data.date} entry={data.entry} workHour={data.totalWorkHours} managementHour={data.totalManagementHours} />
                }))
                : <div className="text-center py-3"> No Data Found</div>
            }
          </div>
        </div>
      </div>

      {/* Week Summary Details */}
      <div className="pt-2">
        <div className="workHour-title">
          Week Summary Details
        </div>
        <div className="workHour-container">
          <div className='d-flex flex-wrap justify-content-between  pt-1 '>
            {Object.entries(weekly).length > 0 ?
              (Object.entries(weekly.reverse()).map(([index, data]) => {
                if (index >= 24) { return '' }
                return <WeekBox key={index} StartDate={data.startDate} lastDate={data.endDate} workHour={data.totalWorkHours} managementHour={data.totalManagementHours} />
              }))
              : <div className="text-center py-3"> No Data Found</div>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkingHours;
