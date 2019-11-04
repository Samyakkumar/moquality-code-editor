import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
import 'brace/ext/language_tools';

// import {Drop} from '../Drop/Drop';
import "jquery"
import {Dropdown, Container} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import socketIOClient from "socket.io-client";
import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";

import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/snippets/xml";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/snippets/json";

import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/snippets/ruby";

import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/snippets/sass";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";

import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/snippets/csharp";

import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/snippets/golang";

import "ace-builds/src-noconflict/mode-elixir";
import "ace-builds/src-noconflict/snippets/elixir";

import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/snippets/typescript";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";

import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/snippets/mysql";



import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-xcode";

const socket = socketIOClient.connect("/editorDataSocket", {reconnect: true})

function Editor() { 
    const { id } = useParams();
    const { useDb } = useParams();
    const [value, setValue] = useState("null");
    // const [uuid, setUuid] = useState(paramUuid);
    const [currLang, setCurrLang] = useState("javascript")
    const [useSocket, setUseSocket] = useState(false)
    
    const programmingOptions = [
        {key: "javascript", value: 'javascript', text: "JavaScript" },
        {key: "java", value: "java", text: "Java"},
        {key: "python", value: "python", text: "Python"},
        {key: "xml", value: "xml", text: "XML"},
        {key: "ruby", value:"ruby", text: "Ruby"}, 
        {key: "sass", value: "sass", text: "SASS"},
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
            socket.emit("changeEditor", res)
        }
    }

    // onselectionchange
    function onDropChange(event, newVal) {
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
                var datInJSON = JSON.parse(data);
                setValue(datInJSON.user.infoTyped)
                setCurrLang(datInJSON.user.currLang)
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
            theme="xcode"
            name="blah2"
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={value}
            enableBasicAutocompletion={true}
            enableLiveAutocompletion= {true}
            width="100%"
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
                }}/>
            </Container>
            
            </>
        )
}

export default Editor;
