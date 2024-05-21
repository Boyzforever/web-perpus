/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "st9w9k80",
    "name": "peminjaman_id",
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
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // remove
  collection.schema.removeField("st9w9k80")

  return dao.saveCollection(collection)
})
