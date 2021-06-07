import '../CSS/login.css';
import accederFoto from "../Imagenes/acceder.jpg"
import registarFoto from "../Imagenes/registro.jpg"

import {useState,useEffect} from "react"
import {Redirect} from "react-router-dom"

function Login (props) {
  console.log(props.mensaje)
  let [retorno,setRetorno] = useState(localStorage.getItem("retorno"))
  let [mensaje,setMensaje] = useState(props.mensaje)
  let [num,setNum] = useState(0)
  console.log(localStorage.getItem("retorno"))
  let [emailAcceso, setEmailAcceso] = useState("")
  let [contrasenaAcceso, setContrasenaAcceso] = useState("")

  let [nombreRegistro,setNombreRegistro] = useState("")
  
  let [emailRegistro,setEmailRegistro] = useState("")
  let [passwordRegistro,setPasswordRegistro] = useState("")
  let [confirmacionRegistro,setConfirmacionRegistro] = useState("")

  useEffect(function(){
    setMensaje(props.mensaje)
  },[num])

  function cambioPantalla () {
    setNum(num+1)
  setMensaje("")
  document.querySelector('.container-login').classList.toggle('active');
  }

function changeMailAcceso(e) {
  setEmailAcceso(e.target.value)
}

function changeContrasenaAcceso(e) {
  setContrasenaAcceso(e.target.value)
}

function changeNombreRegistro(e) {
  setNombreRegistro(e.target.value)
}

function changeEmailRegistro(e) {
  setEmailRegistro(e.target.value)
}

function changePasswordRegistro(e) {
  setPasswordRegistro(e.target.value)
}

function changeConfirmacionRegistro(e) {
  setConfirmacionRegistro(e.target.value)
}

   

if (props.mensaje === "Logueado correctamente") {
  return(<Redirect to={`/${retorno}`}/>)
} else if (props.mensaje === "Usuario registrado correctamente")
{
  return(<Redirect to={`/${retorno}`}/>)
} else {
  return(<>
  <section className="login">
    <div className="container-login">
      <div className="user signinBx">
        <div className="imgBx"><img src={accederFoto} alt="" /></div>
        <div className="formBx">
          <div className="opcion-registro">
            <h2>IniciaR sesión</h2>
            <input onChange={changeMailAcceso} className="input-long" type="text" name="" placeholder="Correo electrónico" />
            <input onChange={changeContrasenaAcceso} className="input-long" type="password" name="" placeholder="Contraseña" />
            <div className="boton-mensaje">
            <input onClick={()=>props.login(emailAcceso,contrasenaAcceso)} className="input-long" type="submit" name="" value="Acceder"/>
            <div id="mensajeAcceso">{mensaje}</div>
            </div>
            <p className="signup">
              ¿No tienes cuenta?
              <a onClick={cambioPantalla}>  Regístrate</a>
            </p>
          </div>
        </div>
      </div>
      <div className="user signupBx">
        <div className="formBx">
          <div className="opcion-registro">
            <h2>CREAR UNA CUENTA</h2>
            <input onChange={changeNombreRegistro} className="input-long" type="text" name="nombre" placeholder="Nombre"/>
           
            <input onChange={changeEmailRegistro} className="input-long" type="text" name="email" placeholder="Correo electrónico" />
            <input onChange={changePasswordRegistro} className="input-long" type="password" name="contraseña" placeholder="Contraseña" />
            <input onChange={changeConfirmacionRegistro} className="input-long" type="password" name="confContraseña" placeholder="Confirmar contraseña" />
            <div className="boton-mensaje">
            <input onClick={()=>props.registrar(nombreRegistro,apellido1Registro,apellido2Registro,fechaRegistro,emailRegistro,passwordRegistro,confirmacionRegistro)} className="input-long" type="submit" name="" value="Regístrate" />
            <div id="mensajeRegistro">{mensaje}</div>
            </div>
            <p className="signup">
              ¿Ya tienes una cuenta? 
              <a onClick={cambioPantalla}>  INICIAR SESIÓN</a>
            </p>
          </div>
        </div>
        <div className="imgBx"><img src={registarFoto} alt="" /></div>
      </div>
    </div>
  </section>
    </>)
}
}

export default Login;