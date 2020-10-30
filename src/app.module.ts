import { HttpModule, HttpService, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RovrSearch } from './models/search.model';

@Module({
  imports: [
    // Using typeORM for MYSQL quering.
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Farheen@123', //change password as per your local Mysql's
      database: 'yantrik',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
      logging: true
    }),
    HttpModule,
    TypeOrmModule.forFeature([RovrSearch])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
