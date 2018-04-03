import SQLite from '../../node_modules/expo/src/SQLite.js' ;
import config from '../../config';

/* EXAMPLE CREATE CLASS DB EXTENDS HELPER

import Helper from '../db';

export default class Event extends Helper {
  *wajib
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

  *wajib
  constructor() {
    super();
    this.init(Event.table, this.sql)
  }

  *wajib
  getColumn() {
    return [Event.id, Event.title, Event.intro, Event.description, Event.image, Event.created, Event.url]
  }

  *wajib
  sql = "CREATE TABLE IF NOT EXISTS '" + Event.table + "' (" +
    "'" + Event.id + "' INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL," +
    "'" + Event.title + "' VARCHAR," +
    "'" + Event.intro + "' TEXT," +
    "'" + Event.description + "' TEXT," +
    "'" + Event.image + "' VARCHAR," +
    "'" + Event.created + "' VARCHAR," +
    "'" + Event.url + "' VARCHAR" +
    ")";
}

    EXAMPLE USE Query DB_EVENT

    1. Create Object from DB
        example:
          var db = new Event()

    2. Insert 
        #values is data to insert 
        #insertId is the id auto incement from data we just inserted
        var values = {
          fieldname:'value',
          fieldname:'value',
          [Event.title]:'title_values',
          [Event.intro]:'intro_values',
          [Event.description]:'description_values',
          [Event.image]:'image_values',
          [Event.created]:'created_values',
          [Event.url]:'url_values',
        }
        example:
          db.Insert(values, (insertId)=>{ })

    3. Update
        #values is data to update 
        #id is refrerence to use in WHERE id=
        #rowAffected return how many row is affected in this execution, 0 is mean no row affected or update is failed
        var values = {
          fieldname:'value',
          [Event.intro]:'new_intro_values',
          [Event.title]:'new_title_values',
        }
        example:
          db.Update(id, values, (rowAffected)=>{})

    4. Delete (with WHERE id='id')
        #id is refrerence to use in WHERE id=
        #rowAffected return how many row is affected in this execution, 0 is mean no row affected or delete is failed
        example:
          db.Delete(id,null,null, (rowAffected)=>{})
    
    5. Delete (with WHERE field='value' single or many) (all will combine with separator AND  )
        #rowAffected return how many row is affected in this execution, 0 is mean no row affected or delete is failed
        #arrayFields = [Event.title,Event.intro, Event.blabla]
        #arrayArguments = ['this will match with title','this will match with intro','this will match with blabla']
        example:
          db.Delete(null, arrayFields, arrayArguments, (rowAffected)=>{})
    
    6. getRow (with WHERE id='id')
        #id is refrerence to use in WHERE id=
        #queryResult result query in Array format
        example:
          db.getRow(id,null,null, (queryResult)=>{})

    7. getRow (with WHERE field='value' single or many) (all will combine with separator AND  )
        #queryResult result query in Array format
        #arrayFields = [Event.title,Event.intro, Event.blabla]
        #arrayArguments = ['this will match with title','this will match with intro','this will match with blabla']
        example:
          db.getRow(null, arrayFields, arrayArguments, (queryResult)=>{})
    
    8. getAll (if all params is null  WHERE 1)
        #queryResult result query in Array format
        #arrayFields = [Event.title,Event.intro, Event.blabla]
        #arrayArguments = ['this will match with title','this will match with intro','this will match with blabla']
        #orderBy = fieldname
        #groupBy = fieldname
        example:
          db.getAll(arrayFields, arrayArguments, orderBy, limit, offset, groupBy, (queryResult)=>{}) {
    
    9. Custom query
        #result is in WEBSqliteResult format
        example:
          db.execute(queryStatement, (result)=>{})
}
*/

export default class Helper {

  constructor() {

  }
  

  isDebug = config.isDebug

  /* The version, description and size arguments are ignored, but are accepted by the function for compatibility with the WebSQL specification. 
  https://docs.expo.io/versions/latest/sdk/sqlite.html
  */
  init(dbname = null, createStatement = null, version = 1, description = null, size = null) {
    if (dbname) {
      this.db = SQLite.openDatabase(dbname, version, description, size)
      this.table = dbname
    }

    if (createStatement) {
      this.create(createStatement)
    }
  }

