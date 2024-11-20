import { openDB } from "idb";

const DB_NAME = "orderDatabase";
const STORE_NAME = "orders";

export const getDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveOrders = async (orders) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  await tx.store.clear(); // Clear existing data to replace with new state
  for (const order of orders) {
    const plainOrder = JSON.parse(JSON.stringify(order)); // Convert reactive object to plain object
    await tx.store.add(plainOrder);
  }
  await tx.done;
};

export const fetchOrders = async () => {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
};
