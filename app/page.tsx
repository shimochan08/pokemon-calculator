import GoogleLoginButton from '@/components/atoms/GoogleLoginButton';

export default function LoginPage() {
  return (
    <section className="login-page">
      <div className="login-copy">
        <p className="login-kicker">Pokémon Super Dashboard</p>
        <h1 className="login-title">
          あなた専用の
          <br />
          ポケモン管理ツール。
        </h1>
        <p className="login-subtitle">パーティ、育成メモ、ダメージ計算をひとつの場所で。</p>
      </div>

      <div className="login-action">
        <h2 className="login-actionTitle">今すぐ参加しましょう。</h2>
        <GoogleLoginButton href="/home" />
      </div>
    </section>
  );
}
