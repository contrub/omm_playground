const styles = theme => ({
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
    "&:disabled": {
      fontFamily: 'Verdana, Geneva, sans-serif',
      backgroundColor: "#28a745",
      color: 'white',
      width: '95px'
    }
  },
  disable_user_btn: {
    "&:disabled": {
      fontFamily: 'Verdana, Geneva, sans-serif',
      backgroundColor: '#dc3545',
      color: 'white',
      width: '95px'
    }
  },
  table_head: {
    margin: theme.spacing(1)
  },
  table_cell: {
    margin: theme.spacing(1)
  },
  table_row: {
    textAlign: 'center'
  }
})

export default styles
