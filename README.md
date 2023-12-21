# Aplikasi QnA Tradisi Bali

Aplikasi QnA Tradisi Bali merupakan aplikasi _question ansewring_ berbasis bot sederhana yang berfungsi untuk melakukan tanya jawab berdasarkan konteks yang diinputkan user. Seseorang dapat memberikan pertanyaan terkait konteks yang diberikannya kepada bot, kemudian bot akan menjawab pertanyaan tersebut berdasarkan konteksnya. Aplikasi ini dibangun dengan konsep dasar _Natural Language Programming_ dan dikembangkan menjadi website bot.

Arsitektur dari aplikasi ini adalah sebagai berikut.

![image](https://github.com/Swastymaharani/Kelompok2_QnA_tradisi-bali-bot/assets/94920692/db782c51-c665-4df3-90e5-5da561c9fb94)


Arsitektur aplikasi ini terbagi menjadi 3 bagian :

1. Frontend

   Frontend dibangun menggunakan React.js dan didukung dengan CSS dan HTML untuk desain tampilan website. Aliran data yang diinput user berupa context dan question akan dikelola dengan React.js. Data input akan dialirkan ke bagian backend menggunakan API request untuk selanjutnya diproses. Data hasil pemrosesan di backend berupa answer akan dialirkan kembali frontend sebagai API response.

2. Backend

   Backend dibangun menggunakan framework laravel dengan bahasa PHP. Data API request dari frontend akan dialirkan ke model question answering menggunakan JSON sebagai json request ke model. Backend terhubung dengan model melalui API Hugging Face, maka json request tersebut akan dialirkan melalui API. Berikut ini link github backend aplikasi ini : https://github.com/Swastymaharani/Backend_QnA_tradisi_bali/tree/main

3. Model

   Model question answering yang dibangun dihosting ke Hugging Face, sehingga bagian backend dapat mengakses model melalui API Hugging Face. Data hasil pemrosesan model akan dikirimkan ke backend sebagai json response. Berikut link Hugging Face model : https://huggingface.co/SwastyMaharani/fine-tuned-tradisi-bali/tree/main


Model question aswering dibangun menggunakan DistilBERT. Berikut penjelasan terkait model yang digunakan.

1. Dataset

   Dataset yang digunakan adalah data Squad yang bersumber dari GitHub. Data Squad merupakan data yang berisi tentang informasi yang berada di Wikipedia dalam bahasa Inggris. Data tersebut dalam bentuk format json yang terdiri dari beberapa field seperti id, title, context, question, dan answers. Dataset terbagi menjadi 2, yaitu data untuk train dan data untuk validation. Total jumlah data Squad dari github yaitu 130.318 data train dan 26.232 data validasi. Jumlah dataset yang digunakan pada fine-tuning model yaitu masing-masing 50% dari data train dan data validasi, di mana data train berjumlah 65.159 dan data validation berjumlah 13.116.
   
2. Algoritma Machine learning

   Algoritma Machine Learning yang digunakan untuk pembuatan question answering adalah DistilBERT. DistilBERT adalah language model yang berupa hasil distilasi dari model BERT. DistilBERT memiliki parameter 40% lebih sedikit daripada model BERT, kecepatan 60% lebih cepat, serta memiliki 97% kinerja dari model BERT. DistilBERT menggunakan arsitektur transformer yang sama dengan BERT, yaitu transformer encoder yang terdiri dari beberapa lapisan self-attention dan feedforward neural networks. Namun, untuk mengurangi jumlah parameter, DistilBERT memiliki hanya dua pertiga dari jumlah lapisan yang dimiliki oleh BERT dan mengurangi ukuran vektor representasi. Proses pelatihan DistilBERT memiliki corpus yang sama dengan model BERT, yaitu gabungan dari Wikipedia Inggris dengan Book Corpus. Arsitektur dari DistilBERT adalah sebagai berikut :

   <img width="298" alt="image" src="https://github.com/Swastymaharani/Kelompok2_QnA_tradisi-bali-bot/assets/94920692/5a0aa2e0-0844-4c3c-bce1-9e80d0f629e1">

    Konsep dari arsitektur DistilBERT serupa dengan model BERT, perbedaannya berada pada lapisan transformer yang tereduksi. Hubungan BERT dan DistilBERT dapat dikatakan sebagai pembelajaran guru (BERT) dan murid (DistilBERT), dimana BERT sebagai guru mentransfer pengetahuannya yang lebih luas kepada DistilBERT dalam proses distilasi, sehingga DistilBERT dapat mengeluarkan output yang sama dengan BERT meskipun kompleksitas model lebih sederhana. Cara kerja DistilBERT dalam proses question answering yaitu dengan memproses input (context dan question) pada layer pertama yaitu embedding layer. Hasil tokenisasi yang telah dilakukan terhadap input tersebut akan diubah menjai reperesentasi vektor numerik dalam lapisan ini. Token yang telah diubah menjadi representasi vektor ini akan dimasukkan ke dalam serangkaian blok Transformer. Di dalam setiap blok Transformer, representasi vektor token akan diolah secara iteratif melalui lapisan-lapisan yang terdiri dari mekanisme self-attention dan jaringan saraf berlapis (feedforward neural networks). Proses ini membantu model untuk memahami hubungan antara token-token dalam konteks dan pertanyaan. Pada output layer, model akan menghasilkan probabilitas distribusi dari token-token dalam urutan, model kemudian akan menggunakan informasi ini untuk menentukan di mana kemungkinan jawaban yang paling mungkin berada di dalam teks konteks. Proses pembangunan model DistilBERT melalui dua fase yaitu pre-training dan fine-tuning. Pada aplikasi QnA ini hanya dilakukan proses fine-tuning dari model yang sudah di pre-training. Model pre-training DistilBERT yang digunakan pada aplikasi ini berasal dari Hugging Face : https://huggingface.co/distilbert-base-uncased
   
3. Training

   Proses training yang dilakukan yaitu dengan fine-tuning model DistilBERT dengan data train Squad. Fine-tuning dilakukan untuk training model yang sudah di pre-training dengan menggunakan data yang lebih sedikit. Sebelum proses training juga dilakukan tokenizer dengan DistilBertTokenizerFast. Proses fine-tuning ini dilakukan dengan 3 epoch.
   
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
