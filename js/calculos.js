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
        } else {
    
        document.getElementById("profundidad").disabled = false;
    }

}


function verificarMedidaFinal() {

    let medidaFinal = Number(document.getElementById("medidaFinal").value);

    if (medidaFinal < 1 || document.getElementById("medidaFinal").value === "") {
        alert("Debes ingresar una Medida final válida.");
        document.getElementById("medidaFinal").focus();
    }
}
