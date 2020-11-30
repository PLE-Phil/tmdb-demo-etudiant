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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllREIoKTtcclxuXHJcbiAgICBjb25uZXhpb24ucmVxdWV0ZURlcm5pZXJGaWxtKCk7XHJcblxyXG59KVxyXG5cclxuXHJcbmNsYXNzIE1vdmllREJ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0ZXVyXCIpO1xyXG5cclxuICAgICAgICB0aGlzLkFQSWtleSA9IFwiMmI0MGE0ODhhY2Q4NWI3NTM0ZjlmZWI3YzUyYmVkYWVcIjtcclxuXHJcbiAgICAgICAgdGhpcy5sYW5nID0gXCJmci1DQVwiO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VVUkwgPSBcImh0dHBzOi8vYXBpLnRoZW1vdmllZGIub3JnLzNcIjtcclxuXHJcbiAgICAgICAgdGhpcy5pbWdQYXRoID0gXCJodHRwczovL2ltYWdlLnRtZGIub3JnL3QvcC9cIjtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5sYXJnZXVyQWZmaWNoZSA9IFtcInc5MlwiLCBcIncxNTRcIiwgXCJ3MTg1XCIsIFwidzM0MlwiLCBcInc1MDBcIiwgXCJ3NzgwXCJdO1xyXG5cclxuICAgICAgICB0aGlzLnRvdGFsRmlsbSA9IDg7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlcXVldGVEZXJuaWVyRmlsbSgpe1xyXG5cclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyUmVxdWV0ZURlcm5pZXJGaWxtLmJpbmQodGhpcykgKTtcclxuXHJcbiAgICAgICAgLy8gcmVxdWV0ZS5vcGVuKFwiR0VUXCIsIFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvMy9tb3ZpZS9ub3dfcGxheWluZz9hcGlfa2V5PTJiNDBhNDg4YWNkODViNzUzNGY5ZmViN2M1MmJlZGFlJmxhbmd1YWdlPWZyLUNBJnBhZ2U9MVwiKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVVJMICsgXCIvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT1cIiArIHRoaXMuQVBJa2V5ICsgXCImbGFuZ3VhZ2U9XCIgKyB0aGlzLmxhbmcgKyBcIiZwYWdlPTFcIik7XHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91clJlcXVldGVEZXJuaWVyRmlsbShlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlJldG91ciBkZXJuaWVyIGZpbG1cIik7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGE7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2codGFyZ2V0LnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLmFmZmljaGVEZXJuaWVyRmlsbShkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBhZmZpY2hlRGVybmllckZpbG0oZGF0YSl7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZpbG07IGkrKykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVtpXS5vdmVydmlldyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdW5BcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZW1wbGF0ZT5hcnRpY2xlLmZpbG1cIikuY2xvbmVOb2RlKHRydWUpOyAvLyBDbG9uZXIgdG91dCBjZSBxdSdpbCB5IGEgw6AgbCdpbnTDqXJpZXVyIGRlIGxhIGNsYXNzZSBmaWxtIGRhbnMgbGUgdGVtcGxhdGUgKHZvaXIgaW5kZXguaHRtbCkuXHJcblxyXG4gICAgICAgICAgICB1bkFydGljbGUucXVlcnlTZWxlY3RvcihcImgyXCIpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7IC8vIE9uIHZhIGNoZXJjaGVyIGxlcyB0aXRyZXMgZGVzIGZpbG1zIGRhbnMgbGUgdGFibGVhdSBldCBvbiBsJ2Fzc29jaWUgYXV4IHRpdHJlcyBkZXMgY2xvbmVzLlxyXG5cclxuICAgICAgICAgICAgdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJwLmRlc2NyaXB0aW9uXCIpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJQYXMgZGUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiOyAvLyBPbiB2YSBjaGVyY2hlciBsZXMgZGVzY3JpcHRpb25zIGRlcyBmaWxtcyAocXVpIG9udCBsZSBub20gb3ZlcnZpZXcpIGRhbnMgbGUgdGFibGVhdSBldCBvbiBsJ2Fzc29jaWUgYXV4IHRpdHJlcyBkZXMgY2xvbmVzLiBPVSDDh2EgbGEgcmVtcGxhY2UgcGFyIGxlIHRleHRlIDogUGFzIGRlIGRlc2NyaXB0aW9uLlxyXG5cclxuICAgICAgICAgICAgbGV0IHNyYyA9IHRoaXMuaW1nUGF0aCArIFwidzE4NVwiICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDsgLy8gQ3LDqWVyIHVuZSB2YXJpYWJsZSBzb3VyY2UgZGUgbCdpbWFnZSByZWNvbnN0cnVpc2FudCBsZSBjaGVtaW4gdmVycyBsZSBib24gZG9zc2llciBkZXMgaW1hZ2VzLiBcIi5wb3N0ZXItcGF0aFwiIGNvcnJlc3BvbmQgYXV4IGltYWdlcyBkYW5zIGxlIHRhYmxlYXUgZGVzIGZpbG1zLlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzcmMpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVuZUltYWdlID0gdW5BcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XHJcbiAgICAgICAgICAgIHVuZUltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xyXG4gICAgICAgICAgICB1bmVJbWFnZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgZGF0YVtpXS50aXRsZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0ZS1maWxtc1wiKS5hcHBlbmRDaGlsZCh1bkFydGljbGUpOyAvLyBPbiBhcHBvcnRlIGxlIGNsb25lIGRhbnMgdW5lIGF1dHJlIHBhcnRpZSBkdSBodG1sLiBJY2ksIGRhbnMgbGEgY2xhc3NlIGxpc3RlLWZpbG1zXHJcblxyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSJdLCJmaWxlIjoic2NyaXB0LmpzIn0=
