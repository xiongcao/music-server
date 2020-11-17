module.exports = {
  parseUser: (obj) => {
    if (!obj) {
      return;
    }
    let s = '';
    if (typeof obj === 'string') {
      s = obj;
    } else if (obj.headers) {
      let cookies = new Cookies(obj, null);
      s = cookies.get('name');
    }
    if (s) {
      try {
        let user = JSON.parse(Buffer.from(s, 'base64').toString());
        console.log(`User: ${user}`);
        return user;
      } catch (e) {
      }
    }
  }
}