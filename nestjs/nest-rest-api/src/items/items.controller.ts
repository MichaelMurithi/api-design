import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    async findAll(): Promise<Item[]> {
        return await this.itemsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id): Promise<Item> {
        return await this.itemsService.findOne(id);
    }

    @Post()
    async createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return await this.itemsService.create(createItemDto);
    }

    @Delete(':id')
    async delete(@Param('id') id): Promise<Item> {
        return await this.itemsService.delete(id);
    }

    @Put(':id')
    async update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
        return await this.itemsService.update(id, updateItemDto);
    }
}
