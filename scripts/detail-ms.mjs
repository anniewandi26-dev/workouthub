import { detailKeys } from './detail-en.mjs'

const msCats = {
  strength: {
    overview:
      'Sesi kekuatan ini membina beban progresif dengan selamat dan isyarat jelas untuk semua badan.',
    eq: ['Barbel / dumbbell', 'Rak cangkung atau bangku', 'Pembalut pergelangan (pilihan)', 'Kasut latihan'],
    m: ['Bahagian bawah', 'Dada & belakang', 'Kestabilan teras', 'Rantai posterior'],
    s: [
      ['Pemanas badan 8 min', 'Pusingan sendi dan bar kosong untuk buka pinggul, lutut dan bahu.'],
      ['Angkatan utama', 'Tambah beban hanya dengan teknik baik. 5-8 ulangan, rehat 90-120s.'],
      ['Aksesori & penutup', 'Dua gerakan aksesori, kemudian 3 minit pernafasan.'],
    ],
    tips: ['Lutut ikut arah jari kaki', 'Tulang belakang kekal neutral', 'Teknik dulu, beban kemudian'],
  },
  cardio: {
    overview: 'Selang kardio naikkan denyutan dengan selamat dan pacing yang jelas.',
    eq: ['Kasut lari', 'Jam denyutan (pilihan)', 'Botol air', 'Laluan atau treadmill'],
    m: ['Sistem kardio', 'Daya tahan kaki', 'Teras', 'Kestabilan pinggul'],
    s: [
      ['Mula perlahan 5 min', 'Pace perbualan untuk panaskan badan.'],
      ['Blok selang utama', 'Tukar kerja dan pulih ikut jurulatih; kaki ringan.'],
      ['Penyejukan', 'Berjalan kemudian regang betis dan fleksor pinggul.'],
    ],
    tips: ['Stabilkan nafas sebelum laju', 'Mendarat midfoot', 'Minum sedikit tetapi kerap'],
  },
  yoga: {
    overview: 'Aliran yoga dipimpin nafas untuk buka pinggul dan tulang belakang.',
    eq: ['Tikar yoga', 'Blok (pilihan)', 'Pakaian selesa', 'Ruang tenang'],
    m: ['Mobiliti pinggul', 'Mobiliti tulang belakang', 'Teras & imbangan', 'Bahu terbuka'],
    s: [
      ['Nafas & berdiri', 'Pose gunung; nafas hidung masuk dan keluar.'],
      ['Urutan aliran', 'Sambung warrior/triangle seiring nafas.'],
      ['Pulih', 'Forward fold dan baring untuk turun denyutan.'],
    ],
    tips: ['Jangan tahan nafas', 'Keluar jika sakit', 'Blok lebih selamat'],
  },
  pilates: {
    overview: 'Kawalan Pilates untuk teras dalam, pelvis neutral dan garis badan tepat.',
    eq: ['Tikar', 'Mini-band (pilihan)', 'Tuala', 'Lantai stabil'],
    m: ['Teras dalam', 'Kestabilan pelvis', 'Kawalan bahu', 'Glute med'],
    s: [
      ['Cari neutral', 'Pelvis neutral, rusuk turun, aktifkan TVA.'],
      ['Aliran tikar', 'Hundred / single-leg stretch — perlahan dan tepat.'],
      ['Tamat sisi', 'Abduksi sisi untuk glute med, kemudian lepaskan nafas.'],
    ],
    tips: ['Elak belakang bawah runtuh', 'Lebih kecil sering lebih sukar', 'Hembus semasa usaha'],
  },
  hiit: {
    overview: 'Selang HIIT untuk bakar lemak dan kondisioning. Skala setiap gerakan.',
    eq: ['Pemasa', 'Tali skipping atau ruang lantai', 'Tikar (pilihan)', 'Air'],
    m: ['Bakar seluruh badan', 'Kuasa kardio', 'Teras', 'Kaki'],
    s: [
      ['Pemanas dinamik', 'Jumping jack dan high knees 3-4 minit.'],
      ['Blok selang', 'Kerja 30-40s / rehat 15-20s.'],
      ['Turunkan tempo', 'Berjalan dan regang — jangan duduk serta-merta.'],
    ],
    tips: ['Skala intensiti bila-bila', 'Kekalkan julat penuh', 'Berhenti jika pening'],
  },
  mobility: {
    overview: 'Mobiliti dan pemulihan untuk sendi kaku dan bersedia untuk latihan lebih keras.',
    eq: ['Tikar', 'Foam roller (pilihan)', 'Band', 'Pakaian selesa'],
    m: ['Leher/bahu/T-spine', 'Mobiliti pinggul & buku lali', 'Pelepasan fascia', 'Nafas'],
    s: [
      ['Reset tisu lembut', 'Gulung atau urut kawasan ketat 2-3 minit.'],
      ['Mobiliti aktif', 'Latihan sendi terkawal untuk miliki julat baharu.'],
      ['Tahan lama', 'Setiap regangan 45-60s dengan nafas dalam.'],
    ],
    tips: ['Sakit bukan kemajuan', 'Nafas stabil', 'Bagus selepas sesi berat'],
  },
  martial: {
    overview: 'Asas beladiri untuk koordinasi, kuasa dan kardio dengan keutamaan keselamatan.',
    eq: ['Sarung tangan atau pad (pilihan)', 'Tali skipping', 'Ruang lantai terbuka', 'Kasut sokongan'],
    m: ['Koordinasi seluruh badan', 'Teras putaran', 'Kardio', 'Kaki'],
    s: [
      ['Sikap & footwork', 'Sikap asas, langkah depan/belakang, anjakan berat.'],
      ['Kombo pukulan', 'Jab/cross atau tendangan dengan guard aktif.'],
      ['Penutup kondisioning', 'Selang ringan atau shadow, kemudian regang.'],
    ],
    tips: ['Perlahan sebelum laju', 'Dagu masuk, tangan atas', 'Mendarat lembut lindung lutut'],
  },
  home: {
    overview: 'Latihan rumah mesra apartmen. Peralatan minimum, konsisten maksimum.',
    eq: ['Tikar', 'Botol air atau DB ringan', 'Kerusi kukuh', 'Ruang lantai kosong'],
    m: ['Kekuatan asas', 'Teras', 'Glute & kaki', 'Bahu'],
    s: [
      ['Pemanas di tempat', 'Jack, lunge, pusingan lengan — tiada peralatan.'],
      ['Litar', 'Squat, push-up, plank 3-4 pusingan.'],
      ['Regang', '5 minit untuk kuad, dada dan bahu.'],
    ],
    tips: ['Kawal tempo', 'Beg galas boleh tambah beban', 'Guna tuala jika lantai licin'],
  },
}

export const MS_DETAILS = detailKeys(msCats)
MS_DETAILS.d_schedule =
  'Latih 2-3x seminggu dengan sekurang-kurangnya satu hari rehat. Sesi {duration}, kira-kira {calories}. Panjangkan rehat 15-30s jika perlu.'
