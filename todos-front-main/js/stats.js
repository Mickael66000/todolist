let statsContainer = document.getElementById("app");
let totalTasks = 0;
let completedTasks = 0;
let pendingTasks = 0;

// Fonction pour créer un élément avec des styles
function createStyledElement(tag, content, styles = {}) {
  const element = document.createElement(tag);
  element.textContent = content;

  for (const [key, value] of Object.entries(styles)) {
    element.style[key] = value;
  }

  return element;
}

// Fonction pour mettre à jour les statistiques
function updateStats() {
  console.log("Vérification des données dans localStorage...");

  const tasks = Object.keys(localStorage).filter((key) =>
    key.startsWith("task-")
  );

  console.log("Clés dans localStorage :", tasks); // Affiche les clés dans localStorage

  if (tasks.length === 0) {
    console.log("Aucune tâche trouvée !");
    return;
  }

  totalTasks = tasks.length;
  completedTasks = 0;
  pendingTasks = 0;

  tasks.forEach((taskKey) => {
    const task = JSON.parse(localStorage.getItem(taskKey));

    if (!task) {
      console.error("Tâche invalide ou mal formatée pour la clé :", taskKey);
      return;
    }

    console.log("Tâche récupérée :", task); // Affiche les détails de la tâche récupérée

    if (task.completed) {
      completedTasks++;
    } else {
      pendingTasks++;
    }
  });

  console.log("Total des tâches :", totalTasks);
  console.log("Tâches terminées :", completedTasks);
  console.log("Tâches restantes :", pendingTasks);

  // Titre des statistiques
  const title = createStyledElement("h2", "Statistiques des tâches", {
    textAlign: "center",
    marginBottom: "30px",
    color: "#343a40",
    fontSize: "36px",
    fontWeight: "700",
    textTransform: "uppercase",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
  });
  statsContainer.appendChild(title);

  // Créer un conteneur pour les statistiques
  const statsWrapper = createStyledElement("div", "", {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    animation: "fadeIn 0.5s ease-in-out",
  });
  statsContainer.appendChild(statsWrapper);

  // Créer les éléments de statistiques
  const statsItems = [
    { title: "Tâches totales", value: totalTasks },
    { title: "Tâches terminées", value: completedTasks },
    { title: "Tâches restantes", value: pendingTasks },
  ];

  statsItems.forEach(({ title, value }) => {
    const statItem = createStyledElement("div", "", {
      padding: "30px",
      border: "2px solid #007bff",
      borderRadius: "15px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 20px rgba(0, 123, 255, 0.2)",
      textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
      fontSize: "24px",
      fontWeight: "600",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    });

    // Effet au survol
    statItem.addEventListener("mouseover", () => {
      statItem.style.transform = "scale(1.05)";
      statItem.style.boxShadow = "0 10px 30px rgba(0, 123, 255, 0.4)";
      statItem.style.backgroundColor = "#e9ecef";
    });

    statItem.addEventListener("mouseout", () => {
      statItem.style.transform = "scale(1)";
      statItem.style.boxShadow = "0 4px 20px rgba(0, 123, 255, 0.2)";
      statItem.style.backgroundColor = "#fff";
    });

    const statTitle = createStyledElement("h3", title, {
      color: "#495057",
      margin: "0 0 10px 0",
      fontSize: "20px",
      textTransform: "uppercase",
    });
    const statValue = createStyledElement("span", value, {
      color: "#007bff",
      fontSize: "36px",
      fontWeight: "700",
    });

    statItem.appendChild(statTitle);
    statItem.appendChild(statValue);
    statsWrapper.appendChild(statItem);
  });

  // Ajouter une barre de progression pour les tâches terminées
  const progressContainer = createStyledElement("div", "", {
    marginTop: "20px",
    textAlign: "center",
  });

  const progressBar = createStyledElement("div", "", {
    backgroundColor: "#007bff",
    height: "20px",
    borderRadius: "10px",
    width: `${(completedTasks / totalTasks) * 100 || 0}%`,
    transition: "width 0.5s",
  });

  const progressLabel = createStyledElement(
    "span",
    `Progression : ${((completedTasks / totalTasks) * 100 || 0).toFixed(0)}%`,
    {
      marginTop: "10px",
      display: "block",
      color: "#495057",
    }
  );

  progressContainer.appendChild(progressBar);
  progressContainer.appendChild(progressLabel);
  statsContainer.appendChild(progressContainer);
}

// Appeler la fonction pour mettre à jour les statistiques
updateStats();

// Styles pour l'animation fadeIn
const style = document.createElement("style");
style.innerHTML = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
