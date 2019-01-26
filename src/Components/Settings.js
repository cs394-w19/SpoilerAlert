import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

/* const days = [
  {
    value: "one",
    label: "1"
  },
  {
    value: "two",
    label: "2"
  },
  {
    value: "three",
    label: "3"
  },
  {
    value: "four",
    label: "4"
  },
  {
    value: "five",
    label: "5"
  },
  {
    value: "six",
    label: "6"
  },
  {
    value: "seven",
    label: "7"
  }
]; */

const answers = [
  {
    value: "yes",
    label: "yes"
  },
  {
    value: "no",
    label: "no"
  }
];

class TextFields extends React.Component {
  state = {
    name: "",
    age: "",
    multiline: "",
    currency: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

      return (
        <div className="center"> Settings
        <div className="buttons-styling">
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
         // value={this.state.name}
         // onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Phone Number"
          className={classes.textField}
          //value={this.state.name}
          //onChange={this.handleChange("name")}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Email Address"
          className={classes.textField}
         // value={this.state.name}
         // onChange={this.handleChange("name")}
          margin="normal"
        />
        

        <TextField
          id="standard-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange("currency")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select if you would like to receive notifications via SMS messages."
          margin="normal"
        >
          {answers.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
</form>

        <Button variant="contained" className={classes.button}>
        Save
      </Button>

        
      
      </div>
      </div>

    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TextFields);

/* export default class Settings extends React.Component{


  
  render() {
    return (  
      <>

      <div>
        <div className="settings-text"> Phone Number: 
          <input type="text" />
        </div>
        <div className="settings-text"> Notification Settings:
        </div>
        <div className="settings-text"> SMS Messages 
          <input type="radio" />
        </div>
        <div className="settings-text"> Email 
          <input type="radio" />
        </div>
      </div>    
      </>
    )
  }
} */
