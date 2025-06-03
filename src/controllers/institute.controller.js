import Institute from '../models/institute.model.js'

class InstituteController { 
    getInstitutes = async (req, res) => {
        try {
            const institutes = await Institute.findAll({attributes: ["id", "name"]})
            
            if(!institutes)
                throw Error("Not found institutes");

            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Інститутів знайдено!",
                successful: true,
                data: institutes
            })

        }catch(error) {
            return res.status(500).json({
                 statusCode: 500,
                error: error.message,
                message: "Інститутів не знайдено!",
                successful: false,
                data: []
            })
        }
    }
}

export default InstituteController;