import React, { Component } from 'react';
import '../css/homepage.css'
import { Link } from 'react-router-dom'
import Project from './Project'
import github from '../graphics/github.png'
import rss from '../graphics/rss.png'
class Homepage extends Component {
    render() {
        return (
            <div className='homepage'>
                <div className='links'>
                    <a href='https://github.com/Darruma'> <img className='icon' src={github}></img></a>
                     <img src={rss}></img>
                </div>
                <div className='row-container'>
                    <div className='projects'>

                        <Link to="/projects/" className="heading  ">projects</Link>
                        { this.props.errProject && <p>There seems to be nothing here</p>}
                        {this.props.projects.map(e => {
                            return (<Project title={e.title} content={e.content}></Project>)
                        })}
                    </div>

                    <div className='blog'>
                        <Link to="/blog" className="heading">stuff</Link>
                        { this.props.errBlog && <p>There seems to be nothing here</p>}
                    </div>
                </div>
            </div>);
    }
}

export default Homepage;