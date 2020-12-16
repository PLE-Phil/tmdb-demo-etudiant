document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    //console.log(document.location.pathname.search("fiche-film.html")); // ramène 1 (1 = index.html) ou -1 (-1 = fiche=film)
    if(document.location.pathname.search("fiche-film.html") > 0){           // On va chercher la page html. Si c'est plus grand que 0, dans ce cas-ci, on va chercher le index.html

        let params = ( new URL(document.location) ).searchParams;   // Va chercher un objet avec plein d'info à l'intérieur. On met les parenthèses pour le forcer à lancer le script dans les parenthèses en premier.

        console.log(params);
        connexion.requeteInfoFilm(params.get("id") ); // On va chercher le id dans les paramètres id. Pour afficher le film sur lequel on clique
    }else{
        connexion.requeteDernierFilm();
    }


})


class MovieDB{

    constructor() {

        console.log("constructeur");

        this.APIkey = "2b40a488acd85b7534f9feb7c52bedae";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3/";

        this.imgPath = "https://image.tmdb.org/t/p/";

        // this.largeurAffiche = ["w92", "w154", "w185", "w342", "w500", "w780"];

        this.totalFilm = 8;

    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this) );

        // requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2b40a488acd85b7534f9feb7c52bedae&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

        // Envoie la requête.
        requete.send();
    }

    retourRequeteDernierFilm(e){
        console.log("Retour dernier film");

        let target = e.currentTarget;
        let data;

        //console.log(target.responseText);

        data = JSON.parse(target.responseText).results;

        console.log(data);

        this.afficheDernierFilm(data);
    }

    afficheDernierFilm(data){

        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);
            // console.log(data[i].overview);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true); // Cloner tout ce qu'il y a à l'intérieur de la classe film dans le template (voir index.html).

            unArticle.querySelector("h2").innerHTML = data[i].title; // On va chercher les titres des films dans le tableau et on l'associe aux titres des clones.

            unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description disponible"; // On va chercher les descriptions des films (qui ont le nom overview) dans le tableau et on l'associe aux titres des clones. OU Ça la remplace par le texte : Pas de description.

            let src = this.imgPath + "w185" + data[i].poster_path; // Créer une variable source de l'image reconstruisant le chemin vers le bon dossier des images. ".poster-path" correspond aux images dans le tableau des films.
            console.log(src);

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            document.querySelector(".liste-films").appendChild(unArticle); // On apporte le clone dans une autre partie du html. Ici, dans la classe liste-films

            unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);  // On change le id (qui est toujours le même) du lien des fiches pour aller vers le lien du film.


        }
    }











    requeteInfoFilm(movieId){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteInfoFilm.bind(this) );

        // Initialise la requête pour récupérer le film avec le id
        // requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2b40a488acd85b7534f9feb7c52bedae&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "movie/"+ movieId + "?api_key=" + this.APIkey + "&language=" + this.lang);
        // {movie_id}?api_key=<<api_key>>&language=en-US
        requete.send();
    }

    retourRequeteInfoFilm(e){
        console.log("Retour dernier film");

        let target = e.currentTarget;
        let data;

        console.log(target.responseText);

        data = JSON.parse(target.responseText);//.results; // On a plus besoin du results parce qu'on a pas plusieurs films dans la page (on est dans fiche-film)

        console.log(data);

        this.afficheInfoFilm(data);
    }

    afficheInfoFilm(data){

        document.querySelector("h1").innerHTML = data.title; // On va chercher le titre du film.
        document.querySelector("p.revenu").innerHTML = data.revenue; // On va chercher le revenu du film  OU Ça la remplace par le texte : Pas de description.

        this.requeteActeur(data.id);


        /*
        for (let i = 0; i < this.totalFilm; i++) {
            console.log(data[i].title);
            // console.log(data[i].overview);

            let unArticle = document.querySelector(".template>article.film").cloneNode(true); // Cloner tout ce qu'il y a à l'intérieur de la classe film dans le template (voir index.html).

            unArticle.querySelector("h2").innerHTML = data[i].title; // On va chercher les titres des films dans le tableau et on l'associe aux titres des clones.

            unArticle.querySelector("p.description").innerHTML = data[i].overview || "Pas de description disponible"; // On va chercher les descriptions des films (qui ont le nom overview) dans le tableau et on l'associe aux titres des clones. OU Ça la remplace par le texte : Pas de description.

            let src = this.imgPath + "w185" + data[i].poster_path; // Créer une variable source de l'image reconstruisant le chemin vers le bon dossier des images. ".poster-path" correspond aux images dans le tableau des films.
            console.log(src);

            let uneImage = unArticle.querySelector("img");
            uneImage.setAttribute("src", src);
            uneImage.setAttribute("alt", data[i].title);

            document.querySelector(".liste-films").appendChild(unArticle); // On apporte le clone dans une autre partie du html. Ici, dans la classe liste-films

            unArticle.querySelector("a").setAttribute("href", "fiche-film.html?id=" + data[i].id);  // On change le id (qui est toujours le même) du lien des fiches pour aller vers le lien du film.
            */

        }

    requeteActeur(movieId){
        //Get Credits dans movieDB
    }

    retourRequeteActeur(e){

    }

    afficheActeur(data){

    }








}

var mySwiper = new Swiper('.carrousel-populaire', {

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    loop: true,
})