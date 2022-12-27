import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
    private readonly items: Item[] = [
        {
            id: "10023",
            name: 'First item',
            qty: 1,
            description: 'Something special 1'
        },
        {
            id: "10024",
            name: 'Second item',
            qty: 2,
            description: 'Something special 2'
        },
        {
            id: "10025",
            name: 'Third item',
            qty: 3,
            description: 'Something special 3'
        }
    ];

    findAll(): Item[] {
        return this.items;
    }

    findOne(id: string): Item {
        return this.items.find(item => item.id === id);
    }
}
