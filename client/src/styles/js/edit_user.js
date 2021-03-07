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
  removeBtn: {
    margin: theme.spacing(0, 0, 2),
  },
  editBtn: {
    margin: theme.spacing(1, 0, 2)
  },
  select: {
    textAlign: 'center'
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
  passwordRequirement: {
    color: 'red',
    fontFamily: 'Gill Sans',
    fontSize: '18px'
  },
  showPass: {
    left: '200px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
});

export default styles
