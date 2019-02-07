import React, { Component } from 'react'
import { Link} from "react-router-dom";
import '../App.css';

class Main extends Component
{
    render()
    {
        return(<div className="App">
            <div className="container-center">
                <div className="title">
                     Umair Darr
                </div>
                <div className='link-container'>
                <Link to="/projects" className='links'>Projects</Link>
                <Link to="/photography" className='links'>Photography</Link>
                <Link to="/blog" className='links'>Blog</Link>
                <a className='links' href="https://github.com/Darruma">Github</a>
                </div>
            </div>
        </div>)
    }
}
export default Main;
