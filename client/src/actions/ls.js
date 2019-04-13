export default (input_array, current_dir) => {
    if (input_array.length == 1) {
        let children = current_dir.children;
        if (children != undefined) {
            let ls = children.reduce((acc, val) => {
                if (val.type == "directory") {
                    return acc + " " + val.name + "/";
                }
                else {
                    return acc + " " + val.name;
                }
            }, "")
            return ls

        }
    }
}