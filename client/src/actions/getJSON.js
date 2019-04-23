export default (url, type) => {
    return (dispatch) => {
        try {
            const response = fetch(url)
            const data = response.json()
            if (data.success) {
                dispatch({
                    type: `FETCH_${type}_SUCCESS`,
                    data: response.filesystem
                })
            } else {
                dispatch({
                    type: `SERVER_ERROR`
                })
            }
        } catch (err) {
            dispatch({
                type: `FETCH_${type}_ERROR`,
                data: err
            })
        }
    }
}
