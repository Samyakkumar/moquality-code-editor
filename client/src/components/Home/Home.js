import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';

function Home() {
    const [uuid, setUuid] = useState("null");
    useEffect(() => {
        fetch("/api/getUserId/", {
            method: "GET"
        }).then(dat => dat).then(res => res.text().then(dat => window.location.href = "/editor/" + dat))
    }) 

    return(<h1>Home</h1>)
}
export default Home;