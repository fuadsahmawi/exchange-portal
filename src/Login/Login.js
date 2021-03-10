import { AppBar, Toolbar, Typography, ThemeProvider, TextField, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { useHistory } from "react-router-dom";
import ApiService from "../services/ApiService";


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

const apiService = new ApiService();

function Login() {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (sessionStorage.getItem("userInfo") !== null) {
            redirect();
        }
    }, []);

    const handleClick = async (event) => {
        let payload = {
            "username": username,
            "password": password
        }

        apiService.login(payload)
        .then((response) => {
            if (response.data.accountKey !== null) {
                console.log("Login successful");
                sessionStorage.setItem("userInfo", JSON.stringify(response.data));
                redirect();
            } else {
                console.log("Login failed");
                alert("Username/password is incorrect")
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const redirect= () => {
        let path = '/balance'
        history.push(path);
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6">
                                Exchange Portal
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <br/>
                    <div>
                        <TextField
                        label="Username"
                        variant="outlined"
                        onChange={(event)=>setUsername(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <TextField
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={(event)=>setPassword(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <Button variant="contained" onClick={(event)=> handleClick(event)}>
                            Submit
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Login;