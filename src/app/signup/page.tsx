'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BodyBaseIcon } from '@/components/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore }from '@/firebase';
import { ethers } from 'ethers';
import { setDocumentNonBlocking } from '@/firebase';

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be at most 20 characters')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ),
    email: z.string().email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // 1. Check if username is unique
      const usernameDocRef = doc(firestore, 'users', values.username.toLowerCase());
      const usernameDoc = await getDoc(usernameDocRef);
      if (usernameDoc.exists()) {
        form.setError('username', {
          type: 'manual',
          message: 'Username is already taken.',
        });
        return;
      }
      
      // 2. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // 3. Generate a new wallet
      const wallet = ethers.Wallet.createRandom();
      
      // 4. Encrypt the private key with the user's password
      const encryptedPrivateKey = await wallet.encrypt(values.password);

      // 5. Store the encrypted wallet in localStorage
      localStorage.setItem(`wallet_${user.uid}`, encryptedPrivateKey);

      // 6. Store user data in Firestore
      const userDocData = {
        uid: user.uid,
        username: values.username,
        email: values.email,
        walletAddress: wallet.address,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      
      // We use the username as the document ID for easy lookup
      // and the user's UID for the main user document.
      const userDocRef = doc(firestore, "users", user.uid);
      const usernameRef = doc(firestore, "usernames", values.username.toLowerCase());

      setDocumentNonBlocking(userDocRef, userDocData, { merge: true });
      setDocumentNonBlocking(usernameRef, { uid: user.uid, walletAddress: wallet.address }, {});
      
      toast({
        title: 'Account Created!',
        description: "Welcome to BodyBase. Let's get started.",
      });

      router.push('/dashboard');

    } catch (error: any) {
      console.error('Signup Error:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        form.setError('email', { type: 'manual', message: 'This email is already in use.' });
        return;
      }
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: errorMessage,
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 glass-card">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 mb-4"
          >
            <BodyBaseIcon className="w-10 h-10 text-primary drop-shadow-[0_0_12px_hsl(var(--primary))]" />
          </Link>
          <h1 className="text-3xl font-bold font-headline">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Start your wellness journey on BodyBase.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="CryptoFitGal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I agree to the{' '}
                      <Link href="/terms" className="underline hover:text-primary">
                        Terms and Conditions
                      </Link>
                    </FormLabel>
                     <FormMessage />
                  </div>
                </FormItem>
              )}
            />
             <p className="text-xs text-muted-foreground">
              By signing up, a secure wallet will be created for you.
            </p>
            <Button
              type="submit"
              className="w-full btn-gradient font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up & Create Wallet'}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
