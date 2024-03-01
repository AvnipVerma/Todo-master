export const AppError = (message, statusCode, res) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};