// variavel para contar as urls
var pageCounter = 1;

// variavel para popular a div
var animalContainer = document.querySelector(".animal-info");

// botao que aciona o AJAX
var btn = document.querySelector('#btn');

// funco para ler o data AJAX
btn.addEventListener('click', function() {
	
	// variavel para novas requisiçoes
	var ourRequest = new XMLHttpRequest();

	// faz o request
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

	// caso conexao ok, traz o conteudo
	ourRequest.onload = function() {

		// se o servidor retornar um erro
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);	
		} else {
			console.log('we connected to the server, but it returned an error.');
		}		
	};

	// caso erro de conexão
	ourRequest.onerror = function(){
		console.log('Connection error');
	}

	// faz o request
	ourRequest.send();

	pageCounter++;
	if(pageCounter > 3){
		btn.classList.add('hide-me');
	}
})

function renderHTML(data){
	htmlString = '';

	for(i = 0; i < data.length; i++){
		htmlString += '<p>' + data[i].name + ' is a ' + data[i].species + ' that likes to eat ';

		for (ii = 0; ii < data[i].foods.likes.length; ii++) {
			if (ii == 0) {
				htmlString += data[i].foods.likes[ii];
			} else {
				htmlString += ' and ' + data[i].foods.likes[ii];
			}
		}

		htmlString += ' and dislikes ';

		for (ii = 0; ii < data[i].foods.dislikes.length; ii++) {
			if (ii == 0) {
				htmlString += data[i].foods.dislikes[ii];
			} else {
				htmlString += ' and ' + data[i].foods.dislikes[ii];
			}
		}
	}

	animalContainer.insertAdjacentHTML('beforeend',htmlString);
}