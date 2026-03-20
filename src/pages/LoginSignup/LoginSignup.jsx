import "./LoginSignup.css";

export default function LoginSignup() {
  return (
    <main className="login-root">
      <section className="login-panel" aria-labelledby="login-heading">
        <h1 id="login-heading">Sign in</h1>
        <form className="login-form" aria-describedby="login-desc">
          <p id="login-desc">Sign in to manage your bookmarks and settings.</p>
          <label>
            <span className="sr-only">Email</span>
            <input type="email" name="email" placeholder="Email" required />
          </label>
          <label>
            <span className="sr-only">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </section>
    </main>
  );
}
