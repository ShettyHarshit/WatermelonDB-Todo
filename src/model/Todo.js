import { Model } from '@nozbe/watermelondb';
import { field } from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
    static table = 'todos'

    @field('name') 
    name

    @field('id') 
    id

    @field('is_completed') 
    isCompleted
    
}   