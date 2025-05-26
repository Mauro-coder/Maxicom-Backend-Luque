export default function Card({ each }) {
  return (
    <article className="bg-cyan-100 p-4 m-5 rounded-md w-[300px] h-auto min-h-[400px] flex flex-col items-center justify-between overflow-hidden">
      <h3 className="text-xl font-bold mb-2">{each.title}</h3>
      <div className="w-full h-48 mb-2">
        <img
          src={each.image}
          alt={each.title}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-full space-y-1">
        <p className="font-semibold">Precio: ${each.price}</p>
        <p>Stock: {each.stock}</p>
        <p className="text-sm line-clamp-2">{each.description}</p>
        <p className="text-sm">Código: {each.code}</p>
        <p className="text-sm">Categoría: {each.category}</p>
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        Más Información
      </button>
    </article>
  );
}
