/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Dialog, {DialogContent, DialogTitle,} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import AuthorForm from "./AuthorForm";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import {withStyles} from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import BookForm from "./BookForm";

function TabContainer(props) {
  return <div>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class AddBookDialog extends React.Component {
  state = {
    tabValue: 0,
    open: false,
    snackbarInfo: '',
  };
  handleSnackbarOpen = () => {
    this.setState({open: true,});
  };
  handleSnackbarInfo = (info) => {
    this.setState({
      snackbarInfo: info
    })

  }
  handleSnackbarClose = () => {
    this.setState({open: false});
  };
  handleTabChange = (event, tabValue) => {
    this.setState({tabValue: tabValue})
  };

  handleChangeIndex = index => {
    this.setState({
      tabValue: index
    })
  };

  render() {

    const props = this.props;
    const classes = props.classes;
    return (
      <div>
        <Snackbar
          open={this.state.open}
          onRequestClose={this.handleSnackbarClose}
          transition={<Slide direction={"up"}/>}

          autoHideDuration={3000}
          message={<span id="message-id">{this.state.snackbarInfo}</span>}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          action={[

            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              // className={classes.close}
              // onClick={this.handleUndo}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />
        {/*<Button onClick={props.handleClickOpen}>Slide in alert dialog</Button>*/}
        <Dialog open={props.open} transition={<Slide direction="up"/>} onRequestClose={props.handleRequestClose}>

          {/*<div className={classes.root}>*/}
          <DialogTitle>{"Add a Book / Author"}</DialogTitle>

          <AppBar position="static" color="inherit" elevation={0}>
            <Tabs
              value={this.state.tabValue}
              onChange={this.handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Book"/>
              <Tab label="Author"/>
              <Tab label="Item Three"/>
            </Tabs>
          </AppBar>
          <SwipeableViews index={this.state.tabValue} onChangeIndex={this.handleChangeIndex}>
            <TabContainer>


              <DialogContent>
                <BookForm
                  handleSnackbarOpen={this.handleSnackbarOpen}
                  handleSnackbarClose={this.handleSnackbarClose}
                  handleSnackbarInfo={this.handleSnackbarInfo}
                />

              </DialogContent>


            </TabContainer>

            <TabContainer>

              <DialogContent>
                <AuthorForm
                  handleSnackbarOpen={this.handleSnackbarOpen}
                  handleSnackbarClose={this.handleSnackbarClose}
                  handleSnackbarInfo={this.handleSnackbarInfo}
                />

              </DialogContent>
            </TabContainer>
            <TabContainer>
              {'Item Three'}


            </TabContainer>



          </SwipeableViews>
          {/*</div>*/}
        </Dialog>
      </div>
    );
  }
}

AddBookDialog.propsTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddBookDialog);