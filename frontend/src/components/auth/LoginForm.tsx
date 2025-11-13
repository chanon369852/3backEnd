import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Mail, 
  Lock, 
  Building, 
  AlertCircle, 
  Eye, 
  EyeOff,
  LogIn,
  ArrowRight
} from 'lucide-react';
import { login } from '../../services/api';
import GoogleLoginButton from './GoogleLoginButton';

interface LoginFormProps {
  onForgotPassword?: () => void;
  onRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword, onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', tenantId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password, formData.tenantId);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-gray-600">
            เข้าสู่ระบบ RGA Dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Login */}
          <GoogleLoginButton
            tenantId={formData.tenantId}
            onError={handleGoogleError}
            className="border-gray-300 hover:bg-gray-50"
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">หรือ</span>
            </div>
          </div>

          {/* Email/Password Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสองค์กร (Tenant ID)
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.tenantId}
                  onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="my-company"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                อีเมล
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="รหัสผ่านของคุณ"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg font-semibold"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>เข้าสู่ระบบ</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="space-y-3 text-center">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
            >
              ลืมรหัสผ่าน?
            </button>
            
            <div className="text-sm text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
