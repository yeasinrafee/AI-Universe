
const getData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools, dataLimit);
}
getData(6);

const displayPhones = (systemData, dataLimit) =>{
    const systemContainer = document.getElementById('phone-container');

    //Show first 6 Datas
    if(dataLimit && systemData.length > 6){
        systemData = systemData.slice(0, 6);
    }
    
    systemData.forEach( system =>{
        // console.log(system)
        const features = system.features;
        const systemDetails = document.createElement('div');
        systemDetails.classList.add('col');
        systemDetails.innerHTML = `
        <div class="card h-100 p-3">
        <img src="${system.image}" class="card-img-top rounded-4 card-img" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">Features</h5>
          <div>
            <ol>
                ${features.map(f =>`<li>${f}</li>`)}
            </ol>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <div>
                <h5 class="card-title fw-bold">${system.name}</h5>
                <p class="card-text"><span>📆</span> ${system.published_in}</p>
            </div>
            <div>
                <button onClick="showSystemDetails('${system.id}')" type="button" class="btn btn-outline-danger rounded-5" data-bs-toggle="modal" data-bs-target="#systemModal"> &rarr;</button>
            </div>
        </div>
      </div>

        `
        systemContainer.appendChild(systemDetails);
    })
}

// It'll show All the items
document.getElementById('btn-more').addEventListener('click', function(){
    const systemContainer = document.getElementById('phone-container');
    systemContainer.innerHTML = '';
    const btnMore = document.getElementById('btn-more');
    btnMore.classList.add('d-none');
    getData();
})

// It'll show sorted datas by date:
document.getElementById('btn-sort').addEventListener('click', function(){
    const systemContainer = document.getElementById('phone-container');
    systemContainer.innerHTML = '';

    const getData = async (dataLimit) => {
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        const sorted = data.data.tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
        displayPhones(sorted, dataLimit);
    }
    const btnMore = document.getElementById('btn-more');
    btnMore.classList.add('d-none');
    getData();

})

// It'll show all the systmes details in a modal: 
const showSystemDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

const displaySystemDetails = system =>{

}
