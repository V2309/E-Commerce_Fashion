// async function asyncHandler(fun) {

//     }
const asyncHandler = (fn) =>  {
    return async (req, res, next) => {
        try {
            await fn(req, res, next); // Gọi hàm bất đồng bộ và truyền vào req, res, next
        } catch (error) {
            console.error("Detail error: ", error); // Log ra lỗi
            console.log('error', {message: error.message, stack: error.stack}); // Log ra lỗi
            return res.status(500).json({
                message: "Lỗi server",
                error:process.env.NODE_ENV === 'development' ? error : ''  // Trả về lỗi server nếu có lỗi xảy ra
            });
        }
    }
}


export default asyncHandler; // Export asyncHandler để sử dụng ở các file khác