import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {compose} from 'recompose';

import { withFirebase } from '../Firebase';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
    <div className="container" style={{'height': '350px'}}>
        <h1>Sign In</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
)

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
}

class SignInFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE}
    }

    onSubmit = (event) => {
        const {email, password} = this.state

        this.props.firebase.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE})
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => this.setState({ error }))
            
        event.preventDefault()
    }

    onChange = (event) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name]: value})
    }


    render() {
        const {email, password, error} = this.state

        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <label>Email</label>
                <input type="text"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                 />
                
                <label>Password</label>
                <input type="password" 
                        name="password"
                        value={password}
                        onChange={this.onChange}
                />

                <button type="submit" disabled={isInvalid}>Sign In</button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase)

export default SignInPage

export {SignInForm}