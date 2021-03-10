import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '../Components/AppBar';
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

function Trade() {
    const history = useHistory();
    return (
        <div>
            <ThemeProvider theme={theme}>
                <AppBar pageName="Trade" history={history}/>
            </ThemeProvider>
        </div>
    )
}

export default Trade;