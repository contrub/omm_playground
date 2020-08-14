import React from 'react';
import axios from 'axios'
export default function Monuments() {
  function renderHTML(name, description, address, date, monumentView) {
  let htm = `<td align="center">${name}</td><td align="center">${description}</td><td align="center">${address}</td><td align="center">${date}</td><td align="center">${monumentView}</td>`
    document.getElementById('monumentss').insertAdjacentHTML('beforeend',htm)
  }

  ready()
  
  function ready(){
    console.log("Connection to MongoDB base ....")
    axios.get('http://localhost:8000/monuments')
    .then((res) => {
      console.log('MongoDB connection successful')
      const data = res.data 
      const len = Object.keys(data).length
      var monumnetsSheet = document.getElementById('monumentss')
      monumnetsSheet.insertAdjacentHTML('afterbegin','<th>name</th><th>description</th><th>address</th><th>date</th><th>monumentView</th>')
      for (let i = 0; i < len; i++){
        renderHTML(data[i].name, data[i].description, data[i].address, data[i].date, data[i].registryNumber) 
      }
    }).catch((e) => {
      alert('Error connect MongoDB')
      console.log('Error connection MongoDB base:',e)
    })
  }
  return (
    <table border="1" width="100%" id='monumentss' />
  )
}
