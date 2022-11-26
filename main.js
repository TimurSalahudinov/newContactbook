// ! TODOS

/*
 * GEt - получить данные
 * PATCH - частичное изменения
 * POT - полная замена данных
 * POST - добавление данных
 * DELETE - удаление
 * CRUD - create (post-request) Read(Get-request) Update (pathc-request) Delete(delete-request)
 *
 *
 */

// API - Application programming interface

const API = "http://localhost:8000/contacts";

let inpName = document.getElementById("inp-name");
let inpLast = document.getElementById("inp-last");
let inpTel = document.getElementById("inp-tel");
let inpImg = document.getElementById("inp-img");

let btnAdd = document.getElementById("btn-add");
let btnsaveEdit = document.querySelector("#btn-save-edit");
btnsaveEdit.hidden = true;


// console.log(inpAdd,btnAdd);

btnAdd.addEventListener("click", async () => {
  let newCont = {
    name: inpName.value,
    last: inpLast.value,
    tel: inpTel.value,
    img: inpImg.value,
  };
   console.log(newCont);
  if (newCont.name.trim() === "") {
    alert("Enter text");
    return;
  }
  else if (newCont.last.trim() === "") {
    alert("Enter text");
    return;
  }
  else if (newCont.tel.trim() === "") {
    alert("Enter text");
    return;
  }
  else if (newCont.img.trim() === "") {
    alert("Enter text");
    return;
  }
  await fetch(API, {
    method: "POST",
    body: JSON.stringify(newCont),
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
  inpName.value = "";
  inpLast.value = "";
  inpTel.value = "";
  inpImg.value = "";
  localStorage.getItem(newCont.name, newCont.last, newCont.tel, newCont.img);
  getContacts();
});

let list = document.getElementById("list");

getContacts();

// console.log(list);

async function getContacts() {
  let response = await fetch(API).then((res) => res.json());
  list.innerHTML = "";
  response.forEach((item) => {
    let newElem = document.createElement("div");
    newElem.id = item.id;
    newElem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.last}</span>
        <span>${item.tel}</span>
        <img src="${item.img}">
        <button class="btn-delete">Удалить</button>
        <button class="btn-edit">Изменить</button>
        `;
    list.append(newElem);
  });
}

document.addEventListener("click", async (e) => {
  // console.log(e.target);
  if (e.target.className === "btn-delete") {
    let id = e.target.parentNode.id;
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    getContacts();
  }
  //   ! Update
  if (e.target.className === "btn-edit") {
    btnsaveEdit.hidden = false;
    btnAdd.hidden = true;
    let id = e.target.parentNode.id;
    let response = await fetch(`${API}/${id}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
    getContacts();
    console.log(response);
    inpName.value = response.name;
    inpLast.value = response.last;
    inpTel.value = response.tel;
    inpImg.value = response.img;
    inpName.className = response.id;
  }
});

btnsaveEdit.addEventListener("click", async () => {
  let editedCont = {
    name: inpName.value,
    last: inpLast.value,
    tel: inpTel.value,
    img: inpImg.value,
  };
  let id = inpName.className
  console.log(id);
  console.log(editedCont);
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(editedCont),
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
  });
  getContacts();
});