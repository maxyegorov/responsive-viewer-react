export default function doRefresh() {
  const currentValue = this.props.windows.mainUrl;

  this.props.updateWindowUrl('');
  setTimeout(() => {
    this.props.updateWindowUrl(currentValue);
  }, 500);
}
