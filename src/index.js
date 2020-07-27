function importAll(r) {
  return r.keys().forEach(r);
}

importAll(require.context('./assets/blocks/', false, /\.js$/));
importAll(require.context('./pages', false, /\.js$/));