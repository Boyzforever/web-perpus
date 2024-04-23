/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // remove
  collection.schema.removeField("ruwsocij")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "niyroywm",
    "name": "status_peminjam",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "berhasil",
        "ditolak"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ruwsocij",
    "name": "status_peminjam",
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

  // remove
  collection.schema.removeField("niyroywm")

  return dao.saveCollection(collection)
})
