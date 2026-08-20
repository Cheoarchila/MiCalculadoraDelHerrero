function calcular() {

    const medidaFinal = Number(document.getElementById("medidaFinal").value);
    const canales = Number(document.getElementById("canales").value);
    const profundidad = Number(document.getElementById("profundidad").value);
    const bordes = Number(document.getElementById("bordes").value);
    const espesor = Number(document.getElementById("espesor").value);

    const anchoCanal = medidaFinal / canales;
    const altoCanal = profundidad;

    const desarrollo = (bordes * 2) + medidaFinal + ((canales - 1) * profundidad) - (canales * 4 * espesor);

    document.getElementById("anchoCanal").textContent = Math.round(anchoCanal);

    document.getElementById("altoCanal").textContent = Math.round(altoCanal);

    document.getElementById("desarrollo").textContent = Math.round(desarrollo);
}

    let ultimaProfundidad = 15;

function guardarProfundidad() {

    const valor = Number(document.getElementById("profundidad").value);

    if (valor >= 1) {
        ultimaProfundidad = valor;
    }

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

    if (ultimoBorde === 0) {
    ultimoBorde = 20;
    }

    document.getElementById("bordes").value = ultimoBorde;
        
        } else {
    document.getElementById("profundidad").value = ultimaProfundidad;
    document.getElementById("profundidad").disabled = false;
}

}


function verificarMedidaFinal() {

    let medidaFinal = Number(document.getElementById("medidaFinal").value);

    if (medidaFinal < 1 || document.getElementById("medidaFinal").value === "") {
        alert("Debes ingresar una Medida final válida.");
        document.getElementById("medidaFinal").value = ultimaMedidaFinal;
    }
}
    let ultimaMedidaFinal = 1000;

function guardarMedidaFinal() {

    const valor = Number(document.getElementById("medidaFinal").value);

        if (valor >= 1) {
        ultimaMedidaFinal = valor;
    }

}
function verificarProfundidad() {

    const profundidad = document.getElementById("profundidad").value;

        if (profundidad === "" || Number(profundidad) < 1) {
        alert("Debes ingresar una profundidad válida.");
        document.getElementById("profundidad").value = ultimaProfundidad;
    }

}

let ultimoBorde = 20;

function guardarBordes() {

    const valor = Number(document.getElementById("bordes").value);

    if (Number.isInteger(valor) && valor >= 0) {
        ultimoBorde = valor;
    }

}

function verificarBordes() {

    const valor = document.getElementById("bordes").value;

    if (valor === "") {
        document.getElementById("bordes").value = 0;
        return;
    }

    if (!Number.isInteger(Number(valor)) || Number(valor) < 0) {
        alert("Debes ingresar un valor de bordes válido.");
        document.getElementById("bordes").value = ultimoBorde;
    }

}
