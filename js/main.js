// js started from here

//show all button
const showAllButton = (displayStyle) => {
  const showAll = document.getElementById("btn-to-show-all");
  showAll.style.display = displayStyle;
};
showAllButton("none");

//search input button function
const getPhoneInput = () => {
  const searchFeild = document.getElementById("searchFeild");
  const searchText = searchFeild.value;
  //error displaying task

  const err = document.getElementById("err1");
  if (searchText === "") {
    err.innerText = `Sorry No result Matched😥`;
  } else {
    err.style.display = "none";
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}  `;
    fetch(url)
      .then((res) => res.json())
      .then((data) => getTheDetailsOfPhones(data.data));
  }
  searchFeild.value = "";
};
// getPhoneInput();
const getTheDetailsOfPhones = (phones) => {
  // console.log(phones)
  const err = document.getElementById("err2");
  if (!phones) {
    err.innerText = `Sorry No result Matched😥`;
  } else {
    err.innerText = `${phones.length} result found`;
    const container = document.getElementById("container");
    // console.log(phones);
    container.textContent = "";
    phones.slice(0, 6).forEach((phone) => {
      // console.log(phones.length)
      console.log(phone);
      const div = document.createElement("div");
      div.classList.add("element");
      div.innerHTML = `
                     <div class="col shadow-lg rounded">
                        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top phone-image" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.brand}</h5>
                            <h4 class="card-text">${phone.phone_name}</h4>
                          <div>
                            <button onclick="explorePhoneDetails('${phone.slug}')" type="button" class="btn btn-success">Explore</button>
                        </div>
                        </div>
                        </div>
                    </div>
        
        `;
      container.appendChild(div);
    });

    showAllButton("block");
  }
};
// MORE details of every clickable single elements
const explorePhoneDetails = (slug) => {
  //   console.log(slug);
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  //   const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => moreInfoContainer(data.data));
};

const moreInfoContainer = (details) => {
  console.log(details);
  const moreInfoContainer = document.getElementById("more-info-container");
  moreInfoContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
    
            <div class="card mb-3 mx-auto p-3 shadow-lg" style="max-width: 640px;">
        <div class="row g-0">
            <div class="col-md-4 my-auto">
            <img src="${details.image}"class="img-fluid rounded-start" alt="">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${details.brand}</h5>
                <h4 class="card-text">${details.name}</h4>
                <p>STORAGE: ${details.mainFeatures.storage}</p>
                <p>DISPLAY: ${details.mainFeatures.displaySize} </p>
                <h6>CHIPSET: ${details.mainFeatures.chipSet} </h6>
                <h6>OTHERS:Bluetooth: ${
                  details.others.Bluetooth
                    ? details.others.Bluetooth
                    : "not available"
                } ,WLAN: ${
    details.others.WLAN ? details.others.WLAN : "not available"
  } </h6>
                <p>SENSORS: ${details.mainFeatures.sensors} </p>
                 <h5 class="card-title">${
                   details.releaseDate
                     ? details.releaseDate
                     : "Release date not available"
                 }</h5>
            </div>
            </div>
        </div>
        </div>
    
    `;
  moreInfoContainer.appendChild(div);
};

// all data loaded by Show All button click
const lastOne = () => {
  const searchFeild = document.getElementById("searchFeild");
  const searchText = searchFeild.value;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}  `;
  fetch(url)
    .then((res) => res.json())
    .then((data) => allResult(data.data));
};

// lastOne();

const allResult = (phones) => {
  //   console.log(phones)
  const container = document.getElementById("container");
  container.textContent = "";
  phones.forEach((phone) => {
    // console.log(phones.length)
    // console.log(phone)
    const div = document.createElement("div");
    div.classList.add("element");
    div.innerHTML = `
                     <div class="col shadow-lg rounded">
                        <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top phone-image" alt="">
                        <div class="card-body">
                            <h5 class="card-title">${phone.brand}</h5>
                            <h4 class="card-text">${phone.phone_name}</h4>
                          <div>
                            <button onclick="explorePhoneDetails('${phone.slug}')" type="button" class="btn btn-success">Explore</button>
                        </div>
                        </div>
                      
                        </div>
                    </div>
        
        `;
    container.appendChild(div);
  });

  showAllButton("none");
};
//end
