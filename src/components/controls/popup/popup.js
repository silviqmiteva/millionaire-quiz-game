import React, { Component } from 'react';
import Chart from '../chart/chart';
import './popup.css';

class Popup extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="popup">
                    <h2>
                        {this.props.title}
                    </h2>
                    <div>
                        <p>{this.props.message}</p>
                        {this.props.showChart ?
                            <React.Fragment>
                                <Chart classes="height-230px" answer={this.props.answer} />
                            </React.Fragment>
                            : null}
                    </div>
                    <div>
                        <button onClick={this.props.onOkClick} className="base-button">ОК</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Popup;