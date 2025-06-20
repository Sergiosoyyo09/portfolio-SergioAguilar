var dirCuenta = 0; propAhorro = 0, fechaLimite = new Date(Date.now()), salarioMensual = 0, gastosFijos = 0, gastosVariables = 0;
var calculoGastosTotales = 0;
var ahorroMensual = 0, ahorroNecesario = 0, difAhorro = 0;

if ((localStorage.getItem('dirCuenta') != '') ||
    (localStorage.getItem('propAhorro') != '') ||
    (localStorage.getItem('fechaLimite') != '') ||
    (localStorage.getItem('salarioMensual') != '') ||
    (localStorage.getItem('gastosFijos') != '') ||
    (localStorage.getItem('gastosVariables') != '')) {
    dirCuenta = parseFloat(localStorage.getItem('dirCuenta'));
    document.getElementById("dirCuenta").value = dirCuenta;
    tostada('dirCuenta', dirCuenta, 'Dinero en la Cuenta: ', '€. <hr> En este campo se indica que dinero que tienes actualmente.');

    propAhorro = parseFloat(localStorage.getItem('propAhorro'));
    document.getElementById("propAhorro").value = propAhorro;
    tostada('propAhorro', propAhorro, 'Proposición de Ahorro: ', '€. <hr> En este campo se indica la cantidad de dinero que te has propuesto ahorrar.');

    fechaLimite = new Date(localStorage.getItem('fechaLimite'));
    document.getElementById("fechaLimite").value = fechaLimite.getFullYear() + "-" + String(fechaLimite.getMonth() + 1).padStart(2, '0') + "-" + String(fechaLimite.getDate()).padStart(2, '0');
    console.log(String(fechaLimite.getMonth() + 1).padStart(2, '0'))
    tostada('fechaLimite', String(fechaLimite.getDate()).padStart(2, '0') + "/" + String(fechaLimite.getMonth() + 1).padStart(2, '0') + "/" + fechaLimite.getFullYear(), 'Fecha Límite: ', '.<hr> En este campo se indica la fecha límite hasta la cual quieres ahorrar.');
    // alert(fechaLimite.getFullYear() + "-" + fechaLimite.getMonth() + "-" + fechaLimite.getDate())

    salarioMensual = parseFloat(localStorage.getItem('salarioMensual'));
    document.getElementById("salarioMensual").value = salarioMensual;
    tostada('salarioMensual', salarioMensual, 'Salario Mensual: ', '€. <hr> En este campo se indica el salario mensual para calcular si este mes has tenido gastos.');

    gastosFijos = parseFloat(localStorage.getItem('gastosFijos'));
    document.getElementById("gastosFijos").value = gastosFijos;
    tostada('gastosFijos', gastosFijos, 'Gastos Fijos: ', '€. <hr> En este campo se indican los gastos fijos.');

    gastosVariables = parseFloat(localStorage.getItem('gastosVariables'));
    document.getElementById("gastosVariables").value = gastosVariables;
    tostada('gastosVariables', gastosVariables, 'Gastos Variables: ', '€. <hr> En este campo se indica algún gasto imprevisto que se tenga.');

    calcularIngresos();
    calcularProposicion();
}

document.getElementById("dirCuenta").onchange = () => {
    dirCuenta = parseFloat(document.getElementById("dirCuenta").value);
    dirCuenta = (isNaN(dirCuenta) ? parseFloat(0) : dirCuenta);

    localStorage.setItem('dirCuenta', dirCuenta);
    calcularProposicion();
    tostada('dirCuenta', dirCuenta, 'Dinero en la Cuenta: ', '€. <hr> En este campo se indica que dinero que tienes actualmente.');
}

