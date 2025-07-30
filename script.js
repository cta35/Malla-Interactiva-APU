const state = {
  data: [],
  q: ""
};

async function load() {
  const res = await fetch('datos/courses.json');
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
    col.className = "column";
    const h = document.createElement("h3");
    h.textContent = `Semestre ${i + 1}`;
    col.appendChild(h);

    lista.forEach(curso => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <p class="title">${curso.nombre}</p>
        <p class="meta">${curso.codigo} | ${curso.creditos} créditos</p>
      `;
      card.addEventListener("click", () => {
        card.classList.toggle("tachado");
      });
      col.appendChild(card);
    });

    grid.appendChild(col);
  });
}

load();
