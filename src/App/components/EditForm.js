import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Axios from 'axios';
import qs from 'qs';
import Input, {InputLabel} from 'material-ui/Input';
import {MenuItem} from 'material-ui/Menu';
import {FormControl, FormHelperText} from 'material-ui/Form';
import Select from 'material-ui/Select';
import _ from 'lodash';
import Switch from 'material-ui/Switch';
import {FormControlLabel, FormGroup} from 'material-ui/Form';
import Divider from 'material-ui/Divider';
import config from '../config/db';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    width: '100%'
  },
  container: {
    display: 'flex',
  },
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    width: '100%',
  },
});

class EditForm extends React.Component {


  state = {
    // ISBN: "",
    Title: this.props.oldBookInfo.Title,
    Publisher: this.props.oldBookInfo.Publisher,
    PublishDate: this.props.oldBookInfo.PublishDate,
    Price: this.props.oldBookInfo.Price,
    AuthorName: this.props.authorInfo.Name,

    AuthorID: "",

    // ISBNError: false,
    TitleError: false,
    PublisherError: false,
    PublishDateError: false,
    PriceError: false,
    AuthorNameError: false,

    // ISBNHelperText: ' ',
    TitleHelperText: ' ',
    PublisherHelperText: ' ',
    PublishDateHelperText: ' ',
    PriceHelperText: ' ',
    AuthorNameHelperText: ' ',

    multiAuthor: false,
    authors: [],

    isUpdateAuthor: false,
  };


  handleSubmit = (e) => {
    e.preventDefault();

    const {oldBookInfo, author} = this.props;

    if (this.validateAllValid()) {

      let newBookInfo = {

        // "ISBN": this.state.ISBN.trim(),
        // "ISBN": oldBookInfo.ISBN,
        "Title": this.state.Title.trim(),
        "Publisher": this.state.Publisher.trim(),
        "PublishDate": this.state.PublishDate.trim(),
        "Price": this.state.Price.trim(),
        "AuthorName": this.state.AuthorName.trim(),
      };// only these five values may changed!

      let deltaBookInfo = _.omitBy(newBookInfo, (v, k) => oldBookInfo[k] === v);
      // if user changed author name, then use the user's else use the old, and may change the author id
      // with the same author name

      let finalBookInfoWithName = {
        "ISBN": oldBookInfo.ISBN,
        "AuthorName": newBookInfo.AuthorName || oldBookInfo.AuthorName,
        ...deltaBookInfo,
      };

      console.log('final book info with name: ', finalBookInfoWithName);

      // trim the data

      if (!this.state.isUpdateAuthor) {

        delete finalBookInfoWithName.AuthorName;
        Axios
          .put(`${config.API_URL}/books`,
            qs.stringify(finalBookInfoWithName))
          .then(res => {
            console.log(res.data);
            //
            //
            // if (res.data.success === true) { // 1.
            //   this.setState({
            //     ISBN: "",
            //     Title: "",
            //     Publisher: "",
            //     PublishDate: "",
            //     Price: "",
            //     AuthorName: "",
            //   }, () => {
            //     console.log('after submit: ', this.state);
            //   });
            // }


            this.handleSnackbarClose();
            this.handleSnackbarInfo(res.data.info);
            this.handleSnackbarOpen();

          })
          .catch(err => {
            console.log('Error: ', err)
          });

      } else if (!this.state.AuthorID) {
        Axios
          .put(`${config.API_URL}/books`,
            qs.stringify(finalBookInfoWithName))
          .then(res => {
            const data = res.data;
            console.log('res\'s data: ', data);

            // 1. single author, then node.js added automatically return success: true
            // 2. multi authors, then node.js send the info for each author in Array -> choose
            // 3. 404, add the author first.
            if (!data.multi) {
              if (data.success === true) { // 1.
                // needn't reset when edit

                // this.setState({
                //   // ISBN: "",
                //   Title: "",
                //   Publisher: "",
                //   PublishDate: "",
                //   Price: "",
                //   AuthorName: "",
                // }, () => {
                //   console.log('after submit: ', this.state);
                // });
                this.handleSnackbarClose();
                this.handleSnackbarInfo(data.info);
                this.handleSnackbarOpen();
              } else {
                console.log('failed... 404');
                this.handleSnackbarClose();
                this.handleSnackbarInfo(data.info);
                this.handleSnackbarOpen();
              }
            } else {
              // multi authors case.
              this.handleSnackbarClose();
              this.handleSnackbarInfo('Plz choose a author');
              this.handleSnackbarOpen();


              this.setState({
                multiAuthor: true,
                authors: data.choose,
                AuthorNameHelperText: 'Disabled'
              }, () => {
                console.log('choose authors from: ', this.state.authors);
              })
            }

            // this.setState({
            //   ISBN: "",
            //   Title: "",
            //   Publisher: "",
            //   PublishDate: "",
            //   Price: "",
            //   AuthorName: "",
            // }, () => {
            //   console.log('after submit: ', this.state);
            // })
            // this.handleSnackbarClose();
            // this.handleSnackbarInfo(data.info);
            // this.handleSnackbarOpen();
          })
          .catch(err => {
            console.log('Error: ', err)
          });
      } else {
        const finalBookInfoWithID = {
          "ISBN": oldBookInfo.ISBN,
          "AuthorID": this.state.AuthorID,
          ...deltaBookInfo,
        };
        console.log('final book info with id: ', finalBookInfoWithID);
        Axios
          .put(`${config.API_URL}/books`,
            qs.stringify(finalBookInfoWithID))
          .then(res => {
            console.log(res.data);
            //
            //
            // if (res.data.success === true) { // 1.
            //   this.setState({
            //     ISBN: "",
            //     Title: "",
            //     Publisher: "",
            //     PublishDate: "",
            //     Price: "",
            //     AuthorName: "",
            //   }, () => {
            //     console.log('after submit: ', this.state);
            //   });
            // }


            this.handleSnackbarClose();
            this.handleSnackbarInfo(res.data.info);
            this.handleSnackbarOpen();

          })
          .catch(err => {
            console.log('Error: ', err)
          });
      }

    } else {
      this.handleSnackbarClose();
      this.handleSnackbarInfo('FAILED');
      this.handleSnackbarOpen();
    }

  };


