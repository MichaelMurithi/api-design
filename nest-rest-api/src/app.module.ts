import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './item/item.controller';
import { ItemsService } from './items/items.service';
import { ItemsController } from './items/items.controller';

@Module({
  imports: [],
  controllers: [AppController, ItemController, ItemsController],
  providers: [AppService, ItemsService],
})
export class AppModule {}
