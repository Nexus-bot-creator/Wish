import React, { useState, useEffect } from 'react';
import { Heart, Camera, Gift, User, LogIn, LogOut, Sparkles, Star, Moon, Sun, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';

// Types
interface User {
  email: string;
  name: string;
}

interface Memory {
  id: number;
  src: string;
  caption: string;
  category: 'childhood' | 'family' | 'friends' | 'together';
}

interface WishCard {
  id: number;
  title: string;
  message: string;
  color: string;
  icon: React.ComponentType<any>;
}

// Theme Context
const ThemeContext = React.createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({
  isDark: false,
  toggleTheme: () => {},
});

// Components
const FloatingParticles: React.FC = () => {
  const { isDark } = React.useContext(ThemeContext);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {i % 2 === 0 ? (
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-purple-300' : 'text-pink-300'}`} />
          ) : (
            <Star className={`w-3 h-3 ${isDark ? 'text-blue-300' : 'text-purple-300'}`} />
          )}
        </div>
      ))}
    </div>
  );
};

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = React.useContext(ThemeContext);
  
  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
          : 'bg-white text-gray-600 hover:bg-gray-50'
      } shadow-lg hover:scale-110`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const AuthPage: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isDark } = React.useContext(ThemeContext);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin({ 
        email: formData.email, 
        name: formData.name || formData.email.split('@')[0] 
      });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    } relative overflow-hidden`}>
      <ThemeToggle />
      <FloatingParticles />
      
      {/* 3D Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-3d opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            <div className={`w-8 h-8 ${
              isDark 
                ? 'bg-gradient-to-br from-purple-400 to-blue-400' 
                : 'bg-gradient-to-br from-pink-300 to-purple-300'
            } rounded-full transform rotate-45`} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className={`w-full max-w-md transition-colors duration-300 ${
          isDark ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-sm rounded-2xl shadow-2xl p-8`}>
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark 
                ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                : 'bg-gradient-to-r from-pink-400 to-purple-400'
            }`}>
              {isLogin ? <LogIn className="w-8 h-8 text-white" /> : <UserPlus className="w-8 h-8 text-white" />}
            </div>
            <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {isLogin ? 'Sign in to access the birthday surprise' : 'Join us for a special celebration'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                    } focus:ring-2 focus:ring-purple-400/20 focus:outline-none ${
                      errors.name ? 'border-red-400' : ''
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>
            )}
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                  } focus:ring-2 focus:ring-purple-400/20 focus:outline-none ${
                    errors.email ? 'border-red-400' : ''
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                  } focus:ring-2 focus:ring-purple-400/20 focus:outline-none ${
                    errors.password ? 'border-red-400' : ''
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-400'
                    } focus:ring-2 focus:ring-purple-400/20 focus:outline-none ${
                      errors.confirmPassword ? 'border-red-400' : ''
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600' 
                  : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500'
              } text-white shadow-lg hover:shadow-xl`}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ email: '', password: '', name: '', confirmPassword: '' });
              }}
              className={`transition-colors duration-200 ${
                isDark 
                  ? 'text-purple-400 hover:text-purple-300' 
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [textVisible, setTextVisible] = useState(false);
  const { isDark } = React.useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900' 
        : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50'
    }`}>
      <FloatingParticles />
      <div className="text-center z-10 px-4">
        <h1 className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${
          isDark 
            ? 'from-purple-400 via-pink-400 to-blue-400' 
            : 'from-pink-400 via-purple-400 to-blue-400'
        } bg-clip-text text-transparent mb-8 animate-fadeInUp ${textVisible ? 'animate-pulse-slow' : ''}`}>
          Happy Birthday,
        </h1>
        <h2 className={`text-4xl md:text-6xl font-light mb-12 animate-fadeInUp animation-delay-300 ${
          isDark ? 'text-purple-300' : 'text-purple-600'
        }`}>
          My Beautiful Love! ✨
        </h2>
        <div className={`max-w-2xl mx-auto transition-opacity duration-1000 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-lg md:text-xl leading-relaxed mb-8 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Today marks another year of your incredible journey, and I'm so grateful to be part of it. 
            Your smile lights up my world, your laughter is my favorite melody, and your love is my greatest treasure. 
            Here's to celebrating you – the most amazing person I know! 💕
          </p>
          <div className="flex justify-center">
            <Heart className={`w-8 h-8 animate-heartbeat ${
              isDark ? 'text-pink-400' : 'text-pink-400'
            }`} />
          </div>
        </div>
      </div>
    </section>
  );
};

const MemoryCard: React.FC<{ memory: Memory }> = ({ memory }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = React.useContext(ThemeContext);

  const categoryColors = {
    childhood: isDark ? 'from-yellow-600 to-orange-600' : 'from-yellow-200 to-orange-200',
    family: isDark ? 'from-green-600 to-emerald-600' : 'from-green-200 to-emerald-200',
    friends: isDark ? 'from-blue-600 to-indigo-600' : 'from-blue-200 to-indigo-200',
    together: isDark ? 'from-pink-600 to-rose-600' : 'from-pink-200 to-rose-200'
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`aspect-square flex items-center justify-center ${
        isDark ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-gray-100 to-gray-200'
      }`}>
        <Camera className={`w-16 h-16 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t ${categoryColors[memory.category]} opacity-0 group-hover:opacity-90 transition-opacity duration-300`} />
      <div className={`absolute bottom-0 left-0 right-0 p-4 text-center transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{memory.caption}</p>
      </div>
    </div>
  );
};

const MemoriesSection: React.FC = () => {
  const { isDark } = React.useContext(ThemeContext);
  
  const memories: Memory[] = [
    { id: 1, src: '', caption: 'Your adorable childhood smile 😊', category: 'childhood' },
    { id: 2, src: '', caption: 'Growing up with such grace', category: 'childhood' },
    { id: 3, src: '', caption: 'Family moments that shaped you', category: 'family' },
    { id: 4, src: '', caption: 'Love and support from home', category: 'family' },
    { id: 5, src: '', caption: 'Laughing with your best friends', category: 'friends' },
    { id: 6, src: '', caption: 'Adventures and friendship', category: 'friends' },
    { id: 7, src: '', caption: 'Our first photo together 💕', category: 'together' },
    { id: 8, src: '', caption: 'Making beautiful memories', category: 'together' },
    { id: 9, src: '', caption: 'Every moment with you is precious', category: 'together' },
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-800 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-purple-300' : 'text-purple-600'
          }`}>Our Journey Together</h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A collection of beautiful moments that tell the story of who you are and how we found each other
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WishesSection: React.FC = () => {
  const { isDark } = React.useContext(ThemeContext);
  
  const wishCards: WishCard[] = [
    {
      id: 1,
      title: "My Dearest Love",
      message: "On this special day, I want you to know how much you mean to me. You've brought so much joy, love, and light into my life that I sometimes wonder how I ever lived without you. Your kindness touches everyone around you, your strength inspires me daily, and your beautiful soul makes this world a better place.",
      color: isDark ? "from-pink-600 to-rose-600" : "from-pink-200 to-rose-200",
      icon: Heart
    },
    {
      id: 2,
      title: "Your Beautiful Spirit",
      message: "Every day with you is a gift. Your laughter is the soundtrack to my happiness, your smile is the sunshine that brightens my darkest days, and your love is the anchor that keeps me grounded. You have this incredible ability to make everything better just by being yourself.",
      color: isDark ? "from-purple-600 to-indigo-600" : "from-purple-200 to-indigo-200",
      icon: Sparkles
    },
    {
      id: 3,
      title: "Dreams & Adventures",
      message: "As you celebrate another year of life, I'm excited for all the adventures that await us. May this new year bring you closer to your dreams, fill your heart with joy, and surround you with love. I can't wait to create more beautiful memories together and watch you shine even brighter.",
      color: isDark ? "from-blue-600 to-cyan-600" : "from-blue-200 to-cyan-200",
      icon: Star
    },
    {
      id: 4,
      title: "Forever & Always",
      message: "Happy Birthday to the most incredible woman I know! Thank you for being my partner, my best friend, and my greatest love. Here's to another year of laughter, love, and endless possibilities. I love you more than words can express, and I'm so grateful to call you mine. 💕",
      color: isDark ? "from-emerald-600 to-teal-600" : "from-emerald-200 to-teal-200",
      icon: Gift
    }
  ];

  return (
    <section className={`py-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-purple-900 to-gray-900' 
        : 'bg-gradient-to-br from-pink-50 to-rose-50'
    }`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDark ? 'text-pink-300' : 'text-pink-600'
          }`}>
            Special Messages Just for You
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Four heartfelt cards filled with love, wishes, and dreams for your special day
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {wishCards.map((card) => (
            <WishCardComponent key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

const WishCardComponent: React.FC<{ card: WishCard }> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { isDark } = React.useContext(ThemeContext);
  const IconComponent = card.icon;

  return (
    <div className="perspective-1000 h-80">
      <div
        className={`card-container transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <div className={`card-face card-front rounded-2xl shadow-2xl p-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-center h-full flex flex-col justify-center">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>{card.title}</h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Click to reveal a special message...
            </p>
            <div className="flex justify-center">
              <Gift className={`w-6 h-6 animate-bounce ${
                isDark ? 'text-purple-400' : 'text-purple-500'
              }`} />
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`card-face card-back rounded-2xl shadow-2xl p-8 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="h-full flex flex-col justify-center">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h3 className={`text-xl font-bold mb-4 text-center ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>{card.title}</h3>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {card.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigation: React.FC<{ activeSection: string; setActiveSection: (section: string) => void; onLogout: () => void }> = ({ 
  activeSection, 
  setActiveSection,
  onLogout
}) => {
  const { isDark } = React.useContext(ThemeContext);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'memories', label: 'Memories', icon: Camera },
    { id: 'wishes', label: 'Wishes', icon: Gift },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
      isDark ? 'bg-gray-900/80' : 'bg-white/80'
    } backdrop-blur-md shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-center flex-1">
            <div className={`flex space-x-1 rounded-full p-2 backdrop-blur-sm ${
              isDark ? 'bg-gray-800/50' : 'bg-white/50'
            }`}>
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
                    activeSection === id
                      ? isDark 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                      : isDark
                        ? 'text-gray-300 hover:text-purple-400 hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onLogout}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
              isDark 
                ? 'text-gray-300 hover:text-red-400 hover:bg-gray-700/50' 
                : 'text-gray-600 hover:text-red-600 hover:bg-white/50'
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveSection('home');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Hero />;
      case 'memories':
        return <MemoriesSection />;
      case 'wishes':
        return <WishesSection />;
      default:
        return <Hero />;
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-white'
      }`}>
        {!user ? (
          <AuthPage onLogin={handleLogin} />
        ) : (
          <>
            <ThemeToggle />
            <Navigation 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
              onLogout={handleLogout}
            />
            <div className="pt-20">
              {renderSection()}
            </div>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;