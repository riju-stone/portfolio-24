"use client";

import SkewScrollComponent from "@/components/scroll/Scroll";
import React from "react";

import styles from "./page.module.scss"
import { pp_nekkei } from "@/utils/fonts";

function ShelfPage() {
    return (
        <SkewScrollComponent>
            <div className={styles.blogsPageWrapper}>
                <div className={`${styles.blogLoaderText} ${pp_nekkei.className}`}>
                    Getting my shit together...
                </div>
            </div>
        </SkewScrollComponent>
    );
}

export default ShelfPage;
