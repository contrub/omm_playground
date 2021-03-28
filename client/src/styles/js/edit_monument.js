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
  remove_btn: {
    margin: theme.spacing(0, 0, 2)
  },
  edit_btn: {
    margin: theme.spacing(1, 0, 2)
  },
  form_control: {
    margin: theme.spacing(1),
    minWidth: 180
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
    display: 'block',
    margin: theme.spacing(0, 'auto'),
    borderRadius: '10px',
  }
})

export default styles
