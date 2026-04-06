export default function AuthPage() {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="auth-eyebrow">Authentication</p>
        <h2 className="auth-title">Googleアカウントでログイン</h2>
        <p className="auth-description">Googleログインを使って、認証フローを開始できます。</p>
        <a className="auth-google-button" href="http://localhost:8080/auth/google/login">
          Googleでログイン
        </a>
      </div>
    </section>
  );
}

// FIXME: ログイン後は以下が必要
//fetch("http://localhost:8080/auth/me", {
//   credentials: "include",
// });

//　今後はJWTの管理が必要
