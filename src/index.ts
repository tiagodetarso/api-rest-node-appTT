import { server } from './server/Server'


server.listen(process.env.PORT || 3333, () => console.log(`API appTT escutando na porta ${process.env.PORT || 3333}`))