import { genSalt, hash, compare } from 'bcryptjs'

const SALT_RANDOMS = 5


const hashPassword = async (password: string) => {
    const SaltGenerated = await genSalt(SALT_RANDOMS)

    return await hash(password, SaltGenerated)
}


const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword)
}


export const PasswordCrypto = {
    hashPassword,
    verifyPassword
}