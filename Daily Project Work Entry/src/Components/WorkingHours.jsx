import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notecontext';
import WeekBox from './WeekBox'
import WorkSummaryBox from './WorkSummaryBox';

const WorkingHours = () => {
  const context = useContext(noteContext);
  const { DPRS, getdprs } = context;
  const [weekly, setWeekly] = useState([])
  const [daily, setDaily] = useState([])

  const getDate = (date) => {
    let d = date.toString().split(' ')
    let Month = new Date(date).getMonth() + 1
    return `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`
  }


  const datafetch = () => {
    setWeekly([])
    setDaily([])
    if (DPRS !== undefined && DPRS.length !== 0) {
      let weeklyData = [];
      let today = new Date();
      let priorDate = new Date(new Date().setMonth(today.getMonth() - 6));
      while (priorDate <= today) {
        let start = new Date(priorDate);
        start.setDate(start.getDate() - start.getDay());
        let end = new Date(priorDate);
        end.setDate(end.getDate() - end.getDay() + 6);
        let filteredDPRS = DPRS.filter((dprs) => {
          return new Date(dprs.date).getTime() >= new Date(start).getTime()
        }).filter((dprs) => {
          return new Date(dprs.date).getTime() <= new Date(end).getTime()
        });
        let projectData = []
        let totalWorkHours = 0;
        let totalManagementHours = 0;
        filteredDPRS.forEach((dprs) => {
          const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1])
          const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1])
          let projectExists = projectData.find(project => project.name === dprs.project);
          if (projectExists) {
            projectExists.workHours += workHourInMinutes;
            projectExists.managementHours += managementHourInMinutes;
          } else {
            projectData.push({
              workHours: workHourInMinutes,
              managementHours: managementHourInMinutes
            });
          }
          totalWorkHours += workHourInMinutes;
          totalManagementHours += managementHourInMinutes;
        });
        weeklyData.push({
          startDate: start,
          endDate: end,
          totalWorkHours: totalWorkHours,
          totalManagementHours: totalManagementHours
        });

        priorDate.setDate(priorDate.getDate() + 7);
        if (priorDate >= today) {
          break;
        }
      }
      setWeekly(weeklyData.reverse())
    }
    if (DPRS !== undefined && DPRS.length !== 0) {


      let DailyData = [];
      let today = new Date();
      let priorDate = new Date(new Date().setDate(today.getDate() - 14));

      while (priorDate <= today) {
        let filteredDPRS = DPRS.filter((dprs) => {
          return new Date(dprs.date).getTime() === new Date(getDate(priorDate)).getTime()
        })
        let projectData = []
        let totalWorkHours = 0;
        let totalManagementHours = 0;
        let entry = 0
        filteredDPRS.forEach((dprs, index) => {
          entry++
          const workHourInMinutes = parseInt(dprs.workHour.split(':')[0] * 60) + parseInt(dprs.workHour.split(':')[1])
          const managementHourInMinutes = parseInt(dprs.managementHour.split(':')[0] * 60) + parseInt(dprs.managementHour.split(':')[1])
          let projectExists = projectData.find(project => project.name === dprs.project);
          if (projectExists) {
            projectExists.workHours += workHourInMinutes;
            projectExists.managementHours += managementHourInMinutes;
            projectExists.entry = entry
          } else {
            projectData.push({
              workHours: workHourInMinutes,
              managementHours: managementHourInMinutes,
              entry: entry
            });
          }
          totalWorkHours += workHourInMinutes;
          totalManagementHours += managementHourInMinutes;
        });
        DailyData.push({
          date: getDate(priorDate),
          entry: entry,
          totalWorkHours: totalWorkHours,
          totalManagementHours: totalManagementHours
        });

        priorDate.setDate(priorDate.getDate() + 1);
        if (priorDate > today) {
          const initialValue = { entrySum: 0, workHourSum: 0, managementHourSum: 0 };
          const totals = DailyData.reduce((acc, data) => {
            return {
              entrySum: acc.entrySum + data.entry,
              workHourSum: acc.workHourSum + data.totalWorkHours,
              managementHourSum: acc.managementHourSum + data.totalManagementHours,
            };
          }, initialValue);
          DailyData.push({ date: 'Week', entry: totals.entrySum, totalWorkHours: totals.workHourSum, totalManagementHours: totals.managementHourSum });
          break;

        }
      }
      setDaily(DailyData)
    }

  }

  useEffect(() => {
    getdprs()
    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    datafetch()
    // eslint-disable-next-line 
  }, [DPRS])

  return (
    <>
      {/* Worked Summary Details  */}
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
  )
}

export default WorkingHours
