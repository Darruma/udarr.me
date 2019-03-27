import React, { Component } from 'react';
import Terminal from './Terminal';
import getFileSystem from '../actions/filesystem'
import resolvePath from '../actions/resolvepath';
class TerminalContainer extends Component {
    state = {
        filesystem: {},
        terminal_data: [''],
        current_dir_name: '/',
        current_dir: {},
        dir_tree:[]
    }
    render() {
        return (<div>
            <Terminal onTerminalKey={this.handleTerminalKey} current_folder={this.state.current_dir_name} terminal_data={this.state.terminal_data}></Terminal>
        </div>);
    }
    output_to_terminal = (data, color) => {
        this.setState((state) => {
            state.terminal_data = state.terminal_data.concat({
                data: data,
                color: color
            })
            return state
        })
    }
    execute = (input) => {
        this.output_to_terminal("[client@darruma " + this.state.current_dir_name + "] $ " + input, "#fbf1c7");
        let input_array = input.split(" ");
        switch (input_array[0]) {
            case "cd":

                if (input_array.length == 2) {
                    const result = resolvePath(input_array[1], this.state.current_dir);
                    if (input_array[1] == "/") {
                        this.setState({
                            current_dir: this.state.filesystem,
                            current_dir_name: "/"
                        })
                        break;
                    }
                    if (result.success) {
                        if (result.type == "directory") {
                            this.setState({
                                current_dir: result.data,
                                current_dir_name: result.data.name,
                            })
                        }
                        else {
                            if (result.type == "file") {
                                this.output_to_terminal("Error, " + result.data.name + " is a file", "#fbf1c7");
                            }
                        }
                    } else if (!result.success) {
                        this.output_to_terminal(result.data, "#fbf1c7");
                    }
                } else {
                    this.output_to_terminal("cd : Wrong amount of arguments")
                }
                break;
            case "clear":
                this.setState({ terminal_data: [] })
                break;

            case "ls":
                if (input_array.length == 1) {
                    let children = this.state.current_dir.children;
                }
        }

    }
    handleTerminalKey = (e) => {
        if (e.keyCode === 13) {
            this.execute(e.target.value)
            e.target.value = ""
        }
    }

    cat = (file) => {

    }
    ls = () => {

    }
    componentDidMount() {
        // getFileSystem().then(filesystem => {
        //     this.setState({ filesystem: filesystem })
        // })
        const files = {
            name: '/',
            type: 'directory',
            children: [{
                name: 'projects',
                type: 'directory',
                children: [{
                    name: 'pymaths',
                    type: 'directory',
                    children: [{
                        name: 'pymaths.info',
                        type: 'file',
                        data: 'pymaths is cool'

                    }]
                }, {
                    name: 'dotfiles',
                    type: 'directory',
                }]
            },
            {
                name: 'blog',
                type: 'directory',
                children: []
            },
            {
                name: 'umair.txt',
                type: 'file',
                data: 'umair darr'
            }
            ]
        }
        this.setState({
            filesystem: files,
            current_dir: files
        })

    }

}
export default TerminalContainer;