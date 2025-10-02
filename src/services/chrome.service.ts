import type { Tab } from "../types";

class ChromeService {
    async getCurrentTab(): Promise<Tab> {
        const queryOptions = { active: true, lastFocusedWindow: true };
        const [tab] = await chrome.tabs.query(queryOptions);
        return tab;
    }

    saveToCache<T>(key: string, value: T) {
        return chrome.storage.local.set({ [key]: value });
    }

    getToCache<T>(key: string): Promise<T> {
        return chrome.storage.local.get([key]).then((result) => result[key]);
    }
    
}

export const chromeService = new ChromeService();