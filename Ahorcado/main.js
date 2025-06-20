var palabraOculta = "";
var obj = "";
var intentosFallidos = 0;

document.getElementById("bJugar").onclick = () => { 
    document.getElementById("bJugar").innerHTML = "Solicitar otra palabra";
    document.getElementById("inputLetras").value = "";
    intentosFallidos = 0;
    document.getElementById("intentosFallidos").innerHTML = intentosFallidos;
    document.getElementById("letrasIntentadas").innerHTML = "";
    document.getElementById("inputLetras").disabled = false;
    document.getElementById("bEnviarLetra").disabled = false;
    document.getElementById("image").src = ""; 
    document.getElementById("resolucion").innerHTML = "";

    fetch('main.php')
    .then(response => response.json())
    .then(data => { 
        obj = (data.palabra).toLowerCase();
        palabraOculta = data.palabra.replace(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '_').split('').join(' ');

        document.getElementById("palabraSecreta").innerHTML = palabraOculta; 
    })
    .catch(error => {
        console.error(error);
    });
}

document.getElementById("bEnviarLetra").onclick = () => {
    let letra = (document.getElementById("inputLetras").value).toLowerCase();  
    let letraTilde = null;

    if (esVocal(letra)) {  
        const vocalesConTilde = {
            'a': ['á'],
            'e': ['é'],
            'i': ['í'],
            'o': ['ó'],
            'u': ['ú']
        }; 

        letraTilde = vocalesConTilde[letra][0];  
    }

    let letraEncontrada = ((obj.indexOf(letra) !== -1) || (obj.indexOf(letraTilde) !== -1));  

    if (letraEncontrada) {
        let palabraArray = palabraOculta.split(' ');
        for (let i = 0; i < obj.length; i++) {
            if (obj[i] === letra || obj[i] === letraTilde) {
                palabraArray[i] = obj[i];
            }
        }
        palabraOculta = palabraArray.join(' ');
        document.getElementById("palabraSecreta").innerHTML = palabraOculta;  
        
        if (!palabraOculta.includes('_')) {
            document.getElementById("resolucion").innerHTML = "¡Felicidades! Has ganado. ";
            document.getElementById("bJugar").innerHTML = "Jugar de Nuevo";
            document.getElementById("inputLetras").disabled = true;
            document.getElementById("bEnviarLetra").disabled = true; 
        }
    } else { 
        intentosFallidos++;
        document.getElementById("intentosFallidos").innerHTML = intentosFallidos;
        document.getElementById("letrasIntentadas").innerHTML += letra.toUpperCase() + " "; 
            switch (intentosFallidos) {
                case 1:
                    
                    document.getElementById("image").src = "./resources/plataforma.png";
                    break;
                case 2:
                    document.getElementById("image").src = "./resources/cabeza.png";
                    break;
                case 3:
                    document.getElementById("image").src = "./resources/cuerpo.png";
                    break;
                case 4:
                    document.getElementById("image").src = "./resources/1brazo.png";
                    break;
                case 5:
                    document.getElementById("image").src = "./resources/2brazo.png";
                    break;
                case 6:
                    document.getElementById("image").src = "./resources/1pierna.png";
                    break;
                case 7:
                    document.getElementById("image").src = "./resources/2pierna.png";
                    break;
                case 8:
                    document.getElementById("image").src = "./resources/fin.png";
                    document.getElementById("bJugar").innerHTML = "Jugar de Nuevo";
                    document.getElementById("inputLetras").disabled = true;
                    document.getElementById("bEnviarLetra").disabled = true; 

                    document.getElementById("resolucion").innerHTML = "Lo siento, has perdido. La palabra era: " + obj.toUpperCase();
                    break;
                default:
                    console.log("Número de intentos no válido.");
            } 
    }

    document.getElementById("inputLetras").value = "";
}

function esVocal(letra) {
    return ['a', 'e', 'i', 'o', 'u'].includes(letra);
}
 