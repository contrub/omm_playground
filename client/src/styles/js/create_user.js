const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  submit_btn: {
    margin: theme.spacing(2, 0, 2),
  },
  valid_error: {
    textAlign: 'center',
    margin: '0 0 16px',
    color: 'red'
  },
  pass_requirement: {
    fontFamily: 'Gill Sans',
    fontSize: '18px',
    color: 'red'
  }
});

export default styles
