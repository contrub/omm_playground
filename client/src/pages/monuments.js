import React from 'react';
import MonumentService from '../services/MonumentService'
export default function Monuments() {
  function renderHTML(name, description, address, date, monumentView, _id) {
    let htm = `<td align="center">${name}</td><td align="center">${description}</td><td align="center">${address}</td><td align="center">${date}</td><td align="center">${monumentView}</td><td align="center"><a href="/monuments/${_id}">${_id}</a></td><td><button onclick=alert("${_id}")>X</button></td>`
    document.getElementById('monuments').insertAdjacentHTML('beforeend',htm)
  }
  if (document.getElementById('monuments') == null) {
    ready()
  }
  function ready() {
    MonumentService.fetchMonuments()
    .then((res) => {
      console.log(res)
      const len = Object.keys(res).length
      var monumentsSheet = document.getElementById('monuments')
      monumentsSheet.insertAdjacentHTML('afterbegin','<th>name</th><th>description</th><th>address</th><th>date</th><th>monumentView</th><th>_id</th><th>delete</th>')
      for (let i = 0; i < len; i++){
        renderHTML(res[i].name, res[i].description, res[i].address, res[i].date, res[i].registryNumber,res[i]._id,<button>d</button>) 
      }
    }).catch((e) => {
      alert(e)
      console.log('MongoDB error',e)
    })
    
  }
  return (
    <table border="1" width="100%" id='monuments' />
  )
}