
const getData = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools, dataLimit);
}
getData(6);

const displayPhones = (phones, dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container');

    //Show first 6 Datas
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0, 6);
    }
    
    phones.forEach( phone =>{
        // console.log(phone)
        const features = phone.features;
        const phoneDetail = document.createElement('div');
        phoneDetail.classList.add('col');
        phoneDetail.innerHTML = `
        <div class="card h-100 p-3">
        <img src="${phone.image}" class="card-img-top rounded-4 card-img" alt="...">
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
                <h5 class="card-title fw-bold">${phone.name}</h5>
                <p class="card-text"><span>📆</span> ${phone.published_in}</p>
            </div>
            <div>
                <button type="button" class="btn btn-outline-danger rounded-5"> &rarr;</button>
            </div>
        </div>
      </div>

        `
        phoneContainer.appendChild(phoneDetail);
    })
}

// It'll show All the items
document.getElementById('btn-more').addEventListener('click', function(){
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const btnMore = document.getElementById('btn-more');
    btnMore.classList.add('d-none');
    getData();
})

// It'll show sorted datas by date:
document.getElementById('btn-sort').addEventListener('click', function(){
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';

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
