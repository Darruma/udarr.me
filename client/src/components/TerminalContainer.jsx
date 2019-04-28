import React, { Component } from 'react';
import { connect } from 'react-redux'
import Terminal from './Terminal';
import cat from '../utilities/cat';
import ls from '../utilities/ls'

import clearTerminal from '../redux/actions/clearTerminal';
import changeDirectory from '../redux/actions/changeDirectory'
import outputTerminal from '../redux/actions/outputTerminal'
import updateAutocomplete from '../redux/actions/updateAutocomplete';
import getJSON from '../redux/actions/getJSON'

class TerminalContainer extends Component {
    render() {
        return (<div>
            <Terminal onTerminalKey={this.handleTerminalKey} current_folder={this.props.current_dir.name} terminal_data={this.props.terminal_data}></Terminal>
        </div>);
    }
    componentDidMount = async () => {
        await this.props.getJSON('/api/filesystem');
        this.props.updateAutocomplete(this.props.current_dir.children);
        this.props.outputTerminal("[client@darruma /]$ cat instructions.txt")
        this.execute("cat instructions.txt")

    }

    cd_dir = (path, root) => {
        if (root) {
            this.props.changeDirectory(path, path, root)
        } else {
            this.props.changeDirectory(path, this.props.full_path + "/" + path, root)
        }

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
                    this.props.outputTerminal("cd : Wrong amount of arguments")
                }
                break;
            case "clear":
                this.props.clearTerminal();
                break;
            case "ls":
                let ls_output = ls(input_array, this.props.current_dir);
                this.props.outputTerminal(ls_output);
                break;
            case "cat":
                let output = cat(input, this.props.current_dir);
                output.split("\n").map(line => this.props.outputTerminal(line))
                break;
        }
    }

    handleTerminalKey = (e) => {
        e.persist();
        if (e.keyCode === 13) {
            this.props.outputTerminal("[client@darruma " + this.props.current_dir.name + "]$ " + e.target.value, "#fbf1c7");
            this.execute(e.target.value)
            e.target.value = ""
        } else if (e.keyCode == 9) {
            e.preventDefault()
            let words = e.target.value.split(" ")
            const lastElement = words.length - 1;
            const currentWord = words[lastElement]
            const completedWords = this.props.autocomplete.filter(word => word.startsWith(currentWord))
            if (completedWords.length == 1) {
                words[lastElement] = completedWords[0]
                e.target.value = words.join(" ")
            } else if (completedWords.length > 0) {
                this.props.outputTerminal("[client@darruma " + this.props.current_dir.name + "]$ " + e.target.value);
                this.props.outputTerminal(completedWords.join(" "));
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
