const greeting = document.querySelector("[data-workout-greeting]");
const firstName = localStorage.getItem("plataformaDeTreinosFirstName");
const navbar = document.querySelector("[data-navbar]");
const toast = document.querySelector("[data-site-toast]");
const toastButtons = document.querySelectorAll("[data-toast-message]");
const downloadButton = document.querySelector("[data-download-workout]");

if (firstName) {
  greeting.textContent = `Olá ${firstName}!`;
}

const updateNavbarState = () => {
  navbar.classList.toggle("is-scrolled", window.scrollY > 28);
};

updateNavbarState();
window.addEventListener("scroll", updateNavbarState, { passive: true });

let toastTimer;

const showToast = (message) => {
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 2200);
};

toastButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showToast(button.dataset.toastMessage);
  });
});

downloadButton.addEventListener("click", () => {
  const workoutText = [
    `${firstName ? `Olá ${firstName}!` : "Olá!"}`,
    "Treino de Hoje",
    "",
    "Foco: Peito + Tríceps + Abdômen",
    "Duração: ~60 minutos",
    "",
    "Aquecimento (5-10 min)",
    "- 5 min de esteira ou bicicleta",
    "- 2 séries leves de supino",
    "",
    "Peito",
    "- Supino reto com barra - 4x8-12",
    "- Supino inclinado com halteres - 3x10-12",
    "- Crucifixo máquina ou halteres - 3x12-15",
    "",
    "Tríceps",
    "- Tríceps na polia (barra ou corda) - 3x10-12",
    "- Tríceps francês (halter ou barra) - 3x10-12",
    "- Mergulho em banco - 3x até a falha",
    "",
    "Abdômen",
    "- Abdominal supra - 3x15-20",
    "- Elevação de pernas - 3x12-15",
    "- Prancha - 3x30-60s",
    "",
    "Dicas",
    "- Descanso: 60-90s entre séries",
    "- Foco na execução, não só no peso",
    "- Última série de cada exercício: vai mais pesado",
    "- Se conseguir fazer mais de 12 reps fácil, aumenta a carga",
    "",
    "Pós-treino (simples)",
    "- Proteína + carboidrato",
    "- Ex: frango + arroz / ovo + pão / whey + banana",
  ].join("\n");

  const blob = new Blob([workoutText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "plataforma-de-treinos.txt";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Treino baixado com sucesso.");
});
