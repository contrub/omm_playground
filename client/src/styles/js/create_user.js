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
    margin: theme.spacing(1, 0, 2),
  },
  errors: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontSize: '18px',
    color: 'red'
  },
  pass_requirement: {
    fontFamily: 'Gill Sans',
    fontSize: '18px',
    color: 'red'
  }
});

export default styles
