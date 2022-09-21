const express = require('express');
const apiRouter = require('./routers/app.routes');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use("/api/productos",apiRouter);
const server = app.listen(PORT, () => {
  console.log(`SERVIDOR ACTIVO ESCUCHANDO EN EL PUERTO  ${server.address().port}`);
});
server.on('ERROR', (error) => {
  console.log(error.message);
});
