import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {Button, Container, Segment, Header} from 'semantic-ui-react';
import socketIOClient from "socket.io-client";
function Home() {
    const [endPoint] = useState("http://localhost:5000/")
    const [uuid, setUuid] = useState("null");
    const [url, setUrl] = useState("null");
    const [gotUrl, setGotUrl] = useState(false);
    const socket = socketIOClient();
        socket.on("connection", () =>{
            console.log("here");
        })
        socket.on("gotUid", msg => {
            console.log(msg)
        })

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
    <Container>
        <Header as="h2">Click the button to generate a new link!</Header>

    <Segment.Group raised>
    <Segment><Button positive onClick={clickHandler}>Click here to generate a new Link!</Button></Segment>
    {gotUrl &&
    <Segment><a href={url}>Click here to go the the generate link!</a></Segment>}
    </Segment.Group>
    </Container>
    </>
    )
}
export default Home;