import bcrypt from "bcryptjs"

export const hashPassword = async(rawPassword : string) => {
    console.log(`the raw password ${rawPassword}`)
    const hashedPassword = await bcrypt.hash(rawPassword, 10)
    return hashedPassword
}

export const comparePassword = async(rawPassword : string, hashedPassword : string) => {
    console.log(rawPassword, hashedPassword)
    const isSame = await bcrypt.compare(rawPassword, hashedPassword)
    return isSame
}