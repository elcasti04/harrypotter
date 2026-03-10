import app from './app.js';
import sequelize from '../db/conect.js';

const PORT = process.env.PORT || 3000;

const initServer = async () => {
	try {
		if (process.env.DATABASE_URL) {
			console.log('conectando base de datos...');
			await sequelize.authenticate();
			await sequelize.sync({ force: false });
            await sequelize.sync({ alter: true })
			console.log('base de datos conectada');
		} else {
			console.log('no su pudo establecer conexion con la base de datos');
		}
		app.listen(PORT, () => {
			console.log(`Server is running on port http://localhost:${PORT}`);
		});
	} catch (error) {
        console.log(`ups... algo salio mal: ${error}`)
        process.exit(1)
    }
};

initServer()