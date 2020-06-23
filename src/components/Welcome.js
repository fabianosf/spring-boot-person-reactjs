import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class Welcome extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome Person</h1>
                <blockquote className="blockquote mb-0">
                <p>
                    Good friend, good books, and sleepy conscience - Fabiano Freitas
                </p>
                <footer className="blockquote-footer">

                </footer>
                </blockquote>
            </Jumbotron>
        );
    }
}

export default Welcome;