import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '../Components/Drawer';
import { useHistory } from "react-router-dom";
import purple from '@material-ui/core/colors/purple';

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
    
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Drawer pageName="User Information" history={history}/>
            </ThemeProvider>
        </div>
    )
}

export default UserInfo;

