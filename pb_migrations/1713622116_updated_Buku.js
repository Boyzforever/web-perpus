/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kkasqraa",
    "name": "Foto",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // remove
  collection.schema.removeField("kkasqraa")

  return dao.saveCollection(collection)
})
