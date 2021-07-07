import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div className="container">
        <h1>SignUp</h1>
        <SignUpForm /> 
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    error: null,
}

class SignUpFormBase extends Component {
    constructor(props) {
        super(props)

        this.state = {...INITIAL_STATE}
    }

    onSubmit = event => {
        const {email, password} = this.state

        this.props.firebase.doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({...INITIAL_STATE})
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({error})
            })
        
        event.preventDefault()
    }

    onChange = event => {
        const name = event.target.name
        const value = event.target.value

        this.setState({[name]: value})
    }

    render() {
        const {username, email, password, confirm_password, error} = this.state
        
        const isInValid = password !== confirm_password ||
                        password === '' ||
                        email === '' ||
                        username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <label>Full Name</label>
                <input type="text" 
                        name="username"
                        value={username}
                        onChange={this.onChange}
                />
                
                <label>Email</label>
                <input type="email" 
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
                
                <label>Confirm Password</label>
                <input type="password" 
                        name="confirm_password"
                        value={confirm_password}
                        onChange={this.onChange}
                />

                <button disabled={isInValid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account ?  
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase)

export default SignUpPage

export {SignUpForm, SignUpLink}