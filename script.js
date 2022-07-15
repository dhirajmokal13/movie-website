let key = '4034acde' || 76593128;

function paginationData(n) {
    console.log(`Current page is ${n}`)
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${localStorage.getItem("mname")}&page=${n}`).then(res => res.json())
        .then(data => {
            if (data["Response"] === "True") {
                document.getElementById("pageNO").innerHTML = `Page: ${n}/${checkNumber(data["totalResults"])}`;
                let result = "";
                let dataLength = data["Search"].length;
                for (i = 0; i < dataLength; i++) {
                    if (data["Search"][i]["Poster"] === "N/A") {
                        data["Search"][i]["Poster"] = "https://previews.123rf.com/images/kaymosk/kaymosk1804/kaymosk180400006/100130939-error-404-page-not-found-error-with-glitch-effect-on-screen-vector-illustration-for-your-design-.jpg";
                    }
                    if (i % 3 === 0) {
                        result += `<div class="row my-2">`;
                    }
                    result += `<div class="col mt-3 ms-3"><div class="card" style="width: 18rem; box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;">
                                   <img src="${data["Search"][i]["Poster"]}" alt="Image not Found" class="card-img-top">
                                   <div class="card-body">
                                     <h5 class="card-title" title="Name of the movie">${data["Search"][i]["Title"]}</h5>
                                     <hr>
                                    <p class="card-text" title=Realease of the movie"><span class="text-success">Release Year</span>: ${data["Search"][i]["Year"]}</p>
                                    <p class="card-text" title="Type of the Content"><span class="text-success">Type</span>: ${data["Search"][i]["Type"]}</p>
                                     <hr>
                                     <a href="movie-details.html?movie-id=${data["Search"][i]["imdbID"]}" class="btn btn-outline-success">More Details</a>
                                   </div>
                                   </div></div>`;
                    if (i % 3 === 2) {
                        result += `</div>`;
                    }
                }
                document.getElementById("result").innerHTML = result;
            } else {
                swal("Error", data["Error"], "error");
            }
        }).catch(err => console.error(err));
}

function checkNumber(num) {
            if((num%10)>0){
                return (num/10 | 0)+1;
            }else{
                return num/10;
            }
           // return num /10 + num%10;
        }

const loadingData = ()=>{
    document.getElementById("result").innerHTML = `<div class="text-center">
  <div class="spinner-border my-7" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;
}
