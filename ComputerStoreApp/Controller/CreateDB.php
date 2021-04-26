<?php
    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    $conn = mysqli_connect($servername, $username, $password);

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
        // Create database
        $sql = "CREATE DATABASE DBUnad12";
        if (mysqli_query($conn, $sql)) {
            echo json_encode(
                array(
                    'ok' => true,
                    'tipoMsg' => 'success',
                    'titulo' => 'ComputerStore App', 
                    'msg' => 'La base de datos se ha creado'
                ));
        }
        else {
            echo json_encode(
            array(
                'ok' => false,
                'tipoMsg' => 'error',
                'titulo' => 'ComputerStore App', 
                'msg' => 'Error al crear la base de datos: ' . mysqli_error($conn)
            ));
        }

        mysqli_close($conn); 
    }
?> 