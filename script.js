fetch('courses.json')
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('malla');
    const totalSemestres = 10;
    const años = 5;

    // Crear encabezado horizontal
    const header = tabla.insertRow();
    header.insertCell().innerHTML = "<strong>Año / Semestre</strong>";
    for (let s = 1; s <= totalSemestres; s++) {
      const th = document.createElement('th');
      th.innerText = `Semestre ${s}`;
      header.appendChild(th);
    }

    // Crear filas por año
    for (let año = 1; año <= años; año++) {
      const fila = tabla.insertRow();
      const th = document.createElement('th');
      th.innerText = `Año ${año}`;
      fila.appendChild(th);

      for (let s = 1; s <= totalSemestres; s++) {
        fila.insertCell(); // celdas vacías que se llenarán después
      }
    }

    // Insertar cursos en la celda correcta
    data.forEach(curso => {
      const semestre = curso.semestre;
      const año = Math.ceil(semestre / 2);
      const fila = tabla.rows[año];
      const celda = fila.cells[semestre];

      const div = document.createElement('div');
      div.className = 'ramo';
      div.innerHTML = `<strong>${curso.nombre}</strong><br>${curso.codigo} | ${curso.creditos} cr`;
      div.addEventListener('click', () => {
        div.classList.toggle('tachado');
      });

      celda.appendChild(div);
    });

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
