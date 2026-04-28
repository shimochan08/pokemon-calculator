import GoogleLoginButton from '@/components/atoms/GoogleLoginButton';

export default function LoginPage() {
  return (
    <section className="login-page">
      <GoogleLoginButton href="/home" />
    </section>
  );
}
