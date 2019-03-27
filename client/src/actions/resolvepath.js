export default (path, root) => {
    const path_array = path.split("/");
    let absolute_path;
    let temp = root;
    for (let i = 0; i < path_array.length; i++) {
        let path_name = path_array[i];
        if (temp.type == "directory") {
            const child = temp.children.find(child => child.name == path_name);
            if (child != undefined) {
                absolute_path += "/" + child.name
                temp = child;
            } else {
                return {
                    success: false,
                    data: 'Error, directory ' + path_name + ' not found'
                }
            }
            if (child.type == "file") {
                if (i == path_array.length) {
                    return {
                        success: true,
                        type: 'file',
                        data: child
                    }
                }
            }

        } else if (temp.type == "file") {
            return {
                success: false,
                data: 'Error ,' + temp.name + ' is a file'
            }
        }
    }
    return {
        success: true,
        data: temp,
        type: 'directory',
        path: absolute_path
    }
}

