import {auth, signInWithEmailAndPassword }from './firebase.js'


const loginHandler=async()=>{
try {
    
   let email = document.getElementById('email');
   let password = document.getElementById('password');
  if(!email.value || !password.value){
   Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Required Fields Are Missing!",
  
});
return;
  }
   const response = await signInWithEmailAndPassword(auth, email.value, password.value);
      console.log('response_Login', response.user.uid);
      localStorage.setItem('uid', response.user.uid)
      window.location ='./todo.html'
} catch (error) {
    console.log(error.message);
    
}


}


window.loginHandler= loginHandler;