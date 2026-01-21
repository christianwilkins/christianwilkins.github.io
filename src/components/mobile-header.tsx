"use client"

import Link from "next/link"

export function MobileHeader() {
    return (
        <div className="mobile-header fixed left-0 right-0 top-0 z-[1000] md:hidden">
            <Link
                href="/"
                className="text-inherit no-underline cursor-pointer block"
            >
                <h2 className="m-0 leading-tight text-lg font-semibold font-heading">
                    Christian Wilkins
                </h2>
            </Link>
        </div>
    )
}
