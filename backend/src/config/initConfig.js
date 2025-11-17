import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

const createAdminUser = async () => {
    const adminData = {
        email: 'admin',
        senha: 'admin',
    };
    const hashedPassword = await bcrypt.hash(adminData.senha, 10);
    adminData.senha = hashedPassword;
    const admin = new Usuario(adminData);
    await admin.save();
    console.log('USER ADMIN CRIADO!!');
};

const initConfig = async () => {
    let x = await Usuario.findOne({ email: 'admin' });
    if (!x || x.email != "admin") {
        await createAdminUser();
    }
};

export default initConfig;
