const initalFS = {name:'/',type:'directory',children:[{
    name:'test',
    type:'file',
    data:'test'
}]}
const intialState = {
    filesystem: initalFS,
    terminal_data: [],
    current_dir_name: '/',
    current_dir: initalFS  ,
    full_path: ""
}
export default (state = intialState, action) => {

    switch (action.type) {
        case 'CLEAR_TERMINAL':
            return Object.assign({}, state, {
                terminal_data: []
            })
        case 'OUTPUT_TERMINAL':
            return Object.assign({}, state, {
                terminal_data: [...state.terminal_data, action.data]
            })
        case 'GET_FILESYSTEM':
            return Object.assign({}, state, {
                filesystem: action.data,
                current_dir: action.data
            })

        case 'CHANGE_DIRECTORY':
            return Object.assign({}, state, {
                current_dir: action.current_dir,
                current_dir_name: action.current_dir.name,
                path: action.path
            })
        case 'ERROR':
            return Object.assign({}, state, {
                terminal_data: [...state.terminal_data, action.error]
            })
        default:
            return state;

    }
}