export function Modal({ submodal, style, children }) {
  return (
    <>
      <div className="overlay"></div>
      <div className={submodal ? 'submodal-container' : 'modal-container'} style={style}>{children}</div>
    </>
  );
}
