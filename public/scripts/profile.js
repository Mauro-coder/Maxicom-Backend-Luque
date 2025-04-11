const findProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please login.");
      return window.location.replace("/login");
    }

    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch("/api/auth/profile", opts);
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    const profile = data.response;

    document.querySelector("#name").innerText = `Nombre: ${profile.name}`;
    document.querySelector("#email").innerText = `Email: ${profile.email}`;
    document.querySelector("#avatar").src = profile.avatar;
  } catch (error) {
    console.error("Error loading profile:", error);
    alert("Error fetching profile data");
  }
};

findProfile();
