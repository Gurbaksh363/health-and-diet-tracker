    // In-memory store to replace Redis
class InMemoryStore {
    constructor() {
        this.store = new Map();
        this.timers = new Map();
    }

    // Set a key with expiration (in seconds)
    setex(key, seconds, value) {
        this.store.set(key, value);
        
        // Clear existing timer if any
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
        }
        
        // Set expiration timer
        const timer = setTimeout(() => {
            this.store.delete(key);
            this.timers.delete(key);
        }, seconds * 1000);
        
        this.timers.set(key, timer);
        
        return Promise.resolve('OK');
    }

    // Get a value by key
    get(key) {
        return Promise.resolve(this.store.get(key) || null);
    }

    // Delete a key
    del(key) {
        if (this.timers.has(key)) {
            clearTimeout(this.timers.get(key));
            this.timers.delete(key);
        }
        this.store.delete(key);
        return Promise.resolve(1);
    }

    // Set a key without expiration
    set(key, value) {
        this.store.set(key, value);
        return Promise.resolve('OK');
    }

    // Check if key exists
    exists(key) {
        return Promise.resolve(this.store.has(key) ? 1 : 0);
    }
}

const memoryStore = new InMemoryStore();

console.log("In-memory store initialized (Redis replacement)");

export default memoryStore;
