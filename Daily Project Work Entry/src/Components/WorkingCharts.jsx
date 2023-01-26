import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../Context/notes/notecontext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2'
import globalContext from '../Context/notes/globalContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);


const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const WorkingCharts = () => {
  const gContext = useContext(globalContext)
  const { sidebarIsOpen } = gContext;

  const context = useContext(noteContext);
  const { DPRS, getdprs } = context;
  const [dailyData, setDailyData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 2, 1],
        borderColor: '#c47c9d',
        backgroundColor: '#e2cce3'
      },
      {
        label: 'Dataset 2',
        data: [9, 8, 7, 6, 5, 4],
        borderColor: '#615496',
        backgroundColor: '#cde7e7'
      },
    ],
  })
  const [weeklyData, setWeeklyData] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 2, 1],
        borderColor: '#c47c9d',
        backgroundColor: '#e2cce3'
      },
      {
        fill: true,
        label: 'Dataset 2',
        data: [9, 8, 7, 6, 5, 4],
        borderColor: '#615496',
        backgroundColor: '#cde7e7'
      },
    ],
  })
  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        label: 'Dataset 1',
        data: [1, 2, 3, 4, 2, 1],
        borderColor: '#c47c9d',
        backgroundColor: '#e2cce3'
      },
      {
        fill: true,
        label: 'Dataset 2',
        data: [9, 8, 7, 6, 5, 4],
        borderColor: '#615496',
        backgroundColor: '#cde7e7'
      },
    ],
  })
  let daydateData = []
  let dayworkData = []
  let daymanageData = []
  let weekdateData = []
  let weekworkData = []
  let weekmanageData = []
  let monthdateData = []
  let monthworkData = []
  let monthmanageData = []


  const minutesToTime = (minutes) => {
    let h = Math.floor(minutes / 60);
    let m = minutes % 60;
    return h + (m * 10) / 6
  }

  const getDate = (date) => {
    let d = date.toString().split(' ')
    return `${d[2]}-${d[1]}`
  }

  const formateDate = (date) => {
    let d = date.toString().split(' ')
    let Month = new Date(date).getMonth() + 1
    return `${d[3]}-${Month < 10 ? `0${Month}` : Month}-${d[2]}`
  }

  const getMonth = (date) => {
    let d = date.toString().split(' ')
    return `${d[1]}-${d[3]}`
  }



  const datafetch = () => {
    // Monthly Data Fetch
    if (DPRS !== undefined && DPRS.length !== 0) {
      let monthly = [];
      let today = new Date();
      let priorDate = new Date(new Date().setMonth(today.getMonth() - 11));
      priorDate.setDate(1);
      while (priorDate <= today) {
        let start = new Date(priorDate);
        start.setDate(1);
        let end = new Date(priorDate);
        end.setMonth(end.getMonth() + 1);
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
        monthly.push({
          startDate: getMonth(start),
          endDate: getMonth(end),
          totalWorkHours: minutesToTime(totalWorkHours),
          totalManagementHours: minutesToTime(totalManagementHours)
        });

        priorDate.setMonth(priorDate.getMonth() + 1);
        if (priorDate > today) {
          break;
        }
      }
      for (let index = 0; index < monthly.length; index++) {
        const element = monthly[index];
        monthdateData.push(index % 2 === 0 ? '' : `${element.startDate}`)
        monthworkData.push(element.totalWorkHours)
        monthmanageData.push(element.totalManagementHours)
      }

      setMonthlyData({
        labels: monthdateData,
        datasets: [
          {
            fill: true,
            label: 'Worked Hours',
            data: monthworkData,
            borderColor: '#c47c9d',
            backgroundColor: '#e2cce3'
          },
          {
            fill: true,
            label: 'ManageSupport Hours',
            data: monthmanageData,
            borderColor: '#615496',
            backgroundColor: '#cde7e7'
          },
        ],
      })
    }
    // Weekly Data Fetch
    if (DPRS !== undefined && DPRS.length !== 0) {
      let weekly = [];
      let today = new Date();
      let priorDate = new Date(new Date().setMonth(today.getMonth() - 3));
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
        weekly.push({
          startDate: getDate(start),
          endDate: getDate(end),
          totalWorkHours: minutesToTime(totalWorkHours),
          totalManagementHours: minutesToTime(totalManagementHours)
        });

        priorDate.setDate(priorDate.getDate() + 7);
        if (priorDate >= today) {
          break;
        }
      }

      for (let index = 0; index < weekly.length; index++) {
        const element = weekly[index];
        weekdateData.push(index % 2 === 0 ? '' : `${element.startDate}-${element.endDate}`)
        weekworkData.push(element.totalWorkHours)
        weekmanageData.push(element.totalManagementHours)
      }

      setWeeklyData({
        labels: weekdateData,
        datasets: [
          {
            fill: true,
            label: 'Worked Hours',
            data: weekworkData,
            borderColor: '#c47c9d',
            backgroundColor: '#e2cce3'
          },
          {
            fill: true,
            label: 'ManageSupport Hours',
            data: weekmanageData,
            borderColor: '#615496',
            backgroundColor: '#cde7e7'
          },
        ],
      })
    }
    // daily Data Fetch
    if (DPRS !== undefined && DPRS.length !== 0) {
      let DailyData = [];
      let today = new Date();
      let priorDate = new Date(new Date().setDate(today.getDate() - 14));

      while (priorDate <= today) {
        let filteredDPRS = DPRS.filter((dprs) => {
          return new Date(dprs.date).getTime() === new Date(formateDate(priorDate)).getTime()
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
          totalWorkHours: minutesToTime(totalWorkHours),
          totalManagementHours: minutesToTime(totalManagementHours)
        });

        priorDate.setDate(priorDate.getDate() + 1);
        if (priorDate > today) {
          break;
        }
      }

      for (let index = 0; index < DailyData.length; index++) {
        const element = DailyData[index];
        daydateData.push(element.date)
        dayworkData.push(element.totalWorkHours)
        daymanageData.push(element.totalManagementHours)
      }

      setDailyData({
        labels: daydateData,
        datasets: [
          {
            label: 'Worked Hours',
            data: dayworkData,
            borderColor: '#c47c9d',
            backgroundColor: '#e2cce3'
          },
          {
            label: 'ManageSupport Hours',
            data: daymanageData,
            borderColor: '#615496',
            backgroundColor: '#cde7e7'
          },
        ],
      })
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
  useEffect(() => {
    datafetch()
    // eslint-disable-next-line 
  }, [sidebarIsOpen])

  return (
    <div className=" justify-content-around w-100 " id='Dashboard-chart' style={{ height: 'fit-content' }} >
      <div className=" my-3">
        <Bar data={dailyData} options={options} width={370} height={300} />
      </div>
      <div className=' my-3'>
        <Line data={weeklyData} options={options} width={420} height={300}/>
      </div >
      <div className=' my-3'>
        <Line data={monthlyData} options={options} width={420} height={300}/>
      </div >
    </div >
    // <div className="d-flex justify-content-center flex-wrap  py-2 "  >
    //   <div className={sidebarIsOpen ? 'm-3' : 'm-3'} >
    //     <Bar data={dailyData} options={options} width={450} height={200}/>
    //   </div>
    //   <div className={sidebarIsOpen ? 'm-3' : 'm-3'} >
    //     <Line data={weeklyData} options={options} width={400}height={200} />
    //   </div >
    //   <div className={sidebarIsOpen ? 'm-3' : ' m-3'} >
    //     <Line data={monthlyData} options={options} width={410} height={200}/>
    //   </div >
    // </div >
  )
}

export default WorkingCharts
