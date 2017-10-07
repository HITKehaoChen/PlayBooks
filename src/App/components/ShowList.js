import React from 'react';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import InboxIcon from 'material-ui-icons/Inbox';
import InfoIcon from 'material-ui-icons/InfoOutline';
import FlashOnIcon from 'material-ui-icons/FlashOn';
import ClearIcon from 'material-ui-icons/Clear';
import DraftsIcon from 'material-ui-icons/Drafts';
import ErrorIcon from 'material-ui-icons/Error';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import BookIcon from 'material-ui-icons/Book';
import {ListItemSecondaryAction} from 'material-ui/List';
import DeleteIcon from 'material-ui-icons/Delete';
import LinearQuery from "./LinearQuery";

export default class ShowList extends React.Component {

  render() {

    const bookArr = this.props.bookArr;
    console.log('showlist-authorName: ', this.props.authorName);
    // console.log('bookArr: ', bookArr);
    // console.log('bookArr: ',Array.isArray(bookArr));
    if (Array.isArray(bookArr) && bookArr.length > 0) {
      return (
        <List>
          {
            bookArr.map((book, curIndex) => {

              return (
                <div key={curIndex}>
                  <ListItem button onClick={() => this.props.handleClickOpen(curIndex)}>
                    <ListItemIcon>
                      <BookIcon/>
                    </ListItemIcon>
                    <ListItemText primary={book.Title.toUpperCase()}/>
                    <ListItemSecondaryAction>
                      {/*// cannot pass params without arrow func!*/}
                      <IconButton
                        aria-label="Comments"
                        onClick={() => {
                          this.props.handleDeleteBook(curIndex, book);
                          console.log(book);
                        }}
                      >
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );

            })
          }

        </List>
      )
    } else if (this.props.isSearching) {
      return (
        <div>
          <List>

            <ListItem>
              <LinearQuery/>
            </ListItem>

          </List>
        </div>
      )
    } else if (!this.props.isSearching && this.props.authorName !== '') {
      return (
        <List>
          <ListItem
            button
          >
            <ListItemIcon>
              <ErrorIcon/>
            </ListItemIcon>
            <ListItemText
              style={{paddingLeft: 0}}
              primary={`并没有找到名为 ${this.props.authorName} 作者的图书呢，请检查作者姓名是否拼写正确，或者加入该作者到数据库中（`}/>
          </ListItem>

        </List>
      )
    } else {
      return (
        <List>
          <ListItem button>
            <ListItemIcon>
              <FlashOnIcon/>
            </ListItemIcon>
            <ListItemText
              style={{paddingLeft: 0}}
              primary="请开始你的搜索，还支持Google放弃的Instant Search呢（"/>
          </ListItem>
          {/*<ListItem button>*/}
          {/*<ListItemIcon>*/}
          {/*<DraftsIcon/>*/}
          {/*</ListItemIcon>*/}
          {/*<ListItemText primary="Drafts"/>*/}
          {/*</ListItem>*/}
        </List>
      )
    }
  }
}