const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
  editBtn: {
    margin: theme.spacing(1, 0, 2)
  },
  validationImageError: {
    margin: theme.spacing(1, 0, 1),
    textAlign: 'center',
    color: 'red'
  },
  uploadBtn: {
    margin: theme.spacing(1, 0, 2),
    textAlign: 'center',
    display: 'block'
  },
  removeBtn: {
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
