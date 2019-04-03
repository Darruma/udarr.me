import React, { Component } from 'react';
import '../css/homepage.css'
import TerminalContainer from './TerminalContainer';
import Typist from 'react-typist';
class Homepage extends Component {
    render() { 
        return (<div className='homepage-container'> 
            <div className='centered-title'>Umair Darr</div>
            <TerminalContainer >
            </TerminalContainer>
        </div>  );
    }
    
}
 
export default Homepage;