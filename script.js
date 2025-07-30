const q = document.getElementById("q");
const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const mTitle = document.getElementById("m-title");
const mCode = document.getElementById("m-code");
const mCredits = document.getElementById("m-credits");
const mArea = document.getElementById("m-area");
const mDesc = document.getElementById("m-desc");
const mPre = document.getElementById("m-pre");

fetch("data/courses.json")
  .then((res) => res.json())
  .then((data) => {
    const filtered = data.filter(c => c.semestre >= 3 && c.semestre <= 10);
    const years = {};

    filtered.forEach((course) => {
      const year = Math.ceil(course.semestre / 2);
      if (!years[year]) years[year] = {};
      if (!years[year][course.semestre]) years[year][course.semestre] = [];
      years[year][course.semestre].push(course);
    });

    Object.keys(years).sort().forEach((year) => {
      const yearDiv = document.createElement("div");
      yearDiv.className = "year";
      yearDiv.innerHTML = `<h2>Año ${year}</h2>`;
      
      Object.keys(years[year]).sort().forEach((semester) => {
        const semesterDiv = document.createElement("div");
        semesterDiv.className = "semester";
        semesterDiv.innerHTML = `<h3>Semestre ${semester % 2 === 1 ? 1 : 2}</h3>`;
        
        years[year][semester].forEach((course) => {
          const courseDiv = document.createElement("div");
          courseDiv.className = "course";
          courseDiv.textContent = `${course.nombre}\n${course.codigo} | ${course.creditos} créditos`;
          courseDiv.style.backgroundColor = course.color || "#4B4B4B";

          courseDiv.addEventListener("click", () => {
  courseDiv.classList.toggle("tachado");
});

          semesterDiv.appendChild(courseDiv);
        });

        yearDiv.appendChild(semesterDiv);
      });

      grid.appendChild(yearDiv);
    });

    q.addEventListener("input", () => {
      const value = q.value.toLowerCase();
      document.querySelectorAll(".course").forEach((course) => {
        course.style.display = course.textContent.toLowerCase().includes(value) ? "block" : "none";
      });
    });

    // ✅ Cerrar modal al hacer clic afuera del contenido
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  });
