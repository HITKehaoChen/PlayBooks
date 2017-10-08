// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import {withStyles} from 'material-ui/styles';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import DemoCard from "./BookCard";
import BookIcon from 'material-ui-icons/Book';
import Axios from 'axios';
import DialogTest from "./DialogTest";
// import {ListItemSecondaryAction} from "../../../../node_modules/material-ui/List/index";
import {ListItemSecondaryAction} from 'material-ui/List';
import {TextField} from "material-ui";
import ShowList from "./ShowList";
import Snackbar from 'material-ui/Snackbar';
import config from '../config/db'
import CircularIndeterminate from "./CircularIndeterminate";

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    background: theme.palette.background.paper,
  },
  appBar: {
    position: 'relative'

  },
  flex: {
    flex: 1
  },
  textField: {
    // paddingLeft: theme.spacing.unit * 3,
    // paddingRight: theme.spacing.unit * 3,
    // marginLeft: 20,
    width: 'calc(100% - 88px - 16px)',
  },
  helperText: {
    color: '#34A853',

  },
  label: {
    color: theme.palette.primary[500]

  }
});


class SimpleList extends React.Component {

  // set the author name here

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.handleClick(e);
      console.log('cb: ', this.state.authorName);

    });

    console.log('e.target.name: ', e.target.name);
    console.log('e.target.value: ', e.target.value);
    console.log('this.state.authorName: ', this.state.authorName);
    // this.handleClick(e);

  };


  handleAddBook = (bookInfo) => {

  };

  handleDeleteBook = (index, book) => {
    // backup
    let bak = {...book};

    console.log('BAK OBJ', bak);
    console.log('BAK OBJ', JSON.stringify(book));
    this.setState({
      undoObj: bak,

    }, () => {
      console.log('undo obj in handle deleted method: ', this.state.undoObj);
    });


    console.log('curIndex: ', index);
    this.handleIndexChange(index);
    let newBookArr;

    newBookArr = [
      ...this.state.bookArr.slice(0, index),
      ...this.state.bookArr.slice(index + 1)
    ];

    console.log(this.state.bookArr);

    this.setState({
      bookArr: newBookArr,
    });
    // this.handleIndexChange(0);
    //begin real deleting
    Axios
      .delete(`${config.API_URL}/books/` + book.ISBN)
      .then((response) => {
        //open snackbar
        this.setState({
          snackbarInfo: response.data.info
        });
        this.handleSnackbarOpen();
        console.log(response.data);
      })
      .catch((error) => {
        //open snacknar
        console.log(error);
      });

    // console.log(newBookArr);
  };

  handleIndexChange = (index) => {
    this.setState({
      curIndex: index
    });
    console.log('* curIndex changed to ' + index);
  };

  handleClickOpen = (index) => {
    this.handleIndexChange(index);
    this.setState({open: true});

  };
  handleRequestClose = () => {
    this.setState({open: false});

  };

  handleUndo = () => {

    console.log('undo func: ', this.state.undoObj);
    // add book

    Axios.post(`${config.API_URL}/books`, this.state.undoObj)
      .then((res) => {
        console.log('res.data: ', res.data);
        this.getBooksByAuthorName(this.state.authorName);
      }, (rej) => {
        console.log('Rejected: ', rej);
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });


    console.log('========================\nundo\n========================');

    //after undo, restore the undoObj
    this.setState({
      undoObj: {}
    })
  };

  getBooksByAuthorName = (authorName) => {

    // let booksInfo = null;
    // let authorInfo = null;

    this.setState({
      isSearching: true
    });
    console.log('searching.........');
    const start = new Date();

    Axios
      .get(`${config.API_URL}/books/author/` + authorName)
      .then(res => {
        // now data get!
        const end = new Date() - start;


        // setTimeout(() => {
        //

        // 下次加钱的优化(


        console.log('searching done with ' + end + 'ms');

        const {booksInfo, authorInfo} = res.data;
        if (Array.isArray(booksInfo)) {

          console.log('old book Arr:', this.state.bookArr);
          console.log('new book Arr:', booksInfo);


          this.setState({
            bookArr: booksInfo,
            authorInfo: authorInfo
          }, () => {
            this.setState({
              isSearching: false,
            });
            console.log(' book arr: ', this.state.bookArr);
            console.log(' author Info: ', this.state.authorInfo);
          })
        } else {
          this.setState({bookArr: [], authorInfo: []})
        }
        // }, 0)
      })
      .catch(err => {
        console.log('Error: ', err);
      });

  }


  // fetch data
  handleClick = (e) => {

    // e.preventDefault();
    console.log('list state:', this.state);
    // only when nor '' or '\\s+', fetch data
    const EmptyRe = new RegExp('^$|\\s+', 'i');
    if (!EmptyRe.test(this.state.authorName)) {
      console.log('valid name: ',this.state.authorName);
      this.getBooksByAuthorName(this.state.authorName);
    }else {
      console.log('invalid name: ',this.state.authorName);
    }
    // let data = null;
    // Axios
    //   .get('http://localhost:8080/authors/' + this.state.authorName)
    //   .then((res) => {
    //     data = res.data;
    //     if (Array.isArray(data)) {
    //       this.setState({bookArr: data})
    //     } else {
    //       this.setState({bookArr: []})
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error: ', err);
    //   });

    // this.setState({authorName: ''});


  };


  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false
    });
  };

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true,

    })
  };

  constructor(props) {
    super(props);
    this.state = {
      snackbarInfo: '',
      snackbarOpen: false,
      open: false,
      bookArr: [],
      curIndex: 0,
      authorName: '',
      authorInfo: [],
      undoObj: {},

      isSearching: false,
    };
  }

  componentDidMount() {
    // let data = null;
    // // fetch para from something like input, now it's Winona
    // // Axios.get('http://localhost:8080/author/Winona')
    //
    // let authorName = this.state.authorName;
    // console.log('name: ' + authorName);
    // Axios.get('http://localhost:8080/author/' + authorName)
    //   .then((res) => {
    //     data = res.data;
    //     console.log('res.data: ', data);
    //     if (Array.isArray(data)) {
    //       this.setState({bookArr: data})
    //     }
    //     else {
    //       this.setState({bookArr: []})
    //     }
    //   })
    //   .catch(err => {
    //     console.log('Error: ', err);
    //   });

  };

  // 暂时想通过传Array然后map出一个List，里面的ListItem对应Array里面的元素。
  // Dialog 应该只有一个，把props传进去让她动态对应当前map的元素
  // yabila 只有一个才是坠吼的

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>

        {/*//Search Bar*/}
        <div style={{marginLeft: 16, marginRight: 16, textAlign: 'center', whiteSpace: 'noWrap'}}>
          {/*<div style={{paddingLeft: 20, paddingRight: 20, textAlign: 'center'}}>*/}
          <form>
            <TextField
              autoFocus
              // error={this.state.error}
              helperText={"* Instant Search supported"}
              helperTextClassName={classes.helperText}
              // onBlur={this.handleOnBlur}
              name={"authorName"}
              id="name"
              label="Author Name"
              placeholder={"Input the Author Name..."}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange}
              margin="normal"
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  console.log(ev.target);
                  ev.preventDefault();
                  this.handleClick(ev);
                }
              }}
            />


            <Button
              color={"primary"}
              raised
              style={{marginLeft: "16px"}}
              onClick={this.handleClick}
              disabled={this.state.isSearching}
              icon={<CircularIndeterminate/>}
            >
              Search
              {/*{this.state.isSearching || 1 ? <div style={{width:'100%',height:'100%',marginTop:-5,marginBottom:-5}}><CircularIndeterminate/></div> :*/}
              {/*'Search'*/}
              {/*}*/}
            </Button>
          </form>
        </div>
        <ShowList
          handleClickOpen={this.handleClickOpen}
          bookArr={this.state.bookArr}
          authorName={this.state.authorName}
          handleDeleteBook={this.handleDeleteBook}
          handleUndo={this.handleUndo}
          isSearching={this.state.isSearching}
        />

        <DialogTest
          open={this.state.open}
          book={this.state.bookArr[this.state.curIndex]} //get current book
          handleRequestClose={this.handleRequestClose}
          authorName={this.state.authorName}
          authorInfo={
            this.state.authorInfo
              .filter(author => {
                  console.log('Filter bookArr: ', this.state.bookArr);
                  console.log('Filter index: ', this.state.curIndex);
                  if (this.state.bookArr[this.state.curIndex]) {

                    if (author.AuthorID === this.state.bookArr[this.state.curIndex].AuthorID) {
                      return author
                    }
                  }

                }
              )
          }

        />

        <Snackbar
          open={this.state.snackbarOpen}
          onRequestClose={this.handleSnackbarClose}
          transition={<Slide direction={"up"}/>}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={6000}
          message={<span id="message-id">{this.state.snackbarInfo}</span>}
          action={[
            <Button key="undo" color="accent" dense onClick={() => {
              // console.log('bak obj: ', this.state.undoObj);
              this.handleUndo();
              this.handleSnackbarClose();
            }}>
              UNDO
            </Button>,
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

      </div>
    );
  }
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);