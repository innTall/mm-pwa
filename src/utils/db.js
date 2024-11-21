import { openDB } from "idb";
// Configuration for multiple databases and stores
const DATABASES = [
  { dbName: "orderDatabase", storeName: "orders" },
  { dbName: "bybitSpotDatabase", storeName: "bybitSpot" },
  { dbName: "binanceSpotDatabase", storeName: "binanceSpot" },
];
export const getDB = async (dbName, storeName) => {
  return await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};
export const saveOrders = async (orders) => {
	for (const { dbName, storeName } of DATABASES) {
		const db = await getDB(dbName, storeName);
		const tx = db.transaction(storeName, "readwrite");
		await tx.store.clear(); // Clear existing data to replace with new state
		for (const order of orders) {
			const plainOrder = JSON.parse(JSON.stringify(order)); // Convert reactive object to plain object
			await tx.store.add(plainOrder);
		}
		await tx.done;
	};
};
// Function to fetch orders from a specific database and store  
export const fetchOrders = async (dbName, storeName) => {
	const db = await getDB(dbName, storeName);
	return await db.getAll(storeName);
};
// Example to fetch all orders from all storages
	export const fetchAllOrders = async () => {
		const results = {};
		for (const { dbName, storeName } of DATABASES) {
			results[storeName] = await fetchOrders(dbName, storeName);
		}
		return results;
	};