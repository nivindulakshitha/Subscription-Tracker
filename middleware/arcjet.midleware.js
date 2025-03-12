import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).send({
                    message: "Rate limit exceeded",
                    retryAfter: decision.reason.retryAfter,
                });
            }

            else if (decision.reason.isBot()) {
                return res.status(403).send({
                    message: "Access denied",
                    reason: "Bot detected",
                });
            }

            return res.status(403).send("Access denied");
        }

        next();
    } catch (error) {
        console.error("Error in arcjetMiddleware", error);
        next(error);
    }
}

export default arcjetMiddleware;