/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import schema from './model/schema'
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        // Post, // ⬅️ You'll add Models to Watermelon here
    ],
    actionsEnabled: true,
})

AppRegistry.registerComponent(appName, () => App);
