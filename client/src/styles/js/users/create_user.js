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
  submitBtn: {
    margin: theme.spacing(1, 0, 2),
  },
  emailRequirement: {
    margin: theme.spacing(1, 0, 1),
    textAlign: 'center',
    color: 'red',
  },
  passwordRequirements: {
    margin: theme.spacing(1),
    fontFamily: 'Gill Sans',
    fontSize: '18px',
    color: 'red'
  },
  validError: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
});

export default styles
