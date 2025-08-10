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
const loadCategoryVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");

      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId)=>{
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri)
  const data = await res.json()
  displayDetails(data.video)
  
}
const displayDetails = (video) =>{
  const detailsContainer = document.getElementById('modal-content');
  detailsContainer.innerHTML=`
  <div>
  <img src="${video.thumbnail}"/>
  <p class="mt-5">${video.description}</p>

  </div>
  `
  document.getElementById('customModal').showModal();

}


const removeActiveBtn = () => {
  const removeBtn = document.getElementsByClassName("category-btn");
  for (const btns of removeBtn) {
    btns.classList.remove("active");
  }
};
// get the time
const getTimeString = (time) => {
  const hour = parseInt(time / 3600);
  const remainingMinute = time % 3600;
  const minute = parseInt(remainingMinute / 60);
  const remainingSecond = remainingMinute % 60;
  return `${hour}hrs ${minute}min ${remainingSecond} Sec ago`;
};
//video section
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  videoContainer.classList.remove("grid");
  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
    <img src="assets/icon.png"/>
    <h2 class="text-center text-xl font-bold">NO Content Here In This Category</h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const div = document.createElement("div");
    div.classList = "card card-compact";
    div.innerHTML = `
        <figure class ="h-[200px] relative">
    <img 
      src="${video.thumbnail}"
      class="w-full h-full object-cover"
      alt="Shoes" />
      
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute right-2 bottom-3 bg-gray-600 text-xs text-white p-1 rounded-md">${getTimeString(
              video.others.posted_date
            )}</span>`
      }
  </figure>
  <div class="py-5 px-3 flex gap-3">
        <div>
        <img  class ="h-10 w-10 rounded-full object-cover" src ="${
          video.authors[0].profile_picture
        }"/>
        </div>
        <div>
        <h3 class ="font-bold">${video.title}</h3>
        <div class="flex gap-3 items-center">
        <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
        ${
          video.authors[0].verified === true
            ? `
        <img class="w-5" src="assets/icons8-verify-50.png"/> `
            : ""
        }
        </div>
        <p class="text-sm text-gray-500">${video.others.views}</p>
        </div>
  </div>
  <div>
        <button onclick="loadDetails('${video.video_id}')" class="btn btn-success text-white font-semibold">Details</button>
        </div>
    </div>
        `;
    videoContainer.appendChild(div);
  });
};

// categories section
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    // create button
    const btnContainer = document.createElement("div");
    btnContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick ="loadCategoryVideo(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    categoriesContainer.append(btnContainer);
  });
};

loadCategories();
loadVideos();
