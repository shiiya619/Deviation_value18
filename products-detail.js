document.addEventListener('DOMContentLoaded', () => {
  // URLから商品IDを取得
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  // IDに一致する商品を `products` 配列から探す
  const product = products.find(p => p.id === productId);

  if (product) {
    // DOM要素を取得
    const mainImage = document.getElementById('main-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const thumbnailGrid = document.getElementById('thumbnail-grid');

    // 取得した商品情報でページの内容を更新
    document.title = product.name; // ページのタイトルを商品名に
    mainImage.src = product.images[0];
    productName.textContent = product.name;
    productPrice.textContent = `¥${product.price.toLocaleString()}`;

    // サムネイル画像を生成
    thumbnailGrid.innerHTML = ''; // 一旦クリア
    product.images.forEach(imageSrc => {
      const thumb = document.createElement('img');
      thumb.src = imageSrc;
      thumb.classList.add('thumbnail');
      thumbnailGrid.appendChild(thumb);
      
      // サムネイルクリックでメイン画像を変更
      thumb.addEventListener('click', () => {
        mainImage.src = imageSrc;
      });
    });
  } else {
    // 商品が見つからない場合
    document.querySelector('.product-detail-container').innerHTML = '<h2>商品が見つかりません。</h2>';
  }
});