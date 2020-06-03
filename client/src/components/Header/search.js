import React, {Component} from 'react';
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import InputBase from '@material-ui/core/InputBase/InputBase';
import {withStyles} from '@material-ui/core';

const searchStyles = {
  search: {
    position: 'relative',
    borderRadius: 2,
    backgroundColor: '#3d8ad9',
    opacity: 0.5,
    marginRight: 12,
    marginLeft: 24,
    width: 'auto',
  },
  searchIcon: {
    padding: 0,
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: 6,
    zIndex: 111,
    cursor: 'pointer'
  },
  inputRoot: {
    color: 'inherit',
    marginLeft: 12
  },
  inputInput: {
    padding: 8,
    paddingLeft: `calc(1em + ${8}px)`,
    width: '100%',
  },
};

class Search extends Component {
  state = {
    input: ''
  };

  onChange = (event) => {
    this.setState({
      input: event.target.value
    })
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.props.submitSearch(this.state.input)
    }
  };

  onClick = () => {
    this.props.submitSearch(this.state.input)
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon} onClick={this.onClick}>
          <SearchIcon/>
        </div>
        <InputBase
          onChange={this.onChange}
          placeholder="Search…"
          value={this.state.value}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{'aria-label': 'search'}}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}

export default withStyles(searchStyles)(Search);
