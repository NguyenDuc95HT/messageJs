export  default class Response {
    static returnSuccess (res, data) {
        return res.status(200).json({
            success: true,
            data
        });
    }

    static returnError (res, e) {
        console.log(e);
        return res.status(400).json({
            success: false,
            error: e.message
        })
    }
}