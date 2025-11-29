"use client";

import { useState } from "react";
import AuthGate from "@/components/lab/AuthGate";
import BookList from "@/components/lab/BookList";
import Uploader from "@/components/lab/Uploader";
import dynamic from "next/dynamic";
import { Book } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BookReader = dynamic(() => import("@/components/lab/BookReader"), {
    ssr: false,
    loading: () => null,
});

export default function BooksPage() {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleUploadComplete = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <AuthGate>
                {selectedBook ? (
                    <BookReader
                        book={selectedBook}
                        onClose={() => setSelectedBook(null)}
                    />
                ) : (
                    <div className="container mx-auto px-4 py-8 md:py-12">
                        <div className="mb-8 flex items-center gap-4">
                            <Button variant="ghost" size="icon" asChild>
                                <Link href="/lab">
                                    <ArrowLeft className="w-5 h-5" />
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold font-heading">The Library</h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar / Upload Area */}
                            <div className="lg:col-span-1 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                            Add to Library
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <Uploader onUploadComplete={handleUploadComplete} />
                                        <p className="text-xs text-muted-foreground">
                                            Supported formats: PDF, EPUB.
                                            <br />
                                            Files are stored in Vercel Blob storage.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Main Content / Book List */}
                            <div className="lg:col-span-3">
                                <BookList
                                    onSelectBook={setSelectedBook}
                                    refreshTrigger={refreshTrigger}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </AuthGate>
        </div>
    );
}
