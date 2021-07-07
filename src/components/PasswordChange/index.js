import React, {Component} from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    oldPassword: '',
    newPassword: '',
    error: null,
}

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE}
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { newPassword } = this.state

        this.props.firebase.doPasswordUpdate(newPassword)
            .then(() => {
                this.setState({...INITIAL_STATE})
            })
            .catch(error => this.setState({ error }));
    
        event.preventDefault()
    }

    render() {
        const {oldPassword, newPassword, error} = this.state;
        const isInvalid = oldPassword === ''||
                newPassword === '';

        return (
            <form onSubmit={this.onSubmit}>
                <label>Old Password</label>
                <input type="password" 
                    name="oldPassword"
                    value="oldPassword"
                    onChange={this.onChange}
                    />
                
                <label>New Password</label>
                <input type="password" 
                    name="newPassword"
                    value="newPassword"
                    onChange={this.onChange}
                    />

                <button type="submit" disabled={isInvalid}>Submit</button>
                {error && error.message}
            </form>
        )
    }
}

export default withFirebase(PasswordChangeForm);