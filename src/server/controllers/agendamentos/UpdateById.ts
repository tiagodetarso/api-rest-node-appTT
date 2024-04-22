import { Request, Response } from 'express'
import * as yup from 'yup'
import { StatusCodes } from 'http-status-codes'

import { AgendamentosProvider } from '../../database/providers/agendamentos'
import { validation } from '../../shared/middlewares'
import { IAgendamento } from '../../database/models'

interface IParamProps {
    id?: number | undefined
}

interface IBodyProps extends Omit<IAgendamento, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        idProfessional: yup.number().moreThan(0).integer().required(),
        idClient: yup.number().moreThan(0).integer().required(),
        idHorario: yup.number().moreThan(0).integer().required(),
        idServicoPrestado: yup.number().moreThan(0).integer().required(),
        idStatus: yup.number().moreThan(0).integer().required(),
        idPaymentStatus: yup.number().moreThan(0).integer().required(),
        professionalAvaliation: yup.number().moreThan(-1).lessThan(6).integer().required(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().required().moreThan(0).integer(),
    })),
}))

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado'
            }
        })
    }

    const result = await AgendamentosProvider.updateById(req.params.id, req.body)
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        })
    }

    return res.status(StatusCodes.OK).json({msg: 'Registro atualizado com sucesso'})
}