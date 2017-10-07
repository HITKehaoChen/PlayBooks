/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import { mailFolderListItems, otherMailFolderListItems } from './tileData';



import classNames from 'classnames';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import FullWidthGrid from "./FullWidthGrid";
import SimpleCard from "./SimpleCard";
import SimpleList from './SimpleList'
import Grid from "material-ui/Grid";
import Button from 'material-ui/Button';
import Axios from 'axios';
import TemporaryDrawer from "./TemporaryDrawer";
import EnhancedTable from "./EnhancedTable";
import Paper from "material-ui/Paper";
// import DatePicker from "material-ui-old/DatePicker";
import AddBookDialog from "./AddBookDialog";



const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
    margin: '0 auto'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  mainContent: {
    maxWidth: '1080px',
    margin: '0 auto'
  },
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  handleDialogOpen = () => {
    this.setState({dialogOpen: true})
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false})
  };

  render() {
    const { classes } = this.props;

    const drawer = (
      <div>
        <div className={classes.drawerHeader} />
        <Divider />
        <List>{mailFolderListItems}</List>
        <Divider />
        <List>{otherMailFolderListItems}</List>
      </div>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Hidden mdUp>
            <Drawer
              type="temporary"
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper,
              }}
              onRequestClose={this.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Drawer
              type="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.mainContent}>
              {/*<Typography type="body1">*/}
              {'You think water moves fast? You should see ice.'}
              <FullWidthGrid/>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Paper>
                    <SimpleList/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <TemporaryDrawer/>
                </Grid>
                <Grid item xs={12}>
                  <EnhancedTable/>
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*<DatePicker hintText="Portrait Dialog"/></Grid>*/}
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                <Grid item lg={3} sm={6} xl={4} xs={12}>
                  <SimpleCard/>
                </Grid>
                {/*<Grid item lg={4} sm={6} xl={4} xs={12}>*/}
                {/*<Button onClick={() => {*/}
                {/*Axios.get('http://localhost:8080/author/Mag')*/}
                {/*.then(res => {*/}
                {/*console.log('response: ', res.data);*/}
                {/*})*/}
                {/*.catch(err => {*/}
                {/*console.log('Error: ', err);*/}
                {/*})*/}
                {/*}}>*/}
                {/*{'TEST get book from a  author by name'}*/}
                {/*</Button></Grid>*/}
                {/*<Grid item lg={4} sm={6} xl={4} xs={12}>*/}
                {/*<Button*/}
                {/*raised*/}
                {/*color="primary"*/}
                {/*onClick={() => {*/}
                {/*Axios.get('http://localhost:8080/book/test from react')*/}
                {/*.then(res => {*/}
                {/*console.log('response: ', res.data);*/}
                {/*})*/}
                {/*.catch(err => {*/}
                {/*console.log('Error: ', err);*/}
                {/*})*/}
                {/*}}>*/}
                {/*TEST get book by book name*/}
                {/*</Button></Grid>*/}
                {/*<Grid item lg={4} sm={6} xl={4} xs={12}>*/}

                {/*<Button*/}
                {/*raised*/}
                {/*color="primary"*/}
                {/*onClick={() => {*/}
                {/*Axios.post('http://localhost:8080/addBook', {*/}
                {/*"ISBN": 2333,*/}
                {/*"Title": 'test from react',*/}
                {/*'Publisher': 'lorem...',*/}
                {/*'PublishDate': 2011,*/}
                {/*'Price': 233.33,*/}
                {/*'AuthorID': 1*/}
                {/*})*/}
                {/*.then(res => {*/}
                {/*console.log('response: ', res.data);*/}
                {/*})*/}
                {/*.catch(err => {*/}
                {/*console.log('Error: ', err);*/}
                {/*})*/}
                {/*}}>*/}
                {/*TEST post add book*/}
                {/*</Button>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} className={classes.paper}>*/}
                {/*<BasicBookTable></BasicBookTable>*/}
                {/*</Grid>*/}
              </Grid>
              {/*</Typography>*/}
              <AddBookDialog
                open={this.state.dialogOpen}
                handleRequestClose={this.handleDialogClose}
              />
            </div>
            <Button
              fab
              color="accent"
              aria-label="add"
              style={{
                position: 'fixed',
                bottom: 24,
                right: 24
              }}
              onClick={this.handleDialogOpen}
            >
              <AddIcon/>
            </Button>

          </main>
        </div>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResponsiveDrawer);