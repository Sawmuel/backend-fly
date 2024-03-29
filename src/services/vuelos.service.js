
const { models } = require('../libs/sequelize');

class vuelosService { 
  
    constructor() {}

    async find() {
      const res = await models.vueloss.findAll();
      return res;
    }

    async findOne(id) {
      const res = await models.vueloss.findByPk(id);
      return res;
    }

    async create(data) {
      const res = await models.vueloss.create(data);
      return res;
    }

    async update(id, data) {
      const model = await this.findOne(id);
      const res = await model.update(data);
      return res;
    }

    async delete(id) {
      const model = await this.findOne(id);
      await model.destroy();
      return { deleted: true };
    }

    async listarVuelosPorCorreo(correo) {
      try {
        const usuario = await models.Person.findOne({
          where: {
            correo: correo,
          },
        });
  
        if (usuario) {
          const vuelosUsuario = await models.vueloss.findAll({
            where: {
              correo: correo,
            },
          });
  
          return { success: true, data: vuelosUsuario };
        } else {
          return { success: false, message: 'Usuario no encontrado' };
        }
      } catch (error) {
        console.error('Error al listar vuelos por correo:', error);
        return { success: false, message: 'Error al listar vuelos por correo' };
      }
    }
  }
  
  module.exports = vuelosService;