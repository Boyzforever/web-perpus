/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yxj40d2l",
    "name": "penulis",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sxvcispj",
    "name": "penerbit",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kluuferj",
    "name": "tahun_terbit",
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
  collection.schema.removeField("yxj40d2l")

  // remove
  collection.schema.removeField("sxvcispj")

  // remove
  collection.schema.removeField("kluuferj")

  return dao.saveCollection(collection)
})
