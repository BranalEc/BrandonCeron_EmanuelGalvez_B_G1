import {
    get,
    update,
    deleteM,
    create,
} from "../JS/peliculasService";

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#peliculasTable tbody");
    const form = document.getElementById("peliculasForm");
    const modal = new bootstrap.Modal(document.getElementById("peliculasModal"));
    const lbModal = document.getElementById("peliculasModalLabel");
    const btnAdd = document.getElementById("btnAdd");

    loadMovies();

    btnAdd.addEventListener("click", () => {
        form.reset();
        form.peliculasId.value = "";
        lbModal.textContent = "Agregar Categoría";
        modal.show();
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = form.peliculasId.value;

        const data = {
            titulo: form.movieTitle.value.trim(),
            director: form.movieDirector.value.trim(),
            genero: form.movieGenre.value.trim(),
            ano: form.movieYear.value.trim(),
            duracion: form.movielenght.value.trim(),
            fecha: form.movieDate.value.trim(),
        };

        try {
            if (id) {
                await update(id, data);
            } else {
                await create(data);
            }
            modal.hide();
            await loadMovies();
        } catch (err) {
            console.error("Error al guardar: ", err);
        }
    });

    async function loadMovies() {
        try {
            const movies = await get();
            tableBody.innerHTML = "";

            if (!movies || movies.length == 0) {
                tableBody.innerHTML =
                    '<td colspan="5">Actualmente no hay registros</td>';
                return;
            }

            movies.forEach((cat) => {
                const tr = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = cat.idMovie;

                const tdTitulo = document.createElement("td");
                tdTitulo.textContent = cat.tituloMovie;
                
                const tdDirector = document.createElement("td");
                tdDirector.textContent = cat.directorMovie;

                const tdGenero = document.createElement("td");
                tdGenero.textContent = cat.generoMovie;

                const tdAno = document.createElement("td");
                tdAno.textContent = cat.anoMovie;

                const tdDuracion = document.createElement("td");
                tdDuracion.textContent = cat.duracionMovie;

                const tdFecha = document.createElement("td");
                tdFecha.textContent = cat.fechaMovie || "";

                const tdBtns = document.createElement("td");
                tdBtns.innerHTML = `
            <button class="btn btn-sm btn-outline-secondary edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-square-pen">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
            </button>
            <button class="btn btn-sm btn-outline-danger delete-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="lucide lucide-trash">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                <path d="M3 6h18"/>
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
          `;

                // Eventos
                tdBtns.querySelector(".edit-btn").addEventListener("click", () => {
                    form.peliculasId.value = cat.idMovie;
                    form.movieTitle.value = cat.tituloMovie;
                    form.movieDirector.value = cat.directorMovie;
                    form.movieGenre.value = cat.generoMovie;
                    form.movieYear.value = cat.anoMovie;
                    form.movielenght.value = cat.duracionMovie;
                    form.movieDate.value = cat.fechaMovie;
                    lbModal.textContent = "Editar Pelicula";
                    modal.show();
                });

                tdBtns.querySelector(".delete-btn").addEventListener("click", async () => {
                    if (confirm("¿Desea eliminar la categoría?")) {
                        await deleteM(cat.idMovie);
                        await loadMovies();
                    }
                });

                tr.appendChild(tdId);
                tr.appendChild(tdTitulo);
                tr.appendChild(tdDirector);
                tr.appendChild(tdGenero);
                tr.appendChild(tdAno);
                tr.appendChild(tdDuracion);
                tr.appendChild(tdFecha);
                tr.appendChild(tdBtns);

                tableBody.appendChild(tr);
            });
        } catch (err) {
            console.error("Error cargando: ", err);
        }
    }
});