/*jshint esversion: 6 */
var schoolsArray = {};

document.addEventListener('DOMContentLoaded', () => {
    var rootRef = firebase.database().ref();

    createSchoolsArray(rootRef)
    .then(updateDOM)
    .catch(err => console.log(err, ' THERE IS AN ERRROR!'));
});

function createSchoolsArray(rootRef) {
    var prom = rootRef.child('users').once('value').then(snap => {
        var teachers = snap.val();
        Object.keys(teachers).forEach(function(teacher){
            if(schoolsArray[teachers[teacher].School]) { // If a School already exists append teacher to its array
                schoolsArray[teachers[teacher].School].push(teachers[teacher]);
            } else {    // create new School array
                schoolsArray[teachers[teacher].School] = [teachers[teacher]];
            }
        });
    })
    .catch(err => console.log(err, " THERE IS AN ERROR!"));
    return prom;
}

function updateDOM() {
    var container = document.querySelector('.container');
    Object.keys(schoolsArray).forEach(function(school){
        var schoolDiv = document.createElement('div');
        schoolDiv.className = 'school';
        schoolDiv.textContent = 'School ID: ' + school;
        schoolsArray[school].forEach(function(teacher) {
            var teacherDiv = document.createElement('div');
            teacherDiv.className = 'teacher';
            teacherDiv.textContent = teacher.Name;
            schoolDiv.appendChild(teacherDiv);
            var allClassDiv = document.createElement('div');
            allClassDiv.className = 'allClasses';
            allClassDiv.innerHTML = 'All classes under the teacher -> ';
            Object.keys(teacher.Classes).forEach(function(Class) {
                Object.keys(teacher.Classes[Class]).forEach(function(section) {
                    var classId = document.createElement('div');
                    classId.textContent = ' ' + Class + '-' + section;
                    allClassDiv.appendChild(classId);
                });
            });
            teacherDiv.appendChild(allClassDiv);
            teacherDiv.innerHTML += '<div class="score"><div><strong>Class</strong></div><div><strong>Subject</strong></div><div><strong>Topic</strong></div><div><strong>Score</strong></div></div>';
            // var scoresId = document.createElement('div');
            // scoresId.className = 'allScores';
            Object.keys(teacher.Scores).forEach(function(Class) {
                Object.keys(teacher.Scores[Class]).forEach(function(subject) {
                    Object.keys(teacher.Scores[Class][subject]).forEach(function(topic) {
                        var scoreId = document.createElement('div');
                        scoreId.className = 'score';
                        scoreId.innerHTML = `<div class="class">${Class}</div>`;
                        scoreId.innerHTML += `<div class="subject">${subject}</div>`;
                        scoreId.innerHTML += `<div class="topic">${topic}</div>`;
                        scoreId.innerHTML += `<div class="average">${teacher.Scores[Class][subject][topic].averageScore}</div>`;
                        // topicId.appendChild(scoreId);
                        teacherDiv.appendChild(scoreId);
                        // subjectId.appendChild(topicId);
                    });
                    // classId.appendChild(subjectId);
                });
            });
            // teacherDiv.appendChild(scoresId);
        });
        container.appendChild(schoolDiv);
    });
}
