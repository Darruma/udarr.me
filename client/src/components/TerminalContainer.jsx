import React, { Component } from 'react';
import Terminal from './Terminal';
import getFileSystem from '../actions/filesystem'
import resolvePath from '../actions/resolvepath';
import { navigate } from '@reach/router'
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
            <Terminal onTerminalKey={this.handleTerminalKey} current_folder={this.state.current_dir_name} terminal_data={this.state.terminal_data}></Terminal>
        </div>);
    }
    output_to_terminal = (data, color, layout) => {
        this.setState((state) => {
            state.terminal_data = state.terminal_data.concat({
                data: data,
                color: color,
                layout: layout
            })
            return state
        })
    }
    execute = (input) => {
        this.output_to_terminal("[client@darruma " + this.state.current_dir_name + "]$ " + input, "#fbf1c7");
        let input_array = input.split(" ");
        switch (input_array[0]) {
            case "cd":
                if (input_array.length == 2) {
                    let result;
                    if (input_array[1] == "/") {
                        this.setState({
                            current_dir: this.state.filesystem,
                            current_dir_name: "/",
                            full_path: ""
                        }, () => {
                            navigate("/");
                        })
                        break;
                    }
                    else if (input_array[1] == "..") {
                        let path_behind = this.state.full_path.substring(0, this.state.full_path.lastIndexOf("/"));
                        result = resolvePath(path_behind, this.state.filesystem);
                        console.log(result)
                        if (result.success && result.type == "directory") {
                            this.setState((state) => {
                                state.current_dir = result.data
                                state.current_dir_name = result.data.name
                                state.full_path = path_behind
                            }, () => {
                                if (this.state.full_path == "") {
                                    navigate("/");
                                }
                                else {
                                    navigate(this.state.full_path)
                                }
                            });

                            break;
                        }
                    } else {
                        result = resolvePath(input_array[1], this.state.current_dir);
                    }
                    if (result.success) {
                        if (result.type == "directory") {
                            this.setState((state) => {
                                state.current_dir = result.data
                                state.current_dir_name = result.data.name
                                if (state.full_path == "/") {
                                    console.log("path = /");
                                    state.full_path = "/" + input_array[1]
                                } else {
                                    console.log("path == not /");
                                    state.full_path = this.state.full_path + "/" + input_array[1]
                                }
                            }, () => {
                                console.log(this.state.full_path);
                                navigate(this.state.full_path)
                            });
                            break;
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
                    console.log(children)
                    children.forEach(val => {
                        if (val.type == "directory") {
                            this.output_to_terminal(val.name + "/");
                        }
                        else {
                            this.output_to_terminal(val.name);
                        }
                    })
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
    componentWillMount() {
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