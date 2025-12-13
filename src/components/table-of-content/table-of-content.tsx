"use client";

import React from "react";
import { m } from "motion/react";
import { useDevice } from "@/hooks/useDevice";
import styles from "./styles.module.scss";
import { pp_nekkei } from "@/utils/fonts";

const extractHeadings = (markdown: string) => {
  // Remove code blocks to avoid matching hashes inside them
  const markdownWithoutCode = markdown.replace(/```[\s\S]*?```/g, "");

  const regXHeader = /^#{1,6}\s+.+$/gm;
  const titles = markdownWithoutCode.match(regXHeader) || [];

  return titles
    .map((title: string) => {
      const match = title.match(/^(#{1,6})\s+(.+)$/);
      if (!match) return null;

      const level = match[1].length;
      let text = match[2].trim();

      // Remove trailing hashes (ATX style)
      text = text.replace(/\s+#+$/, "");

      const slug = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      return { level, text, slug };
    })
    .filter(
      (item): item is { level: number; text: string; slug: string } =>
        item !== null
    );
};

const buildHeadingTree = (
  headings: { level: number; text: string; slug: string }[]
) => {
  const tree: any[] = [];
  const stack: any[] = [];

  headings.forEach((heading) => {
    const node = { ...heading, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return tree;
};

const TOCList = ({
  nodes,
  activeId,
  onScroll,
}: {
  nodes: any[];
  activeId: string;
  onScroll: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    slug: string
  ) => void;
}) => {
  return (
    <>
      {nodes.map((node, index) => (
        <div key={index} className={styles.headingItem}>
          <div className={styles.headingContent}>
            <span className={styles.levelLine} />
            <a
              href={`#${node.slug}`}
              onClick={(e) => onScroll(e, node.slug)}
              className={activeId === node.slug ? styles.active : ""}
            >
              {node.text}
            </a>
          </div>
          {node.children.length > 0 && (
            <div className={styles.childrenContainer}>
              <TOCList
                nodes={node.children}
                activeId={activeId}
                onScroll={onScroll}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

function TableOfContentComponent({ markdown }: { markdown: string }) {
  const deviceType = useDevice();

  const [activeId, setActiveId] = React.useState<string>("");

  const headings = React.useMemo(() => extractHeadings(markdown), [markdown]);
  const headingTree = React.useMemo(
    () => buildHeadingTree(headings),
    [headings]
  );

  const handleScroll = React.useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, slug: string) => {
      e.preventDefault();
      const element = document.getElementById(slug);
      if (element) {
        const offset = 300;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    []
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return (
    deviceType === "desktop" && (
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        aria-label="Table of Contents"
        className={`${styles.tableOfContentsWrapper} ${pp_nekkei.className}`}
      >
        <div className={styles.tableOfContents}>
          <TOCList
            nodes={headingTree}
            activeId={activeId}
            onScroll={handleScroll}
          />
        </div>
      </m.div>
    )
  );
}

export default TableOfContentComponent;
