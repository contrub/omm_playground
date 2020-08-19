import React from 'react';
import MonumentService from '../services/MonumentService'
export default function Creation() {
    function createMonument() {
        let inputes = document.getElementsByClassName('form')
        if (inputes[0].value !== "" && inputes[1].value !== "" && inputes[2].value !== "" && inputes[4].value !== "" && inputes[5].value !== "") {
            try {
                let monDate = Date()
                if (inputes[3].value !== '') {
                    monDate = new Date(inputes[3].value)
                }
                MonumentService.createMonument(
                    {   name : inputes[0].value,
                        description : inputes[1].value,
                        address : inputes[2].value,
                        date : monDate,
                        monumentView : inputes[4].value,
                        registryNumber : inputes[5].value
                    })
                alert(' Monument '+ document.getElementsByClassName('form')[0].value + ' was created! ')
                window.location.href = '/monuments';
            } catch(e) {
                alert(e)
            }
        }
    }
    return (
        <div>
            <form id='creation'>
                Name: <input required type = "text" className = "form" />
                <br/>
                Description: <input required type = "text" className = "form" />
                <br/>
                Address: <input required type = "text" className = "form" />
                <br/>
                Date: <input type = "date" className = "form" />
                <br/>
                MonumentView: <input required type = "text" className = "form" />
                <br/>
                RegistryNumber: <input required type = "text" className = "form" />
                <br/>
                <button onClick={createMonument} id='create' type="button">Отправить</button> 
            </form>
        </div>
    )
}