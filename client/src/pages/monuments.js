import React from 'react';
import MonumentService from '../services/MonumentService'
export default class Monuments extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      monuments: []
    } 
  }

  onSubmit = (event) => {
    event.preventDefault()
    console.log('clicked')
  }

  fetchMonuments = async () => {
    if (this.state.monuments.length === 0) {
      try {
        await MonumentService.fetchMonuments()
        .then((res) => (this.setState({monuments : res})))
        console.log('Fetched monuments: ' + this.state.monuments.length)
      } catch(e) {
        console.log(e)
      }
    } else {
      console.log('Trying to fetch Monuments')
    }
  }
  
  deleteMonuments = async () => {
    let unchecked = 0
    const data = document.getElementsByClassName('check')
    for (let i = 0; i < data.length; i++) {
      if (data[i].value === 'true') {
        unchecked = -1
        break
      }
    }
    if (unchecked !== -1) {
      alert('No monuments has been selected')
    } else {
      unchecked = 0
      console.log(this.state.monuments)
      for (let i = document.getElementsByClassName('check').length - 1 ; i > -1 ; i-- ) {
        if (document.getElementsByClassName('check')[i].value === 'true') {
          await MonumentService.deleteMonument(document.getElementsByClassName('check')[i].id) // waiting for a server response
          this.state.monuments.splice(i, 1)
          console.log(this.state.monuments)
        } else {
          unchecked ++
        }
      }
      var parent = document.getElementById('monumentsSheet')
      var child = document.getElementById('monuments')
      parent.removeChild(child)
      document.getElementById('monumentsSheet').innerHTML = '<table border = "1" width = "100%" id = "monuments"/> '
      this.renderHTML()
    }
  }

  createMonument = async () => {
    let createForm = 
    `
      <form id = 'creation'>
        Name: <input required type = "text" class = "form" />
        <br/>
        Description: <input required type = "text" class = "form" />
        <br/>
        Address: <input required type = "text" class = "form" />
        <br/>
        Date: <input type = "date" class = "form" />
        <br/>
        MonumentView: <input required type = "text" class = "form" />
        <br/>
        RegistryNumber: <input required type = "text" class = "form" />
        <br/>
        <button id='create' type="submit">Отправить</button> 
      </form>
    `
    document.getElementById('monumentsSheet').hidden = true
    document.getElementById('buttons').hidden = true
    document.getElementById('createMonument').insertAdjacentHTML('afterbegin', createForm)    
    document.getElementById('creation').onsubmit = this.onSubmit
    document.getElementById('create').onclick = this.changeState
  }

  changeState = async() => {
    let inputes = document.getElementsByClassName("form")
    if (inputes[0].value !== "" && inputes[1].value !== "" && inputes[2].value !== "" && inputes[4].value !== "" && inputes[5].value !== "") {
      let monDate = Date()
      if (inputes[3].value !== '') {
        monDate = new Date(inputes[3].value)
      }
      await MonumentService.createMonument(
      { name : inputes[0].value,
        description : inputes[1].value,
        address : inputes[2].value,
        date : monDate,
        monumentView : inputes[4].value,
        registryNumber : inputes[5].value
      })
      .then((res) => this.state.monuments.push(res))
      alert(' Monument '+ document.getElementsByClassName('form')[0].value + ' was created! ')  
      var parent = document.getElementById('createMonument')
      var child = document.getElementById('creation')
      parent.removeChild(child)
      document.getElementById('monumentsSheet').hidden = false
      document.getElementById('buttons').hidden = false
      parent = document.getElementById('monumentsSheet')
      child = document.getElementById('monuments')
      child.remove(parent)
      document.getElementById('monumentsSheet').innerHTML = '<table border = "1" width = "100%" id = "monuments"/>'
      this.renderHTML()
    }
  }

  getMonuments = () => {
    this.renderHTML()
    document.getElementById('buttons').insertAdjacentHTML('afterbegin', 
    `
      <button id = 'createButton'> Create monument </button>
      <button id = 'deleteButton'> Delete selected monuments </button>
    `)
  }

  renderHTML = async () => {
    await this.fetchMonuments() // waiting for a server response
    console.log(this.state.monuments)
    document.getElementById('createButton').onclick = 
    document.getElementById('createButton').onclick = this.createMonument
    document.getElementById('deleteButton').onclick = this.deleteMonuments
    document.getElementById('monuments').insertAdjacentHTML('beforeend',  
    ` <th>name</th>
      <th>description</th>
      <th>address</th>
      <th>date</th>
      <th>monumentView</th>
      <th>registryNumber</th>
      <th>_id</th>
      <th>
        <input onclick = "let checkboxes = document.getElementsByClassName('check')
        for (let checkbox of checkboxes) {
            checkbox.value = 'true'
            checkbox.checked = this.checked
          }" type="checkbox"/>
      </th>
    `)
    for (let i = 0; i < this.state.monuments.length; i++) {
      let htm = 
      ` <td align="center"> ${this.state.monuments[i].name} </td>
        <td align="center"> ${this.state.monuments[i].description} </td>
        <td align="center"> ${this.state.monuments[i].address} </td>
        <td align="center"> ${this.state.monuments[i].date} </td>
        <td align="center"> ${this.state.monuments[i].monumentView} </td>
        <td align="center"> ${this.state.monuments[i].registryNumber} </td>
        <td align="center"> 
          <a href="/monuments/${this.state.monuments[i]._id}"> ${this.state.monuments[i]._id} </a>
        </td>
        <td align="center"> 
          <input onclick={if(value=='false'){value='true'}else{value='false'}} type='checkbox' id=${this.state.monuments[i]._id} value='false' class='check'/>
        </td>
      `
      document.getElementById('monuments').insertAdjacentHTML('beforeend', htm)
    }
  }
  render() {
    return(
      <>
        <div id = 'html'>
          <div id = "monumentsSheet">
            <table border = "1" width = "100%" id = "monuments"/>
          </div>
        </div>
        <script>{window.onload = this.getMonuments}</script>
        <div id = "buttons" />
        <div id = "createMonument" />
      </>
    )
  }
}