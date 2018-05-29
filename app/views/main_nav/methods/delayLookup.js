export default function delayLookup() {
  let currentValue = this.mainUrl.value;

  setTimeout(() => {
    if (currentValue === this.mainUrl.value) {
      if (!currentValue.includes('http://') && !currentValue.includes('https://')) {
        currentValue = `http://${currentValue}`;
        this.mainUrl.value = currentValue;
      }

      this.props.updateWindowUrl(currentValue);
    }
  }, 500);
}
