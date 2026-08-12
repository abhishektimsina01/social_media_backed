import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs : 60000,
    limit : 10,
    message : 'too many request'
})

export default limiter