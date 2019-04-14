import React, { Component } from 'react';
import { navigate } from '@reach/router'


import Terminal from './Terminal';
import resolvePath from '../actions/resolvepath';
import cat from '../actions/cat';
import ls from '../actions/ls'
import display_object from '../actions/display_object'
import getFilesystem from '../actions/get_filesystem'


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
        this.setState(display_object(data, color, layout))
    }


    navigate_to_path = () => {
        if (this.state.full_path == "") {
            navigate("/");
        }
        else {
            navigate(this.state.full_path)
        }
    }
    cd_dir = (path, root) => {
        let fs = (root) ? this.state.filesystem : this.state.current_dir;
        let result = resolvePath(path, fs);
        if (result.success && result.type == "directory") {
            this.setState((state) => {
                state.current_dir = result.data;
                state.current_dir_name = result.data.name;
                if (root) {
                    state.full_path = path;
                } else if (state.full_path == "/") {
                    state.full_path = "/" + path
                } else {
                    state.full_path = this.state.full_path + "/" + path
                }
            }, this.navigate_to_path)
        }
        else if (result.type == "file") {
            this.output_to_terminal("Error, " + result.data.name + " is a file", "#fbf1c7");
        } else if (!result.success) {
            this.output_to_terminal(result.data);
        }
    }

    execute = (input) => {
        let input_array = input.split(" ");
        switch (input_array[0]) {
            case "cd":
                if (input_array.length == 2) {
                    if (input_array[1] == "/") {
                        this.setState({
                            current_dir: this.state.filesystem,
                            current_dir_name: "/",
                            full_path: ""
                        }, this.navigate_to_path)
                    }
                    else if (input_array[1] == "..") {
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
                this.setState({ terminal_data: [] })
                break;
            case "ls":
                console.log(this.state.filesystem);
                console.log(this.state.current_dir)
                let ls_output = ls(input_array, this.state.current_dir);
                this.output_to_terminal(ls_output);
                break;
            case "cat":
                this.output_to_terminal(cat(input, this.state.current_dir));
                break;
        }
    }

    handleTerminalKey = (e) => {
        e.persist();
        if (e.keyCode === 13) {
            this.output_to_terminal("[client@darruma " + this.state.current_dir_name + "]$ " + e.target.value, "#fbf1c7");
            this.execute(e.target.value)
            e.target.value = ""
        }
    }

    componentDidMount = () => {
        getFilesystem().then(response => {
            if (response.success) {
                this.setState({
                    filesystem: reponse.filesystem,
                    current_dir: response.filesystem
                })
            }
        }).catch(err => {
            const fs = {
                name: '/',
                type: 'directory',
                children: [
                    { name: 'error.txt', type: 'file', data: 'error' }
                ]
            }
            this.setState({
                filesystem: fs,
                current_dir: fs
            })
        })
        this.execute('cd ' + window.location.pathname.substring(1))
    }
}
export default TerminalContainer;   
