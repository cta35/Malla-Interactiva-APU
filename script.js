const SEMESTRES_POR_AÑO = 2;
const SEMESTRES_TOTAL = 10;

fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('malla');
    const años = Math.ceil(SEMESTRES_TOTAL / SEMESTRES_POR_AÑO);
    const cursosPorSemestre = {};

    // Agrupar cursos por semestre
    data.forEach(curso => {
      if (!cursosPorSemestre[curso.semestre]) {
        cursosPorSemestre[curso.semestre] = [];
      }
      cursosPorSemestre[curso.semestre].push(curso);
    });

    // Crear encabezado con semestres
    const header = tabla.insertRow();
    header.insertCell(); // celda vacía en esquina superior izquierda
    for (let s = 1; s <= SEMESTRES_TOTAL; s++) {
      const th = document.createElement('th');
      th.innerText = `Sem ${s}`;
      header.appendChild(th);
    }

    // Crear filas por año
    for (let año = 1; año <= años; año++) {
      const fila = tabla.insertRow();
      const th = document.createElement('th');
      th.innerText = `${año}° Año`;
      fila.appendChild(th);

      for (let s = 1; s <= SEMESTRES_TOTAL; s++) {
        const celda = fila.insertCell();
        celda.dataset.semestre = s;
        if (s >= (año - 1) * SEMESTRES_POR_AÑO + 1 && s <= año * SEMESTRES_POR_AÑO) {
          const cursos = cursosPorSemestre[s] || [];
          cursos.forEach(curso => {
            const div = document.createElement('div');
            div.innerHTML = `<strong>${curso.codigo}</strong><br>${curso.nombre}`;
            div.classList.add('ramo');
            div.style.marginBottom = '10px';
            div.style.color = curso.color || '#4B4B4B';
            div.addEventListener('click', () => {
              div.classList.toggle('tachado');
            });
            celda.appendChild(div);
          });
        }
      }
    }

    // Buscador
    const buscador = document.getElementById('q');
    buscador.addEventListener('input', function () {
      const texto = this.value.toLowerCase();
      document.querySelectorAll('.ramo').forEach(div => {
        const visible = div.innerText.toLowerCase().includes(texto);
        div.style.display = visible ? 'block' : 'none';
      });
    });
  })
  .catch(error => {
    console.error('Error cargando el archivo JSON:', error);
  });
