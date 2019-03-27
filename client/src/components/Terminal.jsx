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
                {props.terminal_data.map(line => {
                   return( <div style={{color:line.color}} key={line}>{line.data}</div>)
                }
                )}
                <div className='terminal-current-line'>
                    <div className='terminal-theme terminal-prompt'>{"[client@darruma " + props.current_folder + "] $"}</div>
                    <input onKeyDown={props.onTerminalKey} autoFocus={true} className='terminal-input terminal-theme'></input>
                </div>
            </div>

        </div>
    )
}

export default Terminal;