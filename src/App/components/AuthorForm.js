import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import Slide from 'material-ui/transitions/Slide';
import Axios from 'axios';
import qs from 'qs';
import config from '../config/db'

function TabContainer(props) {
  return <div style={{padding: 20}}>{props.children}</div>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};


const styles = theme => ({
  root: {
    flexGrow: 1,

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

class AuthorForm extends React.Component {
  state = {
    name: "",
    age: "",
    country: "",
    nameError: false,
    ageError: false,
    countryError: false,
    nameHelperText: ' ',
    ageHelperText: ' ',
    countryHelperText: ' ',
  };


  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateAllValid()) {

      // Axios.post('http://localhost:8080/authors', qs.stringify(
      Axios.post(`${config.API_URL}/authors`, qs.stringify(
        {
          "Name": this.state.name,
          "Age": this.state.age,
          "Country": this.state.country
        }))
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log('Error: ', err)
        });
      this.handleSnackbarClose();
      this.handleSnackbarInfo('Success');
      this.handleSnackbarOpen();

      this.setState({
        name: "",
        age: "",
        country: "",
      })

    } else {
      this.handleSnackbarClose();
      this.handleSnackbarInfo('Plz check your inputs XD');
      this.handleSnackbarOpen();

    }

  };

  handleSnackbarOpen = () => {
    this.props.handleSnackbarOpen()
  }
  handleSnackbarClose = () => {
    this.props.handleSnackbarClose()
  }
  handleSnackbarInfo = info => {
    this.props.handleSnackbarInfo(info)

  }


  // I think bad UX here if validate user input
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

  };

  validateAge = () => {
    const val = this.state.age;
    if (this.validateEmpty(val)) {
      this.setState({
        ageError: true,
        ageHelperText: 'Age can not be empty!'
      })
    }
    else if (1 > val || val > 150) {
      this.setState({
        ageError: true,
        ageHelperText: "Please input a valid age between 1 - 150"
      })
    } else {
      this.setState({
        ageError: false,
        ageHelperText: ' '
      })
    }
  };

  validateEmpty = (el) => {
    return new RegExp(/^$|\\s+/, 'i').test(el);
  };

  validateName = () => {
    const val = this.state.name;

    if (this.validateEmpty(val)) {
      this.setState({
        nameError: true,
        nameHelperText: 'Name can not be empty!'
      })
    } else {
      this.setState({
        nameError: false,
        nameHelperText: ' '
      })
    }
  };

  validateCountry = () => {
    const val = this.state.country;


    if (this.validateEmpty(val)) {
      this.setState({
        countryError: true,
        countryHelperText: 'Country cannot be empty!'
      }, () => {
        console.log('done for no', this.state.countryError);
      });
    } else {
      this.setState({
        countryError: false,
        countryHelperText: ' '
      })
      console.log('country: ', val);
      console.log('done for ok');
    }

  };


  validateAllValid = () => {
    return !(
      this.validateEmpty(this.state.name) ||
      this.validateEmpty(this.state.age) ||
      this.validateEmpty(this.state.country) ||
      this.state.nameError ||
      this.state.ageError ||
      this.state.countryError);

  };

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root}>


        <form className={classes.container} autoComplete="off">
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TextField
                name={"name"}
                id="name"
                label="Author Name"
                error={this.state.nameError}
                helperText={this.state.nameHelperText}
                onBlur={this.validateName}
                placeholder={"Input the Author Name..."}
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={"age"}
                id="age"
                label="Author Age"
                onBlur={this.validateAge}
                error={this.state.ageError}
                helperText={this.state.ageHelperText}
                placeholder={"Input the Author age..."}
                className={classes.textField}
                value={this.state.age}
                onChange={this.handleChange}
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                name={"country"}
                id="age"
                label="Author Country"
                error={this.state.countryError}
                helperText={this.state.countryHelperText}
                onBlur={this.validateCountry}
                placeholder={"Input the Author Country..."}
                className={classes.textField}
                value={this.state.country}
                onChange={this.handleChange}
                onKeyPress={ev => {
                  // console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    this.handleSubmit(ev)
                  }
                }}
              />
            </Grid>


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

AuthorForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthorForm);