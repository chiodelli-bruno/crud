// Definición de la interfaz para el producto
export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  createdAt: Date
  updatedAt: Date
}

// Clase para manejar productos (simulando Mongoose)
export class ProductModel {
  private static products: IProduct[] = []

  // Generar un ID único simple
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
  }

  // Crear un nuevo producto
  static create(productData: Omit<IProduct, "id" | "createdAt" | "updatedAt">): IProduct {
    const now = new Date()
    const newProduct: IProduct = {
      id: this.generateId(),
      ...productData,
      createdAt: now,
      updatedAt: now,
    }

    this.products.push(newProduct)
    return newProduct
  }

  // Obtener todos los productos
  static findAll(): IProduct[] {
    return [...this.products]
  }

  // Obtener un producto por ID
  static findById(id: string): IProduct | null {
    const product = this.products.find((p) => p.id === id)
    return product || null
  }

  // Actualizar un producto
  static findByIdAndUpdate(id: string, productData: Partial<IProduct>): IProduct | null {
    const index = this.products.findIndex((p) => p.id === id)

    if (index === -1) {
      return null
    }

    const updatedProduct: IProduct = {
      ...this.products[index],
      ...productData,
      id: this.products[index].id, // Aseguramos que el ID no cambie
      updatedAt: new Date(),
    }

    this.products[index] = updatedProduct
    return updatedProduct
  }

  // Eliminar un producto
  static findByIdAndDelete(id: string): IProduct | null {
    const index = this.products.findIndex((p) => p.id === id)

    if (index === -1) {
      return null
    }

    const deletedProduct = this.products[index]
    this.products.splice(index, 1)
    return deletedProduct
  }
}

// Exportar el modelo para usarlo como si fuera un modelo de Mongoose
export default ProductModel
