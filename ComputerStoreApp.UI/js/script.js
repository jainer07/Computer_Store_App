//#region calculadora ganancias
$("#btnCalcular").click(function() {
    IniciarCalculos();
});
$(".InputValor").blur(function() {
    IniciarCalculos();
});

function IniciarCalculos() {
    let ValorCompra = $("#txtValorCompra").val() == "" ? 0 : $("#txtValorCompra").val();
    let PorcentajeIVA = $("#txtPorcentajeIVA").val() == "" ? 0 : $("#txtPorcentajeIVA").val();
    let PorcentajeGanancia = $("#txtPorcentajeGanancia").val() == "" ? 0 : $("#txtPorcentajeGanancia").val();
    let lsValores = CalcularValores(PorcentajeIVA, PorcentajeGanancia, ValorCompra);
    SetValoresTotales(lsValores);
}

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
    $("#lblValorIva").empty().append("$ " + new Intl.NumberFormat("en-US").format(lsValores[0]));
    $("#lblValorGanacia").empty().append("$ " + new Intl.NumberFormat("en-US").format(lsValores[1]));
    $("#lblValorTotal").empty().append("$ " + new Intl.NumberFormat("en-US").format(lsValores[2]));
}
//#endregion calculadora ganancias