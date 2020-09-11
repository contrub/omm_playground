import React from 'react';
import MonumentService from '../services/MonumentService'
import './monuments.css'

/**
 * Рекомендую использовать имена css классов более специализированые, так как может возникнуть конфликт на другой странице
 * Например класс block может быть конфликтным
 * Как вариант можно взять в качестве первого слова - название страницы или модуля, затем название компонента
 * monument-item
 * Также рекомендую почитать о методологиях именования классов
 * https://ru.bem.info/methodology/
 * */
export default class Monuments extends React.Component {
  constructor(props) {
    super(props);
    // constructor(props) - не обязательно, можно написать просто state = {}
    this.state = {
      monuments: []
    }; 
  }
  
  componentDidMount = async() => {
    await MonumentService.fetchMonuments()
      .then(result => {
        this.setState({
          monuments: result
        })
      })
    // Реализовать эту проверку в методе рендер и отображать на странице
    // <div> No monuments </div>

    // Достаточно проверки this.state.monuments.length - в логическом контексте 0 = false
    if (this.state.monuments.length === 0) {
      alert('No monuments !')
    }
  }
  render() {
    const {monuments} = this.state
    const result = monuments.map((entry, index) => {
      return (
        // Этот блок нужно сделать отдельным компонентом который может быть отображен в дальнейшем в разных местах
        <div
          className='holder'

          // Использовать индекс итерируемого элемента не вегда надежно, лучше использовать id из базы данных
          // entry._id
          key={index}>
          <img
            alt='monument'
            // Если есть возможность избежать инлайновые стили лучше избегать
            style={{maxWidth: '100%', maxHeight: '100%'}}
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Monument_to_Catherine_II_in_SPB.jpg"/>
          <a onClick={/* Использовать react-router */() => window.location.href = `monuments/${index}`}>
            <div className='block'>
              {entry.name}
            </div>
          </a>
        </div>
      ) // 30 line - can't integrate href template to have link to every monument without 'onClick'
    });
    return (
      <div className='root'>
        {result}
      </div>
    )
  }
}

