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
  passwordCopyRequirements: {
    margin: theme.spacing(1),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'red'
  },
  passwordRequirements: {
    margin: theme.spacing(1),
    fontFamily: 'Gill Sans',
    fontSize: '17px',
    color: 'red'
  },
  validError: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'red'
  }
});

export default styles
