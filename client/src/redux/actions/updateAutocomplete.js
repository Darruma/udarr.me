export default (children) => {

    return {
        type: 'UPDATE_AUTOCOMPLETE',
        autocomplete: children.map(thing => thing.name)
    }
}