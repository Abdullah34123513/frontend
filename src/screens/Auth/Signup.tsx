import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { 
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ChefHat,
  Users,
  Star,
  Heart,
  Globe,
  Check
} from "lucide-react";

export const Signup = (): JSX.Element => {
  const { t, isRTL, language } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Calculate password strength
    if (field === 'password') {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      alert(language === 'ar' ? 'يجب الموافقة على الشروط والأحكام' : 'You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      console.log('Signup attempt:', formData);
      setIsLoading(false);
      // Redirect to goals setup
      window.location.href = '/goals-setup';
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return language === 'ar' ? 'ضعيف' : 'Weak';
    if (passwordStrength <= 3) return language === 'ar' ? 'متوسط' : 'Medium';
    return language === 'ar' ? 'قوي' : 'Strong';
  };

  const stats = [
    { icon: Users, value: "50K+", label: language === 'ar' ? 'مستخدم' : 'Users' },
    { icon: ChefHat, value: "25K+", label: language === 'ar' ? 'وصفة' : 'Recipes' },
    { icon: Star, value: "4.9", label: language === 'ar' ? 'تقييم' : 'Rating' },
    { icon: Globe, value: "150+", label: language === 'ar' ? 'دولة' : 'Countries' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#22ae4b] to-[#1c9a40] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 mb-6">
              <Heart className="w-16 h-16 text-white mx-auto" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Join EEINA Today</h1>
            <p className="text-xl text-white/90 mb-8">
              {language === 'ar' 
                ? 'ابدأ رحلتك نحو نمط حياة صحي مع وصفات مخصصة' 
                : 'Start your journey to a healthier lifestyle with personalized recipes'
              }
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 w-full max-w-md">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90">
                {language === 'ar' ? 'وصفات مخصصة لأهدافك' : 'Personalized recipes for your goals'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90">
                {language === 'ar' ? 'تتبع التقدم والتغذية' : 'Track progress and nutrition'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/90">
                {language === 'ar' ? 'مجتمع داعم من الطهاة' : 'Supportive community of chefs'}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-md mt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="bg-[#22ae4b] text-white font-bold text-2xl px-6 py-3 rounded-xl inline-block mb-4">
              EEINA
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' ? 'انضم إلى مجتمع الطعام' : 'Join our food community'}
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              {/* Desktop Header */}
              <div className="hidden lg:block text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                </h2>
                <p className="text-gray-600">
                  {language === 'ar' ? 'ابدأ رحلتك الطهوية معنا' : 'Start your culinary journey with us'}
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                {/* Name Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'الاسم الأول' : 'First Name'}
                    </label>
                    <div className="relative">
                      <User className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder={language === 'ar' ? 'الاسم الأول' : 'First name'}
                        className={`h-12 ${isRTL ? 'pr-10 text-right' : 'pl-10'} border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'ar' ? 'اسم العائلة' : 'Last Name'}
                    </label>
                    <div className="relative">
                      <User className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder={language === 'ar' ? 'اسم العائلة' : 'Last name'}
                        className={`h-12 ${isRTL ? 'pr-10 text-right' : 'pl-10'} border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      className={`h-12 ${isRTL ? 'pr-10 text-right' : 'pl-10'} border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <Lock className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      className={`h-12 ${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'} border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{getPasswordStrengthText()}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {language === 'ar' 
                          ? 'يجب أن تحتوي على 8 أحرف على الأقل، أحرف كبيرة وصغيرة، أرقام ورموز' 
                          : 'Must contain at least 8 characters, uppercase, lowercase, numbers and symbols'
                        }
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <Lock className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Confirm your password'}
                      className={`h-12 ${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'} border-gray-300 focus:border-[#22ae4b] focus:ring-[#22ae4b]`}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2">
                      {formData.password === formData.confirmPassword ? (
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <Check className="w-4 h-4" />
                          <span>{language === 'ar' ? 'كلمات المرور متطابقة' : 'Passwords match'}</span>
                        </div>
                      ) : (
                        <div className="text-red-600 text-sm">
                          {language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match'}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-[#22ae4b] border-gray-300 rounded focus:ring-[#22ae4b] mt-1"
                    required
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {language === 'ar' 
                      ? 'أوافق على' 
                      : 'I agree to the'
                    }{' '}
                    <Link to="/terms" className="text-[#22ae4b] hover:underline font-medium">
                      {language === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
                    </Link>
                    {' '}{language === 'ar' ? 'و' : 'and'}{' '}
                    <Link to="/privacy" className="text-[#22ae4b] hover:underline font-medium">
                      {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                    </Link>
                    {language === 'ar' 
                      ? '. كما أوافق على تلقي رسائل بريد إلكتروني حول الوصفات والنصائح الغذائية.' 
                      : '. I also agree to receive emails about recipes and nutrition tips.'
                    }
                  </p>
                </div>

                {/* Signup Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !agreeToTerms}
                  className="w-full h-12 bg-[#22ae4b] hover:bg-[#1c9a40] text-white font-semibold text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{language === 'ar' ? 'إنشاء حساب' : 'Create Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">
                      {language === 'ar' ? 'أو' : 'or'}
                    </span>
                  </div>
                </div>

                {/* Social Signup */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400"
                  >
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 mr-3" />
                    {language === 'ar' ? 'التسجيل بجوجل' : 'Sign up with Google'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-gray-300 hover:border-gray-400"
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">f</span>
                    </div>
                    {language === 'ar' ? 'التسجيل بفيسبوك' : 'Sign up with Facebook'}
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
                    <Link 
                      to="/login" 
                      className="text-[#22ae4b] hover:text-[#1c9a40] font-semibold"
                    >
                      {language === 'ar' ? 'تسجيل الدخول' : 'Sign in'}
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};