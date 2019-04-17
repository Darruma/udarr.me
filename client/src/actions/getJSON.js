export default (url, type) => {
    return (dispatch) => {
        return fetch(url).then(res => res.json())
            .then(response => {
                if (response.success) {
                    dispatch({
                        type: `GET ${type}_SUCCESS`,
                        data: response.data
                    })
                } else {
                    dispatch({
                        type: `ERROR ${type}`
                    })
                }
            })
    }
}