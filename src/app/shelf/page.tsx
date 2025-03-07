"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React from "react";

import styles from "./page.module.scss"
import LazyTextComponent from "@/components/lazy/Lazy";

function ShelfPage()
{
    return (
        <SkewScrollComponent>
            <div className={styles.blogsPageWrapper}>
                <LazyTextComponent text="Getting my shit together..." />
            </div>
        </SkewScrollComponent>
    );
}

export default ShelfPage;
