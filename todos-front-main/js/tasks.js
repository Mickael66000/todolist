let app = document.getElementById("app");
let taskForm = document.getElementById("taskForm");
let taskInput = document.getElementById("taskInput");
let deletedTasks = [];

// Élément pour afficher le message de confirmation ou d'erreur
let confirmationMessage = document.createElement("div");
confirmationMessage.id = "confirmation-message";
confirmationMessage.style.marginTop = "10px";
confirmationMessage.style.display = "none"; // Masquer par défaut
confirmationMessage.style.padding = "10px";
confirmationMessage.style.borderRadius = "5px";
confirmationMessage.style.backgroundColor = "#f8f9fa";
confirmationMessage.style.border = "1px solid #ced4da";
confirmationMessage.style.color = "black";

app.parentNode.insertBefore(confirmationMessage, app.nextSibling);

// Fonction pour afficher les messages de confirmation ou d'erreur
function showMessage(text, isError = false) {
  confirmationMessage.textContent = text;
  confirmationMessage.style.color = isError ? "red" : "green"; // Rouge pour l'erreur, vert pour la confirmation
  confirmationMessage.style.display = "block";
  confirmationMessage.style.opacity = "1"; // Rendre visible
  setTimeout(() => {
    confirmationMessage.style.opacity = "0"; // Rendre invisible
    setTimeout(() => {
      confirmationMessage.style.display = "none"; // Masquer complètement après la transition
    }, 500);
  }, 3000);
}

// Fonction pour ajouter une tâche au DOM
function addTaskToDOM(task) {
  let taskContainer = document.createElement("div");
  taskContainer.className = "task";
  taskContainer.style.marginBottom = "15px";
  taskContainer.style.padding = "15px";
  taskContainer.style.borderRadius = "5px";
  taskContainer.style.border = "1px solid #ced4da";
  taskContainer.style.backgroundColor = "#f8f9fa";
  taskContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";

  let p = document.createElement("p");
  p.textContent = task.text;

  // Appliquer le style si la tâche est terminée
  if (task.completed) {
    taskContainer.classList.add("completed");
    p.style.color = "#6c757d"; // Change la couleur du texte en gris clair pour les tâches terminées, sans barre
  }

  // Conteneur de boutons avec flexbox
  let buttonContainer = document.createElement("div");
  buttonContainer.style.marginTop = "10px"; // Espace avant les boutons
  buttonContainer.style.display = "flex"; // Utilisation de flexbox
  buttonContainer.style.gap = "5px"; // Espace de 10px entre chaque bouton
  buttonContainer.style.alignItems = "center"; // Centrer verticalement les boutons

  let completeButton = document.createElement("button");
  completeButton.textContent = task.completed ? "Terminé ✔️" : "Terminer";
  completeButton.classList.add("btn", "btn-success");

  // Ajouter une transition d'opacité
  completeButton.style.transition = "opacity 0.3s ease";

  // Appliquer l'effet d'opacité au bouton si la tâche est terminée
  if (task.completed) {
    completeButton.style.opacity = "0.6"; // Réduire l'opacité pour une tâche terminée
  } else {
    completeButton.style.opacity = "1"; // Opacité normale pour une tâche non terminée
  }

  completeButton.addEventListener("click", () => {
    // Inverser l'état de la tâche entre terminée et non terminée
    task.completed = !task.completed;

    // Mise à jour du texte du bouton et de son état
    completeButton.textContent = task.completed ? "Terminé ✔️" : "Terminer";

    // Appliquer l'effet d'opacité en fonction de l'état de la tâche
    if (task.completed) {
      completeButton.style.opacity = "0.6"; // Réduire l'opacité pour une tâche terminée
    } else {
      completeButton.style.opacity = "1"; // Rétablir l'opacité normale pour une tâche non terminée
    }

    // Sauvegarde de l'état dans le localStorage
    localStorage.setItem(`task-${task.id}`, JSON.stringify(task));

    // Afficher un message de confirmation
    const message = task.completed
      ? `La tâche "${task.text}" a été marquée comme terminée.`
      : `La tâche "${task.text}" a été réinitialisée à non terminée.`;

    showMessage(message); // Afficher le message de confirmation à l'utilisateur
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Supprimer";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.addEventListener("click", () => {
    deletedTasks.push(task);
    localStorage.removeItem(`task-${task.id}`);
    app.removeChild(taskContainer);
    showMessage(`La tâche "${task.text}" a été supprimée.`);
  });

  let detailsButton = document.createElement("button");
  detailsButton.textContent = "Détails";
  detailsButton.classList.add("btn", "btn-info");
  detailsButton.addEventListener("click", () => {
    // Redirige vers la page de détails en ajoutant l'ID de la tâche dans l'URL
    window.location.href = "detail.html?id=" + task.id;
  });

  // Ajouter les boutons au conteneur
  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);
  buttonContainer.appendChild(detailsButton);

  // Ajouter le conteneur des boutons à la tâche
  taskContainer.appendChild(p);
  taskContainer.appendChild(buttonContainer);

  app.appendChild(taskContainer);
}

