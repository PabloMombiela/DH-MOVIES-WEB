const http = require('http');
const fs = require('fs');
const pelis = require("./peliculas")
const consultass = require("./preguntas frecuentes")
const consultas = require("./teatros")


// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':
			
			let listado = " "
			for(let i = 0; i < pelis.length; i++){
				listado += `- ${pelis[i].title} <br/>`}
		
				let puntoA = `
			  Bienvenidos a DH pelis el mejor sitio para encontrar las mejores
				  películas, incluso mucho mejor que Netflix, Cuevana y PopCorn.<br/>
				  <br/>
			  Total de Peliculas: ${pelis.length}<br/>
			  <br/>
			  Listado de Peliculas: 
			  <br/>
			  ${listado}
			 <br/>
			  Recordá que podés visitar las secciones:
			  <a href="/mas-votadas">Mas Votadas</a>
					 
					 <a href="/en-cartelera">En cartelera</a>
					 
					 <a href="/sucursales">Sucursales</a>
					 
					 <a href="/contacto">Contacto</a>
					 
					 <a href="/preguntas-frecuentes">Preguntas Frecuentes</a>
			 
			  `
			res.end(puntoA);
			
			
		break;
		// En cartelera
		case '/en-cartelera':
			
			

		let listaconreseña = " "
			for(let i = 0; i < pelis.length; i++){
				listaconreseña += `- ${pelis[i].title } <br/>. ${pelis[i].overview}`}

		
				let puntoB = `En Cartelera
				<br/>
				<br/>
				<br/>
				Total de Peliculas: ${pelis.length}
				<br/>
				<br/>
				 Reseñas:
				 <br/>
			${listaconreseña}
			`
		
		
		res.end(puntoB);
			break;
		case '/mas-votadas':
		
			let losTitulos = [];
			let totalPelis = [];
			
			function masVotadas(vote_average){
				for(let i = 0; i < pelis.length; i++){
					if (pelis[i].vote_average >= 7){
						losTitulos.push(pelis[i].title);
						totalPelis.push(pelis[i]);
					}
				}
				return losTitulos;
			}
			
			let votadas = masVotadas();
		
let acumuladorRating = 0;

function Rating (vote_average){

for(let i = 0; i < pelis.length; i++){
	if(pelis[i].vote_average >=7){
		acumuladorRating += pelis[i].vote_average;
	}
}
return acumuladorRating/votadas.length
}
		
	let listaDePelisMasVotadas = " "
	
	for (let i = 0; i < totalPelis.length; i++){
		listaDePelisMasVotadas += totalPelis[i].title + " " + totalPelis[i].vote_average + " " + totalPelis[i].overview

	}
			


let puntoC = `Más Votadas
		<br/>
		<br/>
Total de Peliculas: ${votadas.length}
<br/>
<br/>
Promedio Rating: ${Rating()}
<br/>
<br/>
Listado de Peliculas: ${listaDePelisMasVotadas}
		
		
		`
		
		
		
		
		
		res.end(puntoC);
			break;
		case '/sucursales':
			
			let totalComplejos = " "
	
			for (let i = 0; i < consultas.length; i++){
				totalComplejos += consultas[i].name + " " + consultas[i].address + " " + consultas[i].description
		
			}
		
		
		let puntoD = ` Nuestros Complejos
		<br/>
		<br/>
		Total de Complejos: ${consultas.length}
		<br/>
		<br/>
		Listado de Complejos: ${totalComplejos}
		
		
		`  
		
		
		res.end(puntoD);
			break;
		case '/contacto':
			let puntoE = ` Contáctanos!!!
			<br/>
			<br/>
			¿Queres decirnos algo?
			<br/>
			<br/>
			Nos encanta escuchar a nuestros
			clientes. Si deseas contactarnos podés escribirnos al siguiente email:
			dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta,
			sugerencia o reclamo y será respondido a la brevedad posible. Recordá que
			también podes consultar la sección de Preguntas Frecuentes para obtener
			respuestas inmediatas a los problemas más comunes.
			
			`
		
		res.end(puntoE);
			break;
		case '/preguntas-frecuentes':
			
			let preguntas = " "
	
			for (let i = 0; i < consultass.length; i++){
				preguntas += consultass[i].faq_title + " " + consultass[i].faq_answer 
		
			}
		
		
		let puntoF = `Preguntas Frecuentes
			<br/>
			<br/>
	Estas ${consultass.length} son las mas importates!!!
	<br/>
	<br/>
Listado de Consultas: ${preguntas}
			`
		
		
		res.end(puntoF);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));
