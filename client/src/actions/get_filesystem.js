export default () => {
    return fetch('/api/filesystem').then(res => res.json())
}
