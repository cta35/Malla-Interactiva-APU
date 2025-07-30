const q = document.getElementById("q");
const grid = document.getElementById("grid");

fetch("data/courses.json")
  .then((res) => res.json())
  .then((data) => {
    const filtered = data.filter(c => c.semestre >= 3 && c.semestre <= 10);
    const years = {};

    filtered.forEach((course) => {
      const year = Math.ceil(course.semestre / 2);
      if (!years[year]) years[year] = [];
      years[year].push(course);
    });

    Object.keys(years).sort().forEach((year) => {
      const yearLabel = document.createElement("div");
      yearLabel.className = "year-label";
      yearLabel.textContent = `Año ${year}`;
      grid.appendChild(yearLabel);

      for (let s = 3; s <= 10; s++) {
        const course = years[year].find(c => c.semestre === s);
        const courseDiv = document.createElement("div");
        courseDiv.className = "course";
        if (course) {
          courseDiv.textContent = `${course.nombre}\n${course.codigo} | ${course.creditos} créditos`;
          courseDiv.addEventListener("click", () => {
            courseDiv.classList.toggle("tachado");
          });
        } else {
          courseDiv.style.visibility = "hidden";
        }
        grid.appendChild(courseDiv);
      }
    });

    q.addEventListener("input", () => {
      const value = q.value.toLowerCase();
      document.querySelectorAll(".course").forEach((course) => {
        course.style.display = course.textContent.toLowerCase().includes(value) ? "block" : "none";
      });
    });
  });
