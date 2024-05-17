function addMediaLoaderPrefix(url: string) {
  return `media-loader://${url}`;
}

function stripMediaLoaderPrefix(url: string) {
  return url.replace('media-loader://', '');
}

export { addMediaLoaderPrefix, stripMediaLoaderPrefix };

