import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import { dl } from '../../js/fakedata'
import 'react-datepicker/dist/react-datepicker.css'
import { set } from '@firebase/database';


const DataLoginDate = () => {
  
    const [startDate, setStartDate] = useState(new Date());

    let d = startDate.getDate();
    let m = startDate.getMonth() + 1;
    let y = startDate.getFullYear();
    let select = d + "/" + m + "/" + y

    const [infoDate, setInfoDate] = useState("");
    const [infoUfd, setInfoUfd] = useState("");

    const getInfo = () => {
        if(dl.some(item => item.date == select)){
            const info = dl.find(item => item.date == select);
            setInfoDate(info.date);
            setInfoUfd(info.ufd);
        } else {
            setInfoDate("No hay valor registrado");
            setInfoUfd("0");
        }    
    }

    useEffect(() => {
        getInfo()
    })
    const data = {
        labels: [infoDate],
        datasets: [{    
            label: 'Usuarios por día',
            data: [infoUfd],
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

    return (
        <div className="DataLogin my-5">
            <div>
                <h2 className="mb-3">Login por día </h2>
            </div>
            <h6>Seleccionar día</h6>
            <p>(últimos datos registrados: 25/10/2021)</p>
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