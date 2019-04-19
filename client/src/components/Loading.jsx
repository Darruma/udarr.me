import React, { useEffect } from 'react'

const Loading = () => {
    const [loadingStatus, setLoadingStatus] = useState('')
    const [loop, setLoop] = useState()
    useEffect(() => {
        setLoop(setInterval(() => setLoadingStatus(loadingStatus + ".")))
        return function cleanup() {
            clearInterval(loop)
        }
    }, [])
    return (<div>
        {`Loading ${loadingStatus}`}
    </div>)
}
export default Loading