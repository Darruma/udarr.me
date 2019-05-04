import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import '../css/terminal.css'
import Loading from './Loading'
const Terminal = props => {
    const inputEl = useRef(null)
    const anchorEl = useRef(null)
    const focusInput = () => {
        if (inputEl.current != null) {
            inputEl.current.focus()
        }
    }
    useEffect(() => {
        anchorEl.current.scrollIntoView({ behavior: "smooth" });
    }, [props.terminal_data])

    return (
        <div className='terminal-container'>
            <div className='terminal'>
                <div className='terminal-header'>
                    <div className='terminal-button red' ></div>
                    <div className='terminal-button amber' ></div>
                    <div className='terminal-button green' ></div>
                </div>

                <div onClick={focusInput} className='terminal-data terminal-color terminal-theme'>
                    {props.filesystem_loaded ? props.terminal_data.map(line => {
                        return (<div>{line}</div>)
                    }) : <Loading />}
                    {props.filesystem_loaded && <div className='terminal-current-line terminal-color'>
                        <div className='terminal-theme terminal-prompt terminal-color'>{"[client@darruma " + props.current_folder + "]$"}</div>
                        <input ref={inputEl} spellCheck={false} onKeyDown={props.onTerminalKey} onBlur={focusInput} autoFocus={true} className='terminal-input terminal-color terminal-theme'></input>
                    </div>}
                    <div ref={anchorEl}></div>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        filesystem_loaded: state.terminalReducer.filesystem_loaded
    }
}
export default connect(mapStateToProps, null)(Terminal);