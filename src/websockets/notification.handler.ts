// here we will be making all the events like :
// like
// post (tag)
// follow
// commnet
// message
import { io } from "../app.js";

export const likeEvent = () => {
    io.emit("liked",)
}
export const postEvent = () => {
    io.emit("tagged")
}

export const followEvent = () => {
    io.emit("followed you")
}

export const commentEvet = () => {
    io.emit("commented")
}

export const MessageEvent = () => {
    io.emit("messaged")
}