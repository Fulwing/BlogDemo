'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInSchema } from '@/lib/zod';
import LoadingButton from '@/app/_components/loading-button';
import { handleCredentialsSignin } from '@/app/auth/action/authAction';
import { useState } from 'react';
import ErrorMessage from '@/app/_components/error-message';

export default function SignIn() {
    const [globalError, setGlobalError] = useState<string>('');
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setGlobalError(result.message);
            } else {
                // Reload the page to update the session state
                window.location.href = '/';
            }
        } catch (error) {
            console.log('An unexpected error occurred. Please try again.');
            setGlobalError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="bg-blue-500 text-white">
                    <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {globalError && <ErrorMessage error={globalError} />}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter your username"
                                                autoComplete="off"
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        <FormLabel className="text-gray-700">Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter password"
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <LoadingButton
                                pending={form.formState.isSubmitting}
                                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Sign In
                            </LoadingButton>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
