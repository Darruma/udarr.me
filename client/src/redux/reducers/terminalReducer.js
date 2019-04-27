const initalFS = {
    name: '/', type: 'directory', children: [{
        name: 'test',
        type: 'file',
        data: 'test'
    }, {
        name: 'folder', type: 'directory', children: [{
            name: 'poop',
            type: 'directory',
            children: []
        }]
    }]
}

const initalAC = ['clear', 'ls', 'cat', 'cd']

let intialState = {
    filesystem: initalFS,
    filesystem_loaded: false,
    terminal_data: [],
    current_dir: initalFS,
    full_path: "",
    autocomplete: initalAC
}
const terminalReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'CLEAR_TERMINAL':
            return Object.assign({}, state, {
                terminal_data: []
            })
        case 'OUTPUT_TERMINAL':
            return Object.assign({}, state, {
                terminal_data: [...state.terminal_data, action.data]
            })

        case 'FETCH_FILESYSTEM_SUCCESS':
            return Object.assign({}, state, {
                filesystem: action.data,
                current_dir: action.data,
                filesystem_loaded: true
            })
        case 'FETCH_FILESYSTEM_ERROR':
            return Object.assign({}, state, {
                filesystem_loaded: true
            })

        case 'UPDATE_AUTOCOMPLETE':
            return Object.assign({}, state, {
                autocomplete: [...initalAC, action.autocomplete]
            })

        case 'CHANGE_DIRECTORY':
            console.log("action path : " + action.path)
            return Object.assign({}, state, {
                current_dir: action.current_dir,
                full_path: action.path
            })
        case 'ERROR':
            return Object.assign({}, state, {
                terminal_data: [...state.terminal_data, action.error]
            })
        default:
            return state;
    }
}
export default terminalReducer