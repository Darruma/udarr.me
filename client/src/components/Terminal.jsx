import React from 'react';
import '../css/terminal.css'
const Terminal = props => {
    return (
        <div className='terminal-container'>
            <div className='terminal'>
                <div className='terminal-header'>
                    <div className='terminal-button red' ></div>
                    <div className='terminal-button amber' ></div>
                    <div className='terminal-button green' ></div>
                </div>
                <div className='terminal-data terminal-color terminal-theme'>
                    {props.terminal_data.map(line => {
                        return (<div style={{ color: line.color, display: line.layout }} >{line.data}</div>)
                    }
                    )}
                    <div className='terminal-current-line terminal-color'>
                        <div className='terminal-theme terminal-prompt terminal-color'>{"[client@darruma " + props.current_folder + "]$"}</div>
                        <input onKeyDown={props.onTerminalKey} autoFocus={true} className='terminal-input terminal-color terminal-theme'></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terminal;