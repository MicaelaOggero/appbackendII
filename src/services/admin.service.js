import AdminDTO from "../dtos/admin.dto.js";
import AdminDAO from "../daos/admin.dao.js";

export default class AdminService {

    static async getAllAdmin() {

        try {
            const admins = await AdminDAO.getAllAdmin();
            return admins.map(admin => new AdminDTO(admin));
        } catch (error) {
            console.log(error)
            return null
        }
        
    }
    
    static async getAdminById(id) {
        try {

            const admin = await AdminDAO.getAdminById(id);

            return new AdminDTO(admin);
            
        } catch (error) {
            console.log(error)
            return null
        }
    }

    static async getAdminByEmail(email) {
        const admin = await AdminDAO.getByEmail(email);
        return admin;
    }

    static async createAdmin(data) {
        const newAdmin = await AdminDAO.createAdmin(data);
        return new AdminDTO(newAdmin);
    }
}
