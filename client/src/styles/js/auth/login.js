const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit_btn: {
    margin: theme.spacing(3, 0, 2),
  },
  valid_error: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
});

export default styles
