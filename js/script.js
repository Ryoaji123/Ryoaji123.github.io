/* =====================================================
   script.js - JavaScript buatan sendiri, dipakai semua halaman.
   File ini dipanggil setelah bootstrap.bundle.min.js
   di bagian bawah setiap halaman HTML.
   ===================================================== */

/* 1. Tahun otomatis di footer */
var tahun = document.getElementById('tahun');
if (tahun) {
  tahun.textContent = new Date().getFullYear();
}

/* 2. Animasi muncul saat elemen terlihat di layar.
      Elemen berkelas "reveal" diberi kelas "tampil" ketika masuk layar;
      kelas "tampil" itulah yang dipakai CSS untuk efek munculnya. */
var pengamat = new IntersectionObserver(function (daftar) {
  daftar.forEach(function (item) {
    if (item.isIntersecting) {
      item.target.classList.add('tampil');
      pengamat.unobserve(item.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function (el) {
  pengamat.observe(el);
});

/* 3. Pita teks berjalan (hanya ada di halaman Beranda).
      Isinya digandakan supaya gerakannya mulus tanpa putus. */
var pita = document.querySelector('.pita-isi');
if (pita) {
  pita.innerHTML += pita.innerHTML;
}

/* 4. Pemeriksa: muncul pesan merah di bagian bawah halaman
      kalau Bootstrap atau style.css gagal dimuat.
      Hapus bagian ini kalau sudah tidak diperlukan. */
window.addEventListener('load', function () {
  var gaya = getComputedStyle(document.documentElement);
  var pesan = '';

  if (!gaya.getPropertyValue('--bs-blue') || typeof bootstrap === 'undefined') {
    pesan = 'Bootstrap belum termuat. Periksa file di folder css/ dan js/.';
  } else if (!gaya.getPropertyValue('--navy')) {
    pesan = 'style.css belum termuat. Periksa file css/style.css.';
  }

  if (pesan) {
    document.body.insertAdjacentHTML('beforeend',
      '<div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:#b00020;color:#fff;padding:12px">' + pesan + '</div>');
  }
});