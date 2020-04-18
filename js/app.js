// Variables 

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listeners

cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se preciona "Agregar Carrito"
     cursos.addEventListener('click', comprarCurso);

    //cuando se elemina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //al presionar vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //al calrgar el docmuento mostrar Local Storage
    document.addEventListener('DOMContentLoaded' , leerLocalStorage);
}



//FUNCIONES

//funcion que añade el curso al carrito

function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar carrito
   if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        
        // Enviamos el curso seleeccionado para tomar sus datos.
        leerDatosCurso(curso);
   }
}

// lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(infocurso) {
    const row = document.createElement('tr');
    row.innerHTML= `
     <td>
        <img src="${infocurso.imagen}" width=100>
    <td>
    <td>${infocurso.titulo}<td>
    <td>${infocurso.precio}<td>
    <td>
        <a href=# class="borrar-curso" data-id="${infocurso.id}">X</a>
    <td>
    `; 
    listaCursos.appendChild(row);
     
    //¿por que esta usando curso en vez de infocurso
    guardarCursoLocalStorage(infocurso); 
}

//Elimina el curso del carrito en el DOM 
function eliminarCurso(e) {
    e.preventDefault();

   let curso,
    cursoId;
   if(e.target.classList.contains('borrar-curso') ){
       e.target.parentElement.parentElement.remove();

       // eliminar del local Storage
       curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        
   }
   eliminarCursoLocalStorage(cursoId);

}

function vaciarCarrito(){
    //forma lenta
  // listaCursos.innerHTML = '';

    //forma rapida (recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
   

    //vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

// Almacena cursos del carrito al Local Storage

function guardarCursoLocalStorage(curso) {
    let cursos;
//toma el valor de una arreglo con datos del LS o vacio
    cursos = obtenerCursosLocalStorage();

    //el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos' , JSON.stringify(cursos) );
}

//comprueba que hay elementos en local storage
function obtenerCursosLocalStorage(){
    let cursosLS;
    //comprobamos si hay algo en local Storage.
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

//imprime los cursos del Local Storage en el carrito

function leerLocalStorage(){

    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //construir el template

        const row = document.createElement('tr');
        row.innerHTML= `
         <td>
            <img src="${curso.imagen}" width=100>
        <td>
        <td>${curso.titulo}<td>
        <td>${curso.precio}<td>
        <td>
            <a href=# class="borrar-curso" data-id="${curso.id}">X</a>
        <td>
        `; 
        listaCursos.appendChild(row);
    });
}

//elimina el curso por el Id en Local S.
function eliminarCursoLocalStorage(cursoId){
   let cursosLS;
//obtenemos el arreglo del curso
   cursosLS = obtenerCursosLocalStorage();
//iteramos comparando el ID del curso borrado con los del LS.
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === cursoId) { //comparacion de id para acceder al objeto (curso)
            cursosLS.splice(index, 1);
        } 
    }); 
   //añadimos el arreglo actural a storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}


//elimina todos los cursos de Local Storage
function vaciarLocalStorage(){
    localStorage.clear();
}
