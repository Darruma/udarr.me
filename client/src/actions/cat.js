import resolvePath from './resolvepath'

export default (input,current_dir) => {
    let input_array = input.split(" ");
        let result = resolvePath(input_array[1],current_dir);
        if (result.success) {
            if (result.type == "file") {
                return result.data.data;
            }
            else {
                return "Error ," + input_array[1] + " is not a file";
            }
        }
        else {
            return "Error, could not find " + input_array[1];
        }
} 