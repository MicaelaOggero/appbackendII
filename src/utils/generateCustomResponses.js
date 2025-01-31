export const generateCustomResponses = (_, res, next) =>{
    res.sendSuccess=payload =>res.status(200).send({status: 'success', message: "Request processed successfully", payload})
    res.sendServerError=error =>res.status(500).send({status: 'error', error})
    res.sendCreated = (payload) => res.status(201).send({
        status: 'success',
        message: "Resource created successfully",
        payload
    });

    res.sendBadRequest = (error) => res.status(400).send({
        status: 'error',
        message: "Bad Request: The server could not process the request",
        error
    });

    res.sendUnauthorized = (error) => res.status(401).send({
        status: 'error',
        message: "Unauthorized: Access is denied due to invalid credentials",
        error
    });

    res.sendForbidden = (error) => res.status(403).send({
        status: 'error',
        message: "Forbidden: You do not have permission to access this resource",
        error
    });

    res.sendNotFound = (error, message) => res.status(404).send({
        status: 'error',
        message: "Not Found: The requested resource could not be found",
        error
    });
    next()
}