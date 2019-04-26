import React from 'react'
import '../css/home.css'
import { connect } from 'react-redux'
import changeDirectory from '../actions/changeDirectory'

const Home = (props) => {
    return (<div className='home-container'>
        <div className='title'>About me</div>
        <div className='about-me'>
            <p>Hi! I’m Umair Darr.
                I’m a frontend developer currently seeking new opportunities.
                My goal is to create beautiful websites
                and rich interactions without sacrificing
            usability.</p>

            <p>I possess a variety of different skills which I
            have honed over my years in education.
            One important attribute I have is
            that I am a great problem solver.
            This skill has helped me do well in my studies
            and can be applied in a working environment
            to solve challenging situations. I am also able to work
             in stressful, fast-paced environments and can communicate
             effectively</p>
            <p className='links'>
                <div onClick={() => window.open('https://docs.google.com/document/d/1kIQLVjHdkUlUPu16NaLyw8b2tOAs_J7kA36HjETbpcw/edit?usp=sharing', "_blank")} className='box no-underline'>CV</div>
                <div onClick={() => window.open('https://github.com/Darruma', "_blank")} className='box on-underline' ><img className='github-icon' src={'https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/mark-github.svg'}></img>Github</div>
                <div onClick={() => props.changeDirectory('projects', 'projects', true)} className=' box projects-link'>Projects</div>
            </p>
        </div>
    </div>)
}
export default connect(null, { changeDirectory })(Home)