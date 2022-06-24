# BETMS

Backend Developer.
Buatlah rest api untuk sebuah dashboard data yang hasil nya berupa api untuk di consume oleh frontend. Beserta Unitesting masing-masing api.
Bahasa yang dipakai javascript. Express js. Database mysql,postgresql.
Rest api terdiri (setiap endpoint tambahkan redis)
/login : login(response sesuaikan)(middleware)
/register : mendaftar (response sesuaikan) (middleware)
/monitor/data : lihat data(response ada dibawah) (middleware)
/user/profile : data profile user(response sesuaikan) (middleware)
Field untuk user berisi : nama, email, nomor handphone, password, dll(boleh ditambahkan apa yang dibutuhkan)
Skenario nya user mendaftar , verifikasi by email user, user login, lihat data, lihat data profile user, edit profile user. Jika user tidak verifikasi maka user gagal login.
Untuk lihat data. Dari json (terlampir) mengembalikan response berupa data berdasarkan tanggal terbaru ke terlama. List pertama merupakan data paling baru.
{"response":{
"total_data":””(total keseluruhan data),
"docs": [{
"created_at": "",(formatnya: hari, tanggal bulan tahun dan jam ex: Senin, 20 Juni 2022 14:00:00
"content": "",
"user_name": "",
"author": "",
"user_location": "",
"user_profile_image_url_https":"",
"retweet_count":"",
"favorite_count": ""
}]
}
}
Task ini diberikan waktu selama 4 hari sampai tanggal 24 juni pukul 18.00(jumat sore)
Hasil ini dikirim kembali by email ke hana@tms.id. Atau setelah dikirm kabarkan hr transmediasosial. Jika ada yang ingin ditanyakan hubungi hr.
Good luck!
