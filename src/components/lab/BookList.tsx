"use client";

import { useEffect, useState } from "react";
import { Book } from "@/lib/types";
import { Book as BookIcon, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BookListProps {
    onSelectBook: (book: Book) => void;
    refreshTrigger: number;
}

export default function BookList({ onSelectBook, refreshTrigger }: BookListProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/books');
                if (response.ok) {
                    const data = await response.json();
                    setBooks(data);
                }
            } catch (error) {
                console.error("Failed to fetch books", error);
            }
            setLoading(false);
        };
        fetchBooks();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (books.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted-foreground/25">
                <p className="text-muted-foreground">No books found in library.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => {
                const name = book.pathname.split('/').pop() || book.pathname;
                const isPdf = name.toLowerCase().endsWith(".pdf");
                return (
                    <Card
                        key={book.url}
                        className="group cursor-pointer hover:border-primary/50 transition-colors overflow-hidden"
                        onClick={() => onSelectBook(book)}
                    >
                        <CardHeader className="p-4 bg-muted/30 pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded-md bg-background border shadow-sm group-hover:text-primary transition-colors">
                                    {isPdf ? (
                                        <FileText className="w-5 h-5" />
                                    ) : (
                                        <BookIcon className="w-5 h-5" />
                                    )}
                                </div>
                                <Badge variant="secondary" className="text-[10px] uppercase">
                                    {name.split('.').pop()}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <CardTitle className="text-sm font-medium leading-tight line-clamp-2" title={name}>
                                {name}
                            </CardTitle>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
