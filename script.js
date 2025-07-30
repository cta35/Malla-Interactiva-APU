const contenedor = document.getElementById("contenedor-anios");
const buscador = document.getElementById("q");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

let cursos = [];

fetch("data/datos/courses.json")
  .then(response => response.json())
  .then(data => {
    cursos = data;
    mostrarCursos(cursos);
  });

function mostrarCursos(cursos) {
  contenedor.innerHTML = "";

  const agrupados = {};

  cursos.forEach(curso => {
    const key = `${curso.anio || Math.ceil(curso.semestre / 2)}-${curso.semestre}`;
    if (!agrupados[key]) agrupados[key] = [];
    agrupados[key].push(curso);
  });

  for (let anio = 2; anio <= 5; anio++) {
    const seccionAnio = document.createElement("div");
    seccionAnio.className = "anio";
    const titulo = document.createElement("h2");
    titulo.textContent = `Año ${anio}`;
    seccionAnio.appendChild(titulo);

    for (let semestre = 1; semestre <= 2; semestre++) {
      const key = `${anio}-${(anio - 1) * 2 + semestre}`;
      const cursosSemestre = agrupados[key];
      if (!cursosSemestre) continue;

      const semestreDiv = document.createElement("div");
      semestreDiv.className = "semestre";
      const subtitulo = document.createElement("h3");
      subtitulo.textContent = `Semestre ${semestre}`;
      semestreDiv.appendChild(subtitulo);

      const grid = document.createElement("div");
      grid.className = "grid";

      cursosSemestre.forEach(curso => {
        const div = document.createElement("div");
        div.className = "curso";
        div.style.backgroundColor = curso.color || "#4B4B4B";
        div.innerHTML = `
          <strong>${curso.nombre}</strong><br>
          ${curso.codigo} | ${curso.creditos} créditos
        `;
        div.addEventListener("click", () => {
          div.classList.toggle("tachado");
        });
        div.addEventListener("dblclick", () => mostrarModal(curso));
        grid.appendChild(div);
      });

      semestreDiv.appendChild(grid);
      seccionAnio.appendChild(semestreDiv);
    }

    contenedor.appendChild(seccionAnio);
  }
}

function mostrarModal(curso) {
  document.getElementById("m-title").textContent = curso.nombre;
  document.getElementById("m-code").textContent = `Código: ${curso.codigo}`;
  document.getElementById("m-credits").textContent = `Créditos: ${curso.creditos}`;
  document.getElementById("m-area").textContent = `Área: ${curso.area || "—"}`;
  document.getElementById("m-desc").textContent = `Descripción: ${curso.descripcion || "—"}`;
  document.getElementById("m-pre").textContent = curso.prerrequisitos?.length
    ? `Prerrequisitos: ${curso.prerrequisitos.join(", ")}`
    : "Prerrequisitos: Ninguno";
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtrados = cursos.filter(c =>
    c.nombre.toLowerCase().includes(texto) || c.codigo.toLowerCase().includes(texto)
  );
  mostrarCursos(filtrados);
});
