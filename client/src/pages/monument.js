import React from 'react';
import MonumentService from '../services/MonumentService'
export default function MonumentById() {
    let id = window.location.href.split('/')[4]

    function updateMonument() {
        try {
            let monument = document.getElementsByClassName("form")
            MonumentService.updateMonument({
                _id : id,
                name : monument[0].value,
                description : monument[1].value,
                address : monument[2].value,
                date : monument[3].value,
                monumentView : monument[4].value,
                registryNumber : monument[4].value},
                id)
            alert(`Monument ${monument[0].value} was updated !`)
            window.location.href = '/monuments'
        } catch(e) {
            console.log(e)
        }
    }

    function fetchMonuments() {
        MonumentService.fetchMonuments()
        .then((res) => {
            var id_ = []
            for (let i = 0; i < Object.keys(res).length; i++) {
                id_.push(res[i]._id)
            }
            let selID = id_.indexOf(window.location.href.split('/')[4])
            let name = res[selID].name
            let description = res[selID].description
            let date = res[selID].date.split('T')[0]
            let address = res[selID].address
            let monumentView = res[selID].monumentView
            let registryNumber = res[selID].registryNumber
            document.getElementById('updateForm').insertAdjacentHTML('afterbegin',`
                <form id="upd">
                    Name: <input required type = "text" class = "form" value = '${name}'/>
                    <br/>
                    Description: <input required type = "text" class = "form" value = '${description}'/>
                    <br/>
                    Address: <input required type = "text" class = "form" value = '${address}'/>
                    <br/>
                    Date: <input type = "date" value = ${date} class = "form"/>
                    <br/>
                    MonumentView: <input required type = "text" class = "form" value = '${monumentView}'/>
                    <br/>
                    RegistryNumber: <input required type = "text" class = "form" value='${registryNumber}'/>
                    <br/>
                </form>
                <button id='update'>Update</button>`
            )
            document.getElementById('update').onclick = updateMonument
        }).catch((e) => {
            console.log(e)
        })
    }

    if (document.getElementById('updateForm') == null) {
        fetchMonuments()
    }

    return (
        <div id='updateForm'/>
    )
}