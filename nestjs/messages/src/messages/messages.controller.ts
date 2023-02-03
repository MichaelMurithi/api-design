import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return 'Message';
    }

    @Post()
    createMessage() {
        return 'Posting message...'
    }

    @Get()
    getMessage() {
        return 'Getting message...'
    }
}
