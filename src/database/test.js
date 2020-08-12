const Database = require('./db')
const createProffy = require('./createProffy')
Database.then(async (db) => {
	//inserir  dados

	proffyValue = {
		name: "Mayk Brito",
		avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
		whatsapp: "11943569090",
		bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões." 
	}

	classValue = {
		subject: "1",
		cost: "20"
		//o proffy id virá pelo Banco de dados
	}

	classScheduleValues = [
		//class_id virá pelo banco de dados, após cadastrar a class
		{
			weekday: 1,
			time_from: 425,
			time_to: 5124
		},
		{
			weekday: 4,
			time_from: 655,
			time_to: 2124
		}
	]


	 await createProffy(db, {proffyValue, classValue, classScheduleValues})

	//Consultar os dados inseridos

	// Todos os proffys
	const selectedProffys = await db.all("SELECT * FROM proffys")
	// console.log(selectedProffys)

	//Consultar as classes de um determinado professor
	//E trazer junto os dados do professor
	const selectClassesAndProffys = await db.all(`
		SELECT classes.*, proffys.*
		FROM proffys
		JOIN classes ON (classes.proffy_id = proffys.id)
		WHERE classes.proffy_id = 1;
	`)
	// console.log(selectClassesAndProffys)

	// O horario que a pessoa trabalha, por exemplo, e das 8 até as 18
	// O horário do time_from(8) precisa ser menor ou igual ao horario solicitado
	// O time_to precisa ser acima 
	const selectClassesSchedules = await db.all(`
		SELECT classes_schedule.*
		FROM classes_schedule
		WHERE classes_schedule.class_id = "1"
		AND classes_schedule.weekday = "1"
		AND classes_schedule.time_from <= "425"
		AND classes_schedule.time_to > "425"
	`)

	//console.log(selectClassesSchedules)

})
