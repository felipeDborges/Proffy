// Procurar o Botão
document.querySelector("#add-time")
// Quando clicar no botão
.addEventListener('click', cloneField)

// Executar uma ação
function cloneField() {

		// Duplicar os campos
		const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true) // boolean: true or false
		
		// Limpar os campos
		const fields = newFieldContainer.querySelectorAll('input')

		fields.forEach(function(field){
			field.value = ""
		})
		// Colocar na página
		document.querySelector('#schedule-items').appendChild(newFieldContainer)		
}

