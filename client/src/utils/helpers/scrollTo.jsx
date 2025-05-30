export const scrollTo = (id) => {
  setTimeout(() => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    } else {
      console.error("Element not found:", id);
    }
  }, 100);
};
