const styles = theme => ({
  editBtn: {
    margin: theme.spacing(1),
    maxWidth: '50px',
    width: '50px'
  },
  deleteBtn: {
    margin: theme.spacing(1),
    maxWidth: '50px',
    width: '50px'
  },
  activeBtn: {
    "&:disabled": {
      fontFamily: 'Verdana, Geneva, sans-serif',
      backgroundColor: "#28a745",
      color: 'white',
      width: '95px'
    }
  },
  disableBtn: {
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
  tableCell: {
    margin: theme.spacing(1)
  },
  tableRow: {
    textAlign: 'center'
  }
})

export default styles
