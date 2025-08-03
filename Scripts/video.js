//1. fetch load and show categories on html

// create loadCategories
const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}
const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('categories');
    categories.forEach((item) => {
        console.log(item);
        // create button
        const btnCreate = document.createElement('button');
        btnCreate.classList ='btn';
        btnCreate.innerText=item.category;
        categoriesContainer.append(btnCreate)
 
    });
    
}

loadCategories();