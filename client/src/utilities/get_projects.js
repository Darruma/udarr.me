
export default async () => {
    return fetch('/api/projects').then(res => res.json())
}
