/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classnames from 'classnames';
import Card, {CardActions, CardContent, CardHeader, CardMedia} from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import {Divider} from "material-ui";
import BookIcon from 'material-ui-icons/Book'
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import EditIcon from 'material-ui-icons/ModeEdit';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import List, {ListItem, ListItemText} from 'material-ui/List';
import FolderIcon from 'material-ui-icons/Folder';
import ISBNIcon from 'material-ui-icons/Reorder';
import TodayIcon from 'material-ui-icons/Today';
import PublisherIcon from 'material-ui-icons/Business';
import PriceIcon from 'material-ui-icons/AttachMoney'
import PersonIcon from 'material-ui-icons/Person';
import PublicIcon from 'material-ui-icons/Public';
import bgImg from '../static/images/cards/bg-prog.jpg';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    // maxWidth: 400,
    // marginLeft:-18,marginRight:-18,
    marginLeft: -16, marginRight: -16,
  },
  // 16 + 8 === 24
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 300,
    marginLeft: -8, marginRight: -8,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  fab: {
    position: 'absolute',
    right: '1.5rem',
    top: '-1.75rem',
  }
});

class BookCard extends React.Component {
  state = {
    expanded: false
  };

  handleExpandClick = () => {
    this.setState({expanded: !this.state.expanded});
  };

  handleRequestClose = () => {
    this.props.handleRequestClose();
  };

  editBook = () => {
    this.handleRequestClose();
    this.handleEditDialogOpen();
  }

  handleEditDialogOpen = () => {
    this.props.handleEditDialogOpen();
  }

  render() {

    const classes = this.props.classes;
    const {bookInfo, author} = this.props;
    return (
      <div>
        <Card className={classes.card} elevation={0}>
          {/*<CardHeader*/}
          {/*// style={{backgroundColor:'#ccc'}}*/}
          {/*avatar={*/}
          {/*<Avatar aria-label="Recipe" className={classes.avatar}>*/}
          {/*<BookIcon/>*/}
          {/*</Avatar>*/}
          {/*}*/}
          {/*title={this.props.title}*/}
          {/*subheader={this.props.subHeader}*/}
          {/*/>*/}

          <CardMedia
            className={classes.media}
            // image="/public/unnamed.webp"
            image={bgImg}
            // title="Hi!"
          >
            {/*<Grid container className={classes.root}>*/}
            {/*<Grid item xs={12}>*/}
            <Grid
              container
              align={'flex-start'}
              direction={'column'}
              justify={'flex-end'}
              style={{height: 300, width: '100%', padding: 24, fontFamily: 'Product Sans'}}
            >
              <Grid item>
                <Typography
                  type="display1"
                  style={{
                    color: '#000'
                  }}
                >
                  {bookInfo.Title.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item style={{
                width: 70,
                height: 3,
                padding: 0,
                margin: '8px 0 8px 9px',
                background: 'rgba(254,239,91,1)',
              }}
              >

              </Grid>
              <Grid item>
                <Typography
                  type="headline"
                  style={{
                    color: '#000'
                  }}
                >
                  {author.Name}
                </Typography>
              </Grid>
            </Grid>
            {/*</Grid>*/}
            {/*</Grid>*/}

          </CardMedia>
          <CardContent style={{position: 'relative'}}>
            <Button
              style={{width: 48, height: 48}}
              fab
              color="accent"
              aria-label="add"
              className={classes.fab}
              onClick={this.editBook}
            >
              <EditIcon/>
            </Button>

            <Typography paragraph type="title">
              About the Book:
            </Typography>
            <Grid container spacing={16}>
              {/*<Grid item xs={12}>*/}
              {/*<Paper className={classes.paper}>xs=12</Paper>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={12} sm={6}>*/}
              {/*<Paper style={{*/}
              {/*backgroundPositionY: 'center',*/}
              {/*backgroundSize: 'cover',*/}
              {/*backgroundImage: 'url("https://assets.materialup.com/uploads/e6ea8f93-3263-4fd5-9fce-ca48505b0a03/preview.png")'*/}
              {/*}} className={classes.paper}>xs=12 sm=6</Paper>*/}
              {/*</Grid>*/}
              {/*<Grid item xs={12} sm={6}>*/}
              {/*<Paper className={classes.paper}>xs=12 sm=6</Paper>*/}
              {/*</Grid>*/}
              <Grid item xs={12} sm={6}>

                <ListItem button>
                  <Avatar style={{backgroundColor: '#4285f4'}}>
                    <ISBNIcon/>
                  </Avatar>
                  <ListItemText primary={"ISBN Info"} secondary={bookInfo.ISBN}/>
                </ListItem>
              </Grid>

              <Grid item xs={12} sm={6}>

                <ListItem button>
                  <Avatar style={{backgroundColor: '#34A853'}}>
                    <PublisherIcon/>
                  </Avatar>
                  <ListItemText primary={"Publisher"} secondary={bookInfo.Publisher}/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>

                <ListItem button>
                  <Avatar style={{backgroundColor: '#FBBC05'}}>
                    <TodayIcon/>
                  </Avatar>
                  <ListItemText primary={"Publish Date"} secondary={bookInfo.PublishDate}/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper elevation={0}>
                  <ListItem button>
                    <Avatar style={{backgroundColor: '#EA4335'}}>
                      <PriceIcon/>
                    </Avatar>
                    <ListItemText primary="Price" secondary={bookInfo.Price}/>
                  </ListItem>
                </Paper>
              </Grid>
            </Grid>

            <Divider style={{marginTop: 20, marginBottom: 20}}/>

            <Typography paragraph type="title">
              About {author.Name}:
            </Typography>

            <Grid container spacing={16}>
              <Grid item xs={12} sm={6}>

                <ListItem button>
                  <Avatar style={{backgroundColor: '#795548'}}>
                    <PersonIcon/>
                  </Avatar>
                  <ListItemText primary={"Age"} secondary={author.Age}/>
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>

                <ListItem button>
                  <Avatar style={{backgroundColor: '#009688'}}>
                    <PublicIcon/>
                  </Avatar>
                  <ListItemText primary={"Country"} secondary={author.Country}/>
                </ListItem>
              </Grid>


            </Grid>


            {/*<Typography component="p">*/}
            {/*{this.props.authorDetail}*/}
            {/*</Typography>*/}
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon/>
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon/>
            </IconButton>
            <div className={classes.flexGrow}/>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon/>
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} transitionDuration="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph type="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

BookCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookCard);