const auth = firebase.auth();
function signup() {
  const email = document.getElementById("usp").value;
  const password = document.getElementById("pp").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      console.log("signed up!");
      user.getIdToken().then(function (idToken) {
        console.log(idToken);
        //fetch header id token
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function signin() {
  const email = document.getElementById("usn").value;
  const password = document.getElementById("pn").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      // Signed in
      //
      console.log("signed in!");
      user.getIdToken().then(function (idToken) {
        console.log(idToken);
        //fetch
      });
    })
    .catch(error => {
      console.log(error);
    });
}
