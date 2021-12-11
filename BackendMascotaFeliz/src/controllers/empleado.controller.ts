import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Credenciales, Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
import {AutenticacionEmpleadoService, ContrasennaService, NotificacionService} from '../services';

@authenticate('admin')
export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository,
    @service(AutenticacionEmpleadoService)
    public autenticacionEmpleadoService: AutenticacionEmpleadoService,
    @service(ContrasennaService)
    public contrasennaService: ContrasennaService,
    @service(NotificacionService)
    public notificacionService: NotificacionService,
  ) {}

  @post('/login/empleado', {
    responses: {
      '200': {
        description: 'Identificación de asesor',
      }
    }
  })
  async login(
    @requestBody() credenciales: Credenciales
  ){
    let p = await this.autenticacionEmpleadoService.identificarEmpleado(credenciales.username, credenciales.clave);
    if (p) {
      let token = this.autenticacionEmpleadoService.generarTokenJWT(p);
      return {
        datos:{
          nombre: p.nombre,
          apellido: p.apellido,
          correo: p.correo,
          id: p.id
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401](`Usuario o clave incorrectos`);
    }
  }

  @post('/empleado')
  @response(200, {
    description: 'Se ha creado un nuevo empleado',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    let clave = this.contrasennaService.generarClave();
    let claveCifrada = this.contrasennaService.cifrarClave(clave);
    empleado.clave = claveCifrada;
    let empleadoCreado = await this.empleadoRepository.create(empleado);

    this.notificacionService.notificarRegistro(empleado, clave);
    return empleadoCreado
  }

  @get('/empleado/count')
  @response(200, {
    description: 'Total de empleados',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }

  @get('/empleado')
  @response(200, {
    description: 'Lista de empleados',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @get('/empleado/{id}')
  @response(200, {
    description: 'Información de un empleado',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleado/{id}')
  @response(204, {
    description: 'Se ha actualizado el empleado satisfactoriamente',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }

  @put('/empleado/{id}')
  @response(204, {
    description: 'Se ha actualizado el empleado satisfactoriamente',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleado/{id}')
  @response(204, {
    description: 'Se ha eliminado el empleado satisfactoriamente',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
