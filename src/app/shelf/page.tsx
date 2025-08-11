"use client";

import SkewScrollComponent from "@/components/custom-scroll/custom-scroll";
import React from "react";

import styles from "./page.module.scss"
import LazyTextComponent from "@/components/lazy-loader/lazy-loader";

function ShelfPage() {
    return <main style={{ mixBlendMode: "difference" }}>
        <SkewScrollComponent>
            <div className={styles.blogsPageWrapper}>
                <LazyTextComponent text="Getting my shit together..." />
            </div>
        </SkewScrollComponent>
    </main>
}

export default ShelfPage;
