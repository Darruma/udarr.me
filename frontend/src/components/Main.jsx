import React, { Component } from 'react'
import '../App.css';

class Main extends Component
{
    render()
    {
        <div className="App">
            <div className="container-center">
                <div className="title">
                     Umair Darr
                </div>
                <Link to="/projects">Projects</Link>
                <Link to="/photography">Photography</Link>
                <Link to="/blog">Blog</Link>
                <a href="https://github.com/Darruma"/>
            </div>
        </div>
    }
}
export default Main;