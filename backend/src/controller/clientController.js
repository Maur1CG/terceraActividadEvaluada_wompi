import clientModel from '../models/client.js';


const clientController = {};


//SELECT
clientController.getAllClients = async (req, res) => {
    try {
        const clients = await clientModel.findAll();  
        return res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    };
};


//UPDATE
clientController.updateClient = async (req, res) => {
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

   
        const clientUpdated = await clientModel.findByIdAndUpdate(req.params.id, {
            name,
            email,
            password,
            isVerified
        }, { new: true });

        if (!clientUpdated) {
            return res.status(404).json({ message: 'Client not found' });
        }



        return res.status(200).json({message: 'Client updated successfully'});

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

//DELETE
clientController.deleteClient = async (req, res) => {
    try {
        const clientDeleted = await clientModel.findByIdAndDelete(req.params.id);

        if (!clientDeleted) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        return res.status(200).json({ message: 'Client deleted successfully' });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default clientController;