document.querySelector("#login").addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/users/login", opts);
    response = await response.json();

    if (response.error) {
      alert(response.error);
    } else {
      // Guardar tanto el user_id como el role en localStorage
      localStorage.setItem("user_id", response.response.user_id);
      localStorage.setItem("user_role", response.response.role);  // Aquí guardamos el rol
      location.replace("/");  // Redirigir al home
    }
  } catch (error) {
    alert(error.error);
  }
});

  