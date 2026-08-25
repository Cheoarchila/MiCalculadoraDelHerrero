function calcular() {

    const anchoPlancha = Number(document.getElementById("anchoPlancha").value);
    const medidaFinal = Number(document.getElementById("medidaFinal").value);
    const canales = Number(document.getElementById("canales").value);
    const profundidad = Number(document.getElementById("profundidad").value);
    const bordes = Number(document.getElementById("bordes").value);
    const espesor = Number(document.getElementById("espesor").value);

    const anchoCanal = medidaFinal / canales;
    const altoCanal = profundidad;

   const desarrollo = (bordes * 2) + medidaFinal + ((canales - 1) * profundidad) - (canales * 4 * espesor) + ((canales - 1) * espesor);
    
    
    document.getElementById("anchoCanal").textContent = Math.round(anchoCanal);

    document.getElementById("altoCanal").textContent = Math.round(altoCanal);

    document.getElementById("desarrollo").textContent = Math.round(desarrollo);

    // ==========================================
    // NUEVO CICLO DE MARCAS OPTIMIZADO
    // ==========================================
    
    // 1. Calcular el ancho base usando "medidaFinal" en vez de una división con decimales
    const jsonAnchoBase = Math.round(medidaFinal / canales); 

    // 2. Definición de las medidas reducidas por el espesor del material
    const bordeReducido = bordes - espesor;           // Ej: 20 - 1 = 19
    const anchoPar = jsonAnchoBase;                   // Ej: Para canales pares = 111
    const anchoImpar = anchoPar - (2 * espesor);      // Ej: Para canales impares = 109
    const altoReducido = profundidad - (2 * espesor); // Ej: 15 - 2 = 13

    // 3. Inicializar la cinta métrica con la primera marca (Borde inicial)
    let marca = bordeReducido; 
    let listaMarcas = Math.round(marca) + "<br>"; // Guarda el primer 19

    // 4. Ciclo unificado que recorre todos los canales
    for (let i = 1; i <= canales; i++) {
        
        // Alternar el ancho según si el canal actual es impar o par
        let anchoActual;
        if (i % 2 !== 0) {
            anchoActual = anchoImpar; // Canales 1, 3, 5, 7, 9
        } else {
            anchoActual = anchoPar;   // Canales 2, 4, 6, 8
        }
        
        // Sumar el ancho del canal a la marca
        marca += anchoActual;
        listaMarcas += Math.round(marca) + "<br>";
        
        // Si no es el último canal, sumar la profundidad de la pared divisoria
        if (i < canales) {
            marca += altoReducido;
            listaMarcas += Math.round(marca) + "<br>";
        }
    }

    // 5. Sumar el borde final
    marca += bordeReducido; 
    listaMarcas += Math.round(marca); // Marca final acumulada en la variable "marca"

    // 6. Mostrar los resultados corregidos en el HTML
    document.getElementById("desarrollo").textContent = Math.round(marca); // Ahora coincide exactamente con la última marca
    document.getElementById("listaMarcas").innerHTML = listaMarcas;
document.getElementById("listaMarcas").innerHTML = listaMarcas;
    
}

    let ultimaProfundidad = 15;

function verificarCanales() {

    let canales = Number(document.getElementById("canales").value);

    canales = Math.floor(canales);
    document.getElementById("canales").value = canales;

    if (canales < 1) {
        document.getElementById("canales").value = 1;
        canales = 1;
    }

    if (canales === 1) {

        document.getElementById("profundidad").value = 0;
        document.getElementById("profundidad").disabled = true;

        document.getElementById("bordes").value = ultimoBordePositivo;

    } else {

        document.getElementById("profundidad").value = ultimaProfundidad;
        document.getElementById("profundidad").disabled = false;

        document.getElementById("bordes").value = ultimoBorde;
    }

}

function verificarMedidaFinal() {

    const campo = document.getElementById("medidaFinal");
    let valor = Number(campo.value);

    if (campo.value === "" || valor < 1) {
        alert("Debes ingresar una Medida final válida.");
        campo.value = ultimaMedidaFinal;
        return;
    }

    valor = Math.floor(valor);
    campo.value = valor;
}

function verificarProfundidad() {

    const profundidad = document.getElementById("profundidad").value;

    if (profundidad === "" || Number(profundidad) < 1) {
        alert("Debes ingresar una profundidad válida.");
        document.getElementById("profundidad").value = ultimaProfundidad;
        return;
    }

    ultimaProfundidad = Number(profundidad);

}

let ultimoBorde = 20;
let ultimoBordePositivo = 20;

function verificarBordes() {

    const campo = document.getElementById("bordes");
    const valor = campo.value;
    const canales = Number(document.getElementById("canales").value);

    if (valor === "") {
        campo.value = 0;

        if (canales > 1) {
            ultimoBorde = 0;
        }

        return;
    }

    const numero = Number(valor);

    if (!Number.isInteger(numero) || numero < 0) {
        alert("Debes ingresar un valor de bordes válido.");
        campo.value = ultimoBorde;
        return;
    }

    // El valor es válido: guardar el nuevo valor
    ultimoBorde = numero;

    if (numero > 0) {
        ultimoBordePositivo = numero;
    }

    // Con un solo canal, Bordes no puede ser 0
    if (canales === 1 && numero === 0) {
        campo.value = ultimoBordePositivo;
        ultimoBorde = 0;
    }

}
function verificarEspesor() {

    const campo = document.getElementById("espesor");
    const valor = campo.value;

    if (valor === "" || Number(valor) < 1) {
        campo.value = 1;
    }

}
