const registro = document.querySelector(`.registro`)
const inicio = document.querySelector(`.inicio`)
const containerRegistro = document.querySelector(`.container__registro`)
const containerInicio = document.querySelector(`.container__total`)
const passwordIngresada = document.querySelector(`#input__passwordRegistro`)
const emailIngresado = document.querySelector(`#input__emailRegistro`)
const botonRegistro = document.querySelector(`.btn_inicioRegistro`)
const mensajeErrorMail = document.querySelector(`.mensaje__error__mail`)
const mensajeErrorPassword = document.querySelector(`.mensaje__error__password`)
const mailIniciarSesion = document.querySelector(`#input__email`)
const passwordIniciarSesion = document.querySelector(`#input__password`)
const btnIniciarSesion = document.querySelector(`.btn_inicio`)
const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const formulario = document.querySelector(`.form`)
const regexPassword= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const pruebaMail = (email) => {
    const esValido = regexEmail.test(email.value)
    console.log("Estoy en pruebaMail", esValido)
    return esValido
}
const pruebaPassword = (password) => {
    const esValido = regexPassword.test(password.value)
    console.log("Estoy en pruebaPass", esValido)
    return esValido
}

const generalValidation = (mail,password) => {
    console.log("Estoy en generalValidation")
    if (pruebaMail(mail) && pruebaPassword(password)) {
        mensajeErrorMail.classList.add(`oculto`)
        mensajeErrorPassword.classList.add(`oculto`)
        mail.classList.remove(`error`)
        password.classList.remove(`error`)
        formulario.reset()
        alert("El registro fue exitoso")
        return
    }
    if (!pruebaMail(mail)) {
        mail.classList.add(`error`)
        mensajeErrorMail.classList.remove(`oculto`)
    }
    if (pruebaMail(mail)) {
        mail.classList.remove(`error`)
        mensajeErrorMail.classList.add(`oculto`)
    }
    if (!pruebaPassword(password)) {
        password.classList.add(`error`)
        mensajeErrorPassword.classList.remove(`oculto`)
        
    }
    if (pruebaPassword(password)) {
        password.classList.remove(`error`)
        mensajeErrorPassword.classList.add(`oculto`)
        }
    else {
        alert ("Error en el registro")
        return false;
    }
}

const init = () => {
    
    registro.addEventListener(`click`, () => {
        registro.classList.add(`active`)
        containerRegistro.classList.remove(`oculto`)
        containerInicio.classList.add(`oculto`)
        inicio.classList.remove(`active`)
    } )
    inicio.addEventListener(`click`, () => {
        inicio.classList.add(`active`)
        containerInicio.classList.remove(`oculto`)
        containerRegistro.classList.add(`oculto`)
        registro.classList.remove(`active`)
    } )
    
    botonRegistro.addEventListener(`click`, (e) => {
        
        e.preventDefault();
        e.stopPropagation();
        generalValidation(emailIngresado,passwordIngresada)
        
    })
    /*btnIniciarSesion.addEventListener(`click`,(e)=> {
        e.preventDefault();
        generalValidation(mailIniciarSesion,passwordIniciarSesion)
    })*/


}
init()