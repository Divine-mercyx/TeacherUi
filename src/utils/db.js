import { openDB } from "idb";

const db = openDB("teacherly", 1, {
    upgrade(db) {
        db.createObjectStore("data-token", { keyPath: "id" });
        db.createObjectStore("user-data", { keyPath: "id" });
        db.createObjectStore("user-profile", { keyPath: "id" });
    }
});


export async function addToken(data) {
    (await db).put("data-token", data);
}

export async function getToken(id) {
    return (await db).get("data-token", id);
}

export async function addUser(data) {
    (await db).put("user-data", data);
}

export async function getUser(id) {
    return (await db).get("user-data", id);
}