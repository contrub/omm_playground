const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex'
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1)
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  submit_btn: {
    margin: theme.spacing(1, 0, 2),
  },
  valid_error: {
    fontFamily: 'Gill Sans',
    fontSize: '17px',
    color: 'red'
  }
});

export default styles
