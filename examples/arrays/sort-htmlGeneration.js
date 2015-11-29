// Array.prototype.sort();

var lessons = [
    {
        title: 'Javascript Array methods in depth - concat',
        views: 1000
    },
    {
        title: 'Javascript Array methods in depth - slice',
        views: 1050
    },
    {
        title: 'Javascript Array methods in depth - join',
        views: 1025
    }
];

function orderLessons(lessonA,lessonB) {
    return lessonB.views - lessonA.views
}

function itemListLesson(lesson) {
    return `    <li>${lesson.title} (${lesson.views})</li>`
}

var list = lessons
    .sort(orderLessons)
    .map(itemListLesson)
    .join('\n');

var output = `<ul>\n${list}\n</ul>`;

console.log (output);
//var container = document.querySelector('#output');
//container.innerHTML = output