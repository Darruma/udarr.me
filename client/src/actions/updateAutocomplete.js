export default (fs) => {

    return {
        type: 'UPDATE_AUTOCOMPLETE',
        autocomplete: fs.children.map(thing => thing.name)
    }
}