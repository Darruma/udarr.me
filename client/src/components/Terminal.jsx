import React from 'react';
import '../css/terminal.css'
const Terminal = props => {
    return (
        <div className='terminal-container'>
            <div className='terminal-header'>
                <div className='terminal-button red' ></div>
                <div className='terminal-button amber' ></div>
                <div className='terminal-button green' ></div>
            </div>
            <div className='terminal-data terminal-theme'>
            {props.terminal_data}
            </div>
            <input className='terminal-input terminal-theme'></input>

        </div>
    )
}

export default Terminal;