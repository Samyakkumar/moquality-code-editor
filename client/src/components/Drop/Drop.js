import React from 'react'
import {Dropdown} from 'semantic-ui-react';

function Drop(languages) {
    return (<Dropdown 
        placeholder="Select Language"
        fluid
        search
        selection
        options={languages}
        />)
}

export default Drop;