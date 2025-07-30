const table = document.getElementById("malla");
const input = document.getElementById("q");

fetch("data/courses.json")
  .then(res => res.json())
  .then(data => {
    const cursos = data.filter(c => c.semestre >= 3 && c.semestre <= 10);

    const años = {
      2: [3, 4],
      3: [5, 6],
      4: [7, 8],
      5: [9, 10]
    };

    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Año / Semestre</th>";
    for (let s = 3; s <= 10; s++) {
      headerRow.innerHTML += `<th>Semestre ${s}</th>`;
    }
    table.appendChild(headerRow);

    Object.entries(años).forEach(([año, semestres]) => {
      const row = document.createElement("tr");
      row.innerHTML = `<th>Año ${año}</th>`;

      for (let s = 3; s <= 10; s++) {
        const celda = document.createElement("td");
        const ramo = cursos.find(c => c.semestre == s && Math.ceil(c.semestre / 2) == año);

        if (ramo) {
          celda.textContent = `${ramo.nombre}\n${ramo.codigo} | ${ramo.creditos} cr`;
          celda.addEventListener("click", () => {
            celda.classList.toggle("tachado");
          });
        } else {
          celda.style.background = "#eee";
          celda.textContent = "-";
        }

        row.appendChild(celda);
      }

      table.appendChild(row);
    });

    input.addEventListener("input", () => {
      const term = input.value.toLowerCase();
      document.querySelectorAll("td").forEach(celda => {
        celda.style.display = celda.textContent.toLowerCase().includes(term) ? "" : "none";
      });
    });
  });
