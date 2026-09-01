export function scrollToPostSubmitTop() {
  const scroll = () => {
    window.scrollTo(0, 0);
  };
  scroll();
  requestAnimationFrame(() => {
    scroll();
    requestAnimationFrame(scroll);
  });
}
