import { ThemeProvider, Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Container, Grid, CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import PieChart from '../Components/PieChart';
import { useHistory } from "react-router-dom";
import ApiService from "../services/ApiService";
import Drawer from '../Components/Drawer';

const apiService = new ApiService();

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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1a237e",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
}))(TableRow);

function Balance() {
    const classes = useStyles();
    const dataList = [];
    const [data, setData] = useState(dataList);
    const [loading, setLoading] = useState(true);
    let currentPricing = 0;
    const history = useHistory();
    let payload = {};

    const redirect= () => {
        let path = '/'
        history.push(path);
    };

    useEffect(() => {
        if (sessionStorage.getItem("userInfo") === null) {
            alert("You are not logged in")
            redirect();
        } else {
            apiService.queryCurrentPricing(payload)
            .then((response) => {
                currentPricing = response.data.price;
                payload = {
                    "accountKey": JSON.parse(sessionStorage.getItem("userInfo")).accountKey
                }
                apiService.queryBalance(payload)
                .then((response) => {
                    if (response.data !== null) {
                        const data = [
                            {
                                asset: 'SGDT', 
                                balance: response.data.cashBalance, value: response.data.cashBalance
                            },
                            {
                                asset: 'TTK',
                                balance: response.data.assetBalance, value: Math.round((response.data.assetBalance * currentPricing) * 100) / 100
                            }
                        ];
                        setData(data);
                        setLoading(false);
                    } else {
                        alert("Unable to fetch balance");
                        setLoading(false);
                    }
                })
                .catch((response) => {
                    alert("Unable to fetch balance");
                });
            })
            .catch((response) => {
                alert("Unable to fetch balance");
            });
        }
    }, []);

    if (loading === true) {
        return (
            <div>
            <ThemeProvider theme={theme}>
                <Drawer pageName="Balance" history={history}/>
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
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <CircularProgress />
                    </Grid>
                </Container>
            </ThemeProvider>
            </div>
        )
    } else {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Drawer pageName="Balance" history={history}/>
                <Container>
                    <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >
                        <PieChart pieChartData={data}/>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Asset</StyledTableCell>
                                    <StyledTableCell align="center">Balance</StyledTableCell>
                                    <StyledTableCell align="center">Value</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        {row.asset}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.balance}</StyledTableCell>
                                    <StyledTableCell align="center">S${row.value}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </ThemeProvider>
        </div>
    )
                            }

}

export default Balance;