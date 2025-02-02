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

export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedAdmin = await AdminService.updateAdmin(id, updatedData);

        if(!updatedAdmin){
            return res.sendNotFound("No se editaron los datos del administrador");
        }
        res.sendSuccess(updateAdmin);
    } catch (error) {
        res.sendServerError(error.message);
    }
};


export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        await AdminService.deleteAdmin(id);
        res.sendSuccess("Admin deleted successfully");
    } catch (error) {
        res.sendServerError(error.message);
    }
}