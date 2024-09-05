import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewModule } from './modules/review/review.module';
import { StreamEventModule } from './modules/stream-event/stream-event.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/onlineLibrary'),
    BookModule,
    AuthModule,
    ReviewModule,
    StreamEventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
