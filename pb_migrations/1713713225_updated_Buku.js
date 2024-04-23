/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gscxnoj0",
    "name": "status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "ada",
        "kosong"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // remove
  collection.schema.removeField("gscxnoj0")

  return dao.saveCollection(collection)
})
