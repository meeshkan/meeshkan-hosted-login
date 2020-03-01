window.meeshkan = {};

(async () => {
  let loadScript = (script_url) => {
    return new Promise(function(resolve, reject) {
      let script = document.createElement('script');
      script.onload = resolve;
      script.src = script_url
      document.head.appendChild(script);
    });
  }

  await Promise.all([
      loadScript("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"),
      loadScript("https://www.gstatic.com/firebasejs/7.9.1/firebase-auth.js")
  ]);

  meeshkan.signOut = () => {
    meeshkan.signingOut = true;
    firebase.auth().signOut().then(() => {
      window.location.reload();
    }, (error) => {
      console.error('Sign Out Error', error);
      window.location.reload();
    });
  };

  meeshkan.signIn = () => {
    window.location = '/login?redirect=' + window.location.pathname.substring(1) + (window.location.search ? ('?' + encodeURIComponent(window.location.search.substring(1))) : '');
  }

  window.addEventListener('load', () => {
    firebase.initializeApp({
      apiKey: "AIzaSyBm8fh3xwQ3PMtNHvtAEaBSchSDaf9Im6U",
      authDomain: "auth.meeshkan.io",
      projectId: "sound-electron-268214",
      appId: "1:294417890851:web:cc08162524c8ffb3317b96"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (meeshkan.signingOut) return;
      if (user) {
        firebase.auth().currentUser.getIdToken(true).then((accessToken) => {
          user.accessToken = accessToken;
          meeshkan.onUser(user);
        }).catch(function(error) {
          console.error('getIdToken error', error);
        });
      } else {
         meeshkan.onUser(null);
      }
    }, (error) => {
      console.error(error);
    });
   });
})();

