export default (path, result) => {
    if (result.success) {
        if (result.type === 'directory') {
            console.log(result)
            return {
                type: 'CHANGE_DIRECTORY',
                current_dir: result.data,
                path: path
            }
        } else {
            return {
                type: 'ERROR',
                error: `Error : ${path} is a file`
            }
        }
    } else {
        return {
            type: 'ERROR',
            error: `Error : ${path} not found`
        }
    }
}