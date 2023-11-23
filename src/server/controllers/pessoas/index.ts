import * as create from './Create'
import * as deleteById from './DeleteById'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as updateById from './UpdateById'
import * as logIn from './LogIn'


export const PessoasController = {
    ...create,
    ...deleteById,
    ...getAll,
    ...getById,
    ...updateById,
    ...logIn
}