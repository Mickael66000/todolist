let form = document.getElementById("form");
let prenom = document.getElementById("prenom");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (prenom.value == "") {
    alert("Désolé vous devez remplir ce champ");
  } else {
    localStorage.setItem("MonPrenom", prenom.value);
    window.location.href = "tasks.html";
  }
});
