import Usuario from '../models/usuarioModel.js';
import bcrypt from 'bcrypt';

const adminData = {
    email: 'admin@admin.com',
    senha: 'admin123',
};
const createAdminUser = async () => {

    const hashedPassword = await bcrypt.hash(adminData.senha, 10);
    adminData.senha = hashedPassword;
    const admin = new Usuario(adminData);
    await admin.save();
    console.log('USER ADMIN CRIADO!!');
};

const initConfig = async () => {
    let x = await Usuario.findOne({ email: adminData.email });
    if (!x || x.email != adminData.email) {
        await createAdminUser();
    }
};

export default initConfig;
