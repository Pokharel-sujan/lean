import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';



class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Sweden' ,'Finland', 'Norway', 'Denmark', 'Iceland', 'Estonia'],
                datasets: [
                    {
                        label: 'Population',
                        data:[
                            12345,
                            18134,
                            23451,
                            57232,
                            12653,
                            7289

                        ],
                        backgroundColor:[
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(201, 76, 76, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(201, 159, 64, 0.6)',
                            'rgba(201, 99, 76, 0.6)',

                        ]

                    }
                ]
            }
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }
    render() {

        return ( 
            <div className = "Chart">
            <Bar 
                data = {this.state.chartData}
                options ={{
                    title: {
                        display: this.props.displayTitle,
                        text: 'Countries in Europe',
                        fontSize: 25
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    }
                }}
            />
            <Line
                data = {this.state.chartData}
                options ={{
                    title: {
                        display: this.props.displayTitle,
                        text: 'Countries in Europe',
                        fontSize: 25
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    }
                }}
            />
            <Pie 
                data = {this.state.chartData}
                options ={{
                    title: {
                        display: this.props.displayTitle,
                        text: 'Countries in Europe',
                        fontSize: 25
                    },
                    legend: {
                        display: this.props.displayLegend,
                        position: this.props.legendPosition
                    }
                }}
            />
            </div>

        );
    }
    
}

export default Chart;