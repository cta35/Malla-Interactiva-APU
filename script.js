const state = {
  data: [],
  q: ""
};

async function load() {
  const res = await fetch('data/datos/courses.json');
  state.data = await res.json();
  render();
}

function render() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  const maxSem = Math.max(...state.data.map(c => c.semestre));
  const bySem = Array.from({ length: maxSem }, () => []);

  state.data.forEach(curso => {
    bySem[curso.semestre - 1].push(curso);
  });

  bySem.forEach((lista, i) => {
    const col = document.createElement("div");
    const h = document.createElement("h3");
    h.textContent = `Semestre ${i + 1}`;
    col.appendChild(h);

    lista
      .filter(c => !state.q || c.nombre.toLowerCase().includes(state.q) || c.codigo.toLowerCase().includes(state.q))
      .forEach(curso => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <p class="title">${curso.nombre}</p>
          <p class="meta">${curso.codigo} | ${curso.creditos} créditos</p>
        `;
        card.addEventListener("click", () => showModal(curso));
        col.appendChild(card);
      });

    grid.appendChild(col);
  });
}

function showModal(curso) {
  const m = document.getElementById("modal");
  document.getElementById("m-title").textContent = curso.nombre;
  document.getElementById("m-code").textContent = `Código: ${curso.codigo}`;
  document.getElementById("m-credits").textContent = `Créditos: ${curso.creditos}`;
  document.getElementById("m-area").textContent = `Área: ${curso.area}`;
  document.getElementById("m-desc").textContent = curso.descripcion || "Sin descripción";
  document.getElementById("m-pre").innerHTML = curso.prerrequisitos.length
    ? `<strong>Prerrequisitos:</strong> <ul><li>${curso.prerrequisitos.join("</li><li>")}</li></ul>`
    : "Sin prerrequisitos";

  m.classList.remove("hidden");
  document.getElementById("closeModal").onclick = () => m.classList.add("hidden");
  m.onclick = e => {
    if (e.target.id === "modal") m.classList.add("hidden");
  };
}

document.getElementById("q").addEventListener("input", e => {
  state.q = e.target.value.toLowerCase();
  render();
});

load();
