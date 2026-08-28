// Variables globales de respaldo (valores iniciales por defecto)
let ultimaMedidaPlancha = 1200;
let ultimaMedidaFinal = 1000;
let ultimaProfundidad = 15;
let ultimoBorde = 20;
let ultimoBordePositivo = 20;

function calcular() {
    // CORREGIDO: Se obtiene correctamente el elemento anchoPlancha
    const anchoPlancha = Number(document.getElementById("anchoPlancha").value);
    const medidaFinal = Number(document.getElementById("medidaFinal").value);
    const canales = Number(document.getElementById("canales").value);
    const profundidad = Number(document.getElementById("profundidad").value);
    const bordes = Number(document.getElementById("bordes").value);
    const espesor = Number(document.getElementById("espesor").value);

    // Cálculos estructurales
    const anchoCanal = medidaFinal / canales;
    const altoCanal = profundidad;

    // Fórmula de desarrollo original provista
    const desarrollo = (bordes * 2) + medidaFinal + ((canales - 1) * profundidad) - (canales * 4 * espesor) + ((canales - 1) * espesor);
    
    // Inyección de resultados en pantalla
    document.getElementById("anchoCanal").textContent = Math.round(anchoCanal);
    document.getElementById("altoCanal").textContent = Math.round(altoCanal);
    document.getElementById("desarrollo").textContent = Math.round(desarrollo);

    // --- Ciclo de Generación de Marcas (Actualizado con Lógica Taller) ---
    let marca = bordes - espesor;
    let listaMarcas = "1.-) <span>" + Math.round(marca) + "</span><br>";
    let contador = 2;

    const altoReducido = profundidad - (2 * espesor); // Mantiene las paredes en 13 mm reales

    // El ciclo recorre dinámicamente cada canal uno por uno
    for (let c = 1; c <= canales; c++) {
        
        // Si el canal es IMPAR (1, 3, 5...), se reduce el espesor por ambos lados (-2)
        if (c % 2 !== 0) {
            marca += (anchoCanal - (2 * espesor));
        } 
        // Si el canal es PAR (2, 4, 6...), se toma la medida limpia de la máquina
        else {
            marca += anchoCanal;
        }
        
        listaMarcas += contador++ + ".-) <span>" + Math.round(marca) + "</span><br>";

        // Si todavía quedan más canales por procesar, añadimos la pestaña/pared
        if (c < canales) {
            marca += altoReducido;
            listaMarcas += contador++ + ".-) <span>" + Math.round(marca) + "</span><br>";
        }
    }

    // Cierre del desarrollo: Sumamos el borde final limpio
    marca += (bordes - espesor);
    listaMarcas += contador + ".-) <span>" + Math.round(marca) + "</span>";

    document.getElementById("listaMarcas").innerHTML = listaMarcas;
}

// --- Funciones de Verificación y Validación ---

function verificarMedidaPlancha() {
    const campo = document.getElementById("anchoPlancha");
    let valor = Number(campo.value);

    if (campo.value === "" || valor < 1) {
        alert("Debes ingresar una Medida de Plancha válida.");
        campo.value = ultimaMedidaPlancha;
        return;
    }
    valor = Math.floor(valor);
    campo.value = valor;
    ultimaMedidaPlancha = valor;
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
    ultimaMedidaFinal = valor; // Respalda el valor correcto actual
}

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

function verificarProfundidad() {
    const campo = document.getElementById("profundidad");
    const profundidad = campo.value;

    if (profundidad === "" || Number(profundidad) < 1) {
        alert("Debes ingresar una profundidad válida.");
        campo.value = ultimaProfundidad;
        return;
    }

    ultimaProfundidad = Number(profundidad);
}

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

    ultimoBorde = numero;

    if (numero > 0) {
        ultimoBordePositivo = numero;
    }

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
