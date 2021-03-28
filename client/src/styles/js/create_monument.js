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
  validation_name_error: {
    textAlign: 'center',
    color: 'red'
  },
  validation_image_error: {
    margin: theme.spacing(0, 0, 2),
    textAlign: 'center',
    color: 'red'
  },
  server_error: {
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
