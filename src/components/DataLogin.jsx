import React from 'react';
import { Line } from 'react-chartjs-2';


const DataLogin = () => {

    return (
        <div className="DataLogin">
            <Line
                data={{
                    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
                    datasets: [{
                        label: 'login x día',
                        data: [12, 19, 3, 5, 2, 3, 7],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
                height={250}
                width={350}
                options={{
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
                }}
                    />
            </div>
    )
}

export default DataLogin;