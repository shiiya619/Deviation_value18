// ページが読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.querySelector('.product-grid');

  // products配列のデータを使って商品カードを生成
  products.forEach(product => {
    // 商品カードのHTMLを作成
    const productCardHTML = `
      <a href="product.html?id=${product.id}" class="product-card-link">
        <div class="product-card">
          <img src="${product.images[0]}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p>¥${product.price.toLocaleString()}</p>
        </div>
      </a>
    `;
    // 作成したHTMLを画面に追加
    productGrid.innerHTML += productCardHTML;
  });
});

// カート追加機能（これは将来的に詳細ページに移動します）
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(productId, productName, productPrice) {
  // 省略
}