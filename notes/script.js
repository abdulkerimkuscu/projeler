const addBTN = document.querySelector("#add");
const deleteAllBTN = document.querySelector("#deleteAll")
const notes = JSON.parse(localStorage.getItem("notes"));
const yesBTN = document.querySelector("#yes");
const noBTN = document.querySelector("#no")
const alertDiv = document.querySelector(".alert")
if(notes){
    notes.forEach((note) =>{
        addNewNote(note)
    });
}
addBTN.addEventListener("click", () =>{
    addNewNote();
});


function addNewNote (text = ""){
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="notes">
    <div class="note-nav">
        <button id="edit"><i class="fa-regular fa-pen-to-square"></i></button>
        <button id="delete"><i class="fa-solid fa-eraser"></i></button>  
    </div>
    <div class="main "></div>
        <textarea class = ${text ? "hidden" : "" } ></textarea>
    </div>
    `
    
    const deleteBTN = note.querySelector("#delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");
    const editBTN = note.querySelector("#edit")
textArea.value = text;
main.innerHTML = marked(text);


editBTN.addEventListener("click", () =>{
    textArea.classList.toggle("hidden")
})

deleteBTN.addEventListener("click", () => {
    note.remove();
    saveFromLs()
})

textArea.addEventListener("input", (e)=>{
    const {value} = e.target;
    main.innerHTML = marked(value);
    saveFromLs()

})
deleteAllBTN.addEventListener("click", () => {
    if(notes == null ){
        
    }
    alertDiv.classList.remove("alert-hidden")
})

yesBTN.addEventListener("click", () => {
    const element = document.querySelectorAll(".note")
    element.forEach((item) =>{
        item.remove()
        saveFromLs();
    });
    alertDiv.classList.add("alert-hidden")
});

noBTN.addEventListener("click", () =>{
    alertDiv.classList.add("alert-hidden")
})
document.body.appendChild(note)
}

function saveFromLs(){
    const textNotes = document.querySelectorAll("textarea");
    const notes = [];
    textNotes.forEach((note) => {
        notes.push(note.value)
    });
    localStorage.setItem("notes" , JSON.stringify(notes));
}
