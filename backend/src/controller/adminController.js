import adminModel from "../models/admin.js";


const adminController = {};


//SELECT
adminController.getAllAdmin = async (req, res) => {
    try {
        const clients = await adminModel.findAll();  
        return res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    };
};


//UPDATE
adminController.updateAdmin = async (req, res) => {
    try {
        
        let { name,  email, password, isVerified} = req.body;

        
        name = name.trim();
        email = email.trim();

       
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //longitud de campos
        if (name.length < 3 || name.length > 15) {
            return res.status(400).json({ message: 'Name must be between 3 and 15 characters' });
        }

   
        const clientUpdated = await adminModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            isVerified
        }, { new: true });

        if (!clientUpdated) {
            return res.status(404).json({ message: 'Admin not found' });
        }



        return res.status(200).json({message: 'Admin updated successfully'});

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
adminController.deleteAdmin = async (req, res) => {
    try {
        const AdminDeleted = await clientModel.findByIdAndDelete(req.params.id);

        if (!AdminDeleted) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        
        return res.status(200).json({ message: 'Admin deleted successfully' });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default adminController; 