


import {auth, app, createUserWithEmailAndPassword, doc, setDoc, db} from './firebase.js';
console.log(auth);
console.log(app);
const uid= localStorage.getItem('uid');
if(uid){
window.location.replace('./todo.html');
}

const  signUp= async()=>{
   try {
     let firstName =document.getElementById('firstName')
    let lastName =document.getElementById('lastName')
    let phone =document.getElementById('phone')
    let username =document.getElementById('username')
    let email =document.getElementById('email')
    let password =document.getElementById('password')
  
 

    
    const responsive=  await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log('responsive', responsive);
    const userUid= responsive.user.uid;
    
    let signUpObj={
       firstName:firstName.value,
        lastName:lastName.value,
        username:username.value,
        phone:phone.value,
        email:email.value,
        uid:userUid,
      }
      console.log(signUpObj);

  console.log(userUid);

  const resUser= await  setDoc(doc(db, 'newUsersForUnique', userUid), signUpObj)
     console.log(resUser);
     window.location ='./index.html'
} catch (error) {
    console.log(error.message);
    
   }
    

}

window.signUp = signUp;

