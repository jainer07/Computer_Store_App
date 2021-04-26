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
     // Create table
    $sql = "CREATE TABLE tabla12 ( 
        Id INT AUTO_INCREMENT PRIMARY KEY,Codigo VARCHAR(6) NOT NULL, 
        Nombre VARCHAR(40) NOT NULL,Marca VARCHAR(40) NOT NULL, 
        Precio DECIMAL NOT NULL, Cantidad INT NOT NULL
    )";
    if (mysqli_query($conn, $sql)) {
        echo json_encode(
            array(
            'ok' => true,
            'tipoMsg' => 'success',
            'titulo' => 'ComputerStore App', 
            'msg' => 'La tabla se ha creado'
        ));
    }
    else {
        echo json_encode(
            array(
                'ok' => false,
                'tipoMsg' => 'error',
                'titulo' => 'ComputerStore App', 
                'msg' => 'Error al crear la tabla: ' . mysqli_error($conn)
            ));
    }

    mysqli_close($conn);
 }
?>
