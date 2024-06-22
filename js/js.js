/*------Año actual automático en el footer-------*/
document.querySelector(".anio").textContent = new Date().getFullYear();

/*------Validaciones------------*/


  document.getElementById("login").addEventListener("submit", function (e) {
    var ejecutar = "Cargando funcion..."
    console.log(ejecutar)
  
    var inputMail = document.getElementById("login-email").value;
    var inputPass = document.getElementById("login-pass").value;
    var errorUser = document.getElementById("errorUser");
    var errorPass = document.getElementById("errorPass");

    errorUser.textContent = "";
    errorPass.textContent = "";
  
    if (inputMail.trim() === "") {
      e.preventDefault();
      errorUser.classList = "err"
      errorUser.textContent = "Debe ingresar Usuario o E-Mail"; 
    }
  
    if (inputPass.trim() === "") {
      e.preventDefault();
      errorPass.classList = "err"
      errorPass.textContent = "Debe ingresar contraseña"; 
    }
  });




