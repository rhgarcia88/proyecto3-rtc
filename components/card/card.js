import "./card.css";
export const accessKey = 'i7jo3QDC1qHmQvaxyW5SsSbEY31sM_E9-eT7VbYYQ-I';
// export const accessKey = 'aa';

export const createCard = async (howManyCards=10) => {
  let cards = '';

  const response = await fetch(`https://api.unsplash.com/photos/random?count=${howManyCards}&client_id=${accessKey}`);
  const data = await response.json();

  data.forEach(photo => {
    const imageUrl = photo.urls.regular;
    cards += `<div class="image-card">
      <img class="image-in-card" src="${imageUrl}">
    </div>`;
  });

  return cards;
}

