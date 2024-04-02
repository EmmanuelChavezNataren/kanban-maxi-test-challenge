import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageHelper {
  async getObject<T>(key: string): Promise<T | null> {
    const item = await Preferences.get({ key });
    if (item.value === null) {
      return null;
    }
    return JSON.parse(item.value);
  }

  async set(key: string, value: any): Promise<void> {
    await Preferences.set({
      key,
      value,
    });
  }

  async get(key: string): Promise<string | null> {
    const { value } = await Preferences.get({ key });
    return value;
  }

  async remove(key: string): Promise<void> {
    await Preferences.remove({ key });
  }

  async keys(): Promise<string[]> {
    const { keys } = await Preferences.keys();
    return keys;
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }
}
