import React, { Component } from 'react';

class BackDrop extends Component {

    render() { 
        return (
            <div className= "backdrop" onClick={this.props.click}></div>
        );
    }
}

export default BackDrop;