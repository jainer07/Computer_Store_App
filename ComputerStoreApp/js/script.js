function ShowLoading(option) {
    if (option == 0) {
        $('#LoadingModal').modal('show');
    } else if (option == 1) {
        setTimeout(function() {
            $('#LoadingModal').modal('hide');
        }, 300);
    } else if (option == 2) {
        $('#LoadingModal').modal('hide');
        $('#LoadingModal').css('display', 'none');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
}

function ShowAlertMsg(titulo, texto, tipo) {
    swal.fire({
        title: titulo,
        text: texto,
        icon: tipo
    });
}

function DataTablesAdd(table, row) {
    $(table).DataTable({
        fixedHeader: true,
        pageLength: row,
        "bPaginate": true,
        "bFilter": false,
        "bInfo": true,
        "searching": false,
        "lengthChange": false,
        "language": {
            "paginate": {
                "previous": "Ant",
                "next": "Sig",
            },
            "zeroRecords": "No se encontro nada.",
            "info": "Pagina _PAGE_ de _PAGES_",
            "infoEmpty": "NO hay registros disponibles."
        }
    });
}
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
//#region convertidor de unidades
$("#cbxUnidad1").change(function() {
    let lsValores = GetValues(0);
    SetValues(0, lsValores);
});
$("#txtUnidad1").keyup(function() {
    let lsValores = GetValues(0);
    SetValues(0, lsValores);
});
$("#cbxUnidad2").change(function() {
    let lsValores = GetValues(1);
    SetValues(1, lsValores);
});
$("#txtUnidad2").keyup(function() {
    let lsValores = GetValues(1);
    SetValues(1, lsValores);
});

function GetValues(option) {
    let UnidadEntrada = "";
    let UnidadSalida = "";
    let ValorEntrada = 0;
    if (option == 0) {
        UnidadEntrada = $("#cbxUnidad1").val();
        UnidadSalida = $("#cbxUnidad2").val();
        ValorEntrada = parseInt($("#txtUnidad1").val());
    } else if (option == 1) {
        UnidadEntrada = $("#cbxUnidad2").val();
        UnidadSalida = $("#cbxUnidad1").val();
        ValorEntrada = parseInt($("#txtUnidad2").val());
    }

    return [UnidadEntrada, UnidadSalida, ValorEntrada];
}

function SetValues(option, lsValores) {
    if (isNaN(lsValores[2])) {
        lsValores[2] = 0;
    }
    let Valor = ConvertirUnidades(lsValores[0], lsValores[1], lsValores[2]);
    let ValorString = "";
    if (Valor == 0) {
        ValorString = "0 B";
    } else if (Valor < 0.00001) {
        ValorString = lsValores[2] + " " + lsValores[0] + " = " + Valor + " " + lsValores[1];
    } else {
        ValorString = new Intl.NumberFormat("en-US").format(lsValores[2]) + " " + lsValores[0] + " = " + new Intl.NumberFormat("en-US").format(Valor) + " " + lsValores[1];
    }

    if (option == 0) {
        $("#txtUnidad2").val(Valor);
        $("#lblResultado").empty().append(ValorString);
    } else if (option == 1) {
        $("#txtUnidad1").val(Valor);
        $("#lblResultado").empty().append(ValorString);
    }
}

function ConvertirUnidades(unidadEntrada, unidadSalida, valor) {
    let Resultado = 0;
    if (isNaN(valor)) {
        valor = 0;
    }
    switch (unidadEntrada) {
        case "B":
            Resultado = ConvertirB(valor, unidadSalida);
            break;
        case "KB":
            Resultado = ConvertirKB(valor, unidadSalida);
            break;
        case "MB":
            Resultado = ConvertirMB(valor, unidadSalida);
            break;
        case "GB":
            Resultado = ConvertirGB(valor, unidadSalida);
            break;
        case "TB":
            Resultado = ConvertirTB(valor, unidadSalida);
            break;
    }

    return Resultado;
}

function ConvertirB(valor, unidadSalida) {
    let Resultado = 0;
    if (unidadSalida == "B") {
        Resultado = valor;
    } else if (unidadSalida == "KB") {
        Resultado = (valor * 1) / 1024;
    } else if (unidadSalida == "MB") {
        let ResultKB = (valor * 1) / 1024;
        Resultado = (ResultKB * 1) / 1024;
    } else if (unidadSalida == "GB") {
        let ResultKB = (valor * 1) / 1024;
        let ResultMB = (ResultKB * 1) / 1024;
        Resultado = (ResultMB * 1) / 1024;
    } else if (unidadSalida == "TB") {
        let ResultKB = (valor * 1) / 1024;
        let ResultMB = (ResultKB * 1) / 1024;
        let ResultGB = (ResultMB * 1) / 1024;
        Resultado = (ResultGB * 1) / 1024;
    }

    return FormatValue(Resultado);
}

function ConvertirKB(valor, unidadSalida) {
    let Resultado = 0;
    if (unidadSalida == "B") {
        Resultado = (valor * 1024) / 1;
    } else if (unidadSalida == "KB") {
        Resultado = valor;
    } else if (unidadSalida == "MB") {
        Resultado = (valor * 1) / 1024;
    } else if (unidadSalida == "GB") {
        let ResultMB = (valor * 1) / 1024;
        Resultado = (ResultMB * 1) / 1024;
    } else if (unidadSalida == "TB") {
        let ResultMB = (valor * 1) / 1024;
        let ResultGB = (ResultMB * 1) / 1024;
        Resultado = (ResultGB * 1) / 1024;
    }

    return FormatValue(Resultado);
}

function ConvertirMB(valor, unidadSalida) {
    let Resultado = 0;
    if (unidadSalida == "B") {
        let ResultKB = (valor * 1024) / 1;
        Resultado = (ResultKB * 1024) / 1;
    } else if (unidadSalida == "KB") {
        Resultado = (valor * 1024) / 1;
    } else if (unidadSalida == "MB") {
        Resultado = valor;
    } else if (unidadSalida == "GB") {
        Resultado = (valor * 1) / 1024;
    } else if (unidadSalida == "TB") {
        let ResultGB = (valor * 1) / 1024;
        Resultado = (ResultGB * 1) / 1024;
    }

    return FormatValue(Resultado);
}

function ConvertirGB(valor, unidadSalida) {
    let Resultado = 0;
    if (unidadSalida == "B") {
        let ResultB = (valor * 1024) / 1;
        let ResultMB = (ResultB * 1024) / 1;
        Resultado = (ResultMB * 1024) / 1;
    } else if (unidadSalida == "KB") {
        let ResultMB = (valor * 1024) / 1;
        Resultado = (ResultMB * 1024) / 1;
    } else if (unidadSalida == "MB") {
        Resultado = (valor * 1024) / 1;
    } else if (unidadSalida == "GB") {
        Resultado = valor;
    } else if (unidadSalida == "TB") {
        Resultado = (valor * 1) / 1024;
    }

    return FormatValue(Resultado);
}

function ConvertirTB(valor, unidadSalida) {
    let Resultado = 0;
    if (unidadSalida == "B") {
        let ResultGB = (valor * 1024) / 1;
        let ResultMB = (ResultGB * 1024) / 1;
        let ResultKB = (ResultMB * 1024) / 1;
        Resultado = (ResultKB * 1024) / 1;
    } else if (unidadSalida == "KB") {
        let ResultMB = (valor * 1024) / 1;
        Resultado = (ResultMB * 1024) / 1;
    } else if (unidadSalida == "MB") {
        let ResultMB = (valor * 1024) / 1;
        let ResultGB = (ResultMB * 1024) / 1;
        Resultado = (ResultGB * 1024) / 1;
    } else if (unidadSalida == "GB") {
        Resultado = (valor * 1024) / 1;
    } else if (unidadSalida == "TB") {
        Resultado = valor;
    }
    return FormatValue(Resultado);
}

function FormatValue(num) {

    if (!Number.isInteger(num) && num != "") {
        if (num > 0 && num < 0.00001) {
            return num;
        } else if (num > 0 && num < 1) {
            return num.toFixed(3)
        } else {
            return num.toFixed(2)
        }
    }
    return num;
}
//#endregion convertidor de unidades
//#region Administrador
function OnClickCreateDB() {
    ShowLoading(0);
    $.ajax({
        type: "POST",
        url: '/ComputerStoreApp/Controller/CreateDB.php',
        success: function(response) {
            var Data = JSON.parse(response);
            ShowLoading(2);
            ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
        },
        error: function(error) {
            ShowLoading(2);
            ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
        }
    });
}

function OnClickCreateTbl() {
    ShowLoading(0);
    $.ajax({
        type: "POST",
        url: '/ComputerStoreApp/Controller/CreateTable.php',
        success: function(response) {
            var Data = JSON.parse(response);
            ShowLoading(2);
            ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
        },
        error: function(error) {
            ShowLoading(2);
            ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
        }
    });
}
//#endregion Administrador
//#region Productos
function ValidateForm(btnSubmit) {
    let Ok = ValidateFields(btnSubmit.parents('form'));
    return Ok;
}

function ValidateFields(fields) {
    let Ok = 0;
    //validacion de los campos obligatorios en los formularios
    fields.find('input[type="text"], input[type="number"]').each(function() {
        if (this.value === "") {
            $(this).addClass('input-error');
            Ok = 99;
        } else {
            $(this).removeClass('input-error');
        }
    });

    return Ok;
}

function GetParameterUrl(option) {
    if (option == 0) {
        let UrlString = window.location.href;
        let Url = new URL(UrlString);
        let Id = Url.searchParams.get("id");
        return parseInt(Id);
    }
}

function BuildProduct(option) {
    let Producto = {};
    Producto.Codigo = $("#txtCodigo").val();
    Producto.Nombre = $("#txtNombre").val();
    Producto.Marca = $("#txtMarca").val();
    Producto.Precio = $("#txtPrecio").val();
    Producto.Cantidad = $("#txtCantidad").val();
    if (option == 1) {
        Producto.Id = GetParameterUrl(0);
    }

    return Producto;
}

function CrearProducto() {
    ShowLoading(0);
    let Ok = ValidateForm($("#btnCrearProducto"));
    if (Ok === 0) {
        let Producto = BuildProduct(0);
        $.ajax({
            type: "POST",
            url: '/ComputerStoreApp/Controller/CrearProducto.php',
            data: Producto,
            success: function(response) {
                var Data = JSON.parse(response);
                if (Data.ok) {
                    window.location.href = Data.url;
                } else {
                    ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
                }
                ShowLoading(2);
            },
            error: function(error) {
                ShowLoading(2);
                ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
            }
        });
    } else {
        ShowLoading(2);
        ShowAlertMsg("ComputerStoreApp", "Debes llenar todos los campos.", "warning");
    }
}

function UpdateProducto() {
    ShowLoading(0);
    let Ok = ValidateForm($("#btnUpdateProducto"));
    if (Ok === 0) {
        let Producto = BuildProduct(1);
        $.ajax({
            type: "POST",
            url: '/ComputerStoreApp/Controller/UpdateProducto.php',
            data: Producto,
            success: function(response) {
                var Data = JSON.parse(response);
                if (Data.ok) {
                    window.location.href = Data.url;
                } else {
                    ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
                }
                ShowLoading(2);
            },
            error: function(error) {
                ShowLoading(2);
                ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
            }
        });
    } else {
        ShowLoading(2);
        ShowAlertMsg("ComputerStoreApp", "Debes llenar todos los campos.", "warning");
    }
}

function GetAllProduct() {
    ShowLoading(0);
    $.ajax({
        type: "POST",
        url: '/ComputerStoreApp/Controller/GetAllProduct.php',
        success: function(response) {
            var Data = JSON.parse(response);
            if (Data.ok) {
                let lsProducto = [];
                Data.data.forEach(function(item) {
                    let Producto = item.split('|');
                    lsProducto.push(Producto);
                });
                FilterTable(lsProducto);
                DataTablesAdd(tblProducto, 10);
            } else {
                ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
            }
            ShowLoading(2);
        },
        error: function(error) {
            ShowLoading(2);
            ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
        }
    });
}

function GetByIdProduct() {
    ShowLoading(0);
    let Producto = {};
    Producto.Id = GetParameterUrl(0);
    $.ajax({
        type: "POST",
        url: '/ComputerStoreApp/Controller/GetByIdProduct.php',
        data: Producto,
        success: function(response) {
            var Data = JSON.parse(response);
            if (Data.ok) {
                let Producto = [];
                Data.data.forEach(function(item) {
                    Producto = item.split('|');
                });
                $("#txtCodigo").val(Producto[1]);
                $("#txtNombre").val(Producto[2]);
                $("#txtMarca").val(Producto[3]);
                $("#txtPrecio").val(Producto[4]);
                $("#txtCantidad").val(Producto[5]);
            } else {
                ShowAlertMsg(Data.titulo, Data.msg, Data.tipoMsg);
            }
            ShowLoading(2);
        },
        error: function(error) {
            ShowLoading(2);
            ShowAlertMsg("Error inesperado", "A ocurrido un error en el proceso.", "error");
        }
    });
}

function FilterTable(data) {
    let TableProducto = $('#tblProducto tbody');
    TableProducto.empty();
    TableProducto.append('<tbody>');
    data.forEach(function(item) {
        var htmlTbody = '<tr>' +
            '<th scope="row">' + item[0] + '</th>' +
            '<td>' + item[1] + '</td>' +
            '<td>' + item[2] + '</td>' +
            '<td>' + item[3] + '</td>' +
            '<td>' + item[4] + '</td>' +
            '<td>' + item[5] + '</td>' +
            '<td>' +
            '<div class="btn-group btn-group-sm" role="group" aria-label="Basic example">' +
            '<a href="/ComputerStoreApp/page/inventario/Update.html?id=' + item[0] + '" class="btn btn-info">Editar</a>' +
            '<a href="/ComputerStoreApp/page/inventario/Delete.html?id=' + item[0] + '" class="btn btn-danger">Eliminar</a>' +
            '</div>' +
            '</td>' +
            '</tr>';
        TableProducto.append(htmlTbody);
    });

    TableProducto.append('</tbody>')
}
//#endregion Productos