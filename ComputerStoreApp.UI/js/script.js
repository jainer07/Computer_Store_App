//#region calculadora ganancias
$("#btnCalcular").click(function() {
    let ValorCompra = $("#txtValorCompra").val();
    let PorcentajeIVA = $("#txtPorcentajeIVA").val();
    let PorcentajeGanancia = $("#txtPorcentajeGanancia").val();
    let lsValores = CalcularValores(PorcentajeIVA, PorcentajeGanancia, ValorCompra);
    SetValoresTotales(lsValores);
});

function CalcularValores(porcentajeIVA, porcentajeGanancia, valorCompra) {
    let ValorIva = ValorPorcetaje(porcentajeIVA, valorCompra);
    let ValorGanancia = ValorPorcetaje(porcentajeGanancia, valorCompra);
    let ValorTotal = parseInt(valorCompra) + ValorIva + ValorGanancia;

    let lsValores = [ValorIva, ValorGanancia, ValorTotal];

    return lsValores;

    function ValorPorcetaje(porcentaje, valorCompra) {
        let Valor = valorCompra * (porcentaje / 100);
        return Valor;
    }
}

function SetValoresTotales(lsValores) {
    let ValorIVA = $("#lblValorIva");
    let ValorGanancia = $("#lblValorGanacia");
    let ValorTotal = $("#lblValorTotal");

    ValorIVA.empty().append(lsValores[0]);
    ValorGanancia.empty().append(lsValores[1]);
    ValorTotal.empty().append(lsValores[2]);
}
//#endregion calculadora ganancias