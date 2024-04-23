/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj")

  // remove
  collection.schema.removeField("3zuox0wo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "smnjct9m",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3zuox0wo",
    "name": "tahun_terbit",
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
  collection.schema.removeField("smnjct9m")

  return dao.saveCollection(collection)
})