document.getElementById("propAhorro").onchange = () => {
    propAhorro = parseFloat(document.getElementById("propAhorro").value);
    propAhorro = (isNaN(propAhorro) ? parseFloat(0) : propAhorro);

    localStorage.setItem('propAhorro', propAhorro);
    calcularProposicion();
    tostada('propAhorro', propAhorro, 'Proposición de Ahorro: ', '€. <hr> En este campo se indica la cantidad de dinero que te has propuesto ahorrar.');
}

document.getElementById("fechaLimite").onchange = () => {
    fechaLimite = new Date(document.getElementById("fechaLimite").value);

    localStorage.setItem('fechaLimite', fechaLimite);
    calcularProposicion();
    tostada('fechaLimite', String(fechaLimite.getDate()).padStart(2, '0') + "/" + String(fechaLimite.getMonth() + 1).padStart(2, '0') + "/" + fechaLimite.getFullYear(), 'Fecha Límite: ', '.<hr> En este campo se indica la fecha límite hasta la cual quieres ahorrar.');
}

document.getElementById("salarioMensual").onchange = () => {
    salarioMensual = parseFloat(document.getElementById("salarioMensual").value);
    salarioMensual = (isNaN(salarioMensual) ? parseFloat(0) : salarioMensual);

    localStorage.setItem('salarioMensual', salarioMensual);
    calcularIngresos();
    tostada('salarioMensual', salarioMensual, 'Salario Mensual: ', '€. <hr> En este campo se indica el salario mensual para calcular si este mes has tenido gastos.');
}

document.getElementById("gastosFijos").onchange = () => {
    gastosFijos = parseFloat(document.getElementById("gastosFijos").value);
    gastosFijos = (isNaN(gastosFijos) ? parseFloat(0) : gastosFijos);
    gastosVariables = (isNaN(gastosVariables) ? parseFloat(0) : gastosVariables);

    localStorage.setItem('gastosFijos', gastosFijos);
    calcularIngresos();
    tostada('gastosFijos', gastosFijos, 'Gastos Fijos: ', '€. <hr> En este campo se indican los gastos fijos.');
}

document.getElementById("gastosVariables").onchange = () => {
    gastosVariables = parseFloat(document.getElementById("gastosVariables").value);
    gastosVariables = (isNaN(gastosVariables) ? parseFloat(0) : gastosVariables);
    gastosFijos = (isNaN(gastosFijos) ? parseFloat(0) : gastosFijos);

    localStorage.setItem('gastosVariables', gastosVariables);
    calcularIngresos();
    tostada('gastosVariables', gastosVariables, 'Gastos Variables: ', '€. <hr> En este campo se indica algún gasto imprevisto que se tenga.');
}

function calcularIngresos() {

    calculoGastosTotales = gastosFijos + gastosVariables;
    if (calculoGastosTotales > salarioMensual) {
        document.getElementById("calculoGastosTotales").style.color = "red";
        document.getElementById("calculoGastosTotales").style.fontWeight = "bolder";
    } else if (calculoGastosTotales < salarioMensual) {
        document.getElementById("calculoGastosTotales").style.color = "green";
        document.getElementById("calculoGastosTotales").style.fontWeight = "bolder";
    } else {
        document.getElementById("calculoGastosTotales").style.color = "black";
        document.getElementById("calculoGastosTotales").style.fontWeight = "normal";
    }

    if (isNaN(calculoGastosTotales)) 
        calculoGastosTotales = 0;

    document.getElementById("calculoGastosTotales").textContent = calculoGastosTotales + " €";

    ahorroMensual = salarioMensual - calculoGastosTotales;

    if (ahorroMensual > 0) {
        document.getElementById("ahorroMensual").style.color = "green";
        document.getElementById("ahorroMensual").style.fontWeight = "bolder";
    } else if (ahorroMensual < 0) {
        document.getElementById("ahorroMensual").style.color = "red";
        document.getElementById("ahorroMensual").style.fontWeight = "bolder";
    } else {
        document.getElementById("ahorroMensual").style.color = "black";
        document.getElementById("ahorroMensual").style.fontWeight = "normal";
    }

    if (isNaN(ahorroMensual)) 
        ahorroMensual = 0;

    document.getElementById("ahorroMensual").textContent = parseFloat(ahorroMensual.toFixed(2));
}

