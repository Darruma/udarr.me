import React, { Component } from 'react';
import { navigate } from '@reach/router'
import { connect } from 'react-redux'

import Terminal from './Terminal';
import resolvePath from '../utilities/resolvepath';
import cat from '../utilities/cat';
import ls from '../utilities/ls'

import clearTerminal from '../actions/clearTerminal';
import changeDirectory from '../actions/changeDirectory'
import outputTerminal from '../actions/outputTerminal'
class TerminalContainer extends Component {

    state = {
        filesystem: {},
        terminal_data: [''],
        current_dir_name: '/',
        current_dir: {},
        full_path: ""
    }

    render() {
        return (<div>
            <Terminal onTerminalKey={this.handleTerminalKey} current_folder={this.state.current_dir_name} terminal_data={this.props.terminal_data}></Terminal>
        </div>);
    }

    output_to_terminal = (data) => {
        this.props.outputTerminal(data)
    }


    navigate_to_path = () => {
        if (this.state.full_path === "") {
            navigate("/");
        }
        else {
            navigate(this.state.full_path)
        }
    }
    cd_dir = (path, root) => {
        const fs = (root) ? this.state.filesystem : this.state.current_dir;
        const result = resolvePath(path, fs);
        changeDirectory(path, result);
    }

    execute = (input) => {
        let input_array = input.split(" ");
        switch (input_array[0]) {
            case "cd":
                if (input_array.length === 2) {
                    if (input_array[1] === "..") {
                        let path_behind = this.state.full_path.substring(0, this.state.full_path.lastIndexOf("/"));
                        this.cd_dir(path_behind, true);
                    }
                    else {
                        this.cd_dir(input_array[1], false);
                    }
                } else {
                    this.output_to_terminal("cd : Wrong amount of arguments")
                }
                break;
            case "clear":
                this.props.clearTerminal();
                break;
            case "ls":
                console.log(this.props.current_dir)
                let ls_output = ls(input_array, this.props.current_dir);
                this.output_to_terminal(ls_output);
                break;
            case "cat":
                let output = cat(input, this.props.current_dir);
                output.split("\n").map(line => this.output_to_terminal(line))
                break;

        }
    }

    handleTerminalKey = (e) => {
        e.persist();
        if (e.keyCode === 13) {
            this.output_to_terminal("[client@darruma " + this.state.current_dir_name + "]$ " + e.target.value, "#fbf1c7");
            this.execute(e.target.value)
            e.target.value = ""
        } else if (e.keyCode === 9) {

        }
    }

}
const mapStateToProps = (state) => {
    return {
        terminal_data: state.terminalReducer.terminal_data,
        current_dir: state.terminalReducer.current_dir,
        full_path: state.terminalReducer.full_path
    }

}
const mapDispatchToProps = {
    changeDirectory,
    clearTerminal,
    outputTerminal

}
export default connect(mapStateToProps, mapDispatchToProps)(TerminalContainer);   