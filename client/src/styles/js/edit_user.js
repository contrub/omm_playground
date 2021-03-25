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
    marginTop: theme.spacing(1)
  },
  removeBtn: {
    margin: theme.spacing(0, 0, 2)
  },
  editBtn: {
    margin: theme.spacing(1, 0, 2)
  },
  selValue: {
    textAlign: 'center'
  },
  errors: {
    textAlign: 'center',
    color: 'red',
    margin: '0 0 16px'
  },
  passRequirement: {
    color: 'red',
    fontFamily: 'Gill Sans',
    fontSize: '18px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  }
})

export default styles
