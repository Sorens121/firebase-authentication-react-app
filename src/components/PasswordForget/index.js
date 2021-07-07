import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div className="container" style={{'height': '150px'}}>
        <PasswordForgetForm />
    </div>
)

const INITIAL_STATE = {
    email: '',
    error: null,
}


 class PasswordForgetFormBase extends Component {
     constructor(props) {
         super(props)

         this.state = {...INITIAL_STATE}
     }

     onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
     }

     onSubmit = event => {
         const { email } = this.state
         this.props.firebase.doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE})
            })
            .catch(error => this.setState({ error }))
         event.preventDefault()
     }
    render() {
        const {email, error } = this.state;
        const isInvalid = email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <label>Email</label>
                <input type="email" 
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    />

                <button type="submit" disabled={isInvalid}>Reset Password</button>
                {error && error.message}
            </form>
        )
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

const PasswordForgetForm = withFirebase(PasswordForgetFormBase)

export default PasswordForgetPage

export { PasswordForgetLink, PasswordForgetForm}