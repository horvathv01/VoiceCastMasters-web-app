import React from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';


async function runTest(setRes, path){
    //const res = await fetch("http://localhost:5050/api" + path)
    const res1 = [{
        "border": "{{int(1, 5)}}px {{random(solid, dotted, dashed)}} {{color()}}",
        "coordinates": {
          "type": "array",
          "count": 2,
          "items": "{{float(0, 120, 5)}}"
        },
        "password": "xX{{animal()}}-{{string(6, 10, *)}}"
      },
      
      {
        "border": "3px dashed turquoise",
        "coordinates": [
          11.55503,
          73.2287
        ],
        "password": "xXcaterpillar-********"
      },{
        "border": "{{int(1, 5)}}px {{random(solid, dotted, dashed)}} {{color()}}",
        "coordinates": {
          "type": "array",
          "count": 2,
          "items": "{{float(0, 120, 5)}}"
        },
        "password": "xX{{animal()}}-{{string(6, 10, *)}}"
      },
      
      {
        "border": "3px dashed turquoise",
        "coordinates": [
          11.55503,
          73.2287
        ],
        "password": "xXcaterpillar-********"
      },
      {
        "border": "{{int(1, 5)}}px {{random(solid, dotted, dashed)}} {{color()}}",
        "coordinates": {
          "type": "array",
          "count": 2,
          "items": "{{float(0, 120, 5)}}"
        },
        "password": "xX{{animal()}}-{{string(6, 10, *)}}"
      },
      
      {
        "border": "3px dashed turquoise",
        "coordinates": [
          11.55503,
          73.2287
        ],
        "password": "xXcaterpillar-********"
      }];
    setRes(`Response of ${path}:\n${JSON.stringify(res1, null, 4)}`) 
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