const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  submitBtn: {
    margin: theme.spacing(1, 0, 2)
  },
  pass_copy_valid_error: {
    textAlign: 'center',
    margin: '0 0 16px',
    color: 'red'
  },
  pass_valid_error: {
    fontFamily: 'Gill Sans',
    fontSize: '17px',
    color: 'red'
  },
  myModal: {
    position: 'relative',
    top: '20px'
  }
});

export default styles
