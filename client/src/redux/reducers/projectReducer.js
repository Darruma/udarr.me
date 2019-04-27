const intialState = {
    projects: [],
    filter: null
}
export default (state = intialState, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS_SUCCESS':
            return Object.assign({}, state, {
                projects: action.data
            })
        default:
            return state;

    }
}

