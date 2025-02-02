import AdminModel from "../models/admin.model.js";
import AdminDTO from "../dtos/admin.dto.js";

export default class AdminDAO {

    static async getAllAdmin() {
        return await AdminModel.find();
    }

    static async getAdminById(id) {
        return await AdminModel.findById(id);
    }
    

    static async findByEmail(email) {
        return await AdminModel.findOne({ email });
    }

    static async createAdmin(data) {
        const admin = await AdminModel.create(data);
        return new AdminDTO(admin)
    }

    
    static async getByEmail(email) {
        return await AdminModel.findOne({ email });
    }

    static async updateAdmin(id, updatedData) {
        return await AdminModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    static async deleteAdmin(id) {
        return await AdminModel.findByIdAndDelete(id);
    }
    
}
