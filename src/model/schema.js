import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'posts',
            columns: [
                { name: 'id', type: 'string', isIndexed: true },
                { name: 'todo', type: 'string' },
                { name: 'is_completed', type: 'boolean' },
            ]
        }),
    ]
})