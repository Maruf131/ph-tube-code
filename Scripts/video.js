//1. fetch load and show categories on html

// create loadCategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// create loadVideo
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
//video section
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);

    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
        <figure class ="h-[200px]">
    <img 
      src="${video.thumbnail}"
      class="w-full h-full object-cover"
      alt="Shoes" />
  </figure>
  <div class="py-5 px-3 flex gap-3">
        <div>
        <img  class ="h-10 w-10 rounded-full object-cover" src ="${video.authors[0].profile_picture}"/>
        </div>
        <div>
        <h3 class ="font-bold">${video.title}</h3>
        <div class="flex gap-3 items-center">
        <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
        <img class="w-5" src="assets/icons8-verify-50.png"/>
        </div>
        <p class="text-sm text-gray-500">${video.others.views}</p>
        </div>
    </div>
  </div>
        `;
    videoContainer.appendChild(div);
  });
};

/*
{
    "category_id": "1003",
    "video_id": "aaac",
    "thumbnail": "https://i.ibb.co/NTncwqH/luahg-at-pain.jpg",
    "title": "Laugh at My Pain",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/XVHM7NP/kevin.jpg",
            "profile_name": "Kevin Hart",
            "verified": false
        }
    ],
    "others": {
        "views": "1.1K",
        "posted_date": "13885"
    },
    "description": "Comedian Kevin Hart brings his unique brand of humor to life in 'Laugh at My Pain.' With 1.1K views, this show offers a hilarious and candid look into Kevin's personal stories, struggles, and triumphs. It's a laugh-out-loud experience filled with sharp wit, clever insights, and a relatable charm that keeps audiences coming back for more."
}
*/

// categories section
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // create button
    const btnCreate = document.createElement("button");
    btnCreate.classList = "btn";
    btnCreate.innerText = item.category;
    categoriesContainer.append(btnCreate);
  });
};

loadCategories();
loadVideos();
