function calcular() {

     const medidaPlancha = Number(document.getElementById("medidaFinal").value);
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

//Ciclo de Marcas//
    let marca = bordes - espesor;
let listaMarcas = Math.round(marca) + "<br>";

const anchoReducido = anchoCanal - (2 * espesor);
const altoReducido = altoCanal - (2 * espesor);
const bordeReducido = bordes - espesor;

// Primera sección
marca += anchoReducido;
listaMarcas += Math.round(marca) + "<br>";

if (canales > 1) {
    marca += altoReducido;
    listaMarcas += Math.round(marca) + "<br>";
}

// Secciones intermedias
for (let i = 2; i < canales; i++) {

   marca += anchoCanal;
listaMarcas += Math.round(marca) + "<br>";

marca += altoReducido;
listaMarcas += Math.round(marca) + "<br>";
}
if (canales === 2) {
    marca += anchoCanal;
    listaMarcas += Math.round(marca) + "<br>";
}
// Borde final
marca += anchoReducido;
listaMarcas += Math.round(marca) + "<br>";
marca += bordeReducido;
listaMarcas += Math.round(marca);

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
