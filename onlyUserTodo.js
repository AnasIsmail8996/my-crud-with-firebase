import {collection, db, doc, getDocs, query, updateDoc, where, deleteDoc}from './firebase.js'


const uid= localStorage.getItem('uid');
if(!uid){
window.location.replace('./signup.html');
}
const userTodoOnly= async()=>{
try {
    
const userID= localStorage.getItem('uid');

const querySnapShot= await getDocs(query(collection(db, 'userTodos'), where('uid', '==', userID)))
console.log(querySnapShot);

const tempArr=[];

querySnapShot.forEach((doc) => {
    console.log(doc.data());
    
    const obj={
        ...doc.data(),
        id:doc.id
    }
    tempArr.push(obj)
});



const taskList= document.getElementById('taskList');
taskList.innerHTML ='';

for(const data of tempArr){

taskList.innerHTML +=`

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

// const editTask= async(eleEdit)=>{
//   try {
//       const editID= eleEdit.id;
//      const title= prompt('title');
//      const desc= prompt('desc');

//      const updatedObj={
//         title:title,
//         desc:desc
//      }
//      await updateDoc(doc(db, 'userTodos', editID), updatedObj);
//      userTodoOnly()
//   } catch (error) {
//     console.log(error.message);
    
// }
// }
const editTask = async (eleEdit) => {
  try {
    const editID = eleEdit.id;

    const { value: formValues } = await Swal.fire({
      title: 'Edit Task',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Title">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Description">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const title = document.getElementById('swal-input1').value.trim();
        const desc = document.getElementById('swal-input2').value.trim();

        if (!title || !desc) {
          Swal.showValidationMessage('Both fields are required!');
          return;
        }

        return { title, desc };
      }
    });

    if (!formValues) return; // User cancelled

    await updateDoc(doc(db, 'userTodos', editID), formValues);
    Swal.fire('Updated!', 'Task has been updated.', 'success');
    userTodoOnly();

  } catch (error) {
    console.log(error.message);
    Swal.fire('Error', error.message, 'error');
  }
};

const deleteTask=async(eleDelete)=>{
    try {
        const deleteId= eleDelete.id;
        await deleteDoc(doc(db, 'userTodos', deleteId));
        userTodoOnly()
    } catch (error) {
    console.log(error.message);
    
}

}


window.editTask= editTask;
window.deleteTask= deleteTask;
window.userTodoOnly= userTodoOnly;