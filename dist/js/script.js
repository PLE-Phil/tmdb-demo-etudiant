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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNlYXJjaChcImZpY2hlLWZpbG0uaHRtbFwiKSk7IC8vIHJhbcOobmUgMSAoMSA9IGluZGV4Lmh0bWwpIG91IC0xICgtMSA9IGZpY2hlPWZpbG0pXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goXCJmaWNoZS1maWxtLmh0bWxcIikgPiAwKXsgICAgICAgICAgIC8vIE9uIHZhIGNoZXJjaGVyIGxhIHBhZ2UgaHRtbC4gU2kgYydlc3QgcGx1cyBncmFuZCBxdWUgMCwgZGFucyBjZSBjYXMtY2ksIG9uIHZhIGNoZXJjaGVyIGxlIGluZGV4Lmh0bWxcclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9ICggbmV3IFVSTChkb2N1bWVudC5sb2NhdGlvbikgKS5zZWFyY2hQYXJhbXM7ICAgLy8gVmEgY2hlcmNoZXIgdW4gb2JqZXQgYXZlYyBwbGVpbiBkJ2luZm8gw6AgbCdpbnTDqXJpZXVyLiBPbiBtZXQgbGVzIHBhcmVudGjDqHNlcyBwb3VyIGxlIGZvcmNlciDDoCBsYW5jZXIgbGUgc2NyaXB0IGRhbnMgbGVzIHBhcmVudGjDqHNlcyBlbiBwcmVtaWVyLlxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJhbXMpO1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlSW5mb0ZpbG0ocGFyYW1zLmdldChcImlkXCIpICk7IC8vIE9uIHZhIGNoZXJjaGVyIGxlIGlkIGRhbnMgbGVzIHBhcmFtw6h0cmVzIGlkLiBQb3VyIGFmZmljaGVyIGxlIGZpbG0gc3VyIGxlcXVlbCBvbiBjbGlxdWVcclxuICAgIH1lbHNle1xyXG4gICAgICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuICAgIH1cclxuXHJcblxyXG59KVxyXG5cclxuXHJcbmNsYXNzIE1vdmllREJ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0ZXVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLkFQSWtleSA9IFwiMmI0MGE0ODhhY2Q4NWI3NTM0ZjlmZWI3YzUyYmVkYWVcIjtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvXCI7XHJcblxyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3AvXCI7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubGFyZ2V1ckFmZmljaGUgPSBbXCJ3OTJcIiwgXCJ3MTU0XCIsIFwidzE4NVwiLCBcInczNDJcIiwgXCJ3NTAwXCIsIFwidzc4MFwiXTtcclxuXHJcbiAgICAgICAgdGhpcy50b3RhbEZpbG0gPSA4O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuXHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICAgICAgcmVxdWV0ZS5hZGRFdmVudExpc3RlbmVyKFwibG9hZGVuZFwiLCB0aGlzLnJldG91clJlcXVldGVEZXJuaWVyRmlsbS5iaW5kKHRoaXMpICk7XHJcblxyXG4gICAgICAgIC8vIHJlcXVldGUub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0yYjQwYTQ4OGFjZDg1Yjc1MzRmOWZlYjdjNTJiZWRhZSZsYW5ndWFnZT1mci1DQSZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVSTCArIFwibW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcblxyXG4gICAgICAgIC8vIEVudm9pZSBsYSByZXF1w6p0ZS5cclxuICAgICAgICByZXF1ZXRlLnNlbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlRGVybmllckZpbG0oZSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXRvdXIgZGVybmllciBmaWxtXCIpO1xyXG5cclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KS5yZXN1bHRzO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZURlcm5pZXJGaWxtKGRhdGEpe1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTsgLy8gQ2xvbmVyIHRvdXQgY2UgcXUnaWwgeSBhIMOgIGwnaW50w6lyaWV1ciBkZSBsYSBjbGFzc2UgZmlsbSBkYW5zIGxlIHRlbXBsYXRlICh2b2lyIGluZGV4Lmh0bWwpLlxyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlOyAvLyBPbiB2YSBjaGVyY2hlciBsZXMgdGl0cmVzIGRlcyBmaWxtcyBkYW5zIGxlIHRhYmxlYXUgZXQgb24gbCdhc3NvY2llIGF1eCB0aXRyZXMgZGVzIGNsb25lcy5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiUGFzIGRlIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjsgLy8gT24gdmEgY2hlcmNoZXIgbGVzIGRlc2NyaXB0aW9ucyBkZXMgZmlsbXMgKHF1aSBvbnQgbGUgbm9tIG92ZXJ2aWV3KSBkYW5zIGxlIHRhYmxlYXUgZXQgb24gbCdhc3NvY2llIGF1eCB0aXRyZXMgZGVzIGNsb25lcy4gT1Ugw4dhIGxhIHJlbXBsYWNlIHBhciBsZSB0ZXh0ZSA6IFBhcyBkZSBkZXNjcmlwdGlvbi5cclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7IC8vIENyw6llciB1bmUgdmFyaWFibGUgc291cmNlIGRlIGwnaW1hZ2UgcmVjb25zdHJ1aXNhbnQgbGUgY2hlbWluIHZlcnMgbGUgYm9uIGRvc3NpZXIgZGVzIGltYWdlcy4gXCIucG9zdGVyLXBhdGhcIiBjb3JyZXNwb25kIGF1eCBpbWFnZXMgZGFucyBsZSB0YWJsZWF1IGRlcyBmaWxtcy5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3JjKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpOyAvLyBPbiBhcHBvcnRlIGxlIGNsb25lIGRhbnMgdW5lIGF1dHJlIHBhcnRpZSBkdSBodG1sLiBJY2ksIGRhbnMgbGEgY2xhc3NlIGxpc3RlLWZpbG1zXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQpOyAgLy8gT24gY2hhbmdlIGxlIGlkIChxdWkgZXN0IHRvdWpvdXJzIGxlIG3Dqm1lKSBkdSBsaWVuIGRlcyBmaWNoZXMgcG91ciBhbGxlciB2ZXJzIGxlIGxpZW4gZHUgZmlsbS5cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgcmVxdWV0ZUluZm9GaWxtKG1vdmllSWQpe1xyXG5cclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZUluZm9GaWxtLmJpbmQodGhpcykgKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGlzZSBsYSByZXF1w6p0ZSBwb3VyIHLDqWN1cMOpcmVyIGxlIGZpbG0gYXZlYyBsZSBpZFxyXG4gICAgICAgIC8vIHJlcXVldGUub3BlbihcIkdFVFwiLCBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzMvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0yYjQwYTQ4OGFjZDg1Yjc1MzRmOWZlYjdjNTJiZWRhZSZsYW5ndWFnZT1mci1DQSZwYWdlPTFcIik7XHJcbiAgICAgICAgcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVSTCArIFwibW92aWUvXCIrIG1vdmllSWQgKyBcIj9hcGlfa2V5PVwiICsgdGhpcy5BUElrZXkgKyBcIiZsYW5ndWFnZT1cIiArIHRoaXMubGFuZyk7XHJcbiAgICAgICAgLy8ge21vdmllX2lkfT9hcGlfa2V5PTw8YXBpX2tleT4+Jmxhbmd1YWdlPWVuLVVTXHJcbiAgICAgICAgcmVxdWV0ZS5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0b3VyUmVxdWV0ZUluZm9GaWxtKGUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmV0b3VyIGRlcm5pZXIgZmlsbVwiKTtcclxuXHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpOy8vLnJlc3VsdHM7IC8vIE9uIGEgcGx1cyBiZXNvaW4gZHUgcmVzdWx0cyBwYXJjZSBxdSdvbiBhIHBhcyBwbHVzaWV1cnMgZmlsbXMgZGFucyBsYSBwYWdlIChvbiBlc3QgZGFucyBmaWNoZS1maWxtKVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZmZpY2hlSW5mb0ZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZUluZm9GaWxtKGRhdGEpe1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaDFcIikuaW5uZXJIVE1MID0gZGF0YS50aXRsZTsgLy8gT24gdmEgY2hlcmNoZXIgbGUgdGl0cmUgZHUgZmlsbS5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwicC5yZXZlbnVcIikuaW5uZXJIVE1MID0gZGF0YS5yZXZlbnVlOyAvLyBPbiB2YSBjaGVyY2hlciBsZSByZXZlbnUgZHUgZmlsbSAgT1Ugw4dhIGxhIHJlbXBsYWNlIHBhciBsZSB0ZXh0ZSA6IFBhcyBkZSBkZXNjcmlwdGlvbi5cclxuXHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlQWN0ZXVyKGRhdGEuaWQpO1xyXG5cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudG90YWxGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbaV0ub3ZlcnZpZXcpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuQXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVtcGxhdGU+YXJ0aWNsZS5maWxtXCIpLmNsb25lTm9kZSh0cnVlKTsgLy8gQ2xvbmVyIHRvdXQgY2UgcXUnaWwgeSBhIMOgIGwnaW50w6lyaWV1ciBkZSBsYSBjbGFzc2UgZmlsbSBkYW5zIGxlIHRlbXBsYXRlICh2b2lyIGluZGV4Lmh0bWwpLlxyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlOyAvLyBPbiB2YSBjaGVyY2hlciBsZXMgdGl0cmVzIGRlcyBmaWxtcyBkYW5zIGxlIHRhYmxlYXUgZXQgb24gbCdhc3NvY2llIGF1eCB0aXRyZXMgZGVzIGNsb25lcy5cclxuXHJcbiAgICAgICAgICAgIHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwicC5kZXNjcmlwdGlvblwiKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiUGFzIGRlIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjsgLy8gT24gdmEgY2hlcmNoZXIgbGVzIGRlc2NyaXB0aW9ucyBkZXMgZmlsbXMgKHF1aSBvbnQgbGUgbm9tIG92ZXJ2aWV3KSBkYW5zIGxlIHRhYmxlYXUgZXQgb24gbCdhc3NvY2llIGF1eCB0aXRyZXMgZGVzIGNsb25lcy4gT1Ugw4dhIGxhIHJlbXBsYWNlIHBhciBsZSB0ZXh0ZSA6IFBhcyBkZSBkZXNjcmlwdGlvbi5cclxuXHJcbiAgICAgICAgICAgIGxldCBzcmMgPSB0aGlzLmltZ1BhdGggKyBcIncxODVcIiArIGRhdGFbaV0ucG9zdGVyX3BhdGg7IC8vIENyw6llciB1bmUgdmFyaWFibGUgc291cmNlIGRlIGwnaW1hZ2UgcmVjb25zdHJ1aXNhbnQgbGUgY2hlbWluIHZlcnMgbGUgYm9uIGRvc3NpZXIgZGVzIGltYWdlcy4gXCIucG9zdGVyLXBhdGhcIiBjb3JyZXNwb25kIGF1eCBpbWFnZXMgZGFucyBsZSB0YWJsZWF1IGRlcyBmaWxtcy5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3JjKTtcclxuXHJcbiAgICAgICAgICAgIGxldCB1bmVJbWFnZSA9IHVuQXJ0aWNsZS5xdWVyeVNlbGVjdG9yKFwiaW1nXCIpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcclxuICAgICAgICAgICAgdW5lSW1hZ2Uuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGRhdGFbaV0udGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpOyAvLyBPbiBhcHBvcnRlIGxlIGNsb25lIGRhbnMgdW5lIGF1dHJlIHBhcnRpZSBkdSBodG1sLiBJY2ksIGRhbnMgbGEgY2xhc3NlIGxpc3RlLWZpbG1zXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImFcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcImZpY2hlLWZpbG0uaHRtbD9pZD1cIiArIGRhdGFbaV0uaWQpOyAgLy8gT24gY2hhbmdlIGxlIGlkIChxdWkgZXN0IHRvdWpvdXJzIGxlIG3Dqm1lKSBkdSBsaWVuIGRlcyBmaWNoZXMgcG91ciBhbGxlciB2ZXJzIGxlIGxpZW4gZHUgZmlsbS5cclxuICAgICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIHJlcXVldGVBY3RldXIobW92aWVJZCl7XHJcbiAgICAgICAgLy9HZXQgQ3JlZGl0cyBkYW5zIG1vdmllREJcclxuICAgIH1cclxuXHJcbiAgICByZXRvdXJSZXF1ZXRlQWN0ZXVyKGUpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlQWN0ZXVyKGRhdGEpe1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG52YXIgbXlTd2lwZXIgPSBuZXcgU3dpcGVyKCcuY2Fycm91c2VsLXBvcHVsYWlyZScsIHtcclxuXHJcbiAgICAvLyBJZiB3ZSBuZWVkIHBhZ2luYXRpb25cclxuICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICBlbDogJy5zd2lwZXItcGFnaW5hdGlvbicsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIE5hdmlnYXRpb24gYXJyb3dzXHJcbiAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgbmV4dEVsOiAnLnN3aXBlci1idXR0b24tbmV4dCcsXHJcbiAgICAgICAgcHJldkVsOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICB9LFxyXG5cclxuICAgIGxvb3A6IHRydWUsXHJcbn0pIl0sImZpbGUiOiJzY3JpcHQuanMifQ==
