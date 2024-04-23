/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // remove
  collection.schema.removeField("7bwkl40h")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7bwkl40h",
    "name": "status_peminjam",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "berhasil dipinjam",
        "gagal meminjam"
      ]
    }
  }))

  // remove
  collection.schema.removeField("ruwsocij")

  return dao.saveCollection(collection)
})
