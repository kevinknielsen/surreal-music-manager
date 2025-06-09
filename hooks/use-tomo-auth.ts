import { useState, useEffect } from 'react';

// Define types for when we implement useTomo hook
interface TomoUser {
  address?: string;
  profile?: {
    name?: string;
    avatar?: string;
    socialProvider?: string;
  };
}

interface TomoAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: TomoUser | null;
  error: string | null;
}

interface TomoAuthActions {
  login: () => void;
  logout: () => void;
  openConnectModal: () => void;
  closeConnectModal: () => void;
}

export function useTomoAuth(): TomoAuthState & TomoAuthActions {
  const [state, setState] = useState<TomoAuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  });

  // TODO: Replace with actual Tomo hook when component mounts
  // const {
  //   connected,
  //   openConnectModal,
  //   closeConnectModal,
  //   disconnect,
  //   solanaAddress,
  //   providers
  // } = useTomo();

  useEffect(() => {
    // For now, simulate loading state
    const timer = setTimeout(() => {
      setState(prev => ({ ...prev, isLoading: false }));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock implementation for now
  const login = () => {
    console.log('Connect with Tomo - Opening wallet connection modal...');
    // TODO: Call actual openConnectModal() from useTomo
  };

  const logout = () => {
    console.log('Disconnecting from Tomo...');
    // TODO: Call actual disconnect() from useTomo
    setState(prev => ({ 
      ...prev, 
      isAuthenticated: false, 
      user: null 
    }));
  };

  const openConnectModal = login;
  const closeConnectModal = () => {
    console.log('Closing Tomo connect modal...');
    // TODO: Call actual closeConnectModal() from useTomo
  };

  return {
    ...state,
    login,
    logout,
    openConnectModal,
    closeConnectModal,
  };
}

// Helper function to format address display
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

// Helper function to get greeting message based on user
export function getGreetingMessage(user: TomoUser | null): string {
  if (!user?.profile?.name) {
    return "Hey there, Alex here. What can I handle for you today?";
  }
  return `Hey ${user.profile.name}, Alex here. What can I handle for you today?`;
} 