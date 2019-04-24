import React, { Component } from 'react';
import { connect } from 'react-redux'

import Terminal from './Terminal';
import resolvePath from '../utilities/resolvepath';
import cat from '../utilities/cat';
import ls from '../utilities/ls'

import clearTerminal from '../actions/clearTerminal';
import changeDirectory from '../actions/changeDirectory'
import outputTerminal from '../actions/outputTerminal'
import updateAutocomplete from '../actions/updateAutocomplete';
import getJSON from '../actions/getJSON'

class TerminalContainer extends Component {
    render() {
        return (<div>
            <Terminal onTerminalKey={this.handleTerminalKey} current_folder={this.props.current_dir.name} terminal_data={this.props.terminal_data}></Terminal>
        </div>);
    }
    componentDidMount = async () => {
        await this.props.getJSON('/api/filesystem');
        this.props.updateAutocomplete();

    }
    output_to_terminal = (data) => {
        this.props.outputTerminal(data)
    }

    cd_dir = (path, root) => {
        const fs = (root) ? this.props.filesystem : this.props.current_dir;
        const result = resolvePath(path, fs);
        if (root) {
            this.props.changeDirectory(path, result);
        } else {
            this.props.changeDirectory(this.props.full_path + "/" + path, result);
        }
        this.props.updateAutocomplete()

    }
    execute = (input) => {
        let input_array = input.split(" ").filter(e => e != "");
        switch (input_array[0]) {
            case "cd":
                if (input_array.length === 2) {
                    if (input_array[1] === "..") {
                        let path_behind = this.props.full_path.substring(0, this.props.full_path.lastIndexOf("/"));
                        this.cd_dir(path_behind, true);
                    }
                    else if (input_array[1] == "/") {
                        this.cd_dir("", true)
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
            this.output_to_terminal("[client@darruma " + this.props.current_dir.name + "]$ " + e.target.value, "#fbf1c7");
            this.execute(e.target.value)
            e.target.value = ""
        } else if (e.keyCode == 9) {
            e.preventDefault()
            let words = e.target.value.split(" ")
            const word = words[words.length - 1]
            if (word != "") {
                const possible_auto_completes = Array.from(this.props.autocomplete.filter(str => str.startsWith(word)));
                if (possible_auto_completes.length == 1) {
                    words[words.length - 1] = possible_auto_completes[0];
                    e.target.value = words.join(" ");
                } else if (possible_auto_completes.length > 0) {
                    this.output_to_terminal("[client@darruma " + this.props.current_dir.name + "]$ " + e.target.value);
                    this.output_to_terminal(possible_auto_completes.join(" "));
                }
            }
        }
    }


}
const mapStateToProps = (state) => {
    return {
        terminal_data: state.terminalReducer.terminal_data,
        current_dir: state.terminalReducer.current_dir,
        filesystem: state.terminalReducer.filesystem,
        full_path: state.terminalReducer.full_path,
        autocomplete: state.terminalReducer.autocomplete
    }
}
const mapDispatchToProps = {
    changeDirectory,
    clearTerminal,
    outputTerminal,
    updateAutocomplete,
    getJSON
}
export default connect(mapStateToProps, mapDispatchToProps)(TerminalContainer);   
