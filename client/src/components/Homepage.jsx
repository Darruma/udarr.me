import React, { Component } from 'react';
import '../css/homepage.css'
import github from '../graphics/github.png'
import Projects from './Projects'
class Homepage extends Component {
    render() {
        return (<div className='page'>
            <div className='main'>
                <p className='name'>Umair Darr</p>
                <div className='icons'>
                    <a href={'https://github.com/Darruma'}><img src={github}></img> </a>
                </div>
            </div>
            <Projects projects={this.props.projects}></Projects>
        </div>);
    }
}

export default Homepage;