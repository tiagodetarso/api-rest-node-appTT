
import fs from 'fs'
import path from 'path'

interface ListaLogradrourosProps {
    codigoMunicipio: number,
    arrayLogradouros: string[]
}

export const processJsonLogradouroFiles = async (extname: string): Promise<ListaLogradrourosProps[]> => {

    const directoryPath = path.join(__dirname, extname)

    try {

        const files = await fs.promises.readdir(directoryPath)
        const jsonFiles = files.filter(file => path.extname(file) === '.json')
    
        const todosLogradrouros: ListaLogradrourosProps [] = []
        
        for (const file of jsonFiles) {
            const filePrefix = Number(file.slice(0, 7))
            const MunicipioLogradouros: string[] = []

            const filePath = path.join(directoryPath, file)
            const data = await fs.promises.readFile(filePath, 'utf8')
            const jsonData = JSON.parse(data)
       
            if (jsonData.features && Array.isArray(jsonData.features)) {
                jsonData.features.forEach((feature: { properties: { NM_LOG: string } }) => {
                    if (feature.properties && feature.properties.NM_LOG) {
                        MunicipioLogradouros.push(feature.properties.NM_LOG)
                    }
                })
            }

            todosLogradrouros.push({
                codigoMunicipio: filePrefix,
                arrayLogradouros: MunicipioLogradouros,
            })
        }
        return todosLogradrouros
    
    } catch (err) {
        console.log('Erro ao processar arquivos:', err)
        return []
    }
}