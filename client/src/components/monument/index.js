import React from 'react';
import Button from '@material-ui/core/Button';

class Monument extends React.Component {
  constructor(props) {
    super(props);
    console.log('Init Monument')
    this.state = { open: false };
  }

  handleClick = () => {
    console.log('handleClick');

    this.setState(state => ({
      open: true
    }));

    this.props.addMonument('test')
  };

  render() {
    console.log('render')

    return (
      <div>
        {!this.state.open && this.props.monument}
        {!this.state.open && <Button color="primary" variant="contained" onClick={this.handleClick}>Click</Button>}
        { this.state.open ? 'Deleted' : ''}
      </div>
    );
  }
}

export default Monument;
