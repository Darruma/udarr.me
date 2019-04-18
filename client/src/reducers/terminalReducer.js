const initalFS = {
    name: '/', type: 'directory', children: [{
        name: 'test',
        type: 'file',
        data: 'test'
    }]
}
let intialState = {
    filesystem: initalFS,
    filesystem_loaded: false,
    terminal_data: [],
    current_dir: initalFS,
    full_path: "",
    autocomplete: ['clear', 'ls', 'cat', 'cd']
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

        case 'GET_FILESYSTEM_SUCCESS':

            return Object.assign({}, state, {
                filesystem: action.data,
                current_dir: action.data,
                filesystem_loaded: true
            })

        case 'UPDATE_AUTOCOMPLETE':
            return Object.assign({}, state, {
                autocomplete: [...state.autocomplete, ...state.current_dir.children.map(c => c.name)].filter(name => {
                    return [...['clear', 'ls', 'cat', 'cd'], ...state.current_dir.children.map(c => c.name)].includes(name)
                })
            })

        case 'CHANGE_DIRECTORY':
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