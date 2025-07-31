import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { 
  signInWithPopup,
  GoogleAuthProvider,
  AuthError
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { isUniversityEmail } from '../lib/validate';
import { BookOpen } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email || '';
      if (!isUniversityEmail(userEmail)) {
        await auth.signOut();
        setError('Please use your university email to access the book recommendation system.');
        return;
      }
      navigate('/home');
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const authError = error as AuthError;
        if (authError.code === 'auth/popup-closed-by-user') {
          setError('Sign-in window was closed. Please try again.');
        } else {
          setError('Unable to sign in. Please try again with your university account.');
          console.error(error);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#E3E6F2' }}>
      <div className="w-full max-w-md space-y-8">
        
        {/* Logo and Title */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-[#880015] rounded-full p-3 shadow-lg">
              <BookOpen size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">NextBook</h1>
          <p className="text-[#880015] font-medium">University Book Recommendation System</p>
        </div>
        
        {/* Card */}
        <Card className="w-full shadow-xl border-0">
          <div className="h-2 bg-gradient-to-r from-[#880015] to-pink-500 rounded-t-lg"></div>
          <CardContent className="pt-6 pb-8 px-6">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Welcome!</h2>
                <p className="text-gray-500 text-sm">Access your personalized book recommendations</p>
              </div>

              <Button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center space-x-3 py-6 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 shadow-sm transition-all"
                variant="outline"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="font-medium">{loading ? 'Signing in...' : 'Sign in with University ID'}</span>
              </Button>

              {error && (
                <Alert variant="destructive" className="bg-[#F2DFD8] text-[#880015] border border-red-200">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  New to NextBook? Your university account gives you automatic access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          <h3 className="font-medium text-gray-800 mb-2">Why use NextBook?</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {[
              "Personalized book recommendations based on your major",
              "Find course materials and supplementary reading",
              "Connect with peers through shared reading lists"
            ].map((text, i) => (
              <li key={i} className="flex items-start">
                <div className="mr-2 mt-1 bg-[#F2DFD8] rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#880015]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} NextBook - University Book Recommendation System
        </div>
      </div>
    </div>
  );
}
