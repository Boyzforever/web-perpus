/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "zs7k1obxw0v8fzj",
    "created": "2024-04-20 09:38:21.231Z",
    "updated": "2024-04-20 09:38:21.231Z",
    "name": "Buku",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ymjcdimu",
        "name": "judul",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("zs7k1obxw0v8fzj");

  return dao.deleteCollection(collection);
})
