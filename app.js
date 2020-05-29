function registrar(){
    
    var email = document.getElementById('email').value;
    var contraseña = document.getElementById('contraseña').value;
    console.log(email);
    console.log(contraseña);

    firebase.auth().createUserWithEmailAndPassword(email, contraseña)
    .then(function(){
        verificar()
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
   
    
}

function ingreso(){
    
    var email2 = document.getElementById('email2').value;
    var contraseña2 = document.getElementById('contraseña2').value;
    console.log(email2);
    console.log(contraseña2);
    firebase.auth().signInWithEmailAndPassword(email2, contraseña2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
      });
   
}

function observador(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log('Existe usuario Activo')
          aparece(user);
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
            console.log('*********')
            console.log(user.emailVerified);
            console.log('*********')

          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          console.log('*********')
          console.log(displayName);
          console.log('*********')
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out.
          console.log('No se ha iniciado sesion.')
          // ...
          contenido.innerHTML= `

          <div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Bienvenido!</strong> no has iniciado sesión.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        
    `;
        }
      });
}

observador();

function aparece(user){
    var user = user;
    var contenido = document.getElementById('contenido');
    if (user.emailVerified){
        contenido.innerHTML= `
          <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Bienvenido...! ${user.email}</h4>
            <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
            <hr>
            <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
            </div>
            <button  class="btn btn-danger" onclick="cerrar()">Cerrar sesion</button>
        
    `;
    }
    
}


function cerrar(){
    firebase.auth().signOut()
    .then(function(){

        console.log('Cerrando Sesion...')
    })
    .catch(function(error){
        console.log(error)

    })
}

function verificar(){
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
    // Email sent.
    console.log('Enviando Correo...');
    }).catch(function(error) {
    // An error happened.
    console.log(error);
    });
}