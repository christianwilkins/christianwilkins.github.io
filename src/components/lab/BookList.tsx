import { useEffect, useState } from "react";
import { Book } from "@/lib/types";
import { Book as BookIcon, FileText, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BookListProps {
    onSelectBook: (book: Book) => void;
    refreshTrigger: number;
}

export default function BookList({ onSelectBook, refreshTrigger }: BookListProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [progressMap, setProgressMap] = useState<Record<string, number>>({});
    const [deleting, setDeleting] = useState<string | null>(null);

    // Fetch books
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

    // Fetch progress for books
    useEffect(() => {
        if (books.length === 0) return;

        const fetchProgress = async () => {
            const newProgress: Record<string, number> = {};

            await Promise.all(books.map(async (book) => {
                const name = book.pathname.split('/').pop() || book.pathname;
                try {
                    const res = await fetch(`/api/progress?book=${encodeURIComponent(name)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.location && typeof data.location === 'number') {
                            newProgress[book.url] = data.location;
                        }
                    }
                } catch (e) {
                    // Ignore errors for individual progress fetch
                }
            }));

            setProgressMap(newProgress);
        };

        fetchProgress();
    }, [books]);

    const handleDelete = async (e: React.MouseEvent, book: Book) => {
        e.stopPropagation(); // Prevent opening the book

        const name = book.pathname.split('/').pop() || book.pathname;
        if (!window.confirm(`Are you sure you want to delete "${name}"?\nThis cannot be undone.`)) {
            return;
        }

        setDeleting(book.url);
        try {
            const res = await fetch(`/api/books/delete?url=${encodeURIComponent(book.url)}&pathname=${encodeURIComponent(book.pathname)}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // Remove from local state immediately
                setBooks(prev => prev.filter(b => b.url !== book.url));
            } else {
                alert("Failed to delete book");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Error deleting book");
        } finally {
            setDeleting(null);
        }
    };

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
                const progress = progressMap[book.url];
                const isDeleting = deleting === book.url;

                return (
                    <Card
                        key={book.url}
                        className="group cursor-pointer hover:border-primary/50 transition-colors overflow-hidden relative"
                        onClick={() => !isDeleting && onSelectBook(book)}
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
                                <div className="flex flex-col items-end gap-1">
                                    <Badge variant="secondary" className="text-[10px] uppercase">
                                        {name.split('.').pop()}
                                    </Badge>
                                    {progress !== undefined && progress > 0 && (
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            Page {progress}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                            <CardTitle className="text-sm font-medium leading-tight line-clamp-2 mb-2" title={name}>
                                {name}
                            </CardTitle>
                        </CardContent>

                        {/* Delete Button - Visible on Hover */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-full shadow-sm"
                                onClick={(e) => handleDelete(e, book)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
