import AdminService from "../services/admin.service.js";

export const getAdmin = async (req, res) => {
    try {
        const admins = await AdminService.getAllAdmin();
        if (!admins || admins.length === 0) {
            return res.sendNotFound("No se encontraron admin");
        }
        res.sendSuccess(admins);
    } catch (error) {
        res.sendServerError(error.message);
    }
};

export const getAdminById = async (req, res) => {
    try {
        const { id } = req.params;
        const admin = await AdminService.getAdminById(id);
        if(!admin){
            return res.sendNotFound("No se encontro admin con el id");
        }
        res.sendSuccess(admin);  
    } catch (error) {
        
        res.sendServerError(error.message);  
        
    }
}; 