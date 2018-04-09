# Esoftplay SQLite Helper
A SQLite helper for esoftplay developer
```
note : this module require to install expo first
```

#### Instalation
1. install the npm package
```
npm install --save react-native-esoftplay-db
```
2. Create class extends Helper (simple example)
```
export default class Event extends Helper {
  *require
  // table name
  static table = 'event'

  // fields
  static id = 'id'
  static title = "title";
  static intro = "intro";
  static description = "description";
  static image = "image";
  static created = "created";
  static url = "url";
  sql = "CREATE TABLE IF NOT EXISTS '" + Event.table + "' (" + this.getSQLFormat() + ")" 

  //*require
  constructor() {
    super();
    this.init(Event.table, this.sql)
  }

  //*require
  getColumn() {
    return [Event.id, Event.title, Event.intro, Event.description, Event.image, Event.created, Event.url]
  }
}

```
3. done

#### Usage

###### CREATE OBJECT FROM DB
```
var db = new Event()
```
###### INSERT
```
db.Insert(values, insertId, debug)
```
Arguments
- values (object) - object with key-value to insert
- insertId (callback) - callback with 1 param (insertId)
  - insertId: last id after insert
- debug(0|1) : console log db process default 0


###### UPDATE
```
db.Update(id, values, rowAffected, debug)
```
Arguments
- id (string|int) - an id for 'where' reference
- values (object) - object with key-value to update
- rowAffected (callback) - callback with 1 param (rowAffected)
  - rowAffected: how many row affected in this execution
- debug(0|1) : console log db process default 0


###### DELETE (with WHERE id)
```
db.Delete(id,rowAffected, debug)
```
Arguments
- id (string|int) - an id for 'where' reference
- rowAffected (callback) - callback with 1 param (rowAffected)
  - rowAffected: how many row affected in this execution
- debug(0|1) : console log db process default 0


###### DELETE (with WHERE clause)
```
db.Delete(fields,arguments, rowAffected, debug)
```
Arguments
- fields (array) - an array fieldname
- arguments (array) - an array argument to match with fields
- rowAffected (callback) - callback with 1 param (rowAffected)
  - rowAffected: how many row affected in this execution
- debug(0|1) : console log db process default 0


###### GET ONE ROW (with WHERE id)
```
db.getRow(id, result, debug)
```
Arguments
- id (string|int) - an id for 'where' reference
- result (callback) - callback with 1 param (result)
  - result: query result
- debug(0|1) : console log db process default 0


###### GET ONE ROW (with WHERE clause)
```
db.getRow(fields, arguments, result, debug)
```
Arguments
- fields (array) - an array fieldname
- arguments (array) - an array argument to match with fields
- result (callback) - callback with 1 param (result)
  - result: query result
- debug(0|1) : console log db process default 0


###### GET ALL 
```
db.getAll(result)
db.getAll(result, debug)
db.getAll(orderBy, result) 
db.getAll(orderBy, result,debug)
db.getAll(fields, arguments, result)
db.getAll(limit, offset, result)
db.getAll(fields, arguments, result, debug)
db.getAll(limit, offset, result, debug)
db.getAll(fields, arguments, orderBy, limit, offset, groupBy, result, debug) 
```
Arguments
- fields (array) - an array fieldname
- arguments (array) - an array argument to match with fields
- orderBy (string) - fieldname
- limit (int) - limit query result
- offset (int) - offset query result
- groupBy (string) - fieldname
- result (callback) - callback with 1 param (result)
  - result: query result
- debug(0|1) : console log db process default 0


###### CUSTOM QUERY
```
db.execute(query, result, debug)
```
Arguments
- query (string) - an sql query
- result (callback) - callback with 1 param (result)
  - result: query result with webSQLiteResult format
- debug(0|1) : console log db process default 0



#### Example

###### GET ROW
```
db.getRow([Event.title, Event.Intro], ['masmun','jos'], (result)=>{ //do your stuff })
```
