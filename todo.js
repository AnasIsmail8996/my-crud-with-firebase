// import { use } from "react";
import { addDoc, db, doc, getDoc, collection, getDocs, deleteDoc, updateDoc } from "./firebase.js";

let userData;

const fetchUserData = async () => {
 try {
   const userUid = localStorage.getItem('uid');
  console.log(userUid);
  const user = await getDoc(doc(db, 'newUsersForUnique', userUid));

  userData = user.data();
 } catch (error) {
  console.log(error.message);
  
 }

};

const addTodo=async()=>{
try {
       let title=document.getElementById('title')
 let   desc=document.getElementById('desc')
  
 if(!title.value, !desc.value){
     Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Required Fields Are Missing!",
});
    return;
  }

  let todoObj={
    title:title.value,
    desc:desc.value,
    uid:userData.uid,
    userName:userData.firstName + ' ' + userData.lastName,
    userEmail:userData.email,

  }
console.log('obj----->', todoObj);
 await addDoc(collection(db, 'userTodos'), todoObj);
  fetchTodos()
} catch (error) {
    console.log(error.message);
    
}

}


const  fetchTodos=async()=>{
try {
  const querySnapShot= await getDocs(collection(db, 'userTodos'));
const tempArr=[];

querySnapShot.forEach((doc) => {
  // console.log(doc.data());

  const objDataGet={
    ...doc.data(),
    id:doc.id
  }
  console.log(objDataGet, 'old data');
  
  tempArr.push(objDataGet);
});

// console.log(tempArr, 'temp arrrya');

let taskList= document.getElementById('taskList');
taskList.innerHTML='';

for(const data of tempArr){
taskList.innerHTML +=  `
<li class="list-group-item d-flex flex-column justify-content-between align-items-center">
    <span class="task-text">${data.title}</span>
    <span class="task-text">${data.desc}</span>
    <span class="task-text">${data.userName}</span>
    <span class="task-text">${data.userEmail}</span>
    <div>
      <button class="btn btn-sm btn-outline-primary me-2" id='${data.id}' onclick="editTask(this)">
        <i class="bi bi-pencil-square"></i>
      </button>
      <button class="btn btn-sm btn-outline-danger" id='${data.id}' onclick="deleteTask(this)">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </li>
`;
 
}

} catch (error) {
console.log(error.message);
  
}

}

const deleteTask=async (eleDelete)=>{

try {
  const docID= eleDelete.id;
  await deleteDoc(doc(db, 'userTodos', docID  ));
  fetchTodos()
} catch (error) {
  console.log(error.message);
  
}
  
  
}
// const editTask= async(eleEdit)=>{
//   try {
//     const editId= eleEdit.id;
// const li = eleEdit.closest('li');
// const textSpan= li.querySelector(".task-text");
// const editText= prompt('Edit Text ', textSpan.textContent);
// if (!editText || editText.trim() === "") return;

//  const taskRef= doc(db, 'userTodos', editId);
//  await updateDoc(taskRef, {task: editText.trim()})
//  fetchTodos();
// console.log(textSpan);
// console.log(li);
  
// } catch (error) {
//   console.log(error.message);
  
// }    
    
// }
const editTask = async (eleEdit) => {
  try {
    const editId = eleEdit.id;
    const li = eleEdit.closest('li');
    const textSpan = li.querySelector(".task-text");

    const { value: editText } = await Swal.fire({
      title: 'Edit Task',
      input: 'text',
      inputLabel: 'Task Text',
      inputValue: textSpan.textContent,
      showCancelButton: true,
      confirmButtonText: 'Update',
      inputValidator: (value) => {
        if (!value || value.trim() === '') {
          return 'Task cannot be empty!';
        }
      }
    });

    if (!editText || editText.trim() === '') return;

    const taskRef = doc(db, 'userTodos', editId);
    await updateDoc(taskRef, { task: editText.trim() });
    fetchTodos();

  } catch (error) {
    console.log(error.message);
    Swal.fire('Error', error.message, 'error');
  }
};



window.deleteTask= deleteTask;
window.editTask= editTask;
 window.fetchUserData= fetchUserData; 
 window.fetchTodos=  fetchTodos; 
 window.addTodo= addTodo; 
