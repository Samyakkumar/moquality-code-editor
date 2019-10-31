import React, {useState, useEffect} from 'react';
import {useCookies} from 'react-cookie';
import {Button, Container, Segment, Header, Checkbox} from 'semantic-ui-react';

function Home() {
    const [endPoint] = useState("")
    const [uuid, setUuid] = useState("null");
    const [url, setUrl] = useState("null");
    const [gotUrl, setGotUrl] = useState(false);
    const [useDataBase, setUseDataBase] = useState(false);

    function clickHandler() {
        fetch("/api/getUserId/" + useDataBase.toString(), {
            method: "GET"
        }).then(dat => dat).then(res => res.text().then((data) => {
            var jsonData = JSON.parse(data)
            setUrl("/editor/" + jsonData.id);
            setGotUrl(true)
        }))
    }

    function checkBoxHandler() {
        setUseDataBase(!useDataBase);
    }
    return(
    <>
    <Container>
        <Header as="h2">Click the button to generate a new link!</Header>

    <Segment.Group raised>
    <Segment>
        <Button positive onClick={clickHandler}>Click here to generate a new Link!</Button>
        <Checkbox label={<label>Check to use a database for syncing</label>}  onChange={checkBoxHandler}/>
    </Segment>
    {gotUrl &&
    <Segment><a href={url}>Click here to go the the generate link!</a></Segment>}
    </Segment.Group>
    </Container>
    </>
    )
}
export default Home;