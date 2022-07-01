// alerta
// alert('click en el carrito para actividad de mockapi');

// ventana modal
const regist = document.getElementById("regist");
const contenedor_modal = document.getElementById("contenedor_modal");
const cancelar = document.getElementById("cancelar");

regist.addEventListener("click", () => {
  contenedor_modal.classList.add("show");
});

cancelar.addEventListener("click", () => {
  contenedor_modal.classList.remove("show");
});


// Api con MockApi
api = "https://62abfb649fa81d00a7a776d4.mockapi.io/api/carrito";

getAll = async function () {
  try {
    const respuesta = await fetch(this.api);

    if (respuesta.status == 200) {
      let json = await respuesta.json()
      return json;
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};


eliminar = async function (id) {
  try {
    const respuesta = await fetch(api + "/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    
    const data = await respuesta.json();
    if (respuesta.status == 200) {
      console.log("Registro eliminado: " + data);
      var item = document.getElementById("row-" + id);
      item.parentNode.removeChild(item);
      alert("Registro eliminado!");
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};


guardar = async function (pizza) {
  try {
    const respuesta = await fetch(api, {
      method: "POST",
      body: JSON.stringify(pizza),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    const data = await respuesta.json();
    if (respuesta.status == 201) {
      console.log("Registro creado!");
      return data;
    }
  } catch (error) {
    console.log("ERROR: " + error);
  }
};


function cargarDatos() {
  var tablaDatos = document.getElementById("tblDatos");
  var tBodyDatos = document.getElementById("tbdDatos");
  const todos = getAll().then((datos) => {
    //console.log(data);
    //Varible global
    datosJson = data;
    data.forEach((element, index) => {
      //Por cada registro obtenido se crea una nueva fila y se agrega al Body de la tabla
      var row = document.createElement("TR");
      var col1 = document.createElement("TD");
      col1.innerHTML = element.id;
      var col2 = document.createElement("TD");
      col2.innerHTML = element.nombre;
      var col3 = document.createElement("TD");
      col3.innerHTML = element.ingredientes;
      var col4 = document.createElement("TD");
      col4.innerHTML = element.valor;
      var col5 = document.createElement("TD");
      col5.innerHTML = `<a class="px-6 py-2 rounded-lg mr-4 cursor-pointer transition hover:bg-blue-500 hover:scale-110 duration-300 hover:shadow-md" id="modificar" href="#" onclick="">Modificar</a> <a class="px-6 py-2 rounded-lg ml-4 cursor-pointer transition hover:bg-red-500 hover:scale-110 duration-300 hover:shadow-md" id="modificar" href="#" onclick="eliminar(${element.id})">Eliminar</a>`;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.id = "row-" + element.id;
      tBodyDatos.appendChild(row);
    });
  });
}

/** Función para ver formulario para agregar pizza */
document.getElementById("btnAgregar").addEventListener("click", (e) => {
  seccion = document.getElementById("seccionFormulario");
  seccion.classList.remove("d-none");
  e.preventDefault();
});

/** Función que sirve para limpiar los datos del formulario */
function limpiarFormulario() {
  /** Limpiar datos del formulario */
  document.getElementById("nombre").value = "";
  document.getElementById("ingredientes").value = "";
  document.getElementById("valor").value = "";
}

/** Función para ocultar formulario */
document.getElementById("btnCancelar").addEventListener("click", (e) => {
  seccion = document.getElementById("seccionFormulario");
  seccion.classList.add("d-none");
  /** Limpiar datos del formulario */
  limpiarFormulario();
  e.preventDefault();
});

/** Función para ver formulario para agregar pizza */
document.getElementById("btnGuardar").addEventListener("click", (e) => {
  pizza = {
    //Creamos el objeto a partir de los datos ingresados en el formulario
    nombre: document.getElementById("nombre").value,
    ingredientes: document.getElementById("ingredientes").value,
    valor: document.getElementById("valor").value,
  };
  guardar(pizza)
    .then((response) => {
      console.log(response);
      return response;
    })
    .then((data) => {
      console.log(data);
      alert("Registro creado con éxito!");
      //Se agrega nueva fila y se agrega al Body de la tabla
      var tBodyDatos = document.getElementById("tbdDatos");
      var row = document.createElement("TR");
      var col1 = document.createElement("TD");
      col1.innerHTML = data.id;
      var col2 = document.createElement("TD");
      col2.innerHTML = data.nombre;
      var col3 = document.createElement("TD");
      col3.innerHTML = data.ingredientes;
      var col4 = document.createElement("TD");
      col4.innerHTML = data.valor;
      var col5 = document.createElement("TD");
      col5.innerHTML = `<a class="btn btn-success me-1 my-1" id="modificar" href="#" onclick="">Modificar</a> <a class="btn btn-danger" id="modificar" href="#" onclick="eliminar(${data.id})">Eliminar</a>`;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      row.appendChild(col5);
      row.id = "row-" + data.id;
      tBodyDatos.appendChild(row);
      /** Limpiar datos del formulario */
      limpiarFormulario();
    })
    .catch(function (err) {
      console.log("Se presento un error en la petición");
      console.error(err);
    });
  e.preventDefault();
});
