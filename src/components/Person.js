import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Person extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.personChange = this.personChange.bind(this);
        this.submitPerson = this.submitPerson.bind(this);
    }

    initialState = {
        id: '', firstName: '', lastName: '', emailId: ''
    };

    resetPerson = () => {
        this.setState(() => this.initialState);
    };


    componentDidMount() {
        const personId = +this.props.match.params.id;
        if (personId) {
            this.findPersonById(personId);
        }
    }

    findPersonById = (personId) => {
        axios.get("http://localhost:8080/api/v1/find/" + personId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        emailId: response.data.emailId,
                    });
                }
            }).catch((error) => {
                console.log("Error - " + error);
            });

    };



    submitPerson = event => {
        event.preventDefault();

        const person = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };


        axios.post("http://localhost:8080/api/v1/save", person)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    this.setState({ "show": true, "method": "post" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    //setTimeout(() => this.personList(), 3000);
                } else {
                    this.setState({ "show": false });
                }
            });

        this.setState(this.initialState);

    };



    updatePerson = event => {
        event.preventDefault();

        const person = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailId: this.state.emailId
        };

        axios.put("http://localhost:8080/api/v1/update", person)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true, "method": "put" });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    setTimeout(() => this.personList(), 3000);
                } else {
                    this.setState({ "show": false });
                }
            });

        this.setState(this.initialState);

    };






























    personChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    personList = () => {
        return this.props.history.push("/list");
    };



    render() {
        const { firstName, lastName, emailId } = this.state;


        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast children={{ show: this.state.show, message: "Person Saved Successfully.", type: "success" }} />
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "Person Updated Successfully." : "Person Saved Successfully."} type={"success"} />
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare} /> Add New Person
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{this.state.id ? "Update Person" : "Add New Person"}
                    </Card.Header>
                    <Form onReset={this.resetPerson} onSubmit={this.state.id ? this.updatePerson : this.submitPerson} id="personFormId">

                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridfirstName">
                                    <Form.Label>Firstname</Form.Label>
                                    <Form.Control required type="text" name="firstName" value={firstName} onChange={this.personChange} autoComplete="off" className={"bg-dark text-white"} placeholder="Firstname" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridlastName">
                                    <Form.Label>Lastname</Form.Label>
                                    <Form.Control required ype="text" name="lastName" value={lastName} onChange={this.personChange} autoComplete="off" className={"bg-dark text-white"} placeholder="Lastname" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridemailId">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" name="emailId" value={emailId} onChange={this.personChange} autoComplete="off" className={"bg-dark text-white"} placeholder="Email" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />{this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                    </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.personList.bind()} >
                                <FontAwesomeIcon icon={faList} /> Person List
                    </Button>

                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}

