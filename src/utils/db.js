import { openDB } from "idb";

const db = openDB("teacherly", 1, {
    upgrade(db) {
        db.createObjectStore("data-token", { keyPath: "id" });
        db.createObjectStore("user-data", { keyPath: "id" });
        db.createObjectStore("user-profile", { keyPath: "id" });
    }
});


export async function addToken(data) {
    await (await db).put("data-token", data);
}

export async function getToken(id) {
    return (await db).get("data-token", id);
}

export async function addUser(data) {
    const userData = {
        token: data.token,
        id: data.id,
        email: data.email,
        profileId: data.profile.id,
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
        age: data.profile.age,
        role: data.profile.role,
        bio: data.profile.bio,
        subscribersUserIds: data.profile.subscribersUserIds,
        subscribedToUserIds: data.profile.subscribedToUserIds,
        imageUrl: data.profile.imageUrl
    };
    console.log("user data " + userData);
    await (await db).put("user-data", userData);
    console.log("user data " + userData);
}


export async function deleteToken(id) {
    const database = await db;
    const tx = database.transaction("data-token", "readwrite");
    await tx.store.delete(id);
    await tx.done;
}

export async function deleteUser(id) {
    const database = await db;
    const tx = database.transaction("user-data", "readwrite");
    await tx.store.delete(id);
    await tx.done;
}

export async function deleteAllUsers() {
    const database = await db;
    const tx = database.transaction("user-data", "readwrite");
    await tx.store.clear();
    await tx.done;
}

export async function getAllUsers() {
    return (await db).getAll("user-data");
}

export async function getUser(id) {
    return await (await db).get("user-data", id)
}