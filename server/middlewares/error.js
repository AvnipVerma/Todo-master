class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const globalErrorHandler = (err, req, res, next) => {
    try {
        console.log("aaaaaaaaaaaaaaaaaaaa")
        err.message = err.message || "Something went wrong! Please try again after some time";
        err.statusCode = err.statusCode || 500;
        console.log(err.statusCode, 1111111111111);
        return res.status(err.statusCode).json(
            {
                success: false,
                message: err.message,
            }
        );
    }

    catch (error) {
        console.log("errorMiddleware error: ", error);
    }

};

export default ErrorHandler;
