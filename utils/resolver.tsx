import { panelRegistry } from "./panelRegistry";

export function resolveComponent(key: string) {
    const found = panelRegistry.find((p) => p.key === key);
    return found?.component ?? null;
}