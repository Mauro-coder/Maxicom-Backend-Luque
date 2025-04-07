document.querySelector("#register").addEventListener("click", async () => {
  try {
    const data = {
      name: document.querySelector("#name").value,
      avatar: document.querySelector("#avatar").value,
      date: document.querySelector("#date").value,
      age: document.querySelector("#age").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const url = "/api/auth/register"
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (response.error) {
      alert(response.error);
    } else {
      location.replace("/login");
    }
  } catch (error) {
    //Cambiar el alert por un sweetalert
    alert(error.error);
  }
});
