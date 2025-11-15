// Software de tareas diarias
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

let nombre = document.getElementById("nomTarea");
let descripcion = document.getElementById("desTarea");
let agregar = document.getElementById("btn-agregar");

let list = document.getElementById("list");       // tareas pendientes
let listComp = document.getElementById("listComp"); // tareas completadas

// Funcion para guardar los datos en el LocalStorage
function guardarLocal() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Funcion para agregar las tareas
function agregarTarea(){

    let nom = nombre.value.trim();
    let des = descripcion.value.trim();

    if (nom === "" || des === "") {
        alert("Debe llenar ambos campos");
        return;
    }

    let tarea = {
        id: Math.floor(1000 + Math.random() * 9000),
        nombre: nom,
        descripcion: des,
        estado: false   // false = pendiente, true = completada
    };

    tareas.push(tarea);

    guardarLocal();
    nombre.value = "";
    descripcion.value = "";

    mostrarTarea();
}

// Funcion para mostrar las tareas en el apartado de pendientes y completadas
function mostrarTarea(){
    list.innerHTML = "";
    listComp.innerHTML = "";

    tareas.forEach(t => {
        let li = document.createElement("li");
        li.textContent = `Tarea: ${t.nombre} - Descripción: ${t.descripcion}`;

        // botón eliminar
        let boton = document.createElement("button");
        boton.classList.add("btn-eliminar");
        boton.dataset.id = t.id;
        boton.textContent = "Eliminar";

        // checkbox completar
        let check = document.createElement("input");
        check.type = "checkbox";
        check.classList.add("btn-completar");
        check.dataset.id = t.id;
        check.checked = t.estado;

        li.appendChild(boton);

        if (!t.estado) {
            // tarea pendiente
            li.appendChild(check);
            list.appendChild(li);
        } else {
            // tarea completada
            li.style.color = "green";
            listComp.appendChild(li);
        }
    });
}

agregar.addEventListener("click", agregarTarea);

// Funcion para eliminar una tarea
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        let id = e.target.dataset.id;
        let idx = tareas.findIndex(t => t.id == id);

        if (idx !== -1) {
            tareas.splice(idx, 1);
            guardarLocal();
            mostrarTarea();
        }
    }
});

// Funcion para marcar la tarea como completada
document.addEventListener("change", (e) => {
    if (e.target.classList.contains("btn-completar")) {
        let id = e.target.dataset.id;
        let idx = tareas.findIndex(t => t.id == id);

        if (idx !== -1) {
            tareas[idx].estado = true;
            guardarLocal();
            mostrarTarea();
        }
    }
});

mostrarTarea();