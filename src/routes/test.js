import React from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';


async function runTest(setRes, path, requestMethod){
        //if (method == "PUT")
    fetch("http://localhost:5186" + path, {
        method: requestMethod
    })
    .then(data => {
        const contentType = data.headers.get("Content-Type");
        if(contentType.includes("application/json")){
            return data.json();
        } else if (contentType.includes("text/plain")){
            return data.text();
        }
        })
    .then(result => setRes(JSON.stringify(result, null, 2)))
}

function Tester() {
    const [key, setKey] = useState('home');
    const [testResponse, setResponse] = useState("Hit 'Run' to see response");
    return (
        <div className="main-container">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setResponse("Hit 'Run' to see response");
                }}
                className="mb-3"
            >
                <Tab eventKey="group1" title="Actors">
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actors", "GET")}>Get all actors</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users?userid=1", "GET")}>Get an actor by ID</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actor/update", "PUT")}>Update an actor</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/delete?userid=10", "DELETE")}>Delete an actor</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users?userid=10", "GET")}>Try to get the deleted actor</Button>{ }
                    <div className="response-container"><pre>{testResponse}</pre></div>
                </Tab>
                <Tab eventKey="group2" title="Actors//Exceptions">
                <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users?userid=99", "GET")}>Get an actor by ID // no such user</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users", "GET")}>Get an actor by ID // no ID</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actor/update", "PUT")}>Update an actor // no ID</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/delete", "DELETE")}>Delete an actor // no ID</Button>{ }
                    <div className="response-container"><pre>{testResponse}</pre></div>
                </Tab>
                <Tab eventKey="group3" title="Future tests" disabled>
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse)}>Run case 1</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse)}>Run case 2</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse)}>Run case 3</Button>{ }
                    <div className="response-container"><pre>{testResponse}</pre></div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Tester; // Use default export