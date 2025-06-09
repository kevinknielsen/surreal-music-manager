'use client';

import { Button } from '@/components/ui/button';
import { useTomoAuth, formatAddress } from '@/hooks/use-tomo-auth';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export function TomoAuthButton() {
  const { isAuthenticated, isLoading, user, login, logout } = useTomoAuth();

  if (isLoading) {
    return (
      <Button disabled variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && user?.address) {
    return (
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Logged in as:</span>{' '}
          {user.profile?.name || 'Anonymous'} • {formatAddress(user.address)}
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button onClick={login} className="w-full">
        <LogIn className="mr-2 h-4 w-4" />
        Connect with Tomo
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        One-click social login & wallet aggregation.
      </p>
    </div>
  );
}

// Welcome screen component for the login page
export function TomoWelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Tracks Ahead Management
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI-powered music manager for royalties, licensing, and on-chain rights management.
          </p>
        </div>
        
        <div className="space-y-6">
          <TomoAuthButton />
          
          <div className="text-sm text-muted-foreground">
            <p>Meet Alex "Tracks" Johnson</p>
            <p>Your Virtual Music Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
} 