import db from '../models';
import { Sequelize } from 'sequelize';
const {Op} = Sequelize; // So sánh trong sequelize


// Hàm bất đồng bộ để lấy danh sách sản phẩm
export async function getProducts(req, res) {
   
        // Gửi phản hồi HTTP với mã trạng thái 200 và danh sách sản phẩm
        // tim kiem va phan trang
         
        const { search='',page=1} = req.query; // Lấy trang và tên sản phẩm từ query
        const pageSize = 10; // Số lượng sản phẩm trên mỗi trang
        const offset = (page - 1) * pageSize; // Vị trí bắt đầu lấy sản phẩm
        let whereClause = {}; // Điều kiện lọc sản phẩm ban đầu
        if(search.trim() !== '') {
            whereClause = { // Điều kiện lọc sản phẩm khi có tên sản phẩm cần tìm
                name: {
                [Op.like]: `%${search}%` // Tìm sản phẩm theo tên
                    
            }    
                
            };
        }
      const [products, totalProducts] = await Promise.all([
        db.Product.findAll({
            where: whereClause, // Lọc sản phẩm
            limit: pageSize, // Số lượng sản phẩm trên mỗi trang
            offset: offset // Vị trí bắt đầu lấy sản phẩm
        }),
        db.Product.count({
            where: whereClause // Đếm tổng số sản phẩm
        })
    ]);
            res.status(200).json({
            message: "Lấy danh sách sản phẩm thành công",
            data: products, // Trả về danh sách sản phẩm
            currentPage: parseInt(page,10), // Trang hiện tại
            totalPage:Math.ceil(totalProducts/pageSize), // Tổng số trang
            total: totalProducts
        
    });
}
// Hàm bất đồng bộ để lấy sản phẩm theo ID
export async function getProductById(req, res) {
    const {id} = req.params // Lấy ID từ params
    const product = await db.Product.findByPk(id); // Tìm sản phẩm theo ID
    if (!product) {
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm",
           
        });
    }
    res.status(200).json({
        message: "Lấy sản phẩm theo ID thành công",
        data: product // Trả về sản phẩm đã tìm thấy
});
}
   
// Hàm bất đồng bộ để tạo sản phẩm
export async function insertProduct(req, res) {
   // console.log(JSON.stringify(req.body));
    const product  =  await db.Product.create(req.body);
   return res.status(201).json({
        message: "Tạo sản phẩm thành công",
        data: product // Trả về sản phẩm đã tạo tren postman
    });

}
// Hàm bất đồng bộ để cập nhật sản phẩm
export async function updateProduct(req, res) {
    const { id } = req.params; // Lấy ID từ params
    const { name } = req.body; // Lấy tên sản phẩm từ body
    if (name !== undefined){
    const existingProduct = await db.Product.findOne({
      where: { 
          name: name, 
          id: { [db.Sequelize.Op.ne]: id } }
    });
    if (existingProduct) {
      return res.status(400).json({
        message: "Tên sản phẩm đã tồn tại",
      });
    }
}
    const updated = await db.Product.update(req.body, {
      where: { id: id }
    });

    if(updated[0] >0 ){
        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
        });
    }
    else{
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm",
        });
    }


}
// Hàm bất đồng bộ để xóa sản phẩm
export async function deleteProduct(req, res) {
    const { id } = req.params; // Lấy ID từ params
    const deleted = await db.Product.destroy({
      where: {
        id: id
      }
    });

    if(deleted){
        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    }
    else{
        return res.status(404).json({
            message: "Không tìm thấy sản phẩm",
        });
    }
}
    // san pham theo danh muc
    export async function getProductsByCategory(req, res) {
        const { categoryId } = req.params;
        const products = await db.Product.findAll({
          where: {
            category_id: categoryId
          }
        });
        res.status(200).json({
          message: 'Lấy danh sách sản phẩm theo danh mục thành công',
          data: products
        });
      }


