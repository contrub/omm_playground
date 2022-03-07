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
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
  emailRequirement: {
    margin: theme.spacing(1, 0, 1),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: 'red',
  },
  passwordRequirements: {
    margin: theme.spacing(1, 0, 1),
    fontFamily: 'Gill Sans',
    fontSize: '17px',
    color: 'red'
  },
  passwordCopyRequirement: {
    margin: theme.spacing(1, 0, 1),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    fontSize: '17px',
    color: 'red'
  }
});

export default styles
