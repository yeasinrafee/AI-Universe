
const getData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data.tools);
}
getData();

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    
    phones.forEach( phone =>{
        const features = phone.features;
        console.log(phone)
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