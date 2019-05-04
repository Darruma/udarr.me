import React from 'react'
import '../css/home.css'
import { connect } from 'react-redux'
import changeDirectory from '../redux/actions/changeDirectory'
import links from '../links.js'
const Home = (props) => {
    return (<div className='home-container'>
        <div className='title'>About me</div>
        <div className='about-me'>
            <p>Hi! I’m Umair Darr.
                I’m a self-taught software developer currently seeking new opportunities.
                I am extremely passionate about programming and I have experience with languages such
                as Javascript, Python , and Java. </p>
            <p></p>
            <div className='links'>
                <div onClick={() => window.open(links.CV, "_blank")} className='box no-underline'>CV</div>
                <div onClick={() => window.open(links.GITHUB_PROFILE, "_blank")} className='box on-underline' ><img className='github-icon' src={links.GITHUB_LOGO}></img>Github</div>
                <div onClick={() => props.changeDirectory('projects', 'projects', true)} className=' box projects-link'>Projects</div>
            </div>
        </div>
    </div>)
}
export default connect(null, { changeDirectory })(Home)