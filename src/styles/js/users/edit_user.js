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
  editBtn: {
    margin: theme.spacing(1, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180
  }
})

export default styles
