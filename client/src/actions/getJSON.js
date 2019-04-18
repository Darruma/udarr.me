export default (url, type) => {
    return (dispatch) => {
        return fetch(url).then(res => res.json())
            .then(response => {
                if (response.success) {
                    dispatch({
                        type: `GET_${type}_SUCCESS`,
                        data: response.filesystem
                    })
                } else {
                    dispatch({
                        type: `ERROR`
                    })
                }
            })
    }
}