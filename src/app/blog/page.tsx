"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React from "react";
import styles from "./page.module.scss"
import { pp_nekkei } from "@/utils/fonts";

function BlogsPage() {
    return (
        <main>
            <SkewScrollComponent>
                <div className={styles.blogsPageWrapper}>
                    <div className={`${styles.blogLoaderText} ${pp_nekkei.className}`}>
                        Hold on! Contemplating...
                    </div>
                </div>
            </SkewScrollComponent>
        </main>
    );
}

export default BlogsPage;
