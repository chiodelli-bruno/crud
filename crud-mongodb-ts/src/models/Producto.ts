import { Schema, model } from 'mongoose';

interface IProducto {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

const productoSchema = new Schema<IProducto>({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoria: { type: String, required: true },
});

export const Producto = model<IProducto>('Producto', productoSchema);
