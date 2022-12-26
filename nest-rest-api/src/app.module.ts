import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './item/item.controller';

@Module({
  imports: [],
  controllers: [AppController, ItemController],
  providers: [AppService],
})
export class AppModule {}
