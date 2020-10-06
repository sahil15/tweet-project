import React from 'react';
import { connect } from "react-redux";
import { Row, Col, Navbar, Container, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from "./components/Modal";

import { editTweet, removeTweet } from "../store/Tweet";
import NewTweet from "./components/NewTweet";

class TweetHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditModal: false,
            editTweetId: undefined,
            tweetDescription: "",
            isValidTweet: false,
        };
    }

    onChangeTweet = (event) => {
        this.setState({
            tweetDescription: event.target.value,
            isValidTweet: event.target.value.length > 0,
        });
    }

    onClickUpdateTweet = () => {
        this.props.editTweet(this.state.editTweetId, this.state.tweetDescription);
        this.onHideModal();
    }


    onClickEdit = (editId, description) => {
        this.setState({
            showEditModal: true,
            editTweetId: editId,
            tweetDescription: description,
            isValidTweet: description.length > 0
        });
    }


    onHideModal = () => {
        this.setState({
            showEditModal: false,
            editTweetId: undefined,
            tweetDescription: "",
            isValidTweet: false
        });
    }


    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#">Social Network</Navbar.Brand>
                </Navbar>
                <Container fluid>
                    <Row>
                       
                        <Col className="pt-3">
                            <Row>
                                <Col>
                                    <NewTweet />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    {
                                        this.props.tweetEntries.sort((a, b) => b.date - a.date).map((entryRef, index) => {
                                            if (entryRef.removed) {
                                                return null;
                                            }
                                            return (
                                                <div key={index} className="fade toast mw-100 show" role="alert" aria-live="assertive" aria-atomic="true">
                                                    <div className="toast-header">
                                                        <strong className="mr-auto">User</strong>
                                                        <small>{entryRef.date.toString()}</small>
                                                        {
                                                            entryRef.date_updated !== undefined &&
                                                            <small title={entryRef.date_updated.toString()}> [modified]</small>
                                                        }
                                                        <button type="button" className="close ml-2 mb-1" title="Edit Tweet" onClick={() => this.onClickEdit(entryRef.id, entryRef.description)} >
                                                            <span aria-hidden="true"><FontAwesomeIcon icon={faEdit} /></span>
                                                        </button>
                                                        <button type="button" className="close ml-2 mb-1" title="Remove Tweet" onClick={() => this.props.removeTweet(entryRef.id)}>
                                                            <span aria-hidden="true"><FontAwesomeIcon icon={faTrashAlt} /></span>
                                                        </button>
                                                    </div>
                                                    <div className="toast-body">{entryRef.description}</div>
                                                </div>
                                            );
                                        })
                                    }

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Modal
                    attr={{
                        show: this.state.showEditModal,
                        size: "lg",
                        onHide: this.onHideModal
                    }}
                    modalTitle="Type the update of the tweet here:"
                >

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            as="textarea"
                            rows="3"
                            name="updateTweet"
                            value={this.state.tweetDescription}
                            onChange={this.onChangeTweet}
                            isInvalid={!this.state.isValidTweet}
                        />
                        <Form.Control.Feedback type="invalid">Tweet cannot be empty</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button color="secondary" onClick={this.onClickUpdateTweet} disabled={(this.state.isValidTweet) ? "" : "disabled"}>Update Tweet</Button>
                    </div>
                </Modal>
            </>
        )
    }
};


export default connect(
    state => ({
        tweetEntries: state.tweetEntries
    }),
    {
        editTweet,
        removeTweet
    }
)(TweetHome);