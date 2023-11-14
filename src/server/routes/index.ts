import { Router } from 'express'



const router = Router()

router.get('/', (_, res) => {
    return res.send('Bem-vindo(a) à API appTT!!!')
}) 




export { router }