
import User from '@modules/users/infra/typeorm/entities/User'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

module.exports = {
  type:"postgres",
  host:"localhost",
  port:"5432",
  username:"postgres",
  password:"fg2020",
  database:"projetos",
  entities: [
    User,
    Appointment
  ],
  migrations:[
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  cli:{
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  }
}