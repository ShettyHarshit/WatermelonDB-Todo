import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from './schema';
import Todo from "./Todo";

const adapter = new SQLiteAdapter({
    dbName: "WatermelonDemo",
    schema: mySchema
});

const database = new Database({
    adapter,
    modelClasses: [ Todo ],
    actionsEnabled: true,
})

const todosCollection = database.collections.get("todos");

export const getTodos = async () => {
    return await database.collections.get("todos").query().fetch();
}


export const addTodo = async (name) => {
    let updatedtodos;
    await database.action(async () => {
        const newTodo = await todosCollection.create(todo => {
            todo.name = name
        })
        updatedtodos = await database.collections.get("todos").query().fetch();
    })
    return updatedtodos
}

export const deleteTodo = async (todo) => {
    await database.action(async () => {
        await todo.markAsDeleted() 
    })
    return await database.collections.get("todos").query().fetch()
}