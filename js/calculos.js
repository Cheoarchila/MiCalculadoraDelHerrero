// Variables globales para el control de estados previos
let ultimaMedidaFinal = 1000;
let ultimaProfundidad = 15;
let ultimoBorde = 20;
let ultimoBordePositivo = 20;

function calcular() {
    const anchoPlancha = Number(document.getElementById("anchoPlancha").value);
    const medidaFinal = Number(document.getElementById("medidaFinal").value);
    const canales = Number(document.getElementById("canales").value);
    const profundidad = Number(document.getElementById("profundidad").value);
    const bordes = Number(document.getElementById("bordes").value);
    const espesor = Number(document.getElementById("espesor").value);

    const anchoCanal = medidaFinal / canales;
    const altoCanal = profundidad;

    // Cálculo técnico del desarrollo de la chapa completa
    const desarrolloTotal = (bordes * 2) + medidaFinal + ((canales - 1) * profundidad) - (canales * 4 * espesor) + ((canales - 1) * espesor);
    
    document.getElementById("anchoCanal").textContent = Math.round(anchoCanal);
    document.getElementById("altoCanal").textContent = Math.round(altoCanal);
    document.getElementById("desarrollo").textContent = Math.round(desarrolloTotal);

    // ==========================================
    // SISTEMA DE PLANCHAS Y MARCAS DE CORTE
    // ==========================================
    
    const jsonAnchoBase = Math.round(medidaFinal / canales); 
    const bordeReducido = bordes - espesor;           
    const anchoPar = jsonAnchoBase;                   
    const anchoImpar = anchoPar - (2 * espesor);      
    const altoReducido = profundidad - (2 * espesor); 
    
    let htmlResultado = "";
    
    // CASO 1: Todo cabe en una sola plancha (Regla 1)
    if (desarrolloTotal <= anchoPlancha) {
        let contador = 1;
        let marca = bordeReducido;
        let listaMarcas = "<strong>--- PLANCHA ÚNICA ---</strong><br>";
        listaMarcas += contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)<br>";
        contador++;

        for (let i = 1; i <= canales; i++) {
            let anchoActual = (i % 2 !== 0) ? anchoImpar : anchoPar;
            marca += anchoActual;
            
            if (i === canales) {
                marca += bordeReducido;
                listaMarcas += contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm <strong>[CORTE]</strong><br>";
            } else {
                listaMarcas += contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)<br>";
                contador++;
                marca += altoReducido;
                listaMarcas += contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)<br>";
                contador++;
            }
        }
        htmlResultado = listaMarcas;
    } 
    // CASO 2 en adelante: Requiere Multi-plancha automático con agrupación (Reglas 2 a 6)
    else {
        let canalActual = 1;
        let numeroPlancha = 1;
        let bloquesPlanchas = []; // Guardará los datos de cada plancha calculada

        // --- FASE 1: Calcular la distribución de todas las planchas en memoria ---
        while (canalActual <= canales) {
            let marca = 0;
            let marcasDeEstaPlancha = [];
            let contador = 1;

            if (numeroPlancha === 1) {
                marca = bordeReducido;
                marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)");
                contador++;
            } else {
                marca = altoReducido;
                marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)");
                contador++;
            }

            let avanzarPlancha = false;

            while (canalActual <= canales && !avanzarPlancha) {
                let anchoActual = (canalActual % 2 !== 0) ? anchoImpar : anchoPar;
                let marcaSimuladaCanal = marca + anchoActual;
                let marcaSimuladaCierre = marcaSimuladaCanal + bordeReducido;
                let marcaSimuladaProfundidad = marcaSimuladaCanal + altoReducido;

                if (canalActual === canales) {
                    if (marcaSimuladaCierre <= anchoPlancha) {
                        marca = marcaSimuladaCierre;
                        marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm <strong>[CORTE]</strong>");
                        canalActual++;
                    } else {
                        marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm <strong>[CORTE]</strong>");
                        avanzarPlancha = true;
                    }
                } else {
                    if (marcaSimuladaProfundidad <= anchoPlancha) {
                        marca = marcaSimuladaCanal;
                        marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)");
                        contador++;
                        
                        marca += altoReducido;
                        if (canalActual + 1 <= canales && (marca + ((canalActual + 1 % 2 !== 0) ? anchoImpar : anchoPar)) > anchoPlancha) {
                            marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm <strong>[CORTE]</strong>");
                            canalActual++;
                            avanzarPlancha = true;
                        } else {
                            marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm (Pliegue)");
                            contador++;
                            canalActual++;
                        }
                    } else {
                        marcasDeEstaPlancha.push(contador + ". &nbsp;&nbsp; " + Math.round(marca) + " mm <strong>[CORTE]</strong>");
                        avanzarPlancha = true;
                    }
                }
            }

            // Guardamos el bloque de texto generado para esta plancha
            bloquesPlanchas.push({
                numero: numeroPlancha,
                texto: marcasDeEstaPlancha.join("<br>") + "<br>"
            });
            numeroPlancha++;
        }

        // --- FASE 2: Renderizar y agrupar según la cantidad de planchas (Regla 6) ---
        let totalPlanchas = bloquesPlanchas.length;

        // Plancha 1 siempre se muestra sola
        htmlResultado += "<strong>--- PLANCHA 1 ---</strong><br>" + bloquesPlanchas[0].texto + "<br>";

        if (totalPlanchas > 1) {
            // Si hay 3 o más planchas totales, las intermedias (desde la 2 hasta la penúltima) son iguales
            if (totalPlanchas >= 3) {
                let intermedias = [];
                for (let i = 2; i < totalPlanchas; i++) {
                    intermedias.push(i);
                }
                
                // Imprimimos la cabecera agrupada (Ej: "PLANCHAS 2, 3, 4") usando la plantilla de la Plancha 2 (índice 1)
                htmlResultado += "<strong>--- PLANCHAS " + intermedias.join(", ") + " (Todas son iguales) ---</strong><br>" + bloquesPlanchas[1].texto + "<br>";
                
                // Imprimimos la última plancha que cierra el proyecto
                htmlResultado += "<strong>--- PLANCHA " + totalPlanchas + " (Cierre de pieza) ---</strong><br>" + bloquesPlanchas[totalPlanchas - 1].texto + "<br>";
            } else {
                // Si solo son 2 planchas en total, mostramos la Plancha 2 directo sin agrupar
                htmlResultado += "<strong>--- PLANCHA 2 ---</strong><br>" + bloquesPlanchas[1].texto + "<br>";
            }
        }
    }

    // 5. Inyectar los resultados en el contenedor del HTML
    const contenedorMarcas = document.getElementById("listaMarcas");
    if (contenedorMarcas) {
        contenedorMarcas.innerHTML = htmlResultado;
    }
}

// Funciones de validación obligatorias para la interfaz
function verificarMedidaPlancha() {
    const campo = document.getElementById("anchoPlancha");
    let valor = Number(campo.value);
    if (campo.value === "" || valor < 1) {
        alert("Debes ingresar un ancho de plancha válido.");
        campo.value = 1200;
    } else {
        campo.value = Math.floor(valor);
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
    ultimaMedidaFinal = valor;
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

function verificarBordes() {
    const campo = document.getElementById("bordes");
    const valor = campo.value;
    const canales = Number(document.getElementById("canales").value);

    if (valor === "") {
        campo.value = 0;

    if (canales > 1) {ultimoBorde = 0; }
        return;}

    const numero = Number(valor);

    if (!Number.isInteger(numero) || numero < 0) {
        alert("Debes ingresar un valor de bordes válido.");
        campo.value = ultimoBorde;
        return;
        }

    ultimoBorde = numero;
    if (numero > 0) { ultimoBordePositivo = numero; }
    
    if (canales === 1 && numero === 0) {
        campo.value = ultimoBordePositivo;
        ultimoBorde = 0;}}

function verificarEspesor() {
    const campo = document.getElementById("espesor");
    const valor = campo.value;
    if (valor === "" || Number(valor) < 1) {campo.value = 1;
}
}
