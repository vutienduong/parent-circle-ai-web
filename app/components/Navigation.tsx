'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  Home, 
  Users, 
  MessageCircle, 
  Calendar, 
  ShoppingBag, 
  Menu, 
  X,
  Heart,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react';
import { useAuth } from '../lib/auth-context';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  // Different nav items based on authentication status
  const guestNavItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/communities', label: 'Cộng đồng', icon: Users },
    { href: '/chat', label: 'AI Chat', icon: MessageCircle },
  ];

  const authenticatedNavItems = [
    { href: '/', label: 'Trang chủ', icon: Home },
    { href: '/communities', label: 'Cộng đồng', icon: Users },
    { href: '/chat', label: 'ParentChat AI', icon: MessageCircle },
    { href: '/scheduler', label: 'Lịch gia đình', icon: Calendar },
    { href: '/marketplace', label: 'Chợ phụ huynh', icon: ShoppingBag },
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/progress', label: 'Tiến độ', icon: Home },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : guestNavItems;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const getUserInitials = (user: any) => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.full_name) {
      const names = user.full_name.split(' ');
      return names.length > 1 ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase() : names[0][0].toUpperCase();
    }
    return user?.email ? user.email[0].toUpperCase() : 'U';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isAuthenticated 
        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm' 
        : 'bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-md border-b border-white/20 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 ${
              isAuthenticated 
                ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Heart className={`w-6 h-6 ${isAuthenticated ? 'text-white' : 'text-white'}`} />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold ${
                isAuthenticated 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                  : 'text-white'
              }`}>
                ParentCircle
              </h1>
              <p className={`text-xs -mt-1 ${
                isAuthenticated ? 'text-gray-500' : 'text-white/80'
              }`}>
                Cộng đồng phụ huynh thông minh
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? isAuthenticated
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'bg-white/20 text-white shadow-sm'
                      : isAuthenticated
                        ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              /* Authenticated User Menu */
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {getUserInitials(user)}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{user?.first_name || user?.full_name || 'Người dùng'}</p>
                      <p className="text-xs text-gray-500">Thành viên</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Cài đặt</span>
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Guest User Actions */
              <div className="flex items-center space-x-3">
                <div className="text-white/90 text-sm font-medium hidden lg:block">
                  Tham gia cộng đồng phụ huynh thông minh
                </div>
                <Link 
                  href="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-all duration-200"
                >
                  <User className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </Link>
                <Link 
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm"
                >
                  Tạo tài khoản
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isAuthenticated
                  ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            isAuthenticated 
              ? 'border-gray-200 bg-white/95 backdrop-blur-sm' 
              : 'border-white/20 bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-pink-600/95 backdrop-blur-sm'
          }`}>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? isAuthenticated
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white/20 text-white'
                        : isAuthenticated
                          ? 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className={`border-t pt-4 mt-4 ${
                isAuthenticated ? 'border-gray-200' : 'border-white/20'
              }`}>
                {isAuthenticated ? (
                  /* Mobile Authenticated Menu */
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {getUserInitials(user)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.first_name || user?.full_name || 'Người dùng'}</p>
                        <p className="text-xs text-gray-500">Thành viên ParentCircle</p>
                      </div>
                    </div>
                    <Link 
                      href="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 w-full"
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <Link 
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200 w-full"
                    >
                      <Settings className="w-5 h-5" />
                      <span>Cài đặt</span>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  /* Mobile Guest Menu */
                  <div className="space-y-2">
                    <div className="px-4 py-3 text-white/90 text-sm">
                      Tham gia cộng đồng phụ huynh thông minh
                    </div>
                    <Link 
                      href="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition-all duration-200 w-full"
                    >
                      <User className="w-5 h-5" />
                      <span>Đăng nhập</span>
                    </Link>
                    <Link 
                      href="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 transition-all duration-200 w-full"
                    >
                      <span>Tạo tài khoản</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 