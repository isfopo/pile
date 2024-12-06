import { Memento } from "vscode";

/**
 * A class that provides a wrapper around the VSCode Memento storage.
 *
 * The Storage class facilitates the retrieval and storage of data in a
 * persistent manner using the Memento API. It supports generic types for
 * storing and retrieving different data types, and includes methods to
 * manage date entities specifically.
 *
 * @class Storage
 * @constructor
 * @param {Memento} storage - An instance of Memento for managing persistent storage.
 *
 * @method get<T>(key: string): T
 * Retrieves a value associated with the specified key from storage.
 * Returns null if the key does not exist.
 *
 * @method set<T>(key: string, value: T): Promise<void>
 * Stores a value associated with the specified key in the storage.
 * This is an asynchronous operation.
 *
 * @method getDates(): Day[]
 * Retrieves an array of Day objects from the storage for keys that
 * correspond to valid day entries. Filters out any invalid or undefined entries.
 *
 * @method reset(): void
 * Resets the storage by updating all keys to 'undefined', effectively
 * clearing the stored data.
 */
export class Storage {
  constructor(private storage: Memento) {}

  /**
   * Retrieves a value associated with the specified key from storage.
   * If the key does not exist, returns null as the default value.
   * This method supports generic types for flexibility in data retrieval.
   *
   * @param {string} key - The key associated with the value to retrieve.
   * @returns {T} - The value associated with the key, or null if the key does not exist.
   */
  public get<T>(key: string): T {
    return this.storage.get<T>(key, null as T);
  }

  /**
   * Stores a value associated with the specified key in the storage.
   * This method is asynchronous, allowing for non-blocking storage of data.
   * It updates the value corresponding to the provided key, effectively
   * replacing any existing value.
   *
   * @param {string} key - The key associated with the value to be stored.
   * @param {T} value - The value to be stored under the specified key.
   * @returns {Promise<void>} - A Promise that resolves when the value has been stored.
   */
  public async set<T>(key: string, value: T): Promise<void> {
    await this.storage.update(key, value);
  }

  /**
   * Resets the storage by updating all keys to 'undefined', effectively
   * clearing the stored data. This method iterates through all keys in the
   * storage and sets each one to undefined, which removes the associated
   * values and leaves the storage empty.
   *
   * @method reset
   * @returns {void} - This method does not return any value.
   */
  public reset(): void {
    this.storage.keys().forEach((key) => this.storage.update(key, undefined));
  }
}
