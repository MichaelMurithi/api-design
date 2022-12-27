import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { Item } from './interfaces/item.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    findAll(): Item[] {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Item {
        return this.itemsService.findOne(id);
    }

    @Post()
    createItem(@Body() createItemDto: CreateItemDto): string {
        return `Creating item: Name: ${createItemDto.name} Desc: ${createItemDto.description}`
    }

    @Delete(':id')
    delete(@Param('id') id): string {
        return `Deleting item by id ${id}`;
    }

    @Put(':id')
    update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
        return `Updating item ${updateItemDto.name}, desc ${updateItemDto.description} by id ${id}`;
    }
}
