import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { dl } from '../../js/fakedata'
import 'react-datepicker/dist/react-datepicker.css'


const DataLoginDate = () => {

    const [startDate, setStartDate] = useState(new Date());

    let d = startDate.getDate();
    let m = startDate.getMonth() + 1;
    let y = startDate.getFullYear();
    let select = d + "/" + m + "/" + y

    const getDateSelect = dl.find(item => item.date == select);

    const data = {
        labels: [getDateSelect.date],
        datasets: [{
            label: 'Usuarios por día',
            data: [getDateSelect.ufd],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                max: 100,
                min: 0,
                ticks: {
                    stepSize: 5
                }
            }
        },
    }

    const getData = () => {
        const getDateSelect = dl.find(item => { item.date == startDate });
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="DataLogin">
            <div>
                <h2 className="mb-3">Login por día </h2>
            </div>
            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                maxDate={new Date()}
                onChange={(date) => setStartDate(date)}
                className="rounded-pill ps-3 text-secondary mb-3" />
            <div >
                <Bar
                    data={data}
                    height={250}
                    width={80}
                    options={options}
                />
            </div>
        </div>
    )
}

export default DataLoginDate;