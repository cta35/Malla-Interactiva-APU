fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const tabla = document.getElementById('malla-horizontal');
    const totalAnios = 5;

    // Encabezado con Años
    const header = tabla.insertRow();
    header.insertCell().innerHTML = "<strong>Semestre</strong>";
    for (let a = 1; a <= totalAnios; a++) {
      const th = document.createElement('th');
      th.innerText = `Año ${a}`;
      header.appendChild(th);
    }

    // Crear 2 filas por semestre (pares)
    for (let semestre = 1; semestre <= 10; semestre++) {
      const fila = tabla.insertRow();
      const th = document.createElement('th');
      th.innerText = `Semestre ${semestre}`;
      fila.appendChild(th);

      for (let a = 1; a <= totalAnios; a++) {
        const celda = fila.insertCell();
        celda.dataset.semestre = semestre;
        celda.dataset.anio = a;
        celda.classList.add("celda");
      }
    }

    // Insertar cursos
    data.forEach(curso => {
      const fila = [...tabla.rows].find(row => row.cells[0]?.innerText === `Semestre ${curso.semestre}`);
      if (!fila) return;

      const celda = fila.cells[curso.anio];
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
    console.error('Error al cargar el archivo JSON:', error);
  });
