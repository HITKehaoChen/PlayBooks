// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
  progress: {
    // margin: `0 ${theme.spacing.unit * 2}px`,
    margin: -10,
  },
});

function CircularIndeterminate(props) {
  const classes = props.classes;
  return (
    <div>
      <CircularProgress color={'#fff'} style={{width: 10, height: 10}} className={classes.progress}/>
      {/*<CircularProgress className={classes.progress} size={50} />*/}
      {/*<CircularProgress color="accent" className={classes.progress} />*/}
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);