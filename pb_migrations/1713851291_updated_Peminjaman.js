/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // update
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
        "buku dipinjam",
        "buku ditolak"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17")

  // update
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
})
