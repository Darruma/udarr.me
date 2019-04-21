import React, { useEffect } from 'react'

const Loading = () => {
    const [loadingStatus, setLoadingStatus] = useState('')
    useEffect(() => {
        const loop = setInterval(() => setLoadingStatus(loadingStatus + ".")))
        return () => {
           clearInterval(loop)
        }
    }, [])
    return (<div>
        {`Loading ${loadingStatus}`}
    </div>)
}
export default Loading
