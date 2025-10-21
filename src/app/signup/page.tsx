import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BodyBaseIcon } from '@/components/icons';

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-8 glass-card">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <BodyBaseIcon className="w-10 h-10 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
          </Link>
          <h1 className="text-3xl font-bold font-headline">Create Your Account</h1>
          <p className="text-muted-foreground">Start your wellness journey on BodyBase.</p>
        </div>
        <form action="/dashboard" className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="CryptoFitGal" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <p className="text-xs text-muted-foreground">
            By signing up, a secure wallet will be created for you.
          </p>
          <Button type="submit" className="w-full btn-gradient font-bold">
            Sign Up & Create Wallet
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
