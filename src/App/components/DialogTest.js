/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import BookCard from "./BookCard";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import Snackbar from 'material-ui/Snackbar';
import CloseIcon from 'material-ui-icons/Close';
import EditForm from "./EditForm";

export default class DialogTest extends React.Component {
  state = {
    snackbarOpen: false,
    snackbarInfo: '',
    editDialogOpen: false,
  };
  handleSnackbarOpen = () => {
    this.setState({snackbarOpen: true,});
  };
  handleSnackbarInfo = (info) => {
    this.setState({
      snackbarInfo: info
    })
  };
  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false});
  };
  handleEditDialogOpen = () => {
    this.setState({
      editDialogOpen: true,
    })
  }

  handleEditDialogClose = () => {
    this.setState({
      editDialogOpen: false,
    })
  }


  render() {

    const {book} = this.props;
    const author = this.props.authorInfo[0];

    // console.log('dialog book:', book);
    if (book === null || book === undefined) return null;
    return (
      <div>
        <Snackbar
          open={this.state.snackbarOpen}
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
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon/>
            </IconButton>,
          ]}
        />


        <Dialog
          maxWidth={'md'}
          // fullScreen
          open={this.state.editDialogOpen}
          transition={<Slide direction="down"/>}
          onRequestClose={this.handleEditDialogClose}
        >


          <DialogTitle>
            {'Edit Book Details'}
          </DialogTitle>
          <DialogContent>
            <EditForm
              authorInfo={author}
              oldBookInfo={book}
              handleSnackbarOpen={this.handleSnackbarOpen}
              handleSnackbarClose={this.handleSnackbarClose}
              handleSnackbarInfo={this.handleSnackbarInfo}
            />

          </DialogContent>
        </Dialog>
        {/*=====================================not touch*/}
        <Dialog
          maxWidth={'md'}
          // fullScreen
          open={this.props.open}
          transition={<Slide direction="up"/>}
          onRequestClose={this.props.handleRequestClose}
        >
          {/*<AppBar position="static">*/}
          {/*<Toolbar>*/}
          {/*<IconButton style={{*/}
          {/*marginLeft: -12,*/}
          {/*marginRight: 20,*/}
          {/*}} color="contrast" aria-label="Menu">*/}
          {/*<MenuIcon/>*/}
          {/*</IconButton>*/}
          {/*<Typography style={{flex: 1}} type="title" color="inherit">*/}
          {/*Book Details*/}
          {/*</Typography>*/}
          {/*<Button color="contrast">Login</Button>*/}
          {/*</Toolbar>*/}
          {/*</AppBar>*/}

          <DialogTitle>
            {'Book Details'}
          </DialogTitle>
          <DialogContent>
            <BookCard
              handleEditDialogOpen={this.handleEditDialogOpen}
              handleRequestClose={this.props.handleRequestClose}
              // bookInfo={book.ISBN + book.Title + book.Publisher + book.PublishDate + book.Price + book.AuthorID}
              bookInfo={book}
              author={author}
              // authorDetail={JSON.stringify(author) + "Author Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dolor felis, pulvinar quis quam at, pretium varius est. Phasellus pretium pellentesque arcu sit amet tincidunt. Integer lectus lacus, viverra ut euismod quis, tincidunt non lacus. Cras velit leo, convallis ut nisi vel, vehicula laoreet elit. Aliquam ex neque, scelerisque ac metus ac, euismod eleifend est. Donec mollis ipsum ut lectus feugiat accumsan. Aliquam nec urna congue, pulvinar urna non, tristique metus. Aliquam ligula sapien, iaculis sed efficitur sed, cursus eu orci. Suspendisse eget sagittis quam, at aliquam elit. Sed sed lectus sodales, condimentum lectus ac, dapibus diam."}
              title={book.Title.toUpperCase()}
              subHeader={book.Price}
            />
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}