// Seleccionamos el cuerpo del documento
const body = document.body;

// Creamos un elemento div para la linterna
const spotlight = document.createElement('div');
spotlight.style.position = 'absolute';
spotlight.style.width = '1px';
spotlight.style.height = '1px';
// spotlight.style.borderRadius = '50%';
// spotlight.style.background = 'radial-gradient(circle, rgba(30, 60, 114, 0.2) 1%, rgba(42, 82, 152, 0.2) 60%, rgba(255, 255, 255, 0) 100%)';
spotlight.style.boxShadow = '0 0 100px 100px rgb(255, 255, 255, 0.2)';
spotlight.style.pointerEvents = 'none';
// spotlight.style.transform = 'translate(-50%, -50%)';
// spotlight.style.zIndex = '10';

// Añadimos el div al cuerpo
body.appendChild(spotlight);

// Actualizamos la posición del div según el movimiento del ratón
body.addEventListener('mousemove', (event) => {
    spotlight.style.left = `${event.clientX}px`;
    spotlight.style.top = `${event.clientY}px`;
});