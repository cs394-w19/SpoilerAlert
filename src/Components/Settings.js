import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Switch from '@material-ui/core/Switch';

import FormControlLabel from '@material-ui/core/FormControlLabel';


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
  },
  colorSwitchBase: {
    color: '#D3D3D3',
    '&$colorChecked': {
      color: '#FF9F1C',
      '& + $colorBar': {
        backgroundColor: '#FFBF69',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
});

const days = [
  {
    value: 0,
    label: "0 days"
  },
  {
    value: 1,
    label: "1 days"
  },
  {
    value: 2,
    label: "2 days"
  },
  {
    value: 3,
    label: "3 days"
  },
  {
    value: 4,
    label: "4 days"
  },
  {
    value: 5,
    label: "5 days"
  },
  {
    value: 6,
    label: "6 days"
  },
  {
    value: 7,
    label: "7 days"
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



class Settings extends React.Component {
  constructor(props) {
      super(props);
      console.log(this.props.settings);
      this.state = {
        notifications : this.props.settings["notifications"],
        threshold : this.props.settings["threshold"],
        email : this.props.settings["email"]
      };  
  }

  handleChangeNotifications = () => {
    this.setState({ notifications : !this.state.notifications});
  };

  handleChangeThreshold = name => event => {
    this.setState({ threshold : event.target.value });
  };

  handleChangeEmail = name => event => {
    this.setState({ email : event.target.value });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <div className="center">
        <div className="buttons-styling">
          <form className={classes.container} noValidate autoComplete="off">
            <FormControlLabel label="Receive email notifications?" 
                              control={<Switch defaultChecked={this.state.notifications} 
                                                onChange={this.handleChangeNotifications} 
                                                value="switch" 
                                                classes={{
                                                  switchBase: classes.colorSwitchBase,
                                                  checked: classes.colorChecked,
                                                  bar: classes.colorBar}}/>}/>

            <TextField id="standard-select-currency"
                        select 
                        className={classes.textField}
                        value={this.state.threshold}
                        onChange={this.handleChangeThreshold("days")}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        helperText="How many days in advance would you like to receive notifications?"
                        margin="normal">
            {days.map(option => (<MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                  </MenuItem>))}
            </TextField>

            <TextField id="standard-select-currency"
                        textField
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChangeEmail()}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        helperText="Email address for notifications"
                        margin="normal">
            </TextField>
          </form>
        </div>
          
        <Button onClick={() => this.props.save(this.state.email, this.state.notifications, this.state.threshold)} 
                style={{maxWidth: '70px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}} 
                variant="contained" 
                className={classes.button}>
        Save
        </Button>
        
        <Button onClick={this.props.logout} 
                style={{maxWidth: '70px', maxHeight: '40px', minWidth: '30px', minHeight: '30px'}} 
                variant="contained" className={classes.button}>
        Logout
        </Button>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Settings);

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
