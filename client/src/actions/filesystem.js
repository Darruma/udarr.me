function getFileSystem() {
    return fetch('/api/filesystem').then(res => res.json())
}

export default getFileSystem