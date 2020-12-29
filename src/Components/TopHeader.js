import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/dvaraLogo.jpg';
import { Button, Confirm, Grid, GridColumn, Table, Icon } from 'semantic-ui-react';
import firebase from '../firebaseConnection';
import { connect } from 'react-redux';

import moment from 'moment';



class TopHeader extends React.Component {
    state = { open: false}

    show = () => this.setState({ open : true});
    handleConfirm = () => this.setState({ open : false});
    handleCancel = () => this.setState({ open : false });

    handleLogout = () => {
        firebase.auth().signOut().then (() => {
          console.log('signed out');
        })
      }

    render(){


        return (
            <div className = "headerContainer">
            <Link className = "headerWrapper" to = '/'>
                <div className = "dvaraLogoImgWrapper">
                    <img className = "dvaraLogoImg"src = {logo} alt = "DvaraLogo"/>
                </div>
            </Link>
            <div className = "headerCustomTitleWrapper">
              <div className = "headerCustomTitle">DVARA E-DAIRY USER MANAGEMENT DASHBOARD</div>
            </div>
            <div>
                <Button onClick = {this.show} style = {{background: 'red', color: 'white'}}> Logout
                </Button>

                <Confirm 
                    open = {this.state.open}
                    cancelButton = 'Never mind'
                    confirmButton = "Let's do it"
                    onCancel = {this.handleCancel}
                    onConfirm = {this.handleConfirm,this.handleLogout}
                />
            </div>
          </div>
        );
    }
};

const mapStateFromProps = state => ({
});

export default connect(mapStateFromProps)(TopHeader);