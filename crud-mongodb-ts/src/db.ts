// Este archivo simula la conexión a la base de datos
// En una implementación real, aquí estaría la configuración de MongoDB

// Función para simular la conexión a la base de datos
export const connectDB = async (): Promise<void> => {
    console.log("Simulando conexión a la base de datos...")
    // Simulamos un pequeño retraso para que parezca que se está conectando
    await new Promise((resolve) => setTimeout(resolve, 500))
    console.log("Conexión simulada establecida con éxito")
  }
  
  // Función para simular el cierre de la conexión
  export const disconnectDB = async (): Promise<void> => {
    console.log("Simulando cierre de conexión a la base de datos...")
    // Simulamos un pequeño retraso
    await new Promise((resolve) => setTimeout(resolve, 300))
    console.log("Conexión simulada cerrada con éxito")
  }
  