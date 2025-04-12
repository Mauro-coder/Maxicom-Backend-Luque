const user_id = localStorage.getItem("user_id");
const user_role = localStorage.getItem("user_role");
const selector = document.querySelector("#opts");
const token = localStorage.getItem("token");

const isOnline = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    selector.innerHTML = `
      <a class="btn btn-success py-1 px-2 m-1" href="/registeruser">Register</a>
      <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
    `;
    return;
  }

  try {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = "/api/auth/online";
    let response = await fetch(url, opts);
    response = await response.json();
    console.log("🔍 respuesta del backend:", response);

    if (response.user_id) {
      let adminOption = "";
      if (response.user_role === "admin") {
        adminOption = `<a class="btn btn-success py-1 px-2 m-1" href="/register">Register Product</a>`;
      }

      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/profile/${response.user_id}">Profile</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/cart/${response.user_id}">Cart</a>
        ${adminOption}
        <button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>
      `;

      document.querySelector("#signout").addEventListener("click", async () => {
        try {
          const opts = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          };
          const url = "/api/auth/signout";
          await fetch(url, opts);
          localStorage.removeItem("token");
          location.replace("/");
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      selector.innerHTML = `
        <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
        <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};

isOnline();
