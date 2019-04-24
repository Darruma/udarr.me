export default (url, type) => {
    return async (dispatch) => {
        try {
            const response = await fetch(url)
            const data = await response.json()
            if (data.success) {
                dispatch({
                    type: `FETCH_${type}_SUCCESS`,
                    data: data.filesystem
                })
            } else {
                dispatch({
                    type: `SERVER_ERROR`
                })
            }
        } catch (err) {
            console.log(err)
            dispatch({
                type: `FETCH_${type}_ERROR`,
                data: err
            })
        }
    }
}
