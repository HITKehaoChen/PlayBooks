import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AddIcon from 'material-ui-icons/Add';
import SearchIcon from 'material-ui-icons/Search'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import {mailFolderListItems, otherMailFolderListItems} from './tileData';
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
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingRight: '0 !important'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchButton: {
    marginRight: 12,
    marginLeft: 20,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'fixed',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '-webkit-fill-available',
    // marginLeft: -drawerWidth,
    marginLeft: 0,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  mainContent: {
    maxWidth: '1080px',
    margin: '0 auto'
  },
  contentShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flex: 1,
    fontWeight: 'normal',
    lineHeight: 1.15
  },
  list: {
    width: 250,
    flex: 'initial',
  },
});

class PersistentDrawer extends React.Component {

  state = {
    open: false,
    dialogOpen: false,
    tmpOpen: false,
  };

  handleTmpOpen = () => {
    this.setState({tmpOpen: true})
  }
  handleTmpClose = () => {
    this.setState({tmpOpen: false})
  }

  handleDialogOpen = () => {
    this.setState({dialogOpen: true})
  };

  handleDialogClose = () => {
    this.setState({dialogOpen: false})
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
            <Toolbar disableGutters={!this.state.open}>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                // onClick={this.handleDrawerOpen}
                onClick={this.handleTmpOpen}
                className={classNames(classes.menuButton, this.state.open && classes.hide)}
              >
                <MenuIcon/>
              </IconButton>
              <Typography type="title" color="inherit" className={classes.title} noWrap>
                Play Some Books In a Elegant Way!
              </Typography>


              <IconButton color="contrast" className={classes.searchButton}>
                <SearchIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            open={this.state.tmpOpen}
            onRequestClose={this.handleTmpClose}
            onClick={this.handleTmpClose}
          >
            <div>
              <List className={classes.list}>{mailFolderListItems}</List>
              <Divider/>
              <List className={classes.list}>{otherMailFolderListItems}</List>
            </div>
          </Drawer>

          {/*<Drawer*/}
          {/*type="persistent"*/}
          {/*classes={{*/}
          {/*paper: classes.drawerPaper,*/}
          {/*}}*/}
          {/*open={this.state.open}*/}
          {/*>*/}
          {/*<div className={classes.drawerInner}>*/}
          {/*<div className={classes.drawerHeader}>*/}
          {/*<IconButton onClick={this.handleDrawerClose}>*/}
          {/*<ChevronLeftIcon/>*/}
          {/*</IconButton>*/}
          {/*</div>*/}
          {/*<Divider/>*/}
          {/*<List className={classes.list}>{mailFolderListItems}</List>*/}
          {/*<Divider/>*/}
          {/*<List className={classes.list}>{otherMailFolderListItems}</List>*/}
          {/*</div>*/}
          {/*</Drawer>*/}
          <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
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
          </main>
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


      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersistentDrawer);