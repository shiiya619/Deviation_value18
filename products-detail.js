document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  const product = products.find(p => p.id === productId);

  if (product) {
    const mainImage = document.getElementById('main-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    
    // 画像切り替え用の矢印ボタン要素を取得
    const prevBtn = document.getElementById('prev-image');
    const nextBtn = document.getElementById('next-image');

    document.title = product.name;
    productName.textContent = product.name;
    productPrice.textContent = `¥${product.price.toLocaleString()}`;

    // --- ここから画像ギャラリーのロジック ---
    let currentImageIndex = 0; // 現在表示している画像のインデックスを管理

    // メイン画像を更新する関数
    function updateMainImage() {
      mainImage.src = product.images[currentImageIndex];
      // アクティブなサムネイルのスタイルを更新
      const thumbnails = document.querySelectorAll('.thumbnail');
      thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
          thumb.classList.add('active'); // 表示中の画像に対応するサムネイルに'active'クラスを追加
        } else {
          thumb.classList.remove('active'); // それ以外は'active'クラスを削除
        }
      });
    }

    // サムネイル画像を生成
    thumbnailGrid.innerHTML = '';
    product.images.forEach((imageSrc, index) => {
      const thumb = document.createElement('img');
      thumb.src = imageSrc;
      thumb.classList.add('thumbnail');
      thumbnailGrid.appendChild(thumb);
      
      // サムネイルクリックでメイン画像を変更
      thumb.addEventListener('click', () => {
        currentImageIndex = index; // クリックされたサムネイルのインデックスに更新
        updateMainImage(); // メイン画像とアクティブなサムネイルを更新
      });
    });

    // 最初の画像をセットし、最初のサムネイルをアクティブにする
    updateMainImage();

    // 左矢印ボタンのクリックイベント
    prevBtn.addEventListener('click', () => {
      // インデックスを一つ前にずらす（最初の場合は最後にループ）
      currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
      updateMainImage();
    });

    // 右矢印ボタンのクリックイベント
    nextBtn.addEventListener('click', () => {
      // インデックスを一つ次にずらす（最後の場合は最初にループ）
      currentImageIndex = (currentImageIndex + 1) % product.images.length;
      updateMainImage();
    });

  } else {
    document.querySelector('.product-detail-container').innerHTML = '<h2>商品が見つかりません。</h2>';
  }
});