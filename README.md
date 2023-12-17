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
2. Algoritma Machine learning
3. Training
4. Testing
5. Evaluasi


Cara menjalankan aplikasi adalah sebagai berikut :
1. Akses aplikasi melalui link https://tradisi-bali-bot.user.cloudjkt01.com/
2. Setelah mengakses link aplikasi, pengguna akan melihat tampilan berupa chat bot
3. Pengguna dapat langsung mengetikan context berupa kalimat atau paragraf terkait pertanyaan, lalu klik send
4. Selanjutnya bot akan meminta pengguna untuk mengetikan pertanyaan, maka pengguna dapat mengetikan pertanyaan sesuai context, lalu klik send
5. Setelah itu bot akan memberikan jawaban dari pertanyaan tersebut
6. Untuk pertanyaan selanjutnya, pengguna harus mengetikan kembali contextnya kemudian barulah ketikan pertanyaan lagi
