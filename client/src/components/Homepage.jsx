import React, { Component } from 'react';
import '../css/homepage.css'
import { Link } from 'react-router-dom'
class Homepage extends Component {
    render() {
        return (
            <div className='homepage'>
            <p>github</p>
                <div className='row-container'>
                    <div className='projects'>

                        <Link to="/projects/" className="heading  ">projects</Link>
                        {this.props.projects.map(e => {
                            return (<div className="project" key={e.id}>
                                <Link to={"/projects/" + e.title} className="project-title link">
                                    {e.title}
                                </Link>
                                <p className="project-description">
                                    - {e.content}
                                </p>
                            </div>)
                        })}
                    </div>

                    <div className='blog'>
                        <Link to="/blog" className="heading">blog</Link>
                        <p>There seems to be nothing here</p>
                    </div>
                </div>
            </div>);
    }
}

export default Homepage;