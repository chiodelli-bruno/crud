import readline from "readline"
import { connectDB, disconnectDB } from "./db"
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./controllers/productController"

// Crear interfaz de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Función para mostrar el menú principal
const showMenu = (): void => {
  console.log("\n===== CRUD de Productos =====")
  console.log("1. Crear un producto")
  console.log("2. Ver todos los productos")
  console.log("3. Ver un producto por ID")
  console.log("4. Actualizar un producto")
  console.log("5. Eliminar un producto")
  console.log("0. Salir")
  console.log("=============================")
  rl.question("Seleccione una opción: ", handleOption)
}

// Función para manejar la opción seleccionada
const handleOption = async (option: string): Promise<void> => {
  switch (option) {
    case "1":
      await createProductPrompt()
      break
    case "2":
      await listAllProducts()
      break
    case "3":
      await getProductByIdPrompt()
      break
    case "4":
      await updateProductPrompt()
      break
    case "5":
      await deleteProductPrompt()
      break
    case "0":
      console.log("¡Hasta luego!")
      await disconnectDB()
      rl.close()
      return
    default:
      console.log("Opción no válida. Intente de nuevo.")
      showMenu()
      return
  }
}

// Función para crear un producto
const createProductPrompt = async (): Promise<void> => {
  console.log("\n--- Crear un nuevo producto ---")

  rl.question("Nombre: ", (name) => {
    rl.question("Descripción: ", (description) => {
      rl.question("Precio: ", (priceStr) => {
        rl.question("Stock: ", (stockStr) => {
          rl.question("Categoría: ", async (category) => {
            try {
              const price = Number.parseFloat(priceStr)
              const stock = Number.parseInt(stockStr)

              if (isNaN(price) || isNaN(stock)) {
                console.log("Error: El precio y el stock deben ser números válidos.")
                showMenu()
                return
              }

              const newProduct = await createProduct({
                name,
                description,
                price,
                stock,
                category,
              })

              console.log("\nProducto creado con éxito:")
              console.log(newProduct)
            } catch (error) {
              console.error("Error al crear el producto:", error)
            }

            showMenu()
          })
        })
      })
    })
  })
}

// Función para listar todos los productos
const listAllProducts = async (): Promise<void> => {
  try {
    const products = await getAllProducts()

    console.log("\n--- Lista de productos ---")
    if (products.length === 0) {
      console.log("No hay productos registrados.")
    } else {
      products.forEach((product) => {
        console.log(`ID: ${product.id}`)
        console.log(`Nombre: ${product.name}`)
        console.log(`Precio: ${product.price}`)
        console.log(`Stock: ${product.stock}`)
        console.log(`Categoría: ${product.category}`)
        console.log("-------------------------")
      })
    }
  } catch (error) {
    console.error("Error al listar los productos:", error)
  }

  showMenu()
}

// Función para obtener un producto por ID
const getProductByIdPrompt = async (): Promise<void> => {
  rl.question("\nIngrese el ID del producto: ", async (id) => {
    try {
      const product = await getProductById(id)

      if (!product) {
        console.log("Producto no encontrado.")
      } else {
        console.log("\n--- Detalles del producto ---")
        console.log(`ID: ${product.id}`)
        console.log(`Nombre: ${product.name}`)
        console.log(`Descripción: ${product.description}`)
        console.log(`Precio: ${product.price}`)
        console.log(`Stock: ${product.stock}`)
        console.log(`Categoría: ${product.category}`)
        console.log(`Creado: ${product.createdAt}`)
        console.log(`Actualizado: ${product.updatedAt}`)
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error)
    }

    showMenu()
  })
}

// Función para actualizar un producto
const updateProductPrompt = async (): Promise<void> => {
  rl.question("\nIngrese el ID del producto a actualizar: ", async (id) => {
    try {
      const product = await getProductById(id)

      if (!product) {
        console.log("Producto no encontrado.")
        showMenu()
        return
      }

      console.log("\n--- Actualizar producto ---")
      console.log("(Deje en blanco para mantener el valor actual)")

      rl.question(`Nombre (${product.name}): `, (name) => {
        rl.question(`Descripción (${product.description}): `, (description) => {
          rl.question(`Precio (${product.price}): `, (priceStr) => {
            rl.question(`Stock (${product.stock}): `, (stockStr) => {
              rl.question(`Categoría (${product.category}): `, async (category) => {
                try {
                  const updateData: any = {}

                  if (name) updateData.name = name
                  if (description) updateData.description = description
                  if (priceStr) {
                    const price = Number.parseFloat(priceStr)
                    if (!isNaN(price)) updateData.price = price
                  }
                  if (stockStr) {
                    const stock = Number.parseInt(stockStr)
                    if (!isNaN(stock)) updateData.stock = stock
                  }
                  if (category) updateData.category = category

                  const updatedProduct = await updateProduct(id, updateData)

                  console.log("\nProducto actualizado con éxito:")
                  console.log(updatedProduct)
                } catch (error) {
                  console.error("Error al actualizar el producto:", error)
                }

                showMenu()
              })
            })
          })
        })
      })
    } catch (error) {
      console.error("Error al buscar el producto:", error)
      showMenu()
    }
  })
}

// Función para eliminar un producto
const deleteProductPrompt = async (): Promise<void> => {
  rl.question("\nIngrese el ID del producto a eliminar: ", async (id) => {
    try {
      const product = await getProductById(id)

      if (!product) {
        console.log("Producto no encontrado.")
        showMenu()
        return
      }

      rl.question(`¿Está seguro de eliminar "${product.name}"? (s/n): `, async (answer) => {
        if (answer.toLowerCase() === "s") {
          await deleteProduct(id)
          console.log("Producto eliminado con éxito.")
        } else {
          console.log("Operación cancelada.")
        }

        showMenu()
      })
    } catch (error) {
      console.error("Error al buscar el producto:", error)
      showMenu()
    }
  })
}

// Función principal
const main = async (): Promise<void> => {
  try {
    await connectDB()
    showMenu()
  } catch (error) {
    console.error("Error en la aplicación:", error)
    process.exit(1)
  }
}

// Iniciar la aplicación
main()

// Manejar la salida del programa
process.on("SIGINT", async () => {
  console.log("\nCerrando la aplicación...")
  await disconnectDB()
  rl.close()
  process.exit(0)
})
