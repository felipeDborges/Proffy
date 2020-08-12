module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
	// inserir dados na table de proffys
	const insertedProffy = await db.run(`
		INSERT INTO proffys (
			name,
			avatar,
			whatsapp,
			bio
		) VALUES (
			"${proffyValue.name}",
			"${proffyValue.avatar}",
			"${proffyValue.whatsapp}",
			"${proffyValue.bio}"
		);
	`)

	const proffy_id = insertedProffy.lastID

	// Inserir dados na tabale classes
	const insertdClass = await db.run(`
			INSERT INTO CLASSES (
				subject,
				cost,
				proffy_id
			) VALUES (
				"${classValue.subject}",
				"${classValue.cost}",
				"${proffy_id}"
			);
	`)

	const class_id = insertdClass.lastID

	// Inserir dados na tabela class_schedule
	const insertedAllclassScheduleValues = classScheduleValues.map((classScheduleValue) => {
		return db.run(`
			INSERT INTO classes_schedule (
				class_id,
				weekday,
				time_from,
				time_to
			) VALUES (
				"${class_id}",
				"${classScheduleValue.weekday}",
				"${classScheduleValue.time_from}",
				"${classScheduleValue.time_to}"
			);
		`)
	})

	// Vou executar todos os db.runs() das class_schudules
	await Promise.all(insertedAllclassScheduleValues)
}