  handleSnackbarOpen = () => {
    this.props.handleSnackbarOpen()
  };

  handleSnackbarClose = () => {
    this.props.handleSnackbarClose()
  };

  handleSnackbarInfo = info => {
    this.props.handleSnackbarInfo(info);
  };


  // I think bad UX here if validate user input
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log('state from handleChange: ', this.state);
  };


  validateEmpty = (el) => {
    return new RegExp(/^$|\\s+/, 'i').test(el);
  };

  // validateISBN = () => {
  //   const val = this.state.ISBN;
  //   const isbnReg =
  //     new RegExp('((ISBN(-13)?:?\s)?97[89][-\s]?[0-9][-\s]?[0-9]{3}[-\s]?[0-9]{5}[-\s]?[0-9]|(ISBN(-10)?:?\s)?[0-9][-\s]?[0-9]{3}[-\s]?[0-9]{5}[-\s]?[0-9x])');
  //
  //   if (this.validateEmpty(val)) {
  //     this.setState({
  //       ISBNError: true,
  //       ISBNHelperText: 'ISBN can not be empty!'
  //     })
  //   } else if (!isbnReg.test(val)) {
  //     this.setState({
  //       ISBNError: true,
  //       ISBNHelperText: 'Invalid ISBN!'
  //     })
  //   } else {
  //     this.setState({
  //       ISBNError: false,
  //       ISBNHelperText: ' '
  //     })
  //   }
  // };

  validateTitle = () => {
    const val = this.state.Title;

    if (this.validateEmpty(val)) {
      this.setState({
        TitleError: true,
        TitleHelperText: 'Title can not be empty!'
      })
    } else {
      this.setState({
        TitleError: false,
        TitleHelperText: ' '
      })
    }
  };

  validatePublisher = () => {
    const val = this.state.Publisher;
    if (this.validateEmpty(val)) {
      this.setState({
        PublisherError: true,
        PublisherHelperText: 'Publisher cannot be empty!'
      });
    } else {
      this.setState({
        PublisherError: false,
        PublisherHelperText: ' '
      });
    }
  };

  validatePublishDate = () => {
    const val = this.state.PublishDate;
    if (this.validateEmpty(val)) {
      this.setState({
        PublishDateError: true,
        PublishDateHelperText: 'PublishDate cannot be empty!'
      });
    } else {
      this.setState({
        PublishDateError: false,
        PublishDateHelperText: ' '
      });
    }
  };


  validatePrice = () => {
    const val = this.state.Price;
    const priceReg = new RegExp('^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$');

    if (this.validateEmpty(val)) {
      this.setState({
        PriceError: true,
        PriceHelperText: 'Price cannot be empty!'
      });
    } else if (!priceReg.test(val)) {

      this.setState({
        PriceError: true,
        PriceHelperText: 'Invalid Price!'
      });

    } else {
      this.setState({
        PriceError: false,
        PriceHelperText: ' '
      });
    }
  };


  validateAuthorName = () => {
    const val = this.state.AuthorName;
    if (this.validateEmpty(val)) {
      this.setState({
        AuthorNameError: true,
        AuthorNameHelperText: 'Author\'s name cannot be empty!'
      });
    } else {
      this.setState({
        AuthorNameError: false,
        AuthorNameHelperText: ' '
      });
    }
  };

  validateAllValid = () => {

    console.log('this.state from validateAllValid: ', this.state);

    return !(
      // this.validateEmpty(this.state.ISBN) ||
      // this.validateEmpty(this.state.Title) ||
      // this.validateEmpty(this.state.Price) ||
      // this.validateEmpty(this.state.Publisher) ||
      // this.validateEmpty(this.state.PublishDate) ||
      // this.validateEmpty(this.state.AuthorName) ||
      // this.state.ISBNError ||
      this.state.TitleError ||
      this.state.PriceError ||
      this.state.PublisherError ||
      this.state.PublishDateError ||
      this.state.AuthorNameError
    );
  };

  validateAllEmpty = () => {
    return !(
      this.validateEmpty(this.state.ISBN) ||
      this.validateEmpty(this.state.Title) ||
      this.validateEmpty(this.state.Price) ||
      this.validateEmpty(this.state.Publisher) ||
      this.validateEmpty(this.state.PublishDate) ||
      this.validateEmpty(this.state.AuthorName)
    );
  };
  handleSwitchChange = () => {
    this.setState({
      isUpdateAuthor: !this.state.isUpdateAuthor

    });
  }

  render() {

    const {classes} = this.props;
    const {oldBookInfo} = this.props;
    return (
      <div className={classes.root}>


        <form className={classes.container} autoComplete="off">
          <Grid container spacing={16}>

            <Grid item xs={12}>
              <div style={{
                // width:'100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // marginTop: 20
              }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.isUpdateAuthor}
                        onChange={this.handleSwitchChange}
                        aria-label="checked"
                      />}
                    label='Change Author'
                  />
                </FormGroup>
              </div>
            </Grid>
            <Divider/>
            <Grid item xs={12} md={6}>
              <TextField
                disabled
                name={"ISBN"}
                id="isbn"
                label="ISBN"
                // error={this.state.ISBNError}
                // helperText={this.state.ISBNHelperText}
                // onBlur={this.validateISBN}
                placeholder={"Input the ISBN..."}
                className={classes.textField}
                value={oldBookInfo.ISBN}
                // onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name={"Title"}
                id="title"
                label="Title"
                error={this.state.TitleError}
                helperText={this.state.TitleHelperText}
                onBlur={this.validateTitle}
                placeholder={"Input the Title..."}
                className={classes.textField}
                value={this.state.Title}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name={"Publisher"}
                id="publisher"
                label="Publisher"
                error={this.state.PublisherError}
                helperText={this.state.PublisherHelperText}
                onBlur={this.validatePublisher}
                placeholder={"Input the Publisher..."}
                className={classes.textField}
                value={this.state.Publisher}
                onChange={this.handleChange}
              />
            </Grid>
            {/*will use the material-ui-old select component for now*/}
            <Grid item xs={12} md={6}>
              <TextField
                name={"PublishDate"}
                id="publishDate"
                label="PublishDate"
                error={this.state.PublishDateError}
                helperText={this.state.PublishDateHelperText}
                onBlur={this.validatePublishDate}
                placeholder={"Select the Publish Date..."}
                className={classes.textField}
                value={this.state.PublishDate}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                name={"Price"}
                id="price"
                label="Price"
                error={this.state.PriceError}
                helperText={this.state.PriceHelperText}
                onBlur={this.validatePrice}
                placeholder={"Input the Pricw..."}
                className={classes.textField}
                value={this.state.Price}
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                disabled={!this.state.isUpdateAuthor || this.state.multiAuthor}
                name={"AuthorName"}
                id="authorName"
                label="Author Name"
                error={this.state.AuthorNameError}
                helperText={this.state.AuthorNameHelperText}
                onBlur={this.validateAuthorName}
                placeholder={"Input the Author's name..."}
                className={classes.textField}
                value={this.state.AuthorName}
                onChange={this.handleChange}
              />
            </Grid>

            {
              this.state.multiAuthor &&
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="id-simple">AuthorID</InputLabel>
                  <Select
                    value={this.state.AuthorID}
                    onChange={(e) => {
                      this.setState({
                        AuthorID: e.target.value,
                      })
                    }}
                    input={<Input id="id-simple"/>}
                  >
                    {
                      this.state.authors.map((author) => {
                        return (
                          <MenuItem key={author.AuthorID} value={author.AuthorID}>
                            {/*{JSON.stringify(author)}*/}
                            {`ID: ${author.AuthorID}, Name: ${author.Name}, Age: ${author.Age}, Country: ${author.Country}`}
                          </MenuItem>
                        );
                      })
                    }

                  </Select>
                </FormControl>
              </Grid>
            }


            {/*<DialogActions>*/}
            <Grid item xs={12}>

              <div style={{
                // width:'100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                // marginTop: 20
              }}>
                <Button
                  color={"primary"}

                  raised
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button></div>
            </Grid>
            {/*</DialogActions>*/}
          </Grid>
        </form>
      </div>
    );
  }

}

EditForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditForm);