const meses = [
"Enero","Febrero","Marzo","Abril",
"Mayo","Junio","Julio","Agosto",
"Septiembre","Octubre","Noviembre","Diciembre"
];

const tabla = document.getElementById("tablaMeses");

meses.forEach((mes,index)=>{
    tabla.innerHTML += `
    <tr>
        <td>${mes}</td>

        <td>
            <input type="number" id="sueldo${index}" value="0">
        </td>

        <td>
            <input type="number" id="bono${index}" value="0">
        </td>

        <td id="ingreso${index}">
            0
        </td>
    </tr>`;
});

function calcular(){

    let totalAnual = 0;

    for(let i=0;i<12;i++){

        let sueldo =
        Number(document.getElementById(`sueldo${i}`).value);

        let bono =
        Number(document.getElementById(`bono${i}`).value);

        let ingreso = sueldo + bono;

        document.getElementById(`ingreso${i}`).innerHTML =
        ingreso.toFixed(2);

        totalAnual += ingreso;
    }

    document.getElementById("totalAnual").innerHTML =
    totalAnual.toFixed(2);

    const UIT = 5500;
    const deduccion = UIT * 7;

    let baseImponible = totalAnual - deduccion;

    if(baseImponible < 0){
        baseImponible = 0;
    }

    document.getElementById("baseImponible").innerHTML =
    baseImponible.toFixed(2);

    let impuesto = 0;

    let tramo1 = Math.min(baseImponible, UIT*5);
    impuesto += tramo1 * 0.08;

    let restante = baseImponible - tramo1;

    if(restante > 0){
        let tramo2 = Math.min(restante, UIT*15);
        impuesto += tramo2 * 0.14;
        restante -= tramo2;
    }

    if(restante > 0){
        let tramo3 = Math.min(restante, UIT*15);
        impuesto += tramo3 * 0.17;
    }

    document.getElementById("impuesto").innerHTML =
    impuesto.toFixed(2);

    let retencionMensual = impuesto / 12;

    document.getElementById("retencion").innerHTML =
    retencionMensual.toFixed(2);
}