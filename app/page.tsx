import HamburgerMenu from "../components/atoms/HamburgerMenu";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* ハンバーガーメニューを左上に表示 */}
      <HamburgerMenu />

      {/* ページのメインコンテンツ */}
      <main className="p-8">
      </main>
    </div>
  );
}