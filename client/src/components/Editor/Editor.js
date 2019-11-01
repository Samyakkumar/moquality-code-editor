import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
import 'brace/ext/language_tools';

// import {Drop} from '../Drop/Drop';
import "jquery"
import {Dropdown, Container} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import socketIOClient from "socket.io-client";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

function Editor() { 
    const { id } = useParams();
    const { useDb } = useParams();
    const [value, setValue] = useState("null");
    // const [uuid, setUuid] = useState(paramUuid);
    const [currLang, setCurrLang] = useState("javascript")
    const [useSocket, setUseSocket] = useState(false)
    const socket = socketIOClient.connect("/editorDataSocket")
    socket.on("connection", ()=>{
        console.log("Editor socket connected")
    })
    const programmingOptions = [
        {key: "javascript", value: 'javascript', text: "JavaScript" },
        {key: "java", value: "java", text: "Java"},
        {key: "python", value: "python", text: "Python"},
        {key: "xml", value: "xml", text: "XML"},
        {key: "ruby", value:"ruby", text: "Ruby"}, {key: "sass", value: "sass", text: "SASS"},
        {key: "markdown", value:"markdown", text: "Markdown"},
        {key: "mysql", value: "mysql", text: "mysql"},
        {key: "json", value: "json", text: "json"},
        {key: "html", value: "html", text: "HTML"},
        {key: "handlebars", value: "handlebars", text: "Handlebars"},
        {key:"golang", value:"golang", text: "GOLANG"},
        {key: "csharp", value: "csharp", text: "CSharp"},
        {key: "elixir", value: "elixir", text: "Elixir"}, 
        {key: "typescript", value: "typescript", text: "TypeScript"},
        {key: "css", value: "css", text: "CSS"}
    ];
    const [languages] = useState(programmingOptions)
    
    // const [onChange, setOnchange] = useState();
    function onChange(value, event) {

        console.log("called")
        var result = {
            "id": id, 
            "user": {
                "currLang": currLang,
                "infoTyped": value
            }
        }
        var res = JSON.stringify(result)
        if (value && useDb == 'true') {
            fetch("/api/sendEditorData", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: res
            })
        } else {
            console.log("here")
            socket.emit("changeEditor", res)
        }
    }

    // onselectionchange
    function onDropChange(event, newVal) {
        const socket = socketIOClient()

        setCurrLang(newVal.value);
        var result = {
            "id": id, 
            "user": {
                "currLang": newVal.value,
                "infoTyped": value
            }
        }
        var res = JSON.stringify(result)
        
        if (value && useDb == 'true') {
            fetch("/api/sendEditorData", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: res
            })
        } else {
            socket.emit("changeEditor", res)
        }
    }
    

    useEffect(() => {
        if (useDb == 'true') {
            fetch("/api/sendEditorData/userOnce/" + id, {
                method: "GET"
            }).then(res => res.json().then(dat => dat).then(final => setValue(final.user.infoTyped)))
    
            setInterval(() => {
                fetch("/api/sendEditorData/user/" + id, {
                    method: "GET"
                }).then(res => res.json().then(dat => dat).then(final => setValue(final.infoTyped)))
            }, 1000)
        } else {
            setUseSocket(true);
            socket.on("editorDataChanged", (data) => {
                console.log(data)
            })
        }
    })

        return(
            <>
            <Container>
            <Dropdown 
        placeholder="Select Language"
        fluid
        search
        selection
        options={languages}
        onChange={onDropChange} />
        <AceEditor
            placeholder="Placeholder Text"
            mode={currLang}
            theme="monokai"
            name="blah2"
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
            setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            }} />
            </Container>
            
            </>
        )
}

export default Editor;
