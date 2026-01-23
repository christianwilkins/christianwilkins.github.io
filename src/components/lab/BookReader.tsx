"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Book } from "@/lib/types";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { ReactReader } from "react-reader";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface BookReaderProps {
    book: Book;
    onClose: () => void;
}

export default function BookReader({ book, onClose }: BookReaderProps) {
    const [location, setLocation] = useState<string | number>(0);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);

    const bookName = book.pathname.split('/').pop() || book.pathname;
    const isPdf = bookName.toLowerCase().endsWith(".pdf");

    const options = useMemo(() => ({
        cMapUrl: '/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: '/standard_fonts/',
    }), []);

    // Load progress
    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/api/progress?book=${encodeURIComponent(bookName)}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.location) {
                        setLocation(data.location);
                    }
                }
            } catch (e) {
                console.error("Error loading progress:", e);
            }
        };
        load();
    }, [bookName]);

    // Save progress debounced
    const handleLocationChange = useCallback(async (newLocation: string | number) => {
        setLocation(newLocation);
        setSaving(true);

        try {
            await fetch('/api/progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookName,
                    location: newLocation
                })
            });
        } catch (e) {
            console.error("Failed to save progress", e);
        } finally {
            setSaving(false);
        }
    }, [bookName]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background text-foreground">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <h2 className="text-sm font-medium text-foreground line-clamp-1">
                        {bookName}
                    </h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {saving ? "Saving..." : "Progress Saved"}
                </div>
            </div>

            {/* Reader Content */}
            <div className="flex-1 overflow-hidden relative">
                {isPdf ? (
                    <div className="h-full overflow-auto flex justify-center bg-muted/50 p-4">
                        <Document
                            file={book.url}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            className="max-w-full"
                            options={options}
                            loading={
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            }
                        >
                            <Page
                                pageNumber={typeof location === 'number' && location > 0 ? location : 1}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="shadow-2xl"
                                width={Math.min(window.innerWidth - 40, 800)}
                            />
                        </Document>

                        {/* PDF Controls */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full border border-border bg-popover/85 px-6 py-2 text-muted-foreground backdrop-blur shadow-xl">
                            <button
                                disabled={(location as number) <= 1}
                                onClick={() => handleLocationChange((location as number) - 1)}
                                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <span className="text-sm font-medium text-foreground">
                                {location || 1} / {numPages || '--'}
                            </span>
                            <button
                                disabled={(location as number) >= (numPages || 0)}
                                onClick={() => handleLocationChange(((location as number) || 1) + 1)}
                                className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full" style={{ position: 'relative' }}>
                        <ReactReader
                            url={book.url}
                            location={location}
                            locationChanged={(epubLocation: string) => handleLocationChange(epubLocation)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
