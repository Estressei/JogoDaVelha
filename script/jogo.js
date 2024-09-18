const quadElements = document.querySelectorAll("[data-quad]") //seleciona todos os quad, passando o atributo data-quad

for(const quad of quadElements){ //para add em cada quad um evento chamado click
    quad.addEventListener('click', handleClick, {once: true}); //evento chama handle que so acontece uma vez, no primeiro click
}
const handleClick = () => {
    //colocar x ou circulo 
}