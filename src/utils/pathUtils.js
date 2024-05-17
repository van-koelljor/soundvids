function addMediaLoaderPrefix(url) {
  return `media-loader://${url}`;
}

function stripMediaLoaderPrefix(url) {
  return url.replace('media-loader://', '');
}

export { addMediaLoaderPrefix, stripMediaLoaderPrefix };

