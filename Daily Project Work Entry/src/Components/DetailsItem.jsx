import React from 'react'

const DetailsItem = (props) => {
    const { date, project, dprsDescription, workHour, managementHour } = props

    let d = new Date(date).toString().split(' ')
    const Wdate = `${d[1]} ${d[2]}, ${d[3]}`
    return (
        <>
                <tr >
                    <td>{date === '' ? 'N/A' : Wdate}</td>
                    <td>{project === '' ? 'N/A' : project}</td>
                    <td >{dprsDescription === '' ? 'N/A' : <pre className='w-100 m-auto  border ' style={{ backgroundColor: '#f5f5f5',maxWidth:"600px", justifyContent:'end' }}>{('\n'+dprsDescription).replace('\n', <br />).replace('[object Object]','')}</pre>}</td>
                    <td>{workHour === '' ? 'N/A' : workHour}</td>
                    <td>{managementHour === '' ? 'N/A' : managementHour}</td>
                </tr>
        </>
    )
}

export default DetailsItem
