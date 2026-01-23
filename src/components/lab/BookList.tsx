import { useEffect, useState } from "react";
import { Book } from "@/lib/types";
import { Book as BookIcon, FileText, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
                } catch {
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
                        className="group flex flex-col justify-between cursor-pointer hover:border-primary/50 transition-all duration-300 overflow-hidden bg-card/50 hover:bg-card hover:shadow-md"
                        onClick={() => !isDeleting && onSelectBook(book)}
                    >
                        <CardContent className="p-5 flex flex-col h-full relative">
                            {/* Header: Icon and Badge */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="text-primary/80">
                                    {isPdf ? (
                                        <FileText className="w-8 h-8" strokeWidth={1.5} />
                                    ) : (
                                        <BookIcon className="w-8 h-8" strokeWidth={1.5} />
                                    )}
                                </div>
                                <Badge variant="secondary" className="text-[10px] uppercase font-medium tracking-wider opacity-70">
                                    {name.split('.').pop()}
                                </Badge>
                            </div>

                            {/* Title and Progress */}
                            <div className="flex-grow space-y-2">
                                <CardTitle className="text-base font-medium leading-snug line-clamp-2" title={name}>
                                    {name}
                                </CardTitle>
                                {progress !== undefined && progress > 0 && (
                                    <p className="text-xs text-muted-foreground font-medium">
                                        Page {progress}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="pt-4 mt-2 flex justify-end border-t border-border/40">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    onClick={(e) => handleDelete(e, book)}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2 text-xs">
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
