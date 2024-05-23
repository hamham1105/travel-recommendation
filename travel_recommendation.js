const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnReset');
const cardElement = document.getElementById('suggestionCards');



let locations;


function searchLocation(){
    cardElement.innerHTML = "";
    console.log("button clicked!");
    const input = document.getElementById('Search').value.toLowerCase();
    
    fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        

        if (input === 'beach' || input === 'beaches') {
            locations = data.beaches;
        } else if (input === 'temple' || input === 'temples'){
            locations = data.temples;
        } else {
            locations = data.countries.find(item => item.name.toLowerCase() === input).cities;
        }
        
        if (locations){ 
        for (city of locations){
            const card = document.createElement('div');
            card.innerHTML = `<div class="card mb-3"><img src="${city.imageUrl}" class="card-img-top" alt="${city.name}">
            <div class="card-body text-bg-light"><h5 class="card-title">${city.name}</h5><p class="card-text">${city.description}</p>
            <a href="#" class="btn btn-success">Visit</a></div></div><br><br>`;
            cardElement.appendChild(card);
        }
        }
        else {
            alert("No result :( Please try with another keywords.");
        };
    })
}



function clear(){
    cardElement.innerHTML = "";
    document.getElementById('Search').value ="";
}

btnSearch.addEventListener('click', searchLocation);
btnClear.addEventListener('click', clear);