import React, { PureComponent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

export default class AppBarComponent extends PureComponent {
    state = {
        anchorEl: false
    };

    openMenu = () => {
        this.setState({
            anchorEl: true
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: false
        });
    };

    redirect = (path) => {
        console.log(path);
        this.props.history.push(path);
    };

    signOut = () => {
        sessionStorage.clear();
        this.redirect("/");
    };

    goToUserInfo = () => {
        this.redirect("/user")
    }

    goToBalance = () => {
        this.redirect("/balance")
    }

    goToTrade = () => {
        this.redirect("/trade")
    }

    goToTransactions = () => {
        this.redirect("/transactions")
    }

    render () {
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" edge="start" color="inherit" onClick={this.openMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.goToUserInfo}>User Information</MenuItem>
                        <MenuItem onClick={this.goToBalance}>Wallet Balance</MenuItem>
                        <MenuItem onClick={this.goToTrade}>Trade</MenuItem>
                        <MenuItem onClick={this.goToTransactions}>Transaction History</MenuItem>
                        <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
                    </Menu>
                    <Typography variant="h6">
                        {this.props.pageName}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    };

}