fetch('data/courses.json')
  .then(response => response.json())
  .then(data => {
    const grid = document.getElementById('grid');
    const searchInput = document.getElementById('q');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');

    const years = {};

    data.forEach(course => {
      const year = Math.ceil(course.semestre / 2);
      if (!years[year]) years[year] = {};
      const sem = course.semestre;
      if (!years[year][sem]) years[year][sem] = [];
      years[year][sem].push(course);
    });

    for (const [year, sems] of Object.entries(years)) {
      const yearTitle = document.createElement('h2');
      yearTitle.className = 'year-title';
      yearTitle.textContent = `Año ${year}`;
      grid.appendChild(yearTitle);

      for (const [sem, courses] of Object.entries(sems)) {
        const semTitle = document.createElement('h3');
        semTitle.className = 'semester-title';
        semTitle.textContent = `Semestre ${sem}`;
        grid.appendChild(semTitle);

        courses.forEach(course => {
          const div = document.createElement('div');
          div.className = 'course';
          div.textContent = `${course.nombre}\n${course.codigo} | ${course.creditos} créditos`;
          div.addEventListener('click', () => {
            document.getElementById('m-title').textContent = course.nombre;
            document.getElementById('m-code').textContent = `Código: ${course.codigo}`;
            document.getElementById('m-credits').textContent = `Créditos: ${course.creditos}`;
            document.getElementById('m-area').textContent = `Área: ${course.area}`;
            document.getElementById('m-desc').textContent = course.descripcion || 'Sin descripción.';
            document.getElementById('m-pre').textContent = course.prerrequisitos?.length
              ? `Prerrequisitos: ${course.prerrequisitos.join(', ')}`
              : 'Sin prerrequisitos.';
            modal.classList.remove('hidden');
          });
          grid.appendChild(div);
        });
      }
    }

    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    searchInput.addEventListener('input', () => {
      const value = searchInput.value.toLowerCase();
      document.querySelectorAll('.course').forEach(course => {
        course.style.display = course.textContent.toLowerCase().includes(value) ? 'block' : 'none';
      });
    });
  });
