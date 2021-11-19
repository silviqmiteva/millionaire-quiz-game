import React, { Component } from 'react';
import "./homepage.css";
import { Redirect } from 'react-router-dom';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openMainpage: false
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.openMainpage ? <Redirect push to='/mainpage' /> :
                    <div className="background-style">
                        <div className="left-side-bar">
                            <button className="base-button" onClick={e => this.setState({ openMainpage: true })}>НОВА ИГРА</button>
                            {/* <Button size="lg" variant="outline-primary" block >INFO</Button> */}
                        </div>
                    </div>}
            </React.Fragment>
        );
    }
}

export default Homepage;