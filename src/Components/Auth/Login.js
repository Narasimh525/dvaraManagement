import React, {Component} from 'react';

import firebase from '../../firebaseConnection';

import {
    Grid,
    Form,
    Segment,
    Button,
    Header,
    Message,
    Icon,
    GridColumn
} from 'semantic-ui-react';


class Login extends Component{
    state = {
        email : '',
        password : '',
        errors : [],
        loading: false,
    };


    handleChange = (event) => {
        this.setState({[event.target.name]: [event.target.value]});
    };

    handleSubmit = (event) => {
        if (this.isFormvalid(this.state)){
            this.setState({
                errors: [],
                loading: true,
            });
            console.log('Entered into submission, and initiating the submission');
            event.preventDefault();
            console.error(`${this.state.email}`, `${this.state.password}`);
            firebase
            .auth()
            .signInWithEmailAndPassword(`${this.state.email}`, `${this.state.password}`)
            .then(signedInUser => {
                console.log(signedInUser);
                this.setState({
                    errors: [],
                    loading: false,
                });
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                });
            });
        }
    };

    isFormvalid = ({ email, password}) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some( error => error.message.toLowerCase().includes(inputName)) ? 'error': '';
    }

displayErrors = errors => errors.map((error, i) => <p key = {i}>{error.code}</p>);

    render() {

        const { password, email, errors, loading } = this.state;

        return(
            <Grid textAlign = "center" verticalAlign = "middle" className = "app">
                <GridColumn style = {{maxWidth: 450}}>
                    <Header as = "h1" icon color = "green" textAlign = "center">
                        <Icon name = "expeditedssl" color = "brown" />
                        <h4>SIGN IN WITH CREDENTIALS</h4>
                    </Header>
                    <Form onSubmit = {this.handleSubmit} size = "large">
                        <Segment stacked>
                            <Form.Input fluid name = "email" value = {email} icon = "mail" iconPosition = "left" placeholder = "email" onChange = {this.handleChange} type = "email" className = {this.handleInputError(errors, 'identifier')} required />
                            <Form.Input fluid name = "password" value = {password} icon = "lock" iconPosition = "left" placeholder = "password" onChange = {this.handleChange} type = "password" className = {this.handleInputError(errors, 'password')} required />

                            <Button disabled = {loading} className = { loading ? 'loading': ''} color = "green" fluid size = "medium" >Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            {/* <h3>Error</h3> */}
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    {/* <Message>Already a user? <Link to = "/login">Login</Link></Message> */}
                </GridColumn>
            </Grid>
        )
    }
};

export default Login;