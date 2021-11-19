import React, { Component } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                name: "A",
                votes: 0
            },
            {
                name: "B",
                votes: 0,
            },
            {
                name: "C",
                votes: 0,
            },
            {
                name: "D",
                votes: 0
            }]
        }
        this.generateData = this.generateData.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
    }

    componentDidMount() {
        this.generateData();
    }

    generateData() {
        let arr = [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()];
        arr = arr.sort((a, b) => { return b - a; });
        let answ = this.state.data.find(el => el.name === this.props.answer.toUpperCase());
        let restAnsw = this.state.data.filter(el => el !== answ);
        answ.votes = arr[0];
        for (let i = 0; i < restAnsw.length; i++) {
            restAnsw[i].votes = arr[i + 1];
        }
    }

    getRandomInt() {
        return Math.floor(Math.random() * Math.floor(100));
    }

    render() {
        return (<div className={this.props.classes}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={300} height={160} data={this.state.data}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" name="гласове" fill="darkblue" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>);
    }
}

export default Chart;