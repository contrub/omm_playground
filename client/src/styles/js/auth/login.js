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
  validError: {
    margin: theme.spacing(1, 0, 2),
    textAlign: 'center',
    color: 'red'
  },
  emailRequirement: {
    margin: theme.spacing(1, 0, 1),
    textAlign: 'center',
    color: 'red',
  },
});

export default styles
