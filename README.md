# Aplikasi QnA Tradisi Bali

Aplikasi QnA Tradisi Bali merupakan aplikasi _question ansewring_ berbasis bot sederhana yang berfungsi untuk melakukan tanya jawab berdasarkan konteks yang diinputkan user. Seseorang dapat memberikan pertanyaan terkait konteks yang diberikannya kepada bot, kemudian bot akan menjawab pertanyaan tersebut berdasarkan konteksnya. Aplikasi ini dibangun dengan konsep dasar _Natular Language Programming_ dan dikembangkan menjadi website bot.

Arsitektur dari aplikasi ini adalah sebagai berikut.

![image](https://github.com/Swastymaharani/Kelompok2_QnA_tradisi-bali-bot/assets/94920692/db782c51-c665-4df3-90e5-5da561c9fb94)


Arsitektur aplikasi ini terbagi menjadi 3 bagian :

1. Frontend

   Frontend dibangun menggunakan React.js dan didukung dengan CSS dan HTML untuk desain tampilan website. Aliran data yang diinput user berupa context dan question akan dikelola dengan React.js. Data input akan dialirkan ke bagian backend menggunakan API request untuk selanjutnya diproses. Data hasil pemrosesan di backend berupa answer akan dialirkan kembali frontend sebagai API response.

2. Backend

   Backend dibangun menggunakan framework laravel dengan bahasa PHP. Data API request dari frontend akan dialirkan ke model qestion aswering menggunakan JSON sebagai json request ke model. Backend terhubung dengan model melalui API Hugging Face, maka json request tersebut akan dialirkan melalui API. Berikut ini link github backend aplikasi ini : https://github.com/Swastymaharani/Backend_QnA_tradisi_bali/tree/main

3. Model

   Model question answering yang dibangun dihosting ke Hugging Face, sehingga bagian backend dapat mengakses model melalui API Hugging Face. Data hasil pemrosesan model akan dikirimkan ke backend sebagai json response. Berikut link Hugging Face model : https://huggingface.co/SwastyMaharani/fine-tuned-tradisi-bali/tree/main


Model question aswering dibangun menggunakan DistilBert. Berikut penjelasan terkait model yang digunakan.

1. Dataset

   Dataset yang digunakan adalah data Squad yang bersumber dari GitHub. Data Squad merupakan data yang berisi tentang informasi yang berada di Wikipedia dalam bahasa Inggris. Data tersebut dalam bentuk format json yang terdiri dari beberapa field seperti id, title, context, question, dan answers. Dataset terbagi menjadi 2, yaitu data untuk train dan data untuk validation. Total jumlah data Squad dari github yaitu 130.318 data train dan 26.232 data validasi. Jumlah dataset yang digunakan pada fine-tuning model yaitu masing-masing 50% dari data train dan data validasi, di mana data train berjumlah 65.159 dan data validation berjumlah 13.116.
   
2. Algoritma Machine learning

   Algoritma Machine Learning yang digunakan untuk pembuatan question answering adalah DistilBert. DistilBert adalah language model yang berupa hasil distilasi dari model BERT. DistilBERT memiliki parameter 40% lebih sedikit daripada model BERT, kecepatan 60% lebih cepat, serta memiliki 97% kinerja dari model BERT. DistilBERT menggunakan arsitektur transformer yang sama dengan BERT, yaitu transformer encoder yang terdiri dari beberapa lapisan self-attention dan feedforward neural networks. Namun, untuk mengurangi jumlah parameter, DistilBERT memiliki hanya dua pertiga dari jumlah lapisan yang dimiliki oleh BERT dan mengurangi ukuran vektor representasi. Proses pelatihan DistilBert memiliki corpus yang sama dengan model BERT, yaitu gabungan dari Wikipedia Inggris dengan Book Corpus. Model pre-training DistilBert yang digunakan pada aplikasi ini berasal dari Hugging Face : https://huggingface.co/distilbert-base-uncased
   
3. Training

   Proses training yang dilakukan yaitu dengan fine-tuning model DistilBert dengan data train Squad. Fine-tuning dilakukan untuk training model yang sudah di pre-training dengan menggunakan data yang lebih sedikit. Sebelum proses training juga dilakukan tokenizer dengan DistilBertTokenizerFast. Proses fine-tuning ini dilakukan dengan 3 epoch.
   
4. Testing dab Evaluasi

   Proses testing dilakukan dengan data validasi Squad dan dengan data yang dikumpulkan sendiri. Untuk mengukur kinerja model dari proses testing digunakan matriks evaluasi Exact Match. Matriks ini akan melihat kesesuaian prediksi jawaban yang diberikan model dengan jawaban yang didefinisikan pada data test berdasarkan kesesuaian setiap karakter pada jawaban. Hasil evaluasi pada data validasi menghasilkan nilai exact match sebesar 16.67%. Data test yang dikumpulkan sendiri merupakan data yang menggunakan bahasa Indonesia dengan jumlah sebanyak 68 data. Hasil evaluasi dari data ini dengan exact match dihasilkan nilai 0,32%. Berdasarkan analisis dari data test yang dikumpulkan sendiri, hasil prediksi jawaban yang benar yaitu sebanyak 47 pertanyaan. Hasil exact match menunjukan nilai yang lebih kecil karena pada jawaban prediksi dan aktual terdapat ketidaksamaan kata atau karakter yang dikandung, meskipun makna jawabannya bernilai benar.


Cara menjalankan aplikasi adalah sebagai berikut :
1. Akses aplikasi melalui link https://tradisi-bali-bot.user.cloudjkt01.com/
2. Setelah mengakses link aplikasi, pengguna akan melihat tampilan berupa chat bot
3. Pengguna dapat langsung mengetikan context berupa kalimat atau paragraf terkait pertanyaan, lalu klik send
4. Selanjutnya bot akan meminta pengguna untuk mengetikan pertanyaan, maka pengguna dapat mengetikan pertanyaan sesuai context, lalu klik send
5. Setelah itu bot akan memberikan jawaban dari pertanyaan tersebut
6. Untuk pertanyaan selanjutnya, pengguna harus mengetikan kembali contextnya kemudian barulah ketikan pertanyaan lagi

<img width="959" alt="image" src="https://github.com/Swastymaharani/Kelompok2_QnA_tradisi-bali-bot/assets/94920692/27e1e2bf-831a-4d87-9fe3-58545fdabe82">
