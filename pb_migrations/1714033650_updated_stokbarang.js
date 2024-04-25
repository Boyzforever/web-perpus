/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m8ztozn6gqieot8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7u3ujnnu",
    "name": "judul_buku",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("m8ztozn6gqieot8")

  // remove
  collection.schema.removeField("7u3ujnnu")

  return dao.saveCollection(collection)
})
