export default function HomePage() {
  const steps = [
    {
      title: '1. ポケモンを登録する',
      description: 'ポケモン一覧から枠を選び、性格・特性・持ち物・技・努力値などを入力します。',
    },
    {
      title: '2. パーティを整える',
      description: '役割や相性を見ながら、対戦で使う6体の構成を組み立てます。',
    },
    {
      title: '3. バトル前に確認する',
      description: 'ステータスや技構成を見直し、必要に応じてダメージ計算で有利不利を確認します。',
    },
  ];

  return (
    <section className="home-guide">
      <div className="home-guideHero">
        <p className="home-guideKicker">Pokémon Super Dashboard</p>
        <h1 className="home-guideTitle">育成から対戦準備まで、迷わず進めるための作戦室。</h1>
        <p className="home-guideLead">
          このサービスでは、ポケモンの個体情報、パーティ編成、バトル前の確認、ダメージ計算をひとつの画面の流れで管理できます。
        </p>
      </div>

      <div className="home-guideGrid" aria-label="サービスの使い方">
        {steps.map((step) => (
          <article key={step.title} className="home-guideCard">
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </div>

      <div className="home-guideNote">
        <h2>まずは左のメニューから「ポケモン一覧」を開いてください。</h2>
        <p>
          登録した情報は各機能の土台になります。パーティ編成やダメージ計算を使う前に、よく使うポケモンを追加しておくとスムーズです。
        </p>
      </div>
    </section>
  );
}
