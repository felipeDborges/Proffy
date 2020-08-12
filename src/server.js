//Servidor
const express = require("express")
const server = express()

const {
	pageLanding,
	pageStudy,
	pageGiveClasses,
	saveClasses
} = require("./pages")


//Configurar nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
	express: server,
	noCache: true, 
})

server
// Receber os dados do req.body
.use(express.urlencoded( {extended: true} ))
// Configurar arquivos estáticos (css, imagens, scripts)
.use(express.static("public"))
// Rotas de aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5000)