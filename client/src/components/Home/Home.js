import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {Button} from 'semantic-ui-react';

function Home() {
    const [uuid, setUuid] = useState("null");
    const [url, setUrl] = useState("null");
    const [gotUrl, setGotUrl] = useState(false);
    function clickHandler() {
        fetch("/api/getUserId/", {
            method: "GET"
        }).then(dat => dat).then(res => res.text().then(dat => {
                                                    setUrl("/editor/" + dat)
                                                    setGotUrl(true)
                                                }))
    }

    return(
    <>
    <Button positive onClick={clickHandler}>Click here to generate a new Link!</Button>
    {gotUrl &&
    <a href={url}>Click here to go the the generate link!</a>}
    </>
    )
}
export default Home;