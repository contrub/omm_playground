import React from "react";

// Добавить событие обработки формы
/*
*  onSubmit = () => {
*   AuthService.signIn().then( do something )
* }
*
*  <button onClick={this.onSubmit} type="submit" className="btn btn-primary btn-block">Submit</button>
* */
export default function Login() {

    return (
            <form>
                <h3>Sign In</h3>


                <div className="form-group">
                    <label>Email address</label>
                  {/* Обработка ошибок от сервера и валидация емейла */}
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                {/* Создать компонент текстового поля */}
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

                {/* Создать компонент кнопки */}
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                  {/* Ссылка на страницу сброса пароля */}
                    Forgot <a href="reset">password?</a>
                </p>
            </form>
        )
    }
