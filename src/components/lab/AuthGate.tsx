"use client";

import { useSession, signIn } from "next-auth/react";
import { Loader2, Lock, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (session) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Lock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Restricted Access</CardTitle>
                    <CardDescription>
                        This area is for the site owner only. Please sign in with GitHub to continue.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => signIn("github")}
                        className="w-full flex items-center gap-2"
                    >
                        <Github className="w-4 h-4" />
                        Sign in with GitHub
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
