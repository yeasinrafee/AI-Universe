
const getData = async (dataLimit) => {
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools, dataLimit);
    loader(false);
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
        loader(true);
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const data = await res.json();
        const sorted = data.data.tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
        displayPhones(sorted, dataLimit);
        loader(false);
    }
    const btnMore = document.getElementById('btn-more');
    btnMore.classList.add('d-none');
    getData();

})

// It'll show all the systmes details in a modal: 
const showSystemDetails = async (id) =>{
    loader(true);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    loader(false);
    displaySystemDetails(data.data);
}

const displaySystemDetails = system =>{
    console.log(system.features[1].feature_name);
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('d-flex');
    div.classList.add('justify-content-around');
    div.classList.add('align-items-center');
    div.classList.add('py-3');
    div.classList.add('px-5');

    div.innerHTML = `
    
        <div class="text-box p-5 rounded-3">
        <h5 class="fw-bolder mb-3">${system.description}</h5>
        <div class="price-box d-flex justify-content-around align-items-center text-center">
            ${system.pricing? `
                <p class="green">${system.pricing[0].price} </br> <span class="green">${system.pricing[0].plan}</span></p>
                <p class="yellow">${system.pricing[1].price} </br> <span class="yellow">${system.pricing[1].plan}</span></p>
                <p class="red">${system.pricing[2].price.split(" ").slice(0,2).toString()} </br> <span class="red">${system.pricing[2].plan}</span></p>
            `: `<p class="green">free of Cost/<span class="green">Basic</span></p>
                <p class="yellow">free of Cost/<span class="yellow">Pro</span></p>
                <p class="red">free of Cost/<span class="red">Enterprise</span></p>
            `}
        </div>
        <div class="box d-flex justify-content-between align-items-center">
            <div class="features">
                <h5>Features</h5>
                ${system.features? `
                    <ul>
                        <li>${system.features[1].feature_name}</li>
                        <li>${system.features[2].feature_name}</li>
                        <li>${system.features[3].feature_name}</li>
                    </ul>
                `: 'No data found'}
            </div>
            <div class="integraitons">
                <h5>Integrations</h5>
                    ${system.integrations? `
                        <ul>
                            <li>${system.integrations[0]}</li>
                            <li>${system.integrations[1]}</li>
                            <li>${system.integrations[2]}</li>
                        </ul>
                    `: 'No data found'}
            </div>
        </div>
    </div>
    <div id="img-box" class="img-box text-center p-5 rounded-3 position-relative">
        ${system.accuracy? `
            <p class="position-absolute accuracy">${system.accuracy.score * 100}% accuracy</p>
        `: ''}
        <img class="img-fluid mb-4 rounded-3" src="${system.image_link[0]}" alt="">
        <h5 class="mb-4 fw-bolder">${system.input_output_examples[0].input}</h5>
        <p class="mb-4">${system.input_output_examples[0].output}</p>
    </div>
    
    `
    modalBody.appendChild(div);
    loader(false);
}

// Loader function 
function loader (isLoading){
    const loader = document.getElementById('loader');
    if(isLoading){
      loader.classList.remove('d-none');
    }else{
      loader.classList.add('d-none');
    }
  }
