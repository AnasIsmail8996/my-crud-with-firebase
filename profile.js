import {db, getDoc, doc, updateDoc}from './firebase.js'
const uid= localStorage.getItem('uid');
if(!uid){
window.location.replace('./index.html');
}



const  getUserDataFromDB=async ()=>{
try {
    const uid= localStorage.getItem('uid');
console.log(uid);

const userRef= await getDoc(doc(db, 'newUsersForUnique', uid)); 
const userData=  userRef.data()
console.log(userData);

const firstName=document.getElementById('firstName')
const lastName=document.getElementById('lastName')
const phone=document.getElementById('phone')
const username=document.getElementById('username')
const email=document.getElementById('email')
const password=document.getElementById('password')
const picture=document.getElementById('pic')

firstName.value =userData.firstName;
lastName.value =userData.lastName;
phone.value =userData.phone;
username.value =userData.username;
email.value =userData.email;
password.value =userData.password;
picture.src= userData.image_url;
} catch (error) {
    console.log(error.message);
    
}

}

// user Images

const userPicture=async()=>{
try {
    const picture= document.getElementById('pic');
    console.log(picture);
    const file=picture.files[0];

    const formData=new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'crudSmit')
  
    const res= await fetch(`https://api.cloudinary.com/v1_1/dcmwtu0ed/upload`, 
    {
        method: "POST",
        body: formData,
      })
        const data = await res.json();
    console.log(data.secure_url);
    // database Store
    const uid= localStorage.getItem('uid');
    await updateDoc(doc(db,'newUsersForUnique', uid ),{
        image_url: data.secure_url,
    })
} catch (error) {
    console.log(error.message);
    
}    


    
}




const userDataUpdated=async()=>{
try {
        const uid=localStorage.getItem('uid');
    console.log(uid);
    
const firstName=document.getElementById('firstName').value;
const lastName=document.getElementById('lastName').value;
const phone=document.getElementById('phone').value
const username=document.getElementById('username').value;
const password=document.getElementById('password').value;
const picture=document.getElementById('pic');
    let pictureURL = '';

    if (picture.files.length > 0) {
      const file = picture.files[0];


    const formData=new FormData();
    formData.append('file', file)
    formData.append('upload_preset', 'crudSmit')
  
    const res= await fetch(`https://api.cloudinary.com/v1_1/dcmwtu0ed/upload`, 
    {
        method: "POST",
        body: formData,
      })
       const data = await response.json();
      pictureURL = data.secure_url;
    }
let userUpdatedObj={
    firstName,
    lastName,
    phone,
    username,
    password,
    picture: pictureURL,
}

  const resUp= await updateDoc(doc(db, 'newUsersForUnique', uid), userUpdatedObj);
 console.log(resUp);
 

} catch (error) {
 console.log(error.message);
    
}


}
window.userDataUpdated=userDataUpdated;
window.userPicture=userPicture;
window.addEventListener('load', getUserDataFromDB)


