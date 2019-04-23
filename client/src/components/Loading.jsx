import React, { useEffect, useState } from 'react'
const Loading = () => {
    const [loadingStatus, setLoadingStatus] = useState(".");

    useEffect(() => {
        const loop = setInterval(() => {
            setLoadingStatus(ls => ls + ".");
        }, 1000);

        return () => clearInterval(loop);
    }, []);

    return (`Loading ${loadingStatus}`)
};
export default Loading;