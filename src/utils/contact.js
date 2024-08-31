// src/utils/contact.js

export function setupScroller() {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        scrollers.forEach(scroller => {
            scroller.setAttribute("data-animated", "true");

            const scrollerIneer = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerIneer.children);

            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", "true");
                scrollerIneer.appendChild(duplicatedItem);
            })
        });
    }
}
