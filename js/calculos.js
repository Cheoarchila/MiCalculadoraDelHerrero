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
    let corteDetectado = false;

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

            // El siguiente avance después de esta pestaña dependerá de si el canal que viene es impar o par
            let siguienteAvance = ((c + 1) % 2 !== 0) ? (anchoCanal - (2 * espesor)) : anchoCanal;

            // REGLA DE CORTE DINÁMICA: 
            // Si el desarrollo supera la plancha, esta pestaña actual cabe (marca <= anchoPlancha) 
            // pero lo que viene después ya se pasa ((marca + siguienteAvance) > anchoPlancha), AQUÍ ES EL CORTE.
            if (desarrollo > anchoPlancha && marca <= anchoPlancha && (marca + siguienteAvance) > anchoPlancha && !corteDetectado) {
                listaMarcas += contador++ + ".-) <span>" + Math.round(marca) + "</span> CORTE ➔<br>";
                corteDetectado = true;
            } else {
                listaMarcas += contador++ + ".-) <span>" + Math.round(marca) + "</span><br>";
            }
        }
    }

    // Cierre del desarrollo: Sumamos el borde final limpio
    marca += (bordes - espesor);
    listaMarcas += contador + ".-) <span>" + Math.round(marca) + "</span>";

    document.getElementById("listaMarcas").innerHTML = listaMarcas;
}
