import ProductModel, { type IProduct } from "../models/product"

// Crear un nuevo producto
export const createProduct = async (
  productData: Omit<IProduct, "id" | "createdAt" | "updatedAt">,
): Promise<IProduct> => {
  try {
    return ProductModel.create(productData)
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error}`)
  }
}

// Obtener todos los productos
export const getAllProducts = async (): Promise<IProduct[]> => {
  try {
    return ProductModel.findAll()
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error}`)
  }
}

// Obtener un producto por ID
export const getProductById = async (id: string): Promise<IProduct | null> => {
  try {
    return ProductModel.findById(id)
  } catch (error) {
    throw new Error(`Error al obtener el producto: ${error}`)
  }
}

// Actualizar un producto
export const updateProduct = async (id: string, productData: Partial<IProduct>): Promise<IProduct | null> => {
  try {
    return ProductModel.findByIdAndUpdate(id, productData)
  } catch (error) {
    throw new Error(`Error al actualizar el producto: ${error}`)
  }
}

// Eliminar un producto
export const deleteProduct = async (id: string): Promise<IProduct | null> => {
  try {
    return ProductModel.findByIdAndDelete(id)
  } catch (error) {
    throw new Error(`Error al eliminar el producto: ${error}`)
  }
}
