import React, { useState, useEffect } from 'react';
import { ThemeProvider, Table, TableBody, TableHead, TableContainer, TableCell, TableRow, Container, TableFooter, TablePagination} from '@material-ui/core';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import Drawer from '../Components/Drawer';
import { useHistory } from "react-router-dom";
import purple from '@material-ui/core/colors/purple';
import Paper from '@material-ui/core/Paper';
import ApiService from "../services/ApiService";
import TablePaginationActions from "../Components/TablePaginationActions";
import EnhancedTableHead from "../Components/EnhancedTableHead";

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
    root: {
        width: '100%',
      },
      paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
      },
      table: {
        minWidth: 750,
      },
      visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
      },
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

function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}
  
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

function Transactions() {
    const history = useHistory();
    const classes = useStyles();
    const dataList = [];
    const [data, setData] = useState(dataList);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('timestamp');
    const [dense, setDense] = React.useState(false);


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const redirect= () => {
        let path = '/'
        history.push(path);
    };
    
    useEffect(() => {
        if (sessionStorage.getItem("userInfo") === null) {
            alert("You are not logged in")
            redirect();
        } else {
            let payload = {
                "accountKey": JSON.parse(sessionStorage.getItem("userInfo")).accountKey
            };
            apiService.queryTransactions(payload)
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
        }
    }, []);

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Drawer pageName="Transactions" history={history}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Container>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                            />
                        <TableBody>
                        {stableSort(data, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                            return (
                                <StyledTableRow
                                hover
                                tabIndex={-1}
                                key={row.transactionId}
                                >
                                <TableCell align="left">{new Date(row.timestamp*1000).toLocaleString()}</TableCell>
                                <TableCell align="left">{row.transactionId}</TableCell>
                                <TableCell align="left">{row.orderType}</TableCell>
                                <TableCell align="left">{row.assetSymbol}</TableCell>
                                <TableCell align="left">{row.assetPrice}</TableCell>
                                <TableCell align="left">{row.assetAmount}</TableCell>
                                <TableCell align="left">{row.cashAmount}</TableCell>
                                <TableCell align="left">Processed</TableCell>
                                </StyledTableRow>
                            );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                            <TableCell colSpan={8} />
                            </TableRow>
                        )}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={8}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default Transactions;