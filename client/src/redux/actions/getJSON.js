export default (url) => {
    return async (dispatch) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (data.success) {
                dispatch({
                    type: `FETCH_FILESYSTEM_SUCCESS`,
                    data: data.filesystem
                })
                dispatch({
                    type: `FETCH_PROJECTS_SUCCESS`,
                    data: data.projects
                })
            } else {
                dispatch({
                    type: `SERVER_ERROR`
                })
            }
        } catch (err) {
            dispatch({
                type: `FETCH_FILESYSTEM_ERROR`,
                data: err
            })
        }
    }
}
