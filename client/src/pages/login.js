import React from "react";
/* ToDo:
UI
1. Реализовать компонет текстового поля из Material-UI https://material-ui.com/ru/components/text-fields/
2. Реализовать компонет кнопки из Material-UI https://material-ui.com/ru/components/buttons/
3. Реализовать чекбокс из Material-UI https://material-ui.com/ru/components/checkboxes/
4. Переход по ссылке на страницу reset password с помощью react-router https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
5. Валидация текстовых полей + реализовать компонент ошибки под текстовым полем https://www.npmjs.com/package/validator https://material-ui.com/ru/components/text-fields/
6. Валидация данных на бекенде
7. Реализовать ендпоинт на бекенде - ToDo
8. Общие стили на странице
https://material-ui.com/ru/getting-started/templates/sign-in/
*/
export default function Login() {

    return (
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="reset">password?</a>
                </p>
            </form>
        )
    }
