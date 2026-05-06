import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser, saveAuthData } from "../../utils/auth.js";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await loginUser(formData.email, formData.password);
      } else {
        response = await registerUser(
          formData.email,
          formData.password,
          formData.passwordConfirm,
        );
      }

      // Save JWT token and user data to localStorage
      saveAuthData(response);

      // Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please try again.");
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", passwordConfirm: "" });
  };

  return (
    <div className="login-root">
      <section className="login-panel" aria-labelledby="login-heading">
        <h1 id="login-heading">{isLogin ? "Sign in" : "Sign up"}</h1>
        <form
          className="login-form"
          aria-describedby="login-desc"
          onSubmit={handleSubmit}
        >
          <p id="login-desc">
            {isLogin
              ? "Sign in to manage your bookmarks and settings."
              : "Create an account to get started."}
          </p>

          {error && (
            <div
              className="error-message"
              role="alert"
              style={{
                color: "#d83b42",
                marginBottom: "1rem",
                padding: "0.75rem",
                backgroundColor: "#f5e5e6",
                borderRadius: "4px",
              }}
            >
              {error}
            </div>
          )}

          <label>
            <span className="sr-only">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </label>

          <label>
            <span className="sr-only">Password</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </label>

          {!isLogin && (
            <label>
              <span className="sr-only">Confirm Password</span>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </label>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleMode}
            style={{
              background: "none",
              border: "none",
              color: "#fc4747",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "600",
            }}
            disabled={loading}
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </section>
    </div>
  );
}
