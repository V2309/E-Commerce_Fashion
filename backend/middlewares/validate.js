// validate de kiem tra du lieu dau vao

//
const validate = (requestType) => {
    return (req, res, next) => {
        const { error } = requestType.validate(req.body);
        if (error) {
            return res.status(400).json({
              message: "Validation Error",
              error: error.details[0].message,
            });
        }
        next();
    };
}
export default validate; // Export validate để sử dụng ở các file khác