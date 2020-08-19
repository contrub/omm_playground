import React from 'react';
import MonumentService from '../services/MonumentService'
export default function Monuments() {
  if (document.getElementById('monuments') == null) {
    ready()
  }

  function renderSheet(name, description, address, date, monumentView, _id) {
    let htm = `<td align="center">${name}</td><td align="center">${description}</td><td align="center">${address}</td><td align="center">${date}</td><td align="center">${monumentView}</td><td align="center"><a href="/monuments/${_id}">${_id}</a></td><td><input onclick={if(value=='false'){value='true'}else{value='false'}} type='checkbox' id=${_id} value='false' class='check'/></td>`
    document.getElementById('monuments').insertAdjacentHTML('beforeend',htm)
  }

  function createMonument() {
    window.location.assign('http://localhost:3000/create')
  }

  function deleteMonuments() {
    let unchecked = 0
    for (let i = 0 ; i < document.getElementsByClassName('check').length ; i++ ) {
      if (document.getElementsByClassName('check')[i].value === 'true') {
        MonumentService.deleteMonument(document.getElementsByClassName('check')[i].id)
        window.location.reload(true)
      } else {
        unchecked ++
      }
    }
    if (unchecked === document.getElementsByClassName('check').length) {
      document.getElementById('message').innerHTML = '<h1 color="red">No monument has been selected!<h1>'
    }
  }

  function ready() {
    MonumentService.fetchMonuments()
    .then((res) => {
      const len = Object.keys(res).length
      var monumentsSheet = document.getElementById('monuments')
      if (len !== 0) {
        monumentsSheet.insertAdjacentHTML('afterbegin',
        ` <th>name</th>
          <th>description</th>
          <th>address</th>
          <th>date</th>
          <th>monumentView</th>
          <th>_id</th>
          <th>
            <input id="select-all" type="checkbox"/>
          </th>
        `)
        for (let i = 0; i < len; i++){
          renderSheet(res[i].name, res[i].description, res[i].address, res[i].date, res[i].registryNumber,res[i]._id,<button>d</button>) }
        document.getElementById('buttons').insertAdjacentHTML('afterbegin',`<Button id='deleteButton'>Delete selected monuments</Button>`)
        document.getElementById('buttons').insertAdjacentHTML('beforeend',`<button id='createButton'>Create monument</button>`)
        document.getElementById('deleteButton').onclick = deleteMonuments
        document.getElementById('createButton').onclick = createMonument
        document.getElementById('select-all').onclick = function() {
          let checkboxes = document.getElementsByClassName('check')
          for (let checkbox of checkboxes) {
              checkbox.value = 'true'
              checkbox.checked = this.checked
            }
        }
      } else if (len === 0) {
        document.getElementById('buttons').insertAdjacentHTML('beforeend','<h1>List of monuments is empty</h1>')
      }
    }).catch((e) => {
      alert(e)
      console.log('MongoDB error',e)
    })
    
  }

  return (
    <>
      <table border="1" width="100%" id='monuments' />
      <div id='buttons'></div>
      <div id='message'></div>
    </>
  )
}

