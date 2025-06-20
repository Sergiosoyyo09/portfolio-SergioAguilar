<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

function obtenerPalabraAleatoria()
{
    // Generar un número aleatorio entre 1 y 6
    $numeroAleatorio = rand(1, 6);

    switch ($numeroAleatorio) {
        case 1:
            $nombreArchivo = "./lemarios/apellidos-es.txt";
            break;
        case 2:
            $nombreArchivo = "./lemarios/entidades-territoriales.txt";
            break;
        case 3:
            $nombreArchivo = "./lemarios/lemario-general-del-espanol.txt";
            break;
        case 4:
            $nombreArchivo = "./lemarios/nombres-propios-es.txt";
            break;
        case 5:
            $nombreArchivo = "./lemarios/verbos-espanol-conjugaciones.txt";
            break;
        case 6:
            $nombreArchivo = "./lemarios/verbos-espanol.txt";
            break;
    }

    // Construir el nombre del archivo basado en el número aleatorio
    // $nombreArchivo = "./lemarios/archivo" . $numeroAleatorio . ".txt";

    // Verificar si el archivo existe
    if (!file_exists($nombreArchivo)) {
        return "El archivo no existe.";
    }

    // Leer el contenido del archivo en un array de líneas
    $lineas = file($nombreArchivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    // Contar el número de líneas en el archivo
    $numeroDeLineas = count($lineas);

    // Seleccionar una línea aleatoria del archivo
    $lineaAleatoria = $lineas[array_rand($lineas)];

    // Devolver la palabra aleatoria y el número de líneas del archivo
    return [
        'palabra' => $lineaAleatoria,
        'numeroDeLineas' => $numeroDeLineas
    ];
}

// Ejemplo de uso
$resultado = obtenerPalabraAleatoria();
// echo "Palabra aleatoria: " . $resultado['palabra'] . "\n";
// echo "Número de líneas en el archivo: " . $resultado['numeroDeLineas'] . "\n";
echo json_encode($resultado);
