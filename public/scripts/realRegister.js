const socket = io();

socket.on("products", (data) => {
  const productsTemplate = data
    .map(
      (each) => `<article class="card my-2" style="width: 18rem;">
        ${
          each.photo
            ? `<img src="${each.photo}" class="card-img-top" alt=${each._id} style="height: 18rem; object-fit: cover">`
            : `<img src="https://cdn-icons-png.flaticon.com/512/9402/9402212.png" alt=${each._id} style="height: 18rem; object-fit: cover">`
        }
        <div class="card-body">
            <h5 class="card-title">${each.title}</h5>
            <p class="card-text">USD ${each.price}</p>
            <p class="card-text">Stock: ${each.stock}</p>
            <p class="card-text">Category: ${each.category}</p>
        </div>
        </article>
      `
    )
    .join("");
  document.querySelector("#products").innerHTML = productsTemplate;
});

document.querySelector("#registerProduct").addEventListener("click", async () => {
  const productName = document.querySelector("#productName").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const category = document.querySelector("#category").value;
  const imgProduct = document.querySelector("#imgProduct").value;
  const product = { productName, price, stock, category, imgProduct };
  socket.emit("new product", product);
  document.querySelector("#productName").value = "";
  document.querySelector("#price").value = "";
  document.querySelector("#stock").value = "";
  document.querySelector("#category").value = "";
  document.querySelector("#imgProduct").value = "";
});