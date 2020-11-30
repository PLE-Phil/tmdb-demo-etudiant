document.addEventListener("DOMContentLoaded", function(){

    let connexion = new MovieDB();

    connexion.requeteDernierFilm();

})


class MovieDB{

    constructor() {

        console.log("constructeur");

        this.APIkey = "2b40a488acd85b7534f9feb7c52bedae";

        this.lang = "fr-CA";

        this.baseURL = "https://api.themoviedb.org/3";

        this.imgPath = "https://image.tmdb.org/t/p/";

        // this.largeurAffiche = ["w92", "w154", "w185", "w342", "w500", "w780"];

        this.totalFilm = 8;

    }

    requeteDernierFilm(){

        let requete = new XMLHttpRequest();

        requete.addEventListener("loadend", this.retourRequeteDernierFilm.bind(this) );

        // requete.open("GET", "https://api.themoviedb.org/3/movie/now_playing?api_key=2b40a488acd85b7534f9feb7c52bedae&language=fr-CA&page=1");
        requete.open("GET", this.baseURL + "/movie/now_playing?api_key=" + this.APIkey + "&language=" + this.lang + "&page=1");

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



        }

    }
}