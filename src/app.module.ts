import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookController } from './modules/book/book.controller';
import { BookModule } from './modules/book/book.module';
import { getMysqlUsernameAndPassword } from './utils';
// import { User } from './modules/user/user.entity';

const { username, password } = getMysqlUsernameAndPassword();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: username,
      password: password,
      database: 'vben-book-dev',
      // entities: [User],
      autoLoadEntities: true,
      // synchronize: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [AppController, UserController, BookController],
  providers: [AppService, TestService],
})
export class AppModule {}
