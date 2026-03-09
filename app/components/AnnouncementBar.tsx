"use client";

const items = [
    { dot: "✦", text: <>20+ <span className="announcement-highlight">Live Professional Websites</span> Built &amp; Launched</> },
    { dot: "✦", text: <><span className="announcement-highlight">WordPress Expert</span> — Custom Themes, WooCommerce &amp; Page Builders</> },
    { dot: "✦", text: <><span className="announcement-highlight">Shopify E-Commerce</span> — Conversion-Focused Stores Built for Scale</> },
    { dot: "✦", text: <>Full Stack Development with <span className="announcement-highlight">React, Next.js &amp; Node.js</span></> },
    { dot: "✦", text: <>Available for <span className="announcement-highlight">Freelance &amp; Remote Projects</span></> },
];

// Duplicate for seamless infinite scroll
const allItems = [...items, ...items];

export default function AnnouncementBar() {
    return (
        <div className="announcement-bar" aria-label="Announcements">
            <div className="announcement-track">
                {allItems.map((item, i) => (
                    <span key={i} className="announcement-item">
                        <span className="announcement-dot">{item.dot}</span>
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
}
