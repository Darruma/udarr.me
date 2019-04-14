
export default () => {
    return fetch('/api/projects').then(res => res.json())
}
