let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; 

for (let i = 0; i < numeros.length; i++) {
    let numero = numeros[i];

    if (numero % 2 === 0) {
        console.log(`El número ${numero} es par`);
    } else {
        console.log(`El número ${numero} es impar`);
    }
}


let calificaciones = [55, 67, 72, 88, 90, 45, 60, 82, 79, 100]; 

for (let i = 0; i < calificaciones.length; i++) {
    let calificacion = calificaciones[i];

    if (calificacion < 60) {
        console.log(`Calificación: ${calificacion} - Reprobado`);
    } else if (calificacion >= 60 && calificacion <= 80) {
        console.log(`Calificación: ${calificacion} - Aprobado`);
    } else if (calificacion > 80) {
        console.log(`Calificación: ${calificacion} - Excelente`);
    }
}


const precios = [10, 25, 55, 15, 45, 60, 30, 5, 75];

for (let i = 0; i < precios.length; i++) {
    const precio = precios[i];

    if (precio < 20) {
        console.log("Producto económico");
    } else if (precio >= 20 && precio <= 50) {
        console.log("Producto de precio moderado");
    } else {
        console.log("Producto de lujo");
    }
}
