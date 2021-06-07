import './App.css';
import {useState,useEffect} from "react"
import {BrowserRouter, Route, Redirect} from "react-router-dom"

import Header from "./JS/Header.js"
import Login from "./JS/login.js"
import Footer from "./JS/Footer.js"

function App() {
  let [usuario, setUsuario] = useState("")
let [dia,setDia] = useState("")
let [mes,setMes] = useState("")
let [anyo,setAnyo] = useState("")
let [apellido1,setApellido1] = useState("")
let [apellido2,setApellido2] = useState("")
let [mensaje,setMensaje] = useState("")
let [vuelta,setVuelta] = useState("")
let [datos, setDatos] = useState([])
let [nombre, setNombre] = useState()
let [edad, setEdad] = useState()
let [rango,setRango] = useState()

useEffect(function(){
  
  if (usuario !== "") {
  fetch("http://localhost:3000/usuarios/", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({usuario: usuario}),
      }).then((res)=>res.json()).then((res)=>{
          setDatos(res.datos[0])
          setNombre(res.datos[0].usuario)
          localStorage.setItem("mail",res.datos[0].mail)

          let anyo = res.datos[0].anyo
          let edad = 2021 - parseInt(anyo)
          setEdad(edad)

          setRango(res.datos[0].rango)
          
      })
    }
},[usuario])

const login = (email, password) => {
  fetch("http://localhost:3000/usuarios/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({mail: email, password: password}),
  }).then((res)=>res.json()).then((res)=>{
    console.log(res.mensaje)
    setMensaje(res.mensaje)
    if (res.entrar == "si") {
      setVuelta("volver")
      console.log(res.usuario,res.dia,res.mes,res.anyo,res.apellido1,res.apellido2)
      setUsuario(res.usuario)
      setDia(res.dia)
      setMes(res.mes)
      setAnyo(res.anyo)
      setApellido1(res.apellido1)
      setApellido2(res.apellido2)
      localStorage.setItem("mail",res.usuario)
    }     
  })
}

function salir() {
  console.log("has salido")
        setUsuario("")
        localStorage.setItem("mail","")
}

const registrar = (nombre,apellido1,apellido2,fecha,mail,password,confirmarPassword) => {
  console.log(nombre,apellido1,apellido2,fecha,mail,password,confirmarPassword)
   
   if (password.length < 6) {
     document.getElementById("mensajeRegistro").innerHTML = "<span>La contraseña debe tener al menos 6 carácteres</span>"
   } else {
     if (confirmarPassword !== password) {
       document.getElementById("mensajeRegistro").innerHTML = "<span>La contraseña no coincide</span>"
     } else {
       indiceComprobar = mail.indexOf("@",0)
       comprobarMail = mail.substring(indiceComprobar)
       console.log(comprobarMail)
       if (comprobarMail !== "@gmail.com") {
         document.getElementById("mensajeRegistro").innerHTML = "<span>El email no es válido</span>"
       } else {
         fetch("http://localhost:3000/usuarios/registro",{
         method: "POST",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({nombre: nombre,apellido1: apellido1, apellido2: apellido2, fecha: fecha, mail: mail, password: password}),
       }).then((res)=>res.json()).then((res)=>{
         /*  setUsuario(res.usuario) */
         /*  console.log(res) */
         /*  setVuelta("volver") */
         document.getElementById("mensajeRegistro").innerHTML = `<span>${res.mensaje}</span>`
         setMensaje(res.mensaje)
         console.log(res.mensaje)
         if (res.registro == "si") {
           setVuelta("volver")
           console.log(res.usuario)
           setUsuario(res.usuario)
           localStorage.setItem("mail",res.usuario)
         }     
       })
       }

       
     } 
   }

  }
   return(<BrowserRouter>
    <Header salir={salir} nombre={nombre} usuario={usuario}/>
    <Route exact path="/">
      <Login /* vuelta={vuelta} mensaje={mensaje} login={login} registrar={registrar} *//>
    </Route>
    <Footer/>
    </BrowserRouter>)

}

export default App;
