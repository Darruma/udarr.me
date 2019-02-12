import React, { Component } from 'react';
import '../css/homepage.css'
import github from '../graphics/github.png'
class Homepage extends Component {
    render() {
        return (<div className='page'>
            <div className='main'>
                <p className='name'>Umair Darr</p>
                <div className='icons'>
                    <a href={'https://github.com/Darruma'}><img src={github}></img> </a>
                </div>
            </div>

            <div className='projects'>
             

            </div>
            </div>);
    }
}

export default Homepage;