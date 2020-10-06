import React from 'react';
import { connect } from "react-redux";
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';

import { newTweet } from "../../store/Tweet";
import Modal from "./Modal";

class NewTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweetDescription: "",
            showModal: false,
            isValidTweet: false,
        }
    }


    onChangeTweet = (event) => {
        this.setState({
            tweetDescription: event.target.value,
            isValidTweet: event.target.value.length>0,
        });
    }


    onClickPostTweet = () => {
        this.props.addNewTweet(this.state.tweetDescription);
        this.onHideModal();
    }

    onClickAddNewTweet = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    onHideModal = () => {
        this.setState({
            tweetDescription: "",
            showModal: false,
            isValidTweet:false
        });
    }


    render() {
        return (
            <>
                <Card>
                    <Card.Body>
                        <Card.Title className="mb-0">
                            <div className="d-flex justify-content-between">
                                <label className="mt-2">What would you like to share with us?</label>
                                <Button color="secondary" onClick={this.onClickAddNewTweet}><FontAwesomeIcon icon={faPenFancy} className="mr-2" /> New Tweet</Button>
                            </div>
                        </Card.Title>
                    </Card.Body>
                </Card>


                <Modal
                    attr={{
                        show: this.state.showModal,
                        size: "lg",
                        onHide: this.onHideModal
                    }}
                    modalTitle="Type your thoughts in here:"
                >

                    <Form.Group controlId="formBasicTweet">
                        <Form.Control
                            as="textarea"
                            rows="3"
                            value={this.state.tweetDescription}
                            onChange={this.onChangeTweet} 
                            isInvalid={!this.state.isValidTweet}
                            />
                        <Form.Control.Feedback type="invalid">Tweet cannot be empty</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button color="secondary" onClick={this.onClickPostTweet} disabled={(this.state.isValidTweet) ? "" : "disabled"}>Post New Tweet</Button>
                    </div>
                </Modal>
            </>

        )
    }
}


export default connect(
    undefined,
    {
        addNewTweet: newTweet
    }
)(NewTweet);