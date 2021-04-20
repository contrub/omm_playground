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
  validationNameError: {
    textAlign: 'center',
    color: 'red'
  },
  validationImageError: {
    margin: theme.spacing(0, 0, 2),
    textAlign: 'center',
    color: 'red'
  },
  uploadBtn: {
    margin: theme.spacing(1, 0, 2),
    textAlign: 'center',
    display: 'block'
  },
  imagePreview: {
    margin: theme.spacing(0, 'auto'),
    borderRadius: '10px',
    maxHeight: '200px',
    display: 'block'
  }
})

export default styles
