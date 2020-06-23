import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png" width="25" height="25" alt="brand" />
                </Link>                
                <Nav className="mr-auto">
                    <Link to={"add"} className="navbar-link">Add Person</Link>
                    <Link to={"list"} className="navbar-link">List Person</Link>
                </Nav>
            </Navbar>

        );
    }
}

 