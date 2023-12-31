import React from 'react';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


async function runTest(setRes, path, requestMethod) {
    let actor = {
        id: 10,
        name: "Test Actress",
        birthDate: "1995-09-24",
        email: "something@test.com",
        password: "fooBar123",
        phone: "06301234567"
    }
    let isUpdate = false;
    requestMethod === "PUT" ? isUpdate = true : isUpdate = false;
    fetch("http://localhost:5186" + path, {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestMethod,
        body: isUpdate ? JSON.stringify(actor) : undefined
    })
        .then(data => handleData(data, setRes))
        .then(result => setRes(JSON.stringify(result, null, 2)))
}

async function TestLogin(setRes, user) {
    console.log(user);
    await fetch("http://localhost:5186/access/login", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": btoa(`${user.Email}:${user.Password}`),
        },
        method: "POST",
        credentials: "include",
    })
        .then(data => handleData(data, setRes))
        .then(result => setRes(JSON.stringify(result, null, 2)))
}

async function TestCookie(setRes) {
    fetch("http://localhost:5186/access/test", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
        credentials: "include"
    })
        .then(data => handleData(data, setRes))
        .then(result => setRes(JSON.stringify(result, null, 2)))
}

async function TestLogout(setRes) {
    await fetch("http://localhost:5186/access/logout", {
        method: "POST",
        credentials: "include"
    })
        .then(data => handleData(data, setRes))
        .then(result => setRes(JSON.stringify(result, null, 2)))
}

async function TestRegistration(setRes, user) {
    await fetch("http://localhost:5186/access/registration", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(user)
    })
        .then(data => handleData(data, setRes))
        .then(result => setRes(JSON.stringify(result, null, 2)))
}

async function handleData(data, setRes) {
    try {
        const contentType = data.headers.get("Content-Type");
        if (contentType.includes("application/json")) {
            return data.json();
        } else if (contentType.includes("text/plain")) {
            return data.text();
        }
    } catch (error) {
        setRes(error + "\nProbably no user is logged in")
    }

}

async function accessTest(setRes, method, formData) {
    const email = formData.formEmail;
    const password = formData.formPassword;
    const name = formData.formName;
    const birthdate = new Date(formData.formBirthdate);
    const phone = formData.formPhone;

    const user = {
        Email: email,
        Password: password,
        Name: name,
        BirthDate: `${birthdate.getFullYear()}-${(birthdate.getMonth() + 1).toString().padStart(2, "0")}-${birthdate.getDate().toString().padStart(2, "0")}`,
        ProfilePicture: "https://static.agroinform.hu/data/cikk/5/649/cikk_50649/csirke.jpg",
        Relations: {},
        SampleURL: ["https://static.agroinform.hu/data/cikk/5/649/cikk_50649/csirke.jpg"],
        Phone: phone,
        Role: "Actor"
    };

    switch (method) {
        case "LOGIN":
            TestLogin(setRes, user)
            break;
        case "LOGOUT":
            TestLogout(setRes)
            break;
        case "REGISTRATION":
            TestRegistration(setRes, user)
            break;
        case "TRYVISIT":
            TestCookie(setRes)
            break;
        default:
            console.error("Please provide a valid method!");
            break;
    }
}

function Tester() {
    const demoForm = {
        "formEmail": "amfukinjackman@hotmail.com",
        "formName": "Hugh Jackman",
        "formPhone": "+36 30 999 9999",
        "formBirthdate": "1968-10-12",
    }
    const [key, setKey] = useState('home');
    const [testResponse, setResponse] = useState("Hit 'Run' to see response");
    const [startDate, setStartDate] = useState(new Date(demoForm["formBirthdate"]));
    const [formData, setFormData] = useState(demoForm);
    const handleSubmit = (event, method) => {
        event.preventDefault();
        accessTest(setResponse, method, formData)
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim(),
            formBirthdate: startDate
        })
    }
    return (
        <div className="main-container">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => {
                    setKey(k);
                    setResponse("Hit 'Run' to see response");
                    formData.formPassword = "";
                }}
                className="mb-3"
            >
                <Tab eventKey="group1" title="Actors">
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actors", "GET")}>Get all actors</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users?userid=1", "GET")}>Get an actor by ID</Button>{ }
                    <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actor/update?userid=1", "PUT")}>Update an actor</Button>{ }
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
                <Tab eventKey="group3" title="Register">
                    <Form onSubmit={(e) => handleSubmit(e, "REGISTRATION")}>
                        <Form.Group as={Row} className="mb-3" controlId="formEmail" name="formEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" defaultValue={formData["formEmail"]} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formName" name="formName">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={formData["formName"]} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPhone" name="formPhone">
                            <Form.Label column sm="2">
                                Phone number
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control defaultValue={formData["formPhone"]} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBirthdate" name="formBirthdate">
                            <Form.Label column sm="2">
                                Birthdate
                            </Form.Label>
                            <Col sm="10">
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPassword" name="formPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Button type='submit' className="testcase-btn" variant="warning">Register</Button>{ }
                        <Button className="testcase-btn" variant="warning" onClick={() => runTest(setResponse, "/users/actors", "GET")}>Get all actors</Button>{ }
                    </Form>
                    <div className="response-container"><pre>{testResponse}</pre></div>
                </Tab>
                <Tab eventKey="group4" title="Login">
                    <Form onSubmit={(e) => handleSubmit(e, "LOGIN")}>
                        <Form.Group as={Row} className="mb-3" controlId="formEmail" name="formEmail">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" defaultValue={formData["formEmail"]} onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPassword" name="formPassword">
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} />
                            </Col>
                        </Form.Group>
                        <Button type="submit" className="testcase-btn" variant="warning" /*onClick={() => accessTest(setResponse, "LOGIN", formData)}*/>Log in</Button>{ }

                    </Form>
                    <Button type="button" className="testcase-btn" variant="warning" onClick={() => accessTest(setResponse, "TRYVISIT", formData)}>Try visit</Button>{ }
                    <Button type="button" className="testcase-btn" variant="warning" onClick={() => accessTest(setResponse, "LOGOUT", formData)}>Log out</Button>{ }
                    <div className="response-container"><pre>{testResponse}</pre></div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Tester; // Use default export