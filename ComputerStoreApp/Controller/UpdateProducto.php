<?php 
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $DataBase = "dbunad12";

    $conn = mysqli_connect($servername, $username, $password, $DataBase);

    if (!$conn) {
        echo json_encode(
            array(
                'ok' => false,
                'tipoMsg' => 'error',
                'titulo' => 'ComputerStore App', 
                'msg' => 'Error al conectarse al servidor: ' . mysqli_connect_error()
            ));
    }
    else {
        //request parameters
        $Id = $_POST['Id'];
        $Codigo = $_POST['Codigo'];
        $Nombre = $_POST['Nombre'];
        $Marca = $_POST['Marca'];
        $Precio = $_POST['Precio'];
        $Cantidad = $_POST['Cantidad'];
        $Producto = (object) [
            'Codigo' => $Codigo,
            'Nombre' => $Nombre,
            'Marca' => $Marca,
            'Precio' => $Precio,
            'Cantidad' => $Cantidad
        ];
        $sql = "UPDATE tabla12 SET Codigo='$Codigo', Nombre='$Nombre',Marca='$Marca',  
                Precio=$Precio, Cantidad=$Cantidad WHERE Id=$Id";
        
        if (mysqli_query($conn, $sql)) { 
            echo json_encode(
                array(
                    'ok' => true,
                    'tipoMsg' => 'success',
                    'titulo' => 'ComputerStore App', 
                    'msg' => 'Se ha actualizado el nuevo producto: ' . $Nombre,
                    'url' => '/ComputerStoreApp/page/inventario/Consult.html'
                ));
            } else { 
                echo json_encode(
                    array(
                        'ok' => false,
                        'tipoMsg' => 'error',
                        'titulo' => 'ComputerStore App', 
                        'msg' => 'Error al actualizar el producto: ' . $Nombre .' _ '. mysqli_error($conn)
    
                    ));
            }

        mysqli_close($conn);
    }
 ?>