// Gestion de l'ajout de nouvelles tâches
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let newTaskText = taskInput.value;

  // Validation des données
  if (newTaskText.trim() === "") {
    showMessage("Le texte de la tâche ne peut pas être vide.", true);
    return;
  }

  const newTask = {
    text: newTaskText,
    id: Date.now(),
    created_at: new Date(),
    completed: false,
  };

  addTaskToDOM(newTask);
  localStorage.setItem(`task-${newTask.id}`, JSON.stringify(newTask));
  taskInput.value = "";
  showMessage(`La tâche "${newTask.text}" a été ajoutée.`);
});

// Charger les tâches depuis le localStorage
Object.keys(localStorage).forEach((key) => {
  if (key.startsWith("task-")) {
    let task = JSON.parse(localStorage.getItem(key));
    addTaskToDOM(task);
  }
});

// Conteneur pour les boutons en bas de la page
let bottomButtonContainer = document.createElement("div");
bottomButtonContainer.id = "bottomButtonContainer"; // Ajout de l'ID pour le style CSS
app.appendChild(bottomButtonContainer);

// Bouton pour accéder aux statistiques
let statButton = document.createElement("button");
statButton.textContent = "Statistiques";
statButton.id = "statButton"; // Ajout de l'ID pour le style CSS
statButton.classList.add("btn");
statButton.addEventListener("click", () => {
  window.location.href = "stat.html";
});
bottomButtonContainer.appendChild(statButton);

// Bouton pour restaurer les tâches supprimées
let restoreButton = document.createElement("button");
restoreButton.textContent = "Restaurer les tâches supprimées";
restoreButton.id = "restoreButton"; // Ajout de l'ID pour le style CSS
restoreButton.classList.add("btn");
restoreButton.addEventListener("click", () => {
  if (deletedTasks.length === 0) {
    showMessage("Aucune tâche à restaurer.", true);
    return;
  }
  deletedTasks.forEach((task) => {
    addTaskToDOM(task);
    localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
  });
  deletedTasks = [];
  showMessage("Les tâches supprimées ont été restaurées.");
});
bottomButtonContainer.appendChild(restoreButton);

// Bouton Statistiques
statButton.style.padding = "12px 30px"; // Augmenter l'espacement pour un bouton plus grand
statButton.style.borderRadius = "50px"; // Coins arrondis plus prononcés
statButton.style.fontSize = "16px"; // Taille de police plus grande pour un bouton plus visible
statButton.style.fontFamily = "'Helvetica Neue', sans-serif"; // Police moderne
statButton.style.fontWeight = "600"; // Poids de la police modéré
statButton.style.backgroundColor = "#007bff"; // Bleu plus vif
statButton.style.color = "#fff"; // Texte en blanc pour un bon contraste
statButton.style.cursor = "pointer"; // Curseur pointer
statButton.style.transition = "all 0.3s ease"; // Transition fluide
statButton.style.border = "none"; // Pas de bordure
statButton.style.boxShadow = "0 4px 10px rgba(0, 123, 255, 0.3)"; // Ombre subtile mais moderne
statButton.style.textTransform = "none"; // Pas de majuscule
statButton.style.letterSpacing = "0"; // Pas d'espacement des lettres

// Effet de survol pour le bouton Statistiques
statButton.addEventListener("mouseover", () => {
  statButton.style.backgroundColor = "#0056b3"; // Bleu foncé au survol
  statButton.style.transform = "scale(1.1)"; // Légère augmentation au survol
});

statButton.addEventListener("mouseout", () => {
  statButton.style.backgroundColor = "#007bff"; // Retour au bleu d'origine
  statButton.style.transform = "scale(1)"; // Retour à la taille normale
});

// Bouton Restaurer les tâches
restoreButton.style.padding = "12px 30px"; // Bouton
restoreButton.style.borderRadius = "50px"; // Coins arrondis
restoreButton.style.fontSize = "16px"; // Taille de police
restoreButton.style.fontFamily = "'Helvetica Neue', sans-serif"; // Police moderne sans-serif
restoreButton.style.fontWeight = "600"; // Poids modéré de la police
restoreButton.style.backgroundColor = "#28a745"; // Vert vif
restoreButton.style.color = "#fff"; // Texte en blanc pour contraste
restoreButton.style.cursor = "pointer"; // Curseur pointer
restoreButton.style.transition = "all 0.3s ease"; // Transition fluide
restoreButton.style.border = "none"; // Pas de bordure
restoreButton.style.boxShadow = "0 4px 10px rgba(40, 167, 69, 0.3)"; // Ombre subtile et moderne
restoreButton.style.textTransform = "none"; // Pas de majuscule
restoreButton.style.letterSpacing = "0"; // Pas d'espacement supplémentaire

// Effet de survol pour le bouton Restaurer les tâches
restoreButton.addEventListener("mouseover", () => {
  restoreButton.style.backgroundColor = "#218838"; // Vert foncé au survol
  restoreButton.style.transform = "scale(1.1)"; // Légère augmentation au survol
});

restoreButton.addEventListener("mouseout", () => {
  restoreButton.style.backgroundColor = "#28a745"; // Retour au vert d'origine
  restoreButton.style.transform = "scale(1)"; // Retour à la taille normale
});
