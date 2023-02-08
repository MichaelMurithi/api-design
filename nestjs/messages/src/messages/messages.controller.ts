import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return 'Message';
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return { body }
    }

    @Get('/:id')
    getMessage(@Param('id') id: string) {
        console.log('The id is', id);

        return 'Getting message...'
    }
}
