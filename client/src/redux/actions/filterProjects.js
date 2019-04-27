export default (projects, filter) => {
    return {
        type: 'FILTER_PROJECTS',
        projects: projects,
        filter: filter
    }
}