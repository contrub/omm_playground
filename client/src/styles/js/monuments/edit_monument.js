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
  remove_btn: {
    margin: theme.spacing(0, 0, 2)
  },
  edit_btn: {
    margin: theme.spacing(1, 0, 2)
  },
  form_control: {
    margin: theme.spacing(1),
    // minWidth: '180px'
  },
  validation_image_error: {
    margin: theme.spacing(1, 0, 1),
    textAlign: 'center',
    color: 'red'
  },
  upload_btn: {
    margin: theme.spacing(1, 0, 2),
    textAlign: 'center',
    display: 'block'
  },
  image_preview: {
    margin: theme.spacing(0, 'auto'),
    borderRadius: '10px',
    maxHeight: '200px',
    display: 'block'
  }
})

export default styles
