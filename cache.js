(function() {
  // Utility function to convert an object into a sha256 hash
  async function objectToHash(obj) {
    const stringifiedObj = JSON.stringify(obj);
    const byteArray = new TextEncoder().encode(stringifiedObj);
    const digestArray = await crypto.subtle.digest("SHA-256", byteArray);
    return Array.from(new Uint8Array(digestArray))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  window.myCache = {
    set: async function(key, value) {
      if (typeof key !== 'object') {
        throw new Error('Key must be an object');
      }
      if (typeof value !== 'string') {
        throw new Error('Value must be a string');
      }

      const hash = await objectToHash(key);
      localStorage.setItem(hash, value);
    },

    get: async function(key) {
      if (typeof key !== 'object') {
        throw new Error('Key must be an object');
      }

      const hash = await objectToHash(key);
      return localStorage.getItem(hash);
    },

    remove: async function(key) {
      if (typeof key !== 'object') {
        throw new Error('Key must be an object');
      }

      const hash = await objectToHash(key);
      localStorage.removeItem(hash);
    },

    clear: function() {
      localStorage.clear();
    },

    size: function() {
      return localStorage.length;
    }
  };
})();
