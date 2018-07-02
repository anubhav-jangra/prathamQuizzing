/*jshint esversion: 6 */
// document.addEventListener('DOMContentLoaded', () => {
    var rootRef = firebase.database().ref();

    rootRef.on('child_added', snap => {
        console.log(snap.val().Offline);
    });
// });
