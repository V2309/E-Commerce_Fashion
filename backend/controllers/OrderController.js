import db from '../models';
import { Sequelize } from 'sequelize';
const {Op} = Sequelize; // So sánh trong sequelize
// Hàm bất đồng bộ để lấy danh sách đơn hàng
export async function getOrders(req, res) {
    try {
        const orders = await db.Order.findAll(); 
        res.status(200).json({
            message: 'Lấy danh sách đơn hàng thành công!',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Hàm bất đồng bộ để tạo đơn hàng
export async function insertOrder(req, res) {
    const userId = req.body.user_id;
    const userExists = await db.User.findByPk(userId);
    if (!userExists) {
        return res.status(404).json({
            message: 'Người dùng không tồn tại'
        });
    }
    const newOrder = await db.Order.create(req.body);
    if (newOrder) {
        return res.status(200).json({
            message: 'Thêm mới đơn hàng thành công!',
            data: newOrder
        });
    } else {
        return res.status(400).json({
            message: 'Không thể thêm đơn hàng!'
        });
    }
}

// Hàm bất đồng bộ để cập nhật đơn hàng
export async function updateOrder(req, res) {
      const { id } = req.params; // Lấy ID từ params
          const updated = await db.Order.update(req.body, {
            where: { id: id }
          });
      
          if(updated[0] >0 ){
              return res.status(200).json({
                  message: "Cập nhật đơn hàng thành công",
              });
          }
          else{
              return res.status(404).json({
                  message: "Không tìm thấy đơn hàng",
              });
          }
}

// Hàm bất đồng bộ để xóa đơn hàng
export async function deleteOrder(req, res) {
      const { id } = req.params; // Lấy ID từ params
        const deleted = await db.Order.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(200).json({
                message: "Xóa đơn hàng thành công"
            });
        }
        return res.status(404).json({
            message: "Không tìm thấy đơn hàng"
        });
}

// Hàm bất đồng bộ để lấy đơn hàng theo ID
export async function getOrderById(req, res) {
    const { id } = req.params
    const order = await db.Order.findByPk(id)
    if (order) {
        res.status(200).json({
            message: 'Lấy thông tin đơn hàng thành công',
            data: order
        })
    } else {
    res.status(200).json({
        message: 'Lấy chi tiết đơn hàng'
        })
    }
}
