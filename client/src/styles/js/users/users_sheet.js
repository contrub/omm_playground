const styles = theme => ({
  image: {
    borderRadius: '10px',
    maxHeight: '300px',
    maxWidth: '200px'
  },
  edit_btn: {
    margin: theme.spacing(1),
    maxWidth: '50px',
    width: '50px'
  },
  delete_btn: {
    margin: theme.spacing(1),
    maxWidth: '80px',
    width: '80px'
  },
  active_user_btn: {
    backgroundColor: '#28a745',
    color: 'white',
    width: '95px'
  },
  disable_user_btn: {
    backgroundColor: '#dc3545',
    color: 'white'
  },
  table_head: {
    margin: theme.spacing(1)
  },
  table_cell: {
    margin: theme.spacing(1)
  },
  align_center: {
    textAlign: 'center'
  }
})

export default styles
