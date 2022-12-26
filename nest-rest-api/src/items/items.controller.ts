import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateItemDto } from 'src/items/dto/create-item.dto';

@Controller('items')
export class ItemsController {
    @Get()
    findAll(): string {
        return 'Get all items';
    }

    @Get(':id')
    findOne(@Param('id') id): string {
        return `Getting item by ID ${id}`;
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
