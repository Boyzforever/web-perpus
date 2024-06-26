/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "enxjmrme",
    "name": "stok",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // remove
  collection.schema.removeField("enxjmrme")

  return dao.saveCollection(collection)
})
