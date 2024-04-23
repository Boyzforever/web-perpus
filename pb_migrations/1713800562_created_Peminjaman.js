/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9f48dhyifkzrd17",
    "created": "2024-04-22 15:42:42.419Z",
    "updated": "2024-04-22 15:42:42.419Z",
    "name": "Peminjaman",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pzzdmmaf",
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
        "id": "jpinef2u",
        "name": "tanggal_peminjaman",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "dicyfnf9",
        "name": "tanggal_pengembalian",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "nzpqprzr",
        "name": "status_pemimjaman",
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
  const collection = dao.findCollectionByNameOrId("9f48dhyifkzrd17");

  return dao.deleteCollection(collection);
})
