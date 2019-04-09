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
    navigate_to_path = () => {
        if (this.state.full_path == "") {
            navigate("/");
        }
        else {
            console.log(this.state.full_path);  
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
                this.ls(input_array);
                break;
            case "cat":
                this.cat(input);
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


    cat = (input) => {
        let input_array = input.split(" ");
        let result = resolvePath(input_array[1], this.state.current_dir);
        console.log(result)
        if (result.success) {
            if (result.type == "file") {
                this.output_to_terminal(result.data.data);
            }
            else {
                this.output_to_terminal("Error ," + input_array[1] + " is not a file");
            }
        }
        else {
            this.output_to_terminal("Error, could not find " + input_array[1]);
        }
    }
    ls = (input_array) => {
        if (input_array.length == 1) {
            let children = this.state.current_dir.children;
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
    componentDidMount() {
       
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
        getFileSystem().then(response => {
            this.setState({ filesystem: response.filesystem,current_dir:response.filesystem })
        }).catch(err =>

            this.setState({
                filesystem: files,
                current_dir: files
            },()=> {
                console.log(err)
                this.execute('cd ' + window.location.pathname.substring(1) )
            })
        )
    }

}
export default TerminalContainer;   
