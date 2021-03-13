import React, { useState, useEffect } from 'react';
import { ThemeProvider, Avatar, Container, Grid, TextField } from '@material-ui/core';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '../Components/Drawer';
import { useHistory } from "react-router-dom";
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
    table: {
        minWidth: 700,
    }
  }));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1a237e'
        }, 
        secondary: {
            main: purple[500]
        }
    }
});

function UserInfo() {
    const history = useHistory();

    const redirect= () => {
        let path = '/'
        history.push(path);
    };

    useEffect(() => {
        if (sessionStorage.getItem("userInfo") === null) {
            alert("You are not logged in")
            redirect();
        }
    }, []);

    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Drawer pageName="User Information" history={history}/>
                <Container>
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    >
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <Avatar alt={JSON.parse(sessionStorage.getItem("userInfo")).username} src="/static/images/avatar/1.jpg" className={classes.large} />
                    </Grid>
                    <br/>
                    <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    >   
                        <TextField
                        id="standard-read-only-input"
                        label="First Name"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).firstName}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                        <TextField
                        id="standard-read-only-input"
                        label="Last Name"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).lastName}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                        <TextField
                        id="standard-read-only-input"
                        label="NRIC Number"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).nric}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                        <TextField
                        id="standard-read-only-input"
                        label="Email Address"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).email}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                        <TextField
                        id="standard-read-only-input"
                        label="Phone Number"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).phoneNumber}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                        <TextField
                        id="standard-read-only-input"
                        label="Address"
                        defaultValue={JSON.parse(sessionStorage.getItem("userInfo")).address}
                        InputProps={{
                            readOnly: true,
                        }}
                        />
                        <br/>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default UserInfo;