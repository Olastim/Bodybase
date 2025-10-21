import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BodyBaseIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 glass-card">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <BodyBaseIcon className="w-10 h-10 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
          </Link>
          <h1 className="text-3xl font-bold font-headline">Welcome Back</h1>
          <p className="text-muted-foreground">Log in to continue your journey.</p>
        </div>
        <form action="/dashboard" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Username or Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full btn-gradient font-bold">
            Log In
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
