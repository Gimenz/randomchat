exports.textTnC = () => {
    return `
*Dengan menggunakan bot ini, berarti anda setuju dengan syarat dan ketentuan berikut:*

▸ _kami tidak menyimpan data anda di server kami._
▸ _Privasi anda tetap terjaga_
▸ _kami tidak bertanggung jawab atas apa yang terjadi setelah penggunaan bot ini._
▸ _bot tidak boleh digunakan untuk layanan yang bertujuan/berkontribusi dalam:_
    • seks / perdagangan manusia
    • perilaku adiktif yang merugikan 
    • kejahatan
    • ujaran kebencian atau diskriminasi berdasarkan usia,
      jenis kelamin, identitas gender, ras, seksualitas, agama, kebangsaan
    
Bot ini dikembangkan oleh *masgimenz.com* 
Terima kasih *Yoga Sakti* untuk source code dan basic implementasi`
}

exports.textMenu = () => {
    return `
*Penggunaan:*

*#find* _pesan_ : mengirim pesan rasahia ke seseorang
_contoh:_ #find halo, balas pesanku ya 
_(kamu juga dapat mengirim gambar , caranya kirim gambar dengan caption #find pesan kamu)_

*#add* _nomor_  : menambahkan nomor WhatsApp seseorang ke dalam database
_contoh:_ #add 62852361555489

*#help* : menampilkan bantuan

*#ping* : cek Bot aktif atau tidak

*#about* : Informasi bot

*#donasi* : Donasi untuk biaya server agar bot tetap aktif

*#tnc* : Menampilkan syarat dan ketentuan penggunaan bot

*#getbot* : Menampilkan nomor bot ini

*#admin : menu for admin bot only`
}

exports.textAdmin = () => {
return `
*#remove* _nomor_  : menghapus nomor dari database
_contoh:_ #remove 62852361555489

#list : melihat daftar nomor di database

#clearall : menghapus semua chat

#ban : banned nomor (tidak dapat menggunakan fitur bot)

#unban : meng unban nomor `
}
exports.textDonasi = () => {
    return `
▸ *_Donasi_*
Terima Kasih telah menggunakan bot ini. Bot ini aktif 24 Jam
Membutuhkan biaya untuk sewa server

Agar bot tetap aktif, yuk donasi ke:
▸ *_OVO_* : 085236189413
▸ *_GOPAY_* : 085236189413
▸ *_DANA_* : 085236189413
▸ *_PULSA_* : 085236189413

Terima Kasih 😀`
}

exports.textAbout = () => {
    return `
▸ *_About_*
Apa ini? Mirip Anonymous Chat Telegram, untuk Mengirim pesan rahasia ke seseorang, kamu cukup mengirimkan pesan satu kali saja dan bikin seseorang kepo denganmu`
}