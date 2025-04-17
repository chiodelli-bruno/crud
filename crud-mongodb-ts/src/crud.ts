import { Producto } from './models/Producto';

// Crear
export const crearProducto = async (data: any) => {
  const producto = new Producto(data);
  await producto.save();
  console.log('🟢 Producto creado:', producto);
};

// Leer todos
export const obtenerProductos = async () => {
  const productos = await Producto.find();
  console.log('📄 Productos:', productos);
};

// Leer por ID
export const obtenerProductoPorId = async (id: string) => {
  const producto = await Producto.findById(id);
  console.log('📄 Producto:', producto);
};

// Actualizar
export const actualizarProducto = async (id: string, data: any) => {
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  console.log('🟡 Producto actualizado:', producto);
};

// Eliminar
export const eliminarProducto = async (id: string) => {
  await Producto.findByIdAndDelete(id);
  console.log('🔴 Producto eliminado');
};
