import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { dl } from '../../js/fakedata'
import 'react-datepicker/dist/react-datepicker.css'


const DataLogin = () => {

    const [dataDate, setDataDate] = useState([])
    const [dataForDate, setDataForDate] = useState([])

    const data = {
        labels: dataDate,
        datasets: [{
            label: 'login de usuarios por día',
            data: dataForDate,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }]
    }
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    }

    const getData = () => {
        var auxdate = []
        var auxdata = []
        dl.map(item => {
            auxdate.push(item.date);
            auxdata.push(item.ufd);
        })
        setDataDate(auxdate);
        setDataForDate(auxdata);
    }

    useEffect(() => {
        getData()
    }, [])


    return (
        <div className="DataLogin my-5">
            <div>
                <h2 className="mb-3">Login por día en el mes</h2>
            </div>
            <div>
            <Bar
                data={data}
                height={250}
                options={options}
            />
            </div>
        </div>

    )
}

export default DataLogin;