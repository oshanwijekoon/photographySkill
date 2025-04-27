import { useState, useContext } from 'react';
import { UserContext, UIContext } from '../../App';

function Login() {
  const { setUser } = useContext(UserContext);
  const { setCurrentPage } = useContext(UIContext);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulating authentication
    setTimeout(() => {
      // Example login logic - in a real app, you would validate with a backend
      if (formData.email === 'test@example.com' && formData.password === 'password') {
        setUser({
          id: "1",
          name: "John Doe",
          title: "Software Engineer",
          profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
          background: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
          connections: 342,
          isAuthenticated: true
        });
      } else {
        setError('Invalid email or password');
      }
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  const navigateToRegister = () => {
    setCurrentPage('register');
  };
  
  return (
    <div className="flex justify-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">ProConnect</h1>
          <p className="text-gray-600 mt-2">Sign in to your professional network</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            New to ProConnect?{' '}
            <button
              type="button"
              onClick={navigateToRegister}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Join now
            </button>
          </p>
        </div>
        
        {/* Demo credentials hint */}
        <div className="mt-8 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
          <p className="font-medium mb-1">Demo credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
