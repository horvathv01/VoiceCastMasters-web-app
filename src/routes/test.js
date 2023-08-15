import React from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';


async function runTest(setRes, path){
    fetch("http://localhost:5186" + path, {})
    .then(data => data.text())
    .then(info => {
      console.log(info);
    setRes(`Response of ${path}:\n${JSON.stringify(info, null, 4)}`)
    })
      
    
    
}

function Tester() {
    const [key, setKey] = useState('home');
    const [testResponse, setResponse] = useState("Hit 'Run' to see response");
    return (
        <div class="main-container">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setResponse("Hit 'Run' to see response");
                }}
                className="mb-3"
            >
                <Tab eventKey="group1" title="Group 1">
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 1")}>Run case 1</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/case/2")}>Run case 2</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/test/firstTest")}>Run case 2,5</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 3")}>Run case 3</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 4")}>Run case 4</Button>{ }
                    <div class="response-container"><p><pre>{testResponse}</pre></p></div>
                </Tab>
                <Tab eventKey="group2" title="Group 2">
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 1")}>Run case 1</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 2")}>Run case 2</Button>{ }
                    <div class="response-container"><p><pre>{testResponse}</pre></p></div>
                </Tab>
                <Tab eventKey="group3" title="Group 3" >
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 1")}>Run case 1</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 2")}>Run case 2</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => setResponse("This is the response of case 3")}>Run case 3</Button>{ }
                    <div class="response-container"><p><pre>{testResponse}</pre></p></div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Tester; // Use default export