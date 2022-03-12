export const GENRES = [
    "Acción",
    "Romantica",
    "Aventura",
    "Fantasía",
    "Policial",
    "Comedia",
    "Comedia Romántica",
];

export const DIRECTORS = [
    "Steven Spielberg",
    "Vicky Jenson",
    "Chris Columbus",
    "Byron Howard",
    "Tim Miller",
    "Sam Raimi",
    "Richard Donner",
    "Matt Reeves"
];

const buildYears = function (startYear) {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
        years.push(startYear++);
    }
    return years;
}

export const YEARS = buildYears(1920);