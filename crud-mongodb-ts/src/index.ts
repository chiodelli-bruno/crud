import { connectDB } from './database';
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
} from './crud';

const main = async () => {
  await connectDB();
  const nuevo = {
    nombre: 'Café en grano',
    precio: 1200,
    stock: 50,
    categoria: 'Bebidas',
  };
  await crearProducto(nuevo);
  await obtenerProductos();
};

main();
