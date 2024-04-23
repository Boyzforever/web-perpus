/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "97uf16k0rxcxtcb",
    "created": "2024-04-22 15:43:48.153Z",
    "updated": "2024-04-22 15:43:48.153Z",
    "name": "UlasanBuku",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ieioexm5",
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
      },
      {
        "system": false,
        "id": "em2nd83z",
        "name": "ulasan",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "eju1aq4c",
        "name": "rating",
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
  const collection = dao.findCollectionByNameOrId("97uf16k0rxcxtcb");

  return dao.deleteCollection(collection);
})
