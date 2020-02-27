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

    window.addEventListener('load', function() {
      firebase.initializeApp({
        apiKey: "AIzaSyBm8fh3xwQ3PMtNHvtAEaBSchSDaf9Im6U",
        authDomain: "auth.meeshkan.io",
        projectId: "sound-electron-268214",
        appId: "1:294417890851:web:cc08162524c8ffb3317b96"
      });

      meeshkan.signout = () => {
        firebase.auth().signOut().then(function() {
            window.location.reaload();
        }, function(error) {
            console.error('Sign Out Error', error);
        });
      };

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(accessToken) {
              user.accessToken = accessToken;
              meeshkan.onUser(user);
            }).catch(function(error) {
              console.error('getIdToken error', error);
            });
          } else {
            window.location = '/login?redirect=' + window.location.pathname.substring(1) + (window.location.search ? ('?' + encodeURIComponent(window.location.search.substring(1))) : '');
          }
        }, function(error) {
          console.log(error);
        });
     });
})();
