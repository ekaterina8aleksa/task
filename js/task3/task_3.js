const imageList = document.querySelector(".gallery");
const searchForm = document.querySelector("#search-form");

const apiKey = "16137003-a99878a83e3cf9a5973a72148";
const cors_api_host = "https://cors-anywhere.herokuapp.com/";
let lastLi;
let existLi;
let endHits = false;

const fetchItem = {
    page: 1,
    searchQuery: "",
    per_page: 20,
    fetch() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.per_page}&key=${apiKey}`;

        return fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error fetching data");
            })
            .then(({ hits }) => {
                this.count();
                console.log(this.page);
                console.log(hits.length);
                if (hits.length === 0) {
                    endHits = true;
                    throw new Error(
                        "This is the end, No more images or input mistake"
                    );
                }
                return hits;
            })
            .catch((error) => console.error(error));
    },
    reset() {
        this.page = 1;
    },
    count() {
        this.page += 1;
    },
    get query() {
        return this.searchQuery;
    },
    set query(value) {
        this.searchQuery = value;
    },
};

function nextPageMarkup() {
    fetchItem.fetch().then((hits) => {
        imgMarkup(hits);
    });
}

function imgMarkup(hits) {
    if (!endHits) {
        const markup = hits.reduce((acc, hit) => {
            acc += `<li class="photo-card">
<img class="image" src="${hit.webformatURL}" alt="${hit.tags}" width="240" height="120" data-source="${hit.largeImageURL}" /></li>`;
            return acc;
        }, "");

        imageList.insertAdjacentHTML("beforeend", markup);

        lastLi = document.querySelector(".photo-card:last-child>img");
        console.log(lastLi);
    } else return;
}

const options = {
    rootMargin: "10px",
};

const onEntry = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target === lastLi) {
                if (!endHits) {
                    nextPageMarkup();
                    observer.disconnect(entry.target);
                } else {
                    return;
                }
            }
        }
        observer.disconnect(entry.target);
        observer.observe(lastLi);
    });
};

let observer = new IntersectionObserver(onEntry, options);

function checkIfElementsToObserve() {
    existLi = document.querySelector(".photo-card");
    if (existLi === null) {
        window.setTimeout(checkIfElementsToObserve, 500);
        return;
    } else {
        observer.observe(lastLi);
    }
}

imageList.addEventListener("click", (event) => {
    if (event.target.nodeName !== "IMG") return;
    if (event.target.dataset.source !== null) {
        basicLightbox
            .create(
                `<img class="image" src="${event.target.dataset.source}" width="800" height="600">`
            )
            .show();
    }
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    fetchItem.query = form.elements.query.value;

    imageList.innerHTML = "";
    fetchItem.reset();
    if (!fetchItem.query) {
        console.log("Oooopsy, input mistake");
        return;
    }

    nextPageMarkup();
    checkIfElementsToObserve();
});
