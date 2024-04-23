/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // remove
  collection.schema.removeField("wlup6hs5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xfbg4cqq",
    "name": "status_peminjam",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "buku dipinjam",
        "buku ditolak"
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
    "id": "wlup6hs5",
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
  collection.schema.removeField("xfbg4cqq")

  return dao.saveCollection(collection)
})
