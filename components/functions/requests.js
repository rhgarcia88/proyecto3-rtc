
//Llega al final del scroll y genera mas imagenes 

export const extraSearch = async (accessKey, keyword) => {
  
  //Si estamos en una búsqueda
  if(keyword!=null){
    let cards = '';
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${keyword}&client_id=${accessKey}&per_page=30`);
    const data = await response.json();

    data.results.forEach(photo => {
      const imageUrl = photo.urls.regular;
      cards += `<div class="image-card">
        <img class="image-in-card" src="${imageUrl}">
      </div>`;
    });

    return cards;

    //Si estamos en la principal
  }else{
    let cards = '';

    const response = await fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${accessKey}`);
    const data = await response.json();
  
    data.forEach(photo => {
      const imageUrl = photo.urls.regular;
      cards += `<div class="image-card">
        <img class="image-in-card" src="${imageUrl}">
      </div>`;
    });
  
    return cards;

  }



}