fetch('data/datos/courses.json')
  .then(res => res.json())
  .then(data => renderGrid(data));

function renderGrid(courses) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  const years = groupBy(courses, 'año');
  for (const year of Object.keys(years).sort()) {
    const yearDiv = document.createElement('div');
    yearDiv.className = 'year';
    yearDiv.innerHTML = `<h2>Año ${year}</h2>`;
    
    const semestres = groupBy(years[year], 'semestre');
    for (const semestre of Object.keys(semestres).sort()) {
      const semDiv = document.createElement('div');
      semDiv.className = 'semester';
      semDiv.innerHTML = `<h3>Semestre ${semestre}</h3>`;

      semestres[semestre].forEach(curso => {
        const div = document.createElement('div');
        div.className = 'course';
        div.textContent = `${curso.nombre}\n${curso.codigo} | ${curso.creditos} créditos`;
        div.onclick = () => div.classList.toggle('taken');
        semDiv.appendChild(div);
      });

      yearDiv.appendChild(semDiv);
    }

    grid.appendChild(yearDiv);
  }
}

function groupBy(array, key) {
  return array.reduce((acc, obj) => {
    const k = obj[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(obj);
    return acc;
  }, {});
}
