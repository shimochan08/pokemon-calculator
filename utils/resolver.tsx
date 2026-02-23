import AddPanel from "@/components/molecules/AddPanel";

/**
 * 🔥 componentKey → React Component 変換
 * コンポーネント登録の集中管理
 */
export function resolveComponent(key: string) {

    const registry: Record<string, React.FC<any>> = {

        // ✅ AddPanel
        add_panel: AddPanel,

        // 🔵 sサイズ（仮ダミー）
        s: () => (
            <div
                style={{
                    background: "#1e40af",
                    color: "white",
                    height: "var(--height)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }
                }
            >
                S Component
            </div>
        ),

        // 🟢 mサイズ（仮ダミー）
        m: () => (
            <div
                style={{
                    background: "#15803d",
                    color: "white",
                    height: "var(--height)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                M Component
            </div>
        ),

        // 🔴 lサイズ（仮ダミー）
        l: () => (
            <div
                style={{
                    background: "#b91c1c",
                    color: "white",
                    height: "var(--height)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                L Component
            </div>
        ),
    };

    return registry[key] ?? null;
}