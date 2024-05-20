const formulario = document.querySelector('#formulario')

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', cargarLista);
    formulario.addEventListener('submit', agregarCancion);
}

function agregarCancion(e){
    e.preventDefault();

    const titulo = document.querySelector('#cancion').value;
    const artista = document.querySelector('#artista').value;
    const tono = document.querySelector('#tono').value;



    axios.post('/cancion', {titulo, artista, tono})
        .then((response) =>{
            cargarLista();
            formulario.reset()
        })
        .catch((err) => {
            console.log(err);
        })
}


function cargarLista() {

    const tbody = document.querySelector('#cuerpo');
    while (tbody.firstChild) {
        tbody.firstChild.remove()
    }

    axios.get('/canciones')
        .then((result) => {
            const { lista } = result.data;

            lista.forEach((cancion, index) => {
                const contenedor = document.createElement('tr');
                const numero = document.createElement('td');
                const titulo = document.createElement('td');
                const artista = document.createElement('td');
                const tono = document.createElement('td');
                const buttons = document.createElement('td');

                const editarBtn = document.createElement('button');
                const eliminarBtn = document.createElement('button');

                editarBtn.classList.add('btn', 'btn-warning', 'mr-1');
                editarBtn.setAttribute('data-id', cancion.id)
                editarBtn.textContent = 'Editar'
                editarBtn.addEventListener('click', editarCancion)
                eliminarBtn.classList.add('btn', 'btn-danger');
                eliminarBtn.setAttribute('data-id', cancion.id)
                eliminarBtn.textContent = 'Eliminar'
                eliminarBtn.addEventListener('click', eliminarCancion)

                buttons.append(editarBtn, eliminarBtn)

                numero.textContent = index + 1;
                titulo.textContent = cancion.titulo;
                artista.textContent = cancion.artista;
                tono.textContent = cancion.tono;

                contenedor.appendChild(numero);
                contenedor.appendChild(titulo);
                contenedor.appendChild(artista);
                contenedor.appendChild(tono);
                contenedor.appendChild(buttons);

                tbody.appendChild(contenedor)
            });

        }).catch((err) => {
            console.log(err);
        });
}

function eliminarCancion(e) {
    e.preventDefault();
    const id = e.target.getAttribute('data-id');
    axios.delete(`/cancion/${id}`)
        .then((response) => {
            cargarLista()
        })
        .catch((err) => {
            console.log(err);
        })
}

function editarCancion(e) {
    const contenedor = e.target.parentElement.parentElement;
    const id = contenedor.querySelector('button[data-id]').getAttribute('data-id');

    const tituloInput = document.createElement('input');
    tituloInput.type = 'text';
    tituloInput.value = contenedor.querySelector('td:nth-child(2)').textContent;

    const artistaInput = document.createElement('input');
    artistaInput.type = 'text';
    artistaInput.value = contenedor.querySelector('td:nth-child(3)').textContent;

    const tonoInput = document.createElement('input');
    tonoInput.type = 'text';
    tonoInput.value = contenedor.querySelector('td:nth-child(4)').textContent;

    contenedor.querySelector('td:nth-child(2)').textContent = '';
    contenedor.querySelector('td:nth-child(2)').appendChild(tituloInput);

    contenedor.querySelector('td:nth-child(3)').textContent = '';
    contenedor.querySelector('td:nth-child(3)').appendChild(artistaInput);

    contenedor.querySelector('td:nth-child(4)').textContent = '';
    contenedor.querySelector('td:nth-child(4)').appendChild(tonoInput);

    const guardarBtn = document.createElement('button');
    guardarBtn.classList.add('btn', 'btn-info')  
    guardarBtn.textContent = 'Guardar';
    guardarBtn.addEventListener('click', function () {
        const nuevoTitulo = tituloInput.value;
        const nuevoArtista = artistaInput.value;
        const nuevoTono = tonoInput.value;

        axios.put(`/cancion/${id}`, {
            titulo: nuevoTitulo,
            artista: nuevoArtista,
            tono: nuevoTono
        })
            .then((response) => {
                cargarLista();
            })
            .catch((error) => {
                console.log(error);
            });
    });

    contenedor.querySelector('td:nth-child(5)').textContent = '';
    contenedor.querySelector('td:nth-child(5)').appendChild(guardarBtn);
}