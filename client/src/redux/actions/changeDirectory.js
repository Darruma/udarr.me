import store from '../store'
import resolvepath from '../../utilities/resolvepath'
import { navigate } from '@reach/router';

export default (path, full_path, root) => {
    return (dispatch) => {
        const fs = (root) ? store.getState().terminalReducer.filesystem : store.getState().terminalReducer.current_dir;
        const result = resolvepath(path, fs)
        if (result.success) {
            if (result.type === 'directory') {
                if (root) {
                    if (path == "") {
                        navigate("/")
                    } else {
                        navigate(full_path)
                    }
                } else {
                    navigate(full_path)
                }
                dispatch({
                    type: 'CHANGE_DIRECTORY',
                    current_dir: result.data,
                    path: full_path
                })
                dispatch({
                    type: 'UPDATE_AUTOCOMPLETE',
                    autocomplete: result.data.children.map(child => child.name)
                })
            } else {
                dispatch({
                    type: 'ERROR',
                    error: `Error : ${path} is a file`
                })
            }
        } else {
            dispatch({
                type: 'ERROR',
                error: `Error : ${path} not found`
            })
        }
    }
}

