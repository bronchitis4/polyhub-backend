import Category from '../models/category.model.js'

class CategoriesController {
    getAllCategories = async (req, res) => {
        try {
            const categories = await Category.findAll();
            if(!categories.length)
                throw new Error("Categories not found");
            
            res.status(200).json({
                statusCode: 200,
                error: null,
                message: "Категорії знайдено успішно",
                successful: true,
                data: newComment
            });  
        }catch(error) {
            return res.status(400).json({
                statusCode: 400,
                error: error.message,
                message: "Категорії не знайдено",
                successful: false,
                data: []
            })
        }
    }
}

export default CategoriesController;