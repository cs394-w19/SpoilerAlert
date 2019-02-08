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
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  }
});

const days = [
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
];

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
        <div className="center">
       <div className="buttons-styling">
      <form className={classes.container} noValidate autoComplete="off">
      
        

        <TextField
          id="standard-select-currency"
          select
       //   label="Select"
        className={classes.textField}
        value={this.state.answers}
         onChange={this.handleChange("answers")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select if you would like to receive email notifications."
          margin="normal"
        >



          {answers.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

        </TextField>
        

         <TextField
          id="standard-select-currency"
          select
     //    label="Select"
        className={classes.textField}
        value={this.state.days}
         onChange={this.handleChange("days")}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="How many days in advance would you like to receive notifications?"
          margin="normal"
        >

        

          {days.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}

        </TextField>

</form>   

      </div>
            <Button style={{maxWidth: '70px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}} variant="contained" className={classes.button}>
        Save
      </Button>

      <Button style={{maxWidth: '70px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}} variant="contained" className={classes.button}>
        Logout
      </Button>
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
