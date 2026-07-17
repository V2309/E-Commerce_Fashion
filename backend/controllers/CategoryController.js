import db from '../models';
import { Sequelize } from 'sequelize';
// Hàm bất đồng bộ để lấy danh sách danh mục
const {Op} = Sequelize; // So sánh trong sequelize

export async function getCategories(req, res) {
    const categories = await db.Category.findAll(); // Lấy tất cả danh mục
    res.status(200).json({
        message: 'Lấy danh sách danh mục thành công',
        data: categories // Trả về danh sách danh mục
    });

}
// export async function getCategories(req, res) {
//     const { search = '', page = 1 } = req.query; 
//     const pageSize = 5; 
//     const offset = (page - 1) * pageSize; 

//     let whereClause = {}; 
//     if (search.trim() !== '') {
//         whereClause = {
//             name: {
//                 [Op.like]: `%${search}%` 
//             }
//         };
//     }
//     const [categories, totalCategories] = await Promise.all([
//         db.Category.findAll({
//             where: whereClause,
//             limit: pageSize, 
//             offset: offset 
//         }),
//         db.Category.count({
//             where: whereClause 
//         })
//     ]);
//     res.status(200).json({
//         message: 'Lấy danh sách danh mục thành công',
//         data: categories,
//         currentPage: parseInt(page, 10),
//         totalPages: Math.ceil(totalCategories / pageSize),
//         total :totalCategories
//     });

// }


// Hàm bất đồng bộ để tạo danh mục
// Hàm bất đồng bộ để tạo danh mục
export async function insertCategory(req, res) {
   const category  =  await db.Category.create(req.body);
     return res.status(201).json({
          message: "Tạo danh mục sản phẩm thành công",
          data: category // Trả về sản phẩm đã tạo tren postman
      });
}

// Hàm bất đồng bộ để cập nhật danh mục
export async function updateCategory(req, res) {
  const { id } = req.params; // Lấy ID từ params
  const { name } = req.body; 
  if (name !== undefined){
    const existingCategory = await db.Category.findOne({
        where: { 
            name: name, 
            id: { [db.Sequelize.Op.ne]: id } 
        }
        
      });
 
  
  if (existingCategory) {
    return res.status(400).json({
      message: "Tên danh mục đã tồn tại",
    });
  }
}
   else {
    const updated = await db.Category.update(req.body, {
        where: { id: id }
      });

      if(updated[0] >0 ){
          return res.status(200).json({
              message: "Cập nhật danh mục sản phẩm thành công",
          });
      }
      else{
          return res.status(404).json({
              message: "Không tìm thấy danh mục sản phẩm",
          });
      }
   }
  
}

// Hàm bất đồng bộ để xóa danh mục
export async function deleteCategory(req, res) {
    const { id } = req.params; // Lấy ID từ params
    const deleted = await db.Category.destroy({
        where: { id: id }
    });
    if (deleted) {
        return res.status(200).json({
            message: "Xóa danh mục thành công"
        });
    }
    return res.status(404).json({
        message: "Không tìm thấy danh mục"
    });
}

// Hàm bất đồng bộ để lấy danh mục theo ID
export async function getCategoryById(req, res) {
    const { id } = req.params; // Lấy ID từ params
    const category = await db.Category.findByPk(id); // Tìm danh mục theo ID
    if (!category) {
        return res.status(404).json({
            message: "Không tìm thấy danh mục"
        });
    }
    res.status(200).json({
        message: "Lấy danh mục theo ID thành công",
        category: category // Trả về danh mục được tìm thấy
    });
}