function calcularProposicion() {
    let fechaActual = new Date();
    let difAnios = fechaLimite.getFullYear() - fechaActual.getFullYear();
    let difMeses = fechaLimite.getMonth() - fechaActual.getMonth();

    let mesesRestantes = (difAnios * 12) + difMeses;

    mesesRestantes = (mesesRestantes > 0 ? mesesRestantes : 'X');
    document.getElementById("mesesRestantes").textContent = mesesRestantes;

    difAhorro = propAhorro - dirCuenta;
    ahorroNecesario = difAhorro / mesesRestantes;

    if (ahorroNecesario > 0) {
        document.getElementById("ahorroNecesario").style.color = "red";
        document.getElementById("ahorroNecesario").style.fontWeight = "bolder";
    } else if (ahorroNecesario < 0) {
        document.getElementById("ahorroNecesario").style.color = "green";
        document.getElementById("ahorroNecesario").style.fontWeight = "bolder";
    } else {
        document.getElementById("ahorroNecesario").style.color = "black";
        document.getElementById("ahorroNecesario").style.fontWeight = "normal";
    }

    if (isNaN(ahorroNecesario))
        ahorroNecesario = 0; 
    document.getElementById("ahorroNecesario").textContent = parseFloat(ahorroNecesario.toFixed(2));

    if (difAhorro > 0) {
        document.getElementById("difAhorro").style.color = "red";
        document.getElementById("difAhorro").style.fontWeight = "bolder";
    } else if (difAhorro < 0) {
        document.getElementById("difAhorro").style.color = "green";
        document.getElementById("difAhorro").style.fontWeight = "bolder";
    } else {
        document.getElementById("difAhorro").style.color = "black";
        document.getElementById("difAhorro").style.fontWeight = "normal";
    }

    if (isNaN(difAhorro))
        difAhorro = 0;
    document.getElementById("difAhorro").textContent = parseFloat(difAhorro.toFixed(2)) + " €";
}

//-----------------------------------------------------------------------------------------------------------------------------------
const alertPlaceholder = document.getElementById('divInfoBasica')
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('bInfoBasica')
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert("Esta pequeña App nace de mi propia necesidad de controlar mis gastos. <hr> Es una aplicación simple pero eficaz, calcula lo que has ahorrado en lo que va de mes según lo que has ingresado y lo que has gastado. <br><br>Calcula también lo que tienes que ahorrar cada mes según te propongas, es decir, añades el dinero que tienes en la cuenta, y el dinero que te gustaría tener en X meses vista, y te indica lo que tienes que ahorrar cada mes desde este momento.", 'primary')
    })
}

function tostada(elementoString, elementoValue, titulo, mensaje) {
    const toastLiveExample = document.getElementById('liveToast');
    const toastTrigger = document.getElementById('' + elementoString);

    if (isNaN(elementoValue)) 
        elementoValue = 0;

    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastTrigger.addEventListener('focus', () => {
            document.getElementById("info").innerHTML = "";
            document.getElementById("info").innerHTML = "Info: " + titulo + elementoValue + mensaje;
            toastBootstrap.show()
        })
    }
}

const eMail = document.getElementById('eMail');
const tooltipEMail = new bootstrap.Tooltip('#eMail', {
    boundary: document.body // or document.querySelector('#boundary')
})

const eLinkedin = document.getElementById('eLinkedin');
const tooltipELinkedin = new bootstrap.Tooltip('#eLinkedin', {
    boundary: document.body // or document.querySelector('#boundary')
})

const eGithub = document.getElementById('eGithub');
const tooltipEGithub = new bootstrap.Tooltip('#eGithub', {
    boundary: document.body // or document.querySelector('#boundary')
})