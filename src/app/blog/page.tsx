"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React from "react";
import styles from "./page.module.scss"
import { pp_nekkei } from "@/utils/fonts";
import LazyTextComponent from "@/components/lazy/Lazy";

function BlogsPage()
{
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <LazyTextComponent text="Hold on! Contemplating..." />
                </div>
            </SkewScrollComponent>
        </main>
    );
}

export default BlogsPage;
