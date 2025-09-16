import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Card3D from '../components/Card3D';

const AuthPage = () => {
  const { currentTheme } = useTheme();
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="content-wrapper">
        <div className="auth-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card3D className="auth-card">
              <div className="auth-content">
                <div className="auth-header">
                  <h1 className="auth-title text-gradient">
                    {isLogin ? 'Welcome Back' : 'Join MoodTunes'}
                  </h1>
                  <p className="auth-subtitle" style={{ color: currentTheme.colors.textSecondary }}>
                    {isLogin 
                      ? 'Sign in to continue your musical journey' 
                      : 'Create an account to discover your perfect soundtrack'
                    }
                  </p>
                </div>

                <form className="auth-form">
                  {!isLogin && (
                    <div className="form-group">
                      <label style={{ color: currentTheme.colors.text }}>Full Name</label>
                      <div className="input-wrapper">
                        <User size={20} style={{ color: currentTheme.colors.primary }} />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          style={{
                            background: currentTheme.colors.cardBg,
                            borderColor: currentTheme.colors.primary,
                            color: currentTheme.colors.text,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <label style={{ color: currentTheme.colors.text }}>Email</label>
                    <div className="input-wrapper">
                      <Mail size={20} style={{ color: currentTheme.colors.primary }} />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          background: currentTheme.colors.cardBg,
                          borderColor: currentTheme.colors.primary,
                          color: currentTheme.colors.text,
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label style={{ color: currentTheme.colors.text }}>Password</label>
                    <div className="input-wrapper">
                      <Lock size={20} style={{ color: currentTheme.colors.primary }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        style={{
                          background: currentTheme.colors.cardBg,
                          borderColor: currentTheme.colors.primary,
                          color: currentTheme.colors.text,
                        }}
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ color: currentTheme.colors.primary }}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  {isLogin && (
                    <div className="form-options">
                      <a 
                        href="#"
                        className="forgot-password"
                        style={{ color: currentTheme.colors.primary }}
                      >
                        Forgot Password?
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="auth-button"
                    style={{
                      background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    }}
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                <div className="auth-divider">
                  <span style={{ background: currentTheme.colors.background, color: currentTheme.colors.textSecondary }}>
                    or
                  </span>
                </div>

                <div className="social-auth">
                  <button
                    className="social-button"
                    style={{
                      borderColor: currentTheme.colors.primary,
                      color: currentTheme.colors.primary,
                    }}
                  >
                    Continue with Google
                  </button>
                  <button
                    className="social-button"
                    style={{
                      borderColor: currentTheme.colors.primary,
                      color: currentTheme.colors.primary,
                    }}
                  >
                    Continue with Spotify
                  </button>
                </div>

                <div className="auth-switch">
                  <p style={{ color: currentTheme.colors.textSecondary }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      type="button"
                      className="switch-button"
                      onClick={() => setIsLogin(!isLogin)}
                      style={{ color: currentTheme.colors.primary }}
                    >
                      {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 40px 0;
        }

        .auth-card {
          width: 100%;
        }

        .auth-content {
          padding: 50px 40px;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .auth-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .auth-subtitle {
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .auth-form {
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          padding: 15px 20px 15px 50px;
          border: 2px solid;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .input-wrapper input:focus {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .input-wrapper > :first-child {
          position: absolute;
          left: 15px;
          z-index: 2;
        }

        .password-toggle {
          position: absolute;
          right: 15px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 2;
        }

        .form-options {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 30px;
        }

        .forgot-password {
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          transition: opacity 0.3s ease;
        }

        .forgot-password:hover {
          opacity: 0.8;
        }

        .auth-button {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .auth-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }

        .auth-divider {
          position: relative;
          text-align: center;
          margin: 30px 0;
        }

        .auth-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }

        .auth-divider span {
          padding: 0 20px;
          font-size: 0.9rem;
        }

        .social-auth {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .social-button {
          padding: 15px;
          border: 2px solid;
          border-radius: 12px;
          background: transparent;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .social-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .auth-switch {
          text-align: center;
        }

        .auth-switch p {
          margin: 0;
          font-size: 0.9rem;
        }

        .switch-button {
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          margin-left: 5px;
          transition: opacity 0.3s ease;
        }

        .switch-button:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .auth-content {
            padding: 30px 25px;
          }

          .auth-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default AuthPage;