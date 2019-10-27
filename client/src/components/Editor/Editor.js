import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
// import {Drop} from '../Drop/Drop';
import "jquery"
import {Dropdown, Container} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
function Editor() { 
    const { id } = useParams();
    console.log(id)
    const [value, setValue] = useState("null");
    // const [uuid, setUuid] = useState(paramUuid);
    const [currLang, setCurrLang] = useState("javascript")
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
        console.log("res")
        console.log(value);
        if (value) {
            fetch("/api/sendEditorData", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: res
            })
        }
    }

    // onselectionchange
    function onDropChange(event, newVal) {
        console.log(newVal.value)
        setCurrLang(newVal.value);
    }
    

    useEffect(() => {
        fetch("/api/sendEditorData/userOnce/" + id, {
            method: "GET"
        }).then(res => res.json().then(dat => dat).then(final => setValue(final.user.infoTyped)))

        setInterval(() => {
            fetch("/api/sendEditorData/user/" + id, {
                method: "GET"
            }).then(res => res.json().then(dat => dat).then(final => setValue(final.infoTyped)))
        }, 1000)
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
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }} />
            </Container>
            
            </>
        )
}

export default Editor;