  drop(dbname, debug = 0) {
    this.db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS '" + dbname + "'", [], (transaction, result) => { }, (t, eror) => { if (debug == 1) this.configConsole('drop() error =>  ', t, eror) })
    })
  }

  create(createStatement, debug = 0) {
    var output = ''
    if (this.db) {
      this.db.transaction((tx) => {
        tx.executeSql(createStatement, [], (transaction, result) => { output = result }, (t, eror) => { if (debug == 1) this.configConsole('create() error => ' + t, eror) })
      })
    } else {
      if (debug == 1)
        this.configConsole('cant create table, db is null !')
    }
  }

  getColumn() {
    if (arguments.length === 0) {
      return []
    } else {
      if (isNaN(arguments[0])) {
        return this.getColumn().filter((column) => column === argument[0]).map((column) => column)
      } else {
        return this.getColumn()[i]
      }
    }
  }

  execute(sqlStatement, callback, debug = 0) {
    var output = ''
    if (debug == 1)
      this.configConsole('execute() => ', sqlStatement)
    if (this.db) {
      this.db.transaction((tx) => {
        if (Array.isArray(sqlStatement)) {
          sqlStatement.map((query) => {
            tx.executeSql(query, [], (transaction, result) => {
              if (callback) callback(result)
            }, (t, eror) => {
              if (debug == 1)
                this.configConsole("execute() error =>", query)
            })
          })
        } else {
          tx.executeSql(sqlStatement, [], (transaction, result) => {
            if (callback) callback(result)
          }, (t, eror) => {
            if (debug == 1)
              this.configConsole("execute() error =>", sqlStatement)
          })
        }
      })
    } else {
      if (debug == 1)
        this.configConsole('db is undefined')
    }

  }

  getSQLFormat() {
    var output = "";
    var fields = this.getColumn();
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      var addSQL = "TEXT";
      switch (field) {
        case "id":
          addSQL = "INTEGER PRIMARY KEY  AUTOINCREMENT  NOT NULL";
          break;
        case "name":
        case "title":
        case "created":
        case "updated":
          addSQL = "VARCHAR";
          break;
        case "active":
        case "publish":
          addSQL = "INTEGER";
          break;
      }
      if (addSQL == "TEXT") {
        if ((/.*_id/g).test(field)) {
          addSQL = "INTEGER";
        }
      }
      output += "'" + field + "' " + addSQL + ",";
    }
    return output.substring(0, output.length - 2);
  }

  verify(values, debug = 0) {
    if (values instanceof Object) {
      Object.keys(values).map((item) => {
        if (this.getColumn().indexOf(item) == -1) {
          delete values[item]
        }
      })
      return values
    } else {
      if (debug == 1)
        this.configConsole('values must be an object with key == fieldname')
    }
  }

  Insert(values, callbackInsertID, debug = 0) {
    if (values instanceof Object) {
      values = this.verify(values)
      var arValues = []
      for (let i = 0; i < this.getColumn().length; i++) {
        const element = this.getColumn()[i];
        if (element != 'id') {
          arValues.push("'" + values[element] + "'")
        }
      }
      var statement = 'INSERT INTO ' + this.table + ' (' + this.getColumn().splice(1, this.getColumn().length).join(',') + ') values (' + arValues.join(',') + ')'
      var last_ID = 0;
      if (debug == 1)
        this.configConsole('Insert() => ' + statement)
      try {
        this.db.transaction((tx) => {
          tx.executeSql(statement, [], (transaction, result) => {
            if (callbackInsertID) callbackInsertID(result.insertId)
            if (debug == 1) this.configConsole('Insert ID => ' + result.insertId)
          })
        }, (error) => {
          if (debug == 1)
            this.configConsole('Insert() error =>', error)
        });
      } catch (e) {
        if (debug == 1)
          this.configConsole(e)
      }
    }
    else {
      if (debug == 1)
        this.configConsole('values must be an object with key == fieldname')
    }
  }

  Update(id, values, callback, debug = 0) {
    values = this.verify(values)
    var arValues = []
    Object.keys(values).map((key) => {
      arValues.push("" + key + "=" + "'" + values[key] + "'")
    })
    var statement = 'UPDATE ' + this.table + ' SET ' + arValues.join(', ') + ' WHERE ' + this.getColumn()[0] + '=' + id
    if (debug == 1)
      this.configConsole('Update() => ' + statement)
    try {
      this.db.transaction((tx) => {
        tx.executeSql(statement, [], (transaction, result) => {
          if (debug == 1)
            this.configConsole('Update() => ' + result.rowsAffected)
          if (callback) callback(result.rowsAffected)
        }, (t, eror) => {
          if (debug == 1)
            this.configConsole('Update error => ', t, eror)
        })
      })
    } catch (error) {
      if (debug == 1)
        this.configConsole(error)
    }
  }

  Delete(id, selectionArray, argumentArray, callback, debug = 0) {
    var statement = ''
    if (!isNaN(arguments[0])) {
      statement = 'DELETE FROM ' + this.table + ' WHERE ' + this.getColumn()[0] + '=' + arguments[0]
    }
    if (Array.isArray(arguments[1]) && Array.isArray(arguments[2])) {
      if (arguments[1].length === arguments[2].length) {
        var elmns = []
        for (let i = 0; i < arguments[1].length; i++) {
          const element = arguments[1][i];
          elmns.push(element + '=' + "'" + arguments[2][i] + "'")
        }
        statement = 'DELETE FROM ' + this.table + ' WHERE ' + elmns.join(' AND ')
      } else {
        if (debug == 1)
          this.configConsole('length of arguments and values are not same')
      }
    }
    if (debug == 1)
      this.configConsole('Delete() => ' + statement)
    if (statement != '') {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(statement, [], (transaction, result) => {
            if (debug == 1) this.configConsole('Delete() => ' + result.rowsAffected)
            if (callback) callback(result.rowsAffected)
          }, (t, eror) => this.configConsole('Delete() error => ', t, eror))
        })
      } catch (e) {
        if (debug == 1)
          this.configConsole(e)
      }
    } else {
      if (debug == 1)
        this.configConsole('statement is empty, please insert (id) or ([]fields,[]values)')
    }
  }

  getRow(id, selectionArray, argumentArray, callback, debug = 0) {
    var statement = ''
    if (id) {
      statement = 'SELECT * FROM ' + this.table + ' WHERE ' + this.getColumn()[0] + '=' + arguments[0]
    } else if (Array.isArray(arguments[1]) && Array.isArray(arguments[2])) {
      if (arguments[1].length === arguments[2].length) {
        var elmns = []
        for (let i = 0; i < arguments[1].length; i++) {
          const element = arguments[1][i];
          elmns.push(element + '=' + "'" + arguments[2][i] + "'")
        }
        statement = 'SELECT * FROM ' + this.table + ' WHERE ' + elmns.join(' AND ')
      } else {
        if (debug == 1)
          this.configConsole('length of arguments and values are not same')
      }
    }
    if (debug == 1)
      this.configConsole('getRow() => ' + statement)
    if (statement != '') {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(statement, [], (transaction, result) => {
            if (debug == 1) this.configConsole('getRow() => ' + result.rows._array[0])
            if (callback) callback(result.rows._array[0])
          }, (t, eror) => this.configConsole('getRow() error => ', t, eror))
        })
      } catch (e) {
        if (debug == 1)
          this.configConsole(e)
      }
    } else {
      if (debug == 1)
        this.configConsole('statement is empty, please insert (id) or ([]fields,[]values)')
    }
  }

  getAll(selectionArray, argumentArray, orderBy, limit, offset, groupBy, callback, debug = 0) {
    var statement = 'SELECT * FROM ' + this.table + ' WHERE 1'
    if (Array.isArray(arguments[0]) && Array.isArray(arguments[1])) {
      if (arguments[0].length === arguments[1].length) {
        var elmns = []
        for (let i = 0; i < arguments[0].length; i++) {
          const element = arguments[0][i];
          elmns.push(element + '=' + "'" + arguments[1][i] + "'")
        }
        statement = 'SELECT * FROM ' + this.table + ' WHERE ' + elmns.join(' AND ')
      } else {
        if (debug == 1)
          this.configConsole('length of arguments and values are not same')
      }
    }
    if (arguments[5]) {
      statement += ' GROUP BY ' + arguments[5]
    }
    if (arguments[2]) {
      statement += ' ORDER BY ' + arguments[2] + ' ASC'
    }
    if (arguments[3]) {
      statement += ' LIMIT ' + arguments[3]
    }
    if (arguments[4]) {
      statement += ' OFFSET ' + arguments[4]
    }
    if (debug == 1)
      this.configConsole('getAll() => ' + statement)
    try {
      this.db.transaction(async (tx) => {
        await tx.executeSql(statement, [], async (transaction, result) => {
          if (debug == 1) this.configConsole('getAll() => ' + result.rows._array)
          if (callback) callback(result.rows._array)
        }, (t, eror) => this.configConsole('getAll() error => ', t, eror))
      })
    } catch (e) {
      if (debug == 1)
        this.configConsole(e)
    }
  }
  configConsole() {
    if (this.isDebug === 1) {
      console.log(JSON.stringify(arguments, null, 2));
    }
  }
}
