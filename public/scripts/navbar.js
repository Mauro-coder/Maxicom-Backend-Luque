const user_id = localStorage.getItem("user_id");
const user_role = localStorage.getItem("user_role"); // Obtener el rol del localStorage
const selector = document.querySelector("#opts");

if (user_id) {
  // Si el usuario tiene el rol 'admin', agrega la opción de registrar productos
  let additionalOptions = '';
  if (user_role === 'admin') {
    additionalOptions = `
      <a class="btn btn-success py-1 px-2 m-1" href="/register">Register Product</a>
    `;
  }

  selector.innerHTML = `
    <a class="btn btn-success py-1 px-2 m-1" href="/profile/${user_id}">Profile</a>
    <a class="btn btn-success py-1 px-2 m-1" href="/cart/${user_id}">Cart</a>
    ${additionalOptions}
    <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
  `;

  document.querySelector("#signout").addEventListener("click", () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role"); // Eliminar el rol al cerrar sesión
    location.replace("/");
  });
} else {
  selector.innerHTML = `
    <a class="btn btn-success py-1 px-2 m-1" href="/registeruser">Register</a>
    <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
  `;
}
