/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "m8ztozn6gqieot8",
    "created": "2024-04-25 07:54:45.317Z",
    "updated": "2024-04-25 07:54:45.317Z",
    "name": "stokbarang",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jow3o94i",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m8ztozn6gqieot8");

  return dao.deleteCollection(collection);
})
