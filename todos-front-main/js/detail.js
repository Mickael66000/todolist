// Récupérer l'ID de la tâche depuis l'URL
const urlParam = new URLSearchParams(window.location.search);
const id = urlParam.get("id");

let taskDetails = document.getElementById("app");

// Fonction pour afficher les informations de la tâche avec des styles en ligne
function displayTask(task) {
  if (!task) {
    taskDetails.innerHTML =
      "<p style='color: #e3342f; font-weight: bold; text-align: center;'>Tâche introuvable.</p>";
    return;
  }

  let taskContainer = document.createElement("div");
  taskContainer.style.backgroundColor = "#f9f9f9";
  taskContainer.style.borderRadius = "12px";
  taskContainer.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
  taskContainer.style.padding = "20px";
  taskContainer.style.margin = "20px auto";
  taskContainer.style.maxWidth = "600px";
  taskContainer.style.width = "100%";
  taskContainer.style.textAlign = "left";
  taskContainer.style.borderLeft = "5px solid #0056b3";
  taskContainer.style.fontFamily = "'Arial', sans-serif";

  // Titre de la tâche
  let taskName = document.createElement("h2");
  taskName.innerHTML = `📌 ${task.text || "Tâche sans titre"}`;
  taskName.style.fontSize = "1.8em";
  taskName.style.color = "#333";
  taskName.style.marginBottom = "15px";
  taskName.style.fontWeight = "bold";
  taskContainer.appendChild(taskName);

  // Date de création
  let taskDate = document.createElement("p");
  taskDate.innerHTML = `📅 Créée le : ${new Date(
    task.created_at
  ).toLocaleString()}`;
  taskDate.style.fontSize = "1em";
  taskDate.style.color = "#666";
  taskDate.style.marginBottom = "15px";
  taskContainer.appendChild(taskDate);

  // Vérification du statut
  let taskStatus = task.completed ? "Validé" : "Non validé";
  let statusColor = task.completed ? "#28a745" : "#dc3545"; // Vert ou rouge en fonction de l'état

  // Affichage du statut de la tâche
  let status = document.createElement("p");
  status.textContent = `🔖 Statut : ${taskStatus}`;
  status.style.fontSize = "1em";
  status.style.fontWeight = "bold";
  status.style.color = statusColor;
  taskContainer.appendChild(status);

  // Ajouter le conteneur à l'élément principal
  taskDetails.appendChild(taskContainer);
}

// Récupérer la tâche depuis le localStorage
const localTask = JSON.parse(localStorage.getItem(`task-${id}`));
if (localTask) {
  displayTask(localTask);
} else {
  taskDetails.innerHTML =
    "<p style='color: #e3342f; font-weight: bold; text-align: center;'>Tâche non trouvée.</p>";
}
