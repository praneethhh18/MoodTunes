import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Music, Heart, Users, Headphones, Play, TrendingUp } from 'lucide-react';
import Card3D from '../components/Card3D';
import HeroSection from '../components/HeroSection';

const HomePage = () => {
  const { currentTheme } = useTheme();

  const features = [
    {
      icon: Heart,
      title: 'Mood Detection',
      description: 'Advanced AI analyzes your current emotional state to curate the perfect playlist.',
      link: '/mood-detection',
      gradient: 'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
    },
    {
      icon: Music,
      title: 'Smart Recommendations',
      description: 'Discover new music tailored to your mood, preferences, and listening history.',
      link: '/recommendations',
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    {
      icon: Users,
      title: 'Social Sharing',
      description: 'Share your mood playlists with friends and discover what they\'re feeling.',
      link: '/profile',
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    },
    {
      icon: Headphones,
      title: 'Immersive Experience',
      description: 'Enjoy 3D visualizations and dynamic themes that match your musical journey.',
      link: '/',
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Happy Users', icon: Users },
    { number: '1M+', label: 'Songs Analyzed', icon: Music },
    { number: '100+', label: 'Mood Patterns', icon: Heart },
    { number: '99%', label: 'Accuracy Rate', icon: TrendingUp },
  ];

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <HeroSection />
      
      {/* Features Section */}
      <section className="section">
        <div className="content-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-gradient">
              Revolutionize Your Music Experience
            </h2>
            <p className="section-subtitle">
              Experience music like never before with AI-powered mood detection, 
              immersive 3D visuals, and personalized recommendations.
            </p>
          </motion.div>

          <div className="grid grid-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card3D>
                  <Link to={feature.link} className="feature-card">
                    <div 
                      className="feature-icon"
                      style={{ background: feature.gradient }}
                    >
                      <feature.icon size={32} color="white" />
                    </div>
                    <h3 className="feature-title" style={{ color: currentTheme.colors.text }}>
                      {feature.title}
                    </h3>
                    <p className="feature-description" style={{ color: currentTheme.colors.textSecondary }}>
                      {feature.description}
                    </p>
                    <motion.div
                      className="feature-arrow"
                      whileHover={{ x: 5 }}
                      style={{ color: currentTheme.colors.primary }}
                    >
                      <Play size={16} />
                    </motion.div>
                  </Link>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="content-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-gradient">
              Trusted by Music Lovers Worldwide
            </h2>
          </motion.div>

          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card3D>
                  <div className="stat-card text-center">
                    <div 
                      className="stat-icon"
                      style={{ color: currentTheme.colors.primary }}
                    >
                      <stat.icon size={40} />
                    </div>
                    <h3 className="stat-number text-gradient">
                      {stat.number}
                    </h3>
                    <p className="stat-label" style={{ color: currentTheme.colors.textSecondary }}>
                      {stat.label}
                    </p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="content-wrapper">
          <motion.div
            className="cta-section text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card3D>
              <div className="cta-content">
                <h2 className="cta-title text-gradient">
                  Ready to Transform Your Music Journey?
                </h2>
                <p className="cta-description" style={{ color: currentTheme.colors.textSecondary }}>
                  Join thousands of users who have discovered the perfect soundtrack to their emotions.
                </p>
                <div className="cta-buttons">
                  <Link 
                    to="/mood-detection" 
                    className="button button-large"
                    style={{
                      background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    }}
                  >
                    <Heart size={20} />
                    Detect My Mood
                  </Link>
                  <Link 
                    to="/auth" 
                    className="button button-large button-secondary"
                    style={{
                      borderColor: currentTheme.colors.primary,
                      color: currentTheme.colors.primary,
                    }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .feature-card {
          display: block;
          text-decoration: none;
          padding: 30px;
          height: 100%;
          position: relative;
          transition: all 0.3s ease;
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .feature-description {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .feature-arrow {
          position: absolute;
          bottom: 30px;
          right: 30px;
        }

        .stat-card {
          padding: 30px 20px;
        }

        .stat-icon {
          margin-bottom: 15px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 10px;
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 500;
        }

        .cta-section {
          margin: 80px 0;
        }

        .cta-content {
          padding: 60px 40px;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-description {
          font-size: 1.2rem;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .feature-card {
            padding: 20px;
          }

          .feature-arrow {
            bottom: 20px;
            right: 20px;
          }

          .stat-card {
            padding: 20px 15px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .cta-content {
            padding: 40px 20px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default HomePage;