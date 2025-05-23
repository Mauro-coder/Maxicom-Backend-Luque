// const socket = io();

// socket.on("products", (data) => {
//   const productsTemplate = data
//     .map(
//       (each) => `<article class="card my-2" style="width: 18rem;">
//         ${
//           each.photo
//             ? `<img src="${each.photo}" class="card-img-top" alt=${each._id} style="height: 18rem; object-fit: cover">`
//             : `<img src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png" alt=${each._id} style="height: 18rem; object-fit: cover">`
//         }
//         <div class="card-body">
//             <h5 class="card-title">${each.title}</h5>
//             <p class="card-text">USD ${each.price}</p>
//             <p class="card-text">Stock: ${each.stock}</p>
//             <p class="card-text">Category: ${each.category}</p>
//         </div>
//         </article>
//       `
//     )
//     .join("");
//   document.querySelector("#products").innerHTML = productsTemplate;
// });

// document.querySelector("#registerProduct").addEventListener("click", async () => {
//   const title = document.querySelector("#title").value;
//   const price = document.querySelector("#price").value;
//   const stock = document.querySelector("#stock").value;
//   const category = document.querySelector("#category").value;
//   const photo = document.querySelector("#photo").value;
//   const product = { title, price, stock, category, photo };
//   socket.emit("new product", product);
//   document.querySelector("#title").value = "";
//   document.querySelector("#price").value = "";
//   document.querySelector("#stock").value = "";
//   document.querySelector("#category").value = "";
//   document.querySelector("#photo").value = "";
// });

document.querySelector("#registerProduct").addEventListener("click", async () => {
  const title = document.querySelector("#title").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const category = document.querySelector("#category").value;
  const image = document.querySelector("#image").value;


  if (!title || !price || !stock || !category) {
    alert('Please fill in all fields');
    return;
  }

  const product = { title, price, stock, category, image };


  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Product registered successfully!');
      document.querySelector("#title").value = "";
      document.querySelector("#price").value = "";
      document.querySelector("#stock").value = "";
      document.querySelector("#category").value = "";
      document.querySelector("#image").value = "";
    } else {
      alert(data.message || 'Error registering product');
    }
  } catch (error) {
    alert('Error registering product');
    console.error(error);
  }
});
