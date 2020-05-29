export default function goToIMDb(url) {
  const win = window.open(url, '_blank');
  if (win !== null) {
    win.focus();
  }
}
