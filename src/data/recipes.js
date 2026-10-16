export const recipes = [
  {
    id: 'soto-kudus',
    slug: 'soto-kudus',
    name: 'Soto Kudus Ayam Kampung',
    javaneseName: 'Soto Kudus Pitik Kampung',
    regionId: 'kudus',
    regionName: 'Kudus',
    mealType: 'Makan Utama / Sarapan',
    cookingDuration: '60 Menit',
    prepTime: '20 Menit',
    cookTime: '40 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['segar', 'gurih', 'kaya-rempah'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 45.000 – Rp 65.000',
    image: '/assets/images/recipes/soto-kudus.jpg',
    intro: 'Soto Kudus adalah mahakarya kaldu bening kekuningan dengan aroma kencur dan bawang putih goreng yang khas. Disajikan dalam mangkuk keramik kecil bersama suwiran ayam kampung empuk, tauge pendek renyah, dan perasan jeruk nipis segar yang menggugah selera.',
    history: 'Tradisi Soto Kudus berakar kuat dari kearifan lokal masa Sunan Kudus pada abad ke-16. Untuk menghormati masyarakat Hindu yang menyucikan lembu, Sunan Kudus menganjurkan warganya tidak menyembelih sapi melainkan menggunakan daging kerbau atau ayam kampung. Hingga kini, kebiasaan tersebut lestari dan menjadi ciri khas mutlak kuliner Kudus.',
    culturalBackground: 'Penyajian soto dalam mangkuk kecil keramik (mangkuk soto) bukan sekadar estetika, melainkan tradisi turun-temurun agar kuah kaldu tetap terjaga panasnya dari sendok pertama hingga suapan terakhir.',
    interestingFacts: [
      'Asli dari Kudus menggunakan daging kerbau (soto kerbau), namun variasi ayam kampung sangat digemari luas karena teksturnya yang lembut.',
      'Rempah kunci yang membedakan Soto Kudus dari soto daerah lain di Jawa adalah sekerat kencur tua yang dihaluskan ke dalam bumbu dasar.',
      'Wajib dinikmati dengan sate kerang manis dan perkedel kentang sebagai lauk pelengkap di meja.'
    ],
    regionalVariations: 'Di Kudus terdapat versi Soto Kerbau yang memiliki kaldu lebih pekat berwarna kecokelatan berkat pemakaian kecap lokal dan rebusan sari tulang kerbau.',
    equipment: ['Panci sup besar', 'Cobek batu & ulekan', 'Saringan kaldu kawat halus', 'Mangkuk keramik kecil tradisional'],
    ingredientGroups: [
      {
        name: 'Bahan Utama & Kaldu',
        items: [
          { name: 'Ayam kampung utuh, belah 4', amount: 0.5, unit: 'ekor', notes: 'Gunakan ayam kampung agar kaldu gurih alami' },
          { name: 'Air bersih untuk kaldu', amount: 1500, unit: 'ml', notes: 'Gunakan air matang' },
          { name: 'Serai, memarkan lalu simpul', amount: 2, unit: 'batang', notes: 'Ambil bagian putihnya' },
          { name: 'Daun salam segar', amount: 3, unit: 'lembar', notes: 'Robek sedikit urat daunnya' },
          { name: 'Lengkuas, memarkan', amount: 3, unit: 'cm', notes: 'Cuci bersih' },
          { name: 'Gula merah sisir', amount: 1.5, unit: 'sdm', notes: 'Gula kelapa asli' },
          { name: 'Garam laut', amount: 2, unit: 'sdt', notes: 'Sesuaikan selera' },
          { name: 'Minyak kelapa untuk menumis', amount: 2, unit: 'sdm', notes: 'Bisa minyak sayur' }
        ]
      },
      {
        name: 'Bumbu Halus (Ulek)',
        items: [
          { name: 'Bawang merah lokal', amount: 8, unit: 'butir', notes: 'Kupas bersih' },
          { name: 'Bawang putih', amount: 5, unit: 'siung', notes: 'Kupas' },
          { name: 'Kemiri sangrai', amount: 4, unit: 'butir', notes: 'Sangrai hingga harum' },
          { name: 'Kencur segar', amount: 2, unit: 'cm', notes: 'Kunci aroma khas Kudus' },
          { name: 'Jahe', amount: 2, unit: 'cm', notes: 'Bakar sebentar' },
          { name: 'Kunyit bakar', amount: 2, unit: 'cm', notes: 'Kupas kulit luarnya' },
          { name: 'Ketumbar sangrai', amount: 1, unit: 'sdt', notes: 'Ulek halus' },
          { name: 'Merica butiran sangrai', amount: 0.5, unit: 'sdt', notes: 'Bisa merica putih bubuk' }
        ]
      },
      {
        name: 'Bahan Pelengkap Sajian',
        items: [
          { name: 'Tauge pendek, seduh air panas', amount: 100, unit: 'gram', notes: 'Tiriskan segera' },
          { name: 'Daun seledri, iris halus', amount: 3, unit: 'batang', notes: 'Taburan segar' },
          { name: 'Bawang putih goreng renyah', amount: 3, unit: 'sdm', notes: 'Ciri khas taburan Soto Kudus' },
          { name: 'Jeruk nipis, potong juring', amount: 2, unit: 'buah', notes: 'Untuk perasan segar' },
          { name: 'Sambal rawit rebus ulek', amount: 2, unit: 'sdm', notes: 'Rebus rawit merah lalu ulek' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Merebus Kaldu Ayam Kampung',
        instruction: 'Didihkan 1500 ml air dalam panci. Masukkan potongan ayam kampung bersama serai memar, daun salam, dan lengkuas. Rebus dengan api sedang-kecil hingga keluar buih kaldu jernih. Sendok dan buang buih keruh di permukaan air.',
        timerMinutes: 25,
        tip: 'Gunakan api kecil (simmering) agar saripati tulang ayam terekstrak perlahan tanpa membuat kuah kaldu keruh.'
      },
      {
        stepNumber: 2,
        title: 'Menumis Bumbu Halus',
        instruction: 'Panaskan 2 sdm minyak di wajan. Tumis bumbu halus (bawang merah, bawang putih, kemiri, kencur, jahe, kunyit, ketumbar, merica) hingga matang tanak, harum semerbak, dan minyaknya terpisah di pinggir wajan.',
        timerMinutes: 7,
        tip: 'Tanda bumbu matang sempurna adalah warnanya berubah agak gelap dan tidak berbau langu kencur mentah.'
      },
      {
        stepNumber: 3,
        title: 'Menyatukan Bumbu ke Panci Kaldu',
        instruction: 'Tuang tumisan bumbu halus ke dalam panci rebusan ayam. Tambahkan gula merah dan garam. Aduk rata, masak terus hingga daging ayam benar-benar empuk dan bumbu meresap ke dalam serat daging.',
        timerMinutes: 15,
        tip: 'Koreksi rasa kuah. Seharusnya terasa gurih kaldu yang ringan, segar beraroma kencur, dan manis samar di ujung lidah.'
      },
      {
        stepNumber: 4,
        title: 'Menyediakan Suwiran Ayam',
        instruction: 'Angkat potongan ayam dari panci kuah. Tiriskan sejenak. Anda bisa langsung menyuwirnya atau menggorengnya sebentar selama 2 menit untuk tekstur kulit yang gurih, lalu suwir halus dagingnya.',
        timerMinutes: 5,
        tip: 'Jangan goreng ayam terlalu kering agar daging suwir tetap juicy dan lembut menyerap kuah.'
      },
      {
        stepNumber: 5,
        title: 'Penyajian Hangat ala Kudus',
        instruction: 'Tata nasi hangat di dasar mangkuk keramik kecil. Beri tauge pendek seduh dan suwiran ayam kampung melimpah. Siram dengan kuah soto mendidih. Taburi seledri cincang dan bawang putih goreng renyah melimpah. Sajikan bersama perasan jeruk nipis dan sambal rawit.',
        timerMinutes: 3,
        tip: 'Soto Kudus paling afdal disantap langsung panas-panas bersama sate kerang bumbu kecap.'
      }
    ],
    cookingTips: [
      'Gunakan bawang putih lokal untuk bawang goreng taburan; iris tipis, rendam air garam sebentar, lalu goreng dengan api sedang hingga kuning keemasan.',
      'Kencur tua memberikan aroma yang lebih wangi tanpa rasa pahit berlebih dibandingkan kencur muda yang berair.',
      'Kuah soto tidak menggunakan santan, sehingga sangat ringan dan ramah untuk santap pagi maupun malam.'
    ],
    commonMistakes: [
      'Menumis bumbu halus kurang tanak: menyisakan aroma mentah kencur dan langu kunyit yang merusak kelezatan kaldu.',
      'Menggunakan api terlalu besar saat merebus ayam: membuat kaldu menjadi keruh kecokelatan bukan jernih keemasan.'
    ],
    substitutions: [
      { ingredient: 'Ayam Kampung', substitute: 'Daging Kerbau atau Sapi sandung lamur (rebus 1,5 jam hingga empuk)' },
      { ingredient: 'Kencur Segar', substitute: 'Jangan dihilangkan, ini adalah identitas utama Soto Kudus' }
    ],
    servingSuggestions: 'Sajikan dengan mangkuk kecil ditemani piring kecil berisi perkedel kentang renyah, sate telur puyuh kecap, dan emping melinjo gurih.',
    nutrition: {
      calories: '320 kkal',
      protein: '26 g',
      carbs: '22 g',
      fat: '14 g',
      note: 'Estimasi per porsi mangkuk saji tanpa nasi putih berlebih.'
    },
    relatedRecipeIds: ['garang-asem-kudus', 'nasi-liwet-solo', 'kupat-tahu-magelang'],
    legendaryRestaurantIds: ['soto-kudus-pak-darno', 'garang-asem-sari-rasa-kudus']
  },
  {
    id: 'nasi-liwet-solo',
    slug: 'nasi-liwet-solo',
    name: 'Nasi Liwet Solo Gurih Komplit',
    javaneseName: 'Sega Liwet Solo Jangkep',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Makan Utama / Santap Malam',
    cookingDuration: '75 Menit',
    prepTime: '25 Menit',
    cookTime: '50 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['gurih', 'manis'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 50.000 – Rp 75.000',
    image: '/assets/images/recipes/nasi-liwet.jpg',
    intro: 'Nasi Liwet Solo adalah simfoni kelembutan nasi gurih yang ditanak bersama santan kelapa, daun salam, dan serai wangi. Disajikan di atas pincuk daun pisang dengan suwiran ayam opor lembut, sayur labu siam manis-pedas, dan areh putih kental yang lumer di lidah.',
    history: 'Berasal dari desa Menuran di Sukoharjo yang bertetangga dengan Keraton Surakarta. Pada masa lampau, nasi liwet merupakan hidangan rakyat pedesaan yang kemudian memikat hati para bangsawan keraton berkat kehalusan rasa areh dan keselarasan bumbunya.',
    culturalBackground: 'Nasi liwet disajikan dalam "pincuk"—wadah kerucut dari daun pisang yang disemat lidi janur kelapa. Daun pisang yang terkena uap nasi liwet panas mengeluarkan aroma khas yang tidak bisa digantikan piring keramik biasa.',
    interestingFacts: [
      'Areh terbuat dari santan kental yang direbus perlahan dengan garam dan putih telur hingga menggumpal seperti selai putih gurih.',
      'Ayam yang digunakan adalah ayam kampung yang diungkep dalam kuah opor putih gurih hingga dagingnya sangat empuk terlepas dari tulang.',
      'Di kawasan Keprabon Solo, pedagang nasi liwet legendaris berjualan mulai senja hingga dini hari ditemani alunan musik siter Jawa.'
    ],
    regionalVariations: 'Nasi liwet Jawa Tengah (Solo) berbeda dengan nasi liwet Sunda. Liwet Sunda dimasak bersama teri, petai, dan cabai tanpa santan; sedangkan liwet Solo mutlak menggunakan santan kental dan areh gurih.',
    equipment: ['Panci liwet / rice cooker tebal', 'Wajan wajan cekung', 'Cobek batu', 'Daun pisang klutuk / batu'],
    ingredientGroups: [
      {
        name: 'Bahan Nasi Liwet',
        items: [
          { name: 'Beras pulen pilihan, cuci bersih', amount: 400, unit: 'gram', notes: 'Gunakan beras pandan wangi atau rojolele' },
          { name: 'Santan kelapa segar sedang', amount: 800, unit: 'ml', notes: 'Dari 1 butir kelapa tua' },
          { name: 'Daun salam segar', amount: 3, unit: 'lembar', notes: 'Robek sedikit' },
          { name: 'Serai wangi', amount: 2, unit: 'batang', notes: 'Memarkan simpul' },
          { name: 'Garam laut', amount: 1.5, unit: 'sdt', notes: 'Untuk rasa gurih merata' }
        ]
      },
      {
        name: 'Sayur Sambal Goreng Labu Siam',
        items: [
          { name: 'Labu siam besar, iris korek api', amount: 1, unit: 'buah', notes: 'Remas dengan garam lalu cuci bersih' },
          { name: 'Santan encer', amount: 500, unit: 'ml', notes: 'Dari perasan kedua' },
          { name: 'Cabai rawit merah utuh', amount: 8, unit: 'buah', notes: 'Cemplungan pedas' },
          { name: 'Bawang merah iris halus', amount: 5, unit: 'butir', notes: 'Bumbu tumis' },
          { name: 'Bawang putih iris halus', amount: 3, unit: 'siung', notes: 'Bumbu tumis' },
          { name: 'Cabai merah keriting halus', amount: 4, unit: 'buah', notes: 'Pemberi warna kemerahan' },
          { name: 'Gula merah sisir', amount: 1, unit: 'sdm', notes: 'Penyeimbang manis' }
        ]
      },
      {
        name: 'Ayam Suwir Opor & Areh Santan',
        items: [
          { name: 'Ayam kampung', amount: 0.5, unit: 'ekor', notes: 'Potong jadi 4 bagian' },
          { name: 'Santan kental kani (perasan pertama)', amount: 300, unit: 'ml', notes: 'Untuk pembuatan areh putih' },
          { name: 'Bawang merah halus', amount: 6, unit: 'butir', notes: 'Bumbu opor' },
          { name: 'Bawang putih halus', amount: 4, unit: 'siung', notes: 'Bumbu opor' },
          { name: 'Kemiri sangrai halus', amount: 3, unit: 'butir', notes: 'Bumbu opor' },
          { name: 'Ketumbar sangrai halus', amount: 1, unit: 'sdt', notes: 'Bumbu opor' },
          { name: 'Putih telur ayam', amount: 1, unit: 'butir', notes: 'Kocok lepas (rahasia areh gumpal lembut)' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Meliwet Nasi Santan Gurih',
        instruction: 'Campur beras bersih, santan 800 ml, daun salam, serai, dan garam dalam panci tebal. Masak dengan api sedang sambil sesekali diaduk agar santan tidak pecah dan dasar tidak gosong. Setelah air santan terserap habis (aron), kecilkan api sekecil mungkin dan tutup panci rapat selama 20 menit hingga matang tanak.',
        timerMinutes: 30,
        tip: 'Jika menggunakan rice cooker, cukup masukkan semua bahan lalu tekan tombol cook seperti menanak nasi biasa.'
      },
      {
        stepNumber: 2,
        title: 'Memasak Opor Ayam Kampung',
        instruction: 'Tumis bumbu halus opor hingga harum. Masukkan potongan ayam kampung, aduk hingga berubah warna. Tuang santan dan air kaldu. Masak dengan api kecil hingga ayam empuk dan bumbu meresap. Angkat ayam, suwir-suwir dagingnya selagi hangat.',
        timerMinutes: 25,
        tip: 'Sisakan kuah opor ayam sebagai siraman kuah gurih pelengkap.'
      },
      {
        stepNumber: 3,
        title: 'Membuat Areh Santan Gurih (Kumut)',
        instruction: 'Rebus santan kental kani (300 ml) bersama sedikit garam dan daun salam di wajan kecil dengan api sangat kecil. Masukkan putih telur kocok sambil diaduk perlahan memutar hingga santan mengental dan terbentuk gumpalan areh putih (kumut) yang harum berminyak kelapa alami.',
        timerMinutes: 15,
        tip: 'Gunakan santan dari kelapa parut asli, bukan santan instan kemasan, agar terbentuk lapisan minyak areh yang legit.'
      },
      {
        stepNumber: 4,
        title: 'Memasak Sayur Labu Siam Gurih Pedas',
        instruction: 'Tumis irisan bawang merah, bawang putih, dan cabai halus hingga harum. Masukkan irisan labu siam dan cabai rawit utuh. Tuang santan encer, tambahkan gula merah dan garam. Masak hingga labu siam matang lembut namun tetap renyah.',
        timerMinutes: 12,
        tip: 'Meremas labu siam dengan garam sebelum dimasak akan membuang getah lengket dan membuat teksturnya kenyal sedap.'
      },
      {
        stepNumber: 5,
        title: 'Menata Sajian Pincuk Solo',
        instruction: 'Ambil selembar daun pisang. Sendokkan nasi liwet gurih yang masih mengepul hangat. Beri suwiran ayam opor di satu sisi dan sesendok sayur labu siam berserta kuahnya. Tambahkan telur pindang. Akhiri dengan sesendok besar areh putih kental di atas nasi.',
        timerMinutes: 3,
        tip: 'Sajikan selagi hangat untuk menikmati sensasi gurih lumer santan areh bersama nasi liwet pulen.'
      }
    ],
    cookingTips: [
      'Pilih beras jenis pulen; beras pera kurang cocok karena tidak menyatu lembut dengan minyak kelapa santan.',
      'Daun salam yang agak banyak akan memberikan aroma herba manis khas dapur Solo.'
    ],
    commonMistakes: [
      'Memasak areh dengan api terlalu besar hingga santan gosong dan pecah minyak kasar.',
      'Mengaduk nasi terlalu sering saat aron yang menyebabkan beras patah dan menjadi bubur.'
    ],
    substitutions: [
      { ingredient: 'Labu Siam', substitute: 'Pepaya muda serut atau rebung muda manis' },
      { ingredient: 'Ayam Kampung', substitute: 'Ayam pejantan atau tahu tempe bacem untuk versi vegetarian' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan di atas pincuk daun pisang dengan lauk pendamping telur pindang hitam, sate usus ayam, dan kerupuk karak beras Solo.',
    nutrition: {
      calories: '480 kkal',
      protein: '28 g',
      carbs: '54 g',
      fat: '18 g',
      note: 'Estimasi per porsi komplit lengkap dengan areh dan sayur labu siam.'
    },
    relatedRecipeIds: ['selat-solo', 'sate-buntel-solo', 'tempe-bacem'],
    legendaryRestaurantIds: ['nasi-liwet-wongso-lemu-solo', 'selat-solo-mbak-lies']
  },
  {
    id: 'garang-asem-kudus',
    slug: 'garang-asem-kudus',
    name: 'Garang Asem Ayam Kudus',
    javaneseName: 'Garang Asem Pitik Kudus',
    regionId: 'kudus',
    regionName: 'Kudus',
    mealType: 'Makan Utama',
    cookingDuration: '65 Menit',
    prepTime: '20 Menit',
    cookTime: '45 Menit',
    baseServings: 4,
    difficulty: 'Mudah',
    difficultyLevel: 'Pemula Ramah',
    flavorProfiles: ['asam', 'pedas', 'gurih'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 45.000 – Rp 60.000',
    image: '/assets/images/recipes/garang-asem.jpg',
    intro: 'Garang Asem adalah perpaduan magis antara potongan ayam kampung, kesegaran belimbing wuluh segar, tomat hijau, dan letupan cabai rawit utuh. Semuanya dibungkus rapat dalam lembaran daun pisang berlapis lalu dikukus hingga kuah santan encernya meresap asam-pedas gurih menyegarkan.',
    history: 'Awalnya garang asem merupakan sajian jamuan istimewa para bangsawan dan saudagar di wilayah Pantura (Kudus, Grobogan, Pati). Kata "garang" merujuk pada sensasi pedas hangat yang membakar lidah, sementara "asem" mengacu pada kesegaran belimbing wuluh.',
    culturalBackground: 'Pembungkusan dengan daun pisang klutuk berlapis bukan hanya tradisi, tetapi fungsi teknologi kuliner leluhur: daun pisang mengunci uap asam belimbing sehingga sari asamnya mengempukkan serat daging ayam secara alami tanpa pengempuk kimia.',
    interestingFacts: [
      'Kuah garang asem yang otentik bertekstur encer dan tidak terlalu kental, sehingga sangat segar diseruput langsung.',
      'Sari belimbing wuluh dan tomat hijau yang terkukus di dalam daun pisang menciptakan aroma wangi segar yang langsung menyeruak saat bungkusan dibuka.',
      'Di Kudus dan sekitarnya, garang asem selalu disantap bersama nasi putih hangat yang dicampur langsung ke dalam pincuk daunnya.'
    ],
    regionalVariations: 'Di Pekalongan terdapat variasi garang asem tanpa santan berkuah bening asam dengan potongan daging sapi tetelan.',
    equipment: ['Panci kukusan (dandang)', 'Tusuk gigi / lidi semat', 'Daun pisang kepok/klutuk segar lentur', 'Mangkuk aduk besar'],
    ingredientGroups: [
      {
        name: 'Bahan Utama',
        items: [
          { name: 'Ayam kampung, potong 16 bagian kecil', amount: 0.5, unit: 'ekor', notes: 'Potongan kecil agar cepat empuk dan bumbu meresap' },
          { name: 'Belimbing wuluh segar, iris bulat 1 cm', amount: 8, unit: 'buah', notes: 'Kunci keasaman segar alami' },
          { name: 'Tomat hijau segar, belah 4', amount: 4, unit: 'buah', notes: 'Pemberi aroma asam fruity' },
          { name: 'Cabai rawit merah & hijau utuh', amount: 15, unit: 'buah', notes: 'Biarkan utuh agar pedasnya bisa diatur' },
          { name: 'Santan encer segar', amount: 400, unit: 'ml', notes: 'Dari 1/2 butir kelapa' },
          { name: 'Daun pisang batu/klutuk untuk membungkus', amount: 8, unit: 'lembar', notes: 'Layukan di atas api kompor sebentar agar tidak sobek' }
        ]
      },
      {
        name: 'Bumbu Rajang & Rempah Cemplung',
        items: [
          { name: 'Bawang merah lokal, iris tipis', amount: 8, unit: 'butir', notes: 'Irisan melimpah' },
          { name: 'Bawang putih, iris tipis', amount: 5, unit: 'siung', notes: 'Irisan tipis' },
          { name: 'Lengkuas, iris tipis melintang', amount: 3, unit: 'cm', notes: 'Cuci bersih' },
          { name: 'Jahe, memarkan', amount: 2, unit: 'cm', notes: 'Penyegar kaldu' },
          { name: 'Serai, iris serong bagian putih', amount: 2, unit: 'batang', notes: 'Aroma wangi' },
          { name: 'Daun salam', amount: 4, unit: 'lembar', notes: 'Alas bungkusan' },
          { name: 'Garam laut', amount: 1.5, unit: 'sdt', notes: 'Sesuaikan' },
          { name: 'Gula pasir', amount: 1, unit: 'sdt', notes: 'Penyeimbang rasa asam' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mempersiapkan Ayam & Daun Pembungkus',
        instruction: 'Cuci bersih potongan ayam kampung, tiriskan. Siapkan daun pisang, lewatkan sebentar di atas api kompor agar daun lemas dan tidak mudah pecah saat dilipat membungkus kuah santan.',
        timerMinutes: 8,
        tip: 'Gunakan 2 lapis daun pisang bertumpuk agar kuah santan tidak bocor saat dikukus.'
      },
      {
        stepNumber: 2,
        title: 'Mencampur Adonan Garang Asem',
        instruction: 'Dalam wadah mangkuk besar, campurkan potongan ayam, irisan bawang merah, bawang putih, lengkuas, jahe, serai, belimbing wuluh, tomat hijau, dan cabai rawit utuh. Tuang santan encer. Bumbui dengan garam dan sedikit gula. Aduk merata dengan sendok.',
        timerMinutes: 7,
        tip: 'Diamkan campuran ini selama 10 menit agar sari belimbing wuluh mulai memecah serat ayam mentah.'
      },
      {
        stepNumber: 3,
        title: 'Membungkus Pincuk Rapat',
        instruction: 'Ambil 2 lembar daun pisang rangkap. Letakkan selembar daun salam di dasar. Sendokkan potongan ayam beserta kuah santan, irisan belimbing wuluh, tomat hijau, dan cabai rawit. Lipat sisi kanan dan kiri ke tengah, lalu semat kedua ujungnya dengan lidi atau tusuk gigi hingga rapat menyerupai perahu/tum.',
        timerMinutes: 10,
        tip: 'Bisa juga menggunakan mangkuk keramik tahan panas yang dialasi daun pisang jika kesulitan melipat bungkusan daun.'
      },
      {
        stepNumber: 4,
        title: 'Mengukus Hingga Tanak & Empuk',
        instruction: 'Panaskan panci kukusan hingga airnya mendidih deras dan uap mengepul banyak. Masukkan bungkusan garang asem ke dalam sarangan kukusan. Tutup rapat kukusan dan masak dengan api sedang selama 40–45 menit.',
        timerMinutes: 45,
        tip: 'Aroma harum daun pisang berpadu belimbing wuluh kukus yang semerbak adalah tanda garang asem telah matang sempurna.'
      },
      {
        stepNumber: 5,
        title: 'Sajian Segar Penuh Gairah',
        instruction: 'Angkat bungkusan garang asem, gunting sedikit bagian atas daun pisang agar rapi. Letakkan di atas piring cekung. Buka sematan lidi di depan meja makan, dan nikmati uap kuah asam pedasnya selagi panas mengepul bersama nasi putih hangat.',
        timerMinutes: 2,
        tip: 'Pecahkan cabai rawit kukus di atas sendok bagi yang menyukai tingkat kepedasan ekstra.'
      }
    ],
    cookingTips: [
      'Gunakan belimbing wuluh yang masih keras dan segar berwarna hijau terang untuk rasa asam yang segar bersahaja.',
      'Santan jangan terlalu kental agar tidak mendominasi keasaman alami kuah.'
    ],
    commonMistakes: [
      'Memakai daun pisang mentah tanpa dilayukan: daun akan retak dan kuah kaldu lezat akan tumpah ke dasar kukusan.',
      'Memotong ayam terlalu besar: membutuhkan waktu kukus lebih dari 1 jam sehingga belimbing wuluh terlalu hancur.'
    ],
    substitutions: [
      { ingredient: 'Belimbing Wuluh', substitute: 'Tomat hijau muda ditambah sedikit perasan air asam jawa segar' },
      { ingredient: 'Ayam Kampung', substitute: 'Ikan patin, ikan nila, atau iga sapi' }
    ],
    servingSuggestions: 'Paling nikmat disantap langsung dari bungkusan daun pisangnya bersama nasi putih pulen, tempe goreng tepung, dan kerupuk putih.',
    nutrition: {
      calories: '290 kkal',
      protein: '24 g',
      carbs: '8 g',
      fat: '16 g',
      note: 'Rendah karbohidrat, kaya vitamin C alami dari belimbing wuluh.'
    },
    relatedRecipeIds: ['soto-kudus', 'mendoan-banyumas', 'nasi-megono-pekalongan'],
    legendaryRestaurantIds: ['garang-asem-sari-rasa-kudus', 'soto-kudus-pak-darno']
  },
  {
    id: 'lumpia-semarang',
    slug: 'lumpia-semarang',
    name: 'Lumpia Semarang Rebung Gurih Renyah',
    javaneseName: 'Lunpia Semarang Rebung Ebi',
    regionId: 'semarang',
    regionName: 'Semarang',
    mealType: 'Kudapan / Camilan Tradisional',
    cookingDuration: '50 Menit',
    prepTime: '25 Menit',
    cookTime: '25 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['manis', 'gurih'],
    budgetCategory: 'Terjangkau',
    estimatedCost: 'Rp 35.000 – Rp 50.000',
    image: '/assets/images/recipes/lumpia-semarang.jpg',
    intro: 'Lumpia Semarang adalah mahakarya akulturasi kuliner Tionghoa dan Jawa. Balutan kulit tipis nan renyah keemasan berisikan tumisan rebung muda manis tanpa bau langu, udang ebi gurih, daging ayam cincang, dan telur orak-arik. Disajikan dengan saus kental bawang putih tauco yang legit manis.',
    history: 'Lumpia Semarang tercipta pada akhir abad ke-19 dari kisah cinta Tjoa Thay Joe (seorang perantau dari Fujian Tiongkok) dan Wasih (wanita Jawa asli). Keduanya sama-sama berdagang kudapan di pasar Semarang dan memutuskan menikah, lalu memadukan resep lumpia Tionghoa yang asin dengan cita rasa manis-gurih Jawa.',
    culturalBackground: 'Hingga kini, kawasan Gang Lombok di kawasan pecinan Semarang dekat Klenteng Tay Kak Sie menjadi episentrum penjaga resep tradisi lumpia tertua di Indonesia.',
    interestingFacts: [
      'Kunci kelezatan isian lumpia terletak pada teknik pengolahan rebung muda yang direbus berulang kali dengan daun pandan dan gula merah untuk membuang aroma pesing rebung mentah.',
      'Ada dua cara menikmati: Lunpia Basah (kulit lembut basah) yang digemari pecinta tekstur lembut, dan Lunpia Goreng yang renyah berkulit keemasan.',
      'Saus cokelat pendampingnya bukan saus sambal botolan, melainkan racikan rebusan bawang putih cincang halus, gula merah, dan sedikit tepung kanji tapioka.'
    ],
    regionalVariations: 'Lumpia basah khas Bandung menggunakan bengkuang dan tauge, sementara Lumpia Semarang mutlak mengandalkan rebung bambu muda sebagai jiwa isiannya.',
    equipment: ['Wajan datar untuk menumis isian', 'Wajan cekung dalam untuk menggoreng', 'Piring saji datar', 'Panci kecil saus'],
    ingredientGroups: [
      {
        name: 'Bahan Kulit & Isian Lumpia',
        items: [
          { name: 'Kulit lumpia siap pakai ukuran 20x20 cm', amount: 12, unit: 'lembar', notes: 'Gunakan kulit lentur kualitas bagus' },
          { name: 'Rebung muda manis, iris korek api halus', amount: 300, unit: 'gram', notes: 'Rebus 2 kali dengan sedikit garam dan daun salam' },
          { name: 'Daging ayam cincang kasar', amount: 150, unit: 'gram', notes: 'Bisa paha ayam' },
          { name: 'Udang ebi kering, rendam air hangat lalu ulek', amount: 2, unit: 'sdm', notes: 'Pemberi aroma umami seafood khas' },
          { name: 'Telur ayam, orak-arik matang', amount: 2, unit: 'butir', notes: 'Orak-arik terpisah' },
          { name: 'Bawang putih cincang halus', amount: 6, unit: 'siung', notes: 'Bumbu tumis' },
          { name: 'Bawang merah cincang halus', amount: 4, unit: 'butir', notes: 'Bumbu tumis' },
          { name: 'Kecap manis kualitas premium', amount: 3, unit: 'sdm', notes: 'Pemberi warna cokelat dan manis' },
          { name: 'Minyak wijen', amount: 1, unit: 'sdt', notes: 'Aroma wangi' },
          { name: 'Gula pasir & garam', amount: 1, unit: 'sdt', notes: 'Sesuaikan rasa' },
          { name: 'Minyak untuk menggoreng', amount: 500, unit: 'ml', notes: 'Gunakan metode deep frying' }
        ]
      },
      {
        name: 'Saus Bawang Putih Kental & Pelengkap',
        items: [
          { name: 'Bawang putih cincang sangat halus', amount: 3, unit: 'siung', notes: 'Aroma saus' },
          { name: 'Air bersih', amount: 250, unit: 'ml', notes: 'Untuk kuah saus' },
          { name: 'Gula merah sisir', amount: 50, unit: 'gram', notes: 'Pemberi warna karamel' },
          { name: 'Tepung tapioka / maizena', amount: 1.5, unit: 'sdm', notes: 'Larutkan dengan 2 sdm air untuk pengental' },
          { name: 'Batang daun bawang muda kecil', amount: 8, unit: 'batang', notes: 'Lalapan wajib lumpia Semarang' },
          { name: 'Cabai rawit hijau segar', amount: 10, unit: 'buah', notes: 'Gigitan pedas' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mengolah Rebung Bebas Bau Langu',
        instruction: 'Rebus irisan rebung muda dalam air mendidih bersama 1 sdt garam dan 2 lembar daun pandan selama 15 menit. Buang air rebusan, bilas dengan air bersih dingin, lalu peras hingga kering.',
        timerMinutes: 15,
        tip: 'Langkah ini adalah rahasia terbesar mengapa lumpia buatan rumah bisa seenak lumpia legendaris Gang Lombok.'
      },
      {
        stepNumber: 2,
        title: 'Menumis Isian Rebung Gurih Manis',
        instruction: 'Tumis bawang putih, bawang merah, dan ebi halus hingga harum matang. Masukkan ayam cincang, masak hingga berubah warna. Tambahkan rebung peras dan telur orak-arik. Bumbui dengan kecap manis, minyak wijen, garam, dan gula. Masak dengan api sedang hingga isian benar-benar kering dan tidak berair.',
        timerMinutes: 12,
        tip: 'Isian harus benar-benar kesat/kering sebelum digulung agar kulit lumpia tidak basah dan robek saat digoreng.'
      },
      {
        stepNumber: 3,
        title: 'Menggulung Rapi Kulit Lumpia',
        instruction: 'Bentangkan selembar kulit lumpia di atas talenan kering. Beri 2 sdm penuh isian rebung di bagian bawah. Lipat sisi bawah ke atas, lipat sisi kanan dan kiri ke dalam, lalu gulung rapat ke atas. Rekatkan ujung kulit dengan olesan sedikit larutan tepung tapioka/air.',
        timerMinutes: 10,
        tip: 'Gulung dengan sedikit tekanan agar padat dan renyah merata saat digigit.'
      },
      {
        stepNumber: 4,
        title: 'Menggoreng Renyah Keemasan',
        instruction: 'Panaskan minyak goreng dalam jumlah banyak dengan api sedang. Masukkan gulungan lumpia satu per satu. Goreng sambil dibalik sesekali hingga seluruh permukaan kulit berwarna cokelat keemasan cerah dan bertekstur krispi.',
        timerMinutes: 8,
        tip: 'Tiriskan lumpia dengan posisi berdiri di atas saringan agar sisa minyak mengalir tuntas.'
      },
      {
        stepNumber: 5,
        title: 'Memasak Saus Kental & Penyajian',
        instruction: 'Rebus air, bawang putih cincang, dan gula merah hingga mendidih larut. Masukkan larutan tepung tapioka sambil diaduk cepat hingga meletup-letup kental berkilap. Sajikan lumpia panas bersama saus manis kental, lalapan batang daun bawang muda, dan cabai rawit hijau.',
        timerMinutes: 5,
        tip: 'Cara santap khas Semarang: cocol lumpia ke saus, lalu gigit bersamaan dengan sebatang daun bawang muda mentah.'
      }
    ],
    cookingTips: [
      'Gunakan minyak goreng baru dengan suhu sekitar 170°C; minyak yang terlalu panas membuat kulit cepat gosong sebelum bagian dalam panas.',
      'Sisa lumpia yang sudah digulung bisa disimpan di freezer sebagai frozen food praktis.'
    ],
    commonMistakes: [
      'Isian rebung masih basah berkuah saat digulung: uap air akan meledak di minyak dan membuat kulit lumpia lembek berminyak.',
      'Menggunakan rebung kalengan tanpa dicuci bersih sehingga aroma asam cuka merusak keaslian rasa.'
    ],
    substitutions: [
      { ingredient: 'Rebung Segar', substitute: 'Bengkuang manis serut yang diperas airnya' },
      { ingredient: 'Udang Ebi', substitute: 'Daging udang segar cincang halus' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan hangat di sore hari ditemani secangkir teh melati nasgitel (panas, legi, kenthel).',
    nutrition: {
      calories: '240 kkal',
      protein: '9 g',
      carbs: '28 g',
      fat: '11 g',
      note: 'Per 1 biji lumpia goreng ukuran sedang lengkap dengan saus cocolan.'
    },
    relatedRecipeIds: ['tahu-gimbal-semarang', 'mendoan-banyumas', 'soto-kudus'],
    legendaryRestaurantIds: ['lunpia-gang-lombok-semarang', 'toko-oen-semarang']
  },
  {
    id: 'mendoan-banyumas',
    slug: 'mendoan-banyumas',
    name: 'Tempe Mendoan Asli Banyumas',
    javaneseName: 'Tempe Mendoan Banyumasan',
    regionId: 'banyumas',
    regionName: 'Banyumas',
    mealType: 'Kudapan / Lauk Pendamping',
    cookingDuration: '25 Menit',
    prepTime: '15 Menit',
    cookTime: '10 Menit',
    baseServings: 4,
    difficulty: 'Sangat Mudah',
    difficultyLevel: 'Pemula Ramah',
    flavorProfiles: ['gurih', 'pedas'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 15.000 – Rp 25.000',
    image: '/assets/images/recipes/mendoan.jpg',
    intro: 'Tempe Mendoan adalah ikon kuliner kebanggaan masyarakat Banyumas lereng Gunung Slamet. Lembaran tempe kedelai khusus berbalut adonan tepung terigu dan beras berbumbu ketumbar, kencur, serta daun bawang melimpah, digoreng kilat dalam minyak panas hingga bertekstur basah lembut (mendo). Disantap bersama cocolan sambal kecap rawit pedas mengigit.',
    history: 'Kata "Mendoan" berasal dari dialek bahasa Jawa Banyumasan "mendo" yang berarti setengah matang atau lembek. Konsep menggoreng setengah matang ini awalnya lahir dari kebutuhan menyajikan tempe goreng panas secara kilat untuk menjamu tamu dan pekerja di pedesaan.',
    culturalBackground: 'Bagi masyarakat Banyumasan, mendoan bukan sekadar camilan melainkan media diplomasi sosial saat berkumpul di pos kamling, warung kopi, atau hajatan keluarga.',
    interestingFacts: [
      'Tempe mendoan asli Banyumas dibungkus satu per satu dengan daun pisang dalam lembaran yang sangat tipis dan lebar.',
      'Waktu menggoreng tempe mendoan di minyak mendidih hanya berkisar 1,5 hingga 2 menit saja per sisi, berbeda dari tempe goreng tepung biasa yang digoreng kering garing.',
      'Aroma khasnya tercipta dari perpaduan daun bawang lokal yang dipotong tipis bersama ulekan ketumbar dan daun jeruk purut di dalam adonan tepung.'
    ],
    regionalVariations: 'Di luar Banyumas sering kali mendoan digoreng hingga renyah krispi; namun bagi warga Purwokerto, mendoan sejati wajib memiliki tekstur lentur basah yang lembut di mulut.',
    equipment: ['Wajan wajan lebar (wajan cekung)', 'Spatula penggorengan lebar', 'Ulekan batu'],
    ingredientGroups: [
      {
        name: 'Bahan Tempe & Adonan Tepung',
        items: [
          { name: 'Tempe mendoan bungkus daun tipis', amount: 8, unit: 'lembar', notes: 'Bisa gunakan tempe papan yang diiris tipis lebar' },
          { name: 'Tepung terigu protein sedang', amount: 200, unit: 'gram', notes: 'Dasar adonan lembut' },
          { name: 'Tepung beras', amount: 2, unit: 'sdm', notes: 'Pemberi sedikit tekstur renyah di tepian' },
          { name: 'Daun bawang, iris halus melimpah', amount: 3, unit: 'batang', notes: 'Wajib banyak untuk aroma khas' },
          { name: 'Air bersih dingin', amount: 280, unit: 'ml', notes: 'Tuang bertahap hingga konsistensi kental sedang' },
          { name: 'Minyak goreng', amount: 500, unit: 'ml', notes: 'Untuk menggoreng cepat' }
        ]
      },
      {
        name: 'Bumbu Halus Adonan',
        items: [
          { name: 'Bawang putih', amount: 4, unit: 'siung', notes: 'Ulek halus' },
          { name: 'Bawang merah', amount: 2, unit: 'butir', notes: 'Ulek halus' },
          { name: 'Ketumbar sangrai', amount: 1.5, unit: 'sdt', notes: 'Kunci wangi mendoan' },
          { name: 'Kencur segar', amount: 1, unit: 'cm', notes: 'Rahasia wangi khas Banyumas' },
          { name: 'Kunyit bakar', amount: 1, unit: 'cm', notes: 'Pemberi warna kuning cerah alami' },
          { name: 'Garam laut & kaldu jamur', amount: 1, unit: 'sdt', notes: 'Sesuaikan gurihnya' }
        ]
      },
      {
        name: 'Sambal Kecap Rawit Banyumas',
        items: [
          { name: 'Kecap manis kental', amount: 5, unit: 'sdm', notes: 'Gunakan kecap manis legit lokal' },
          { name: 'Cabai rawit hijau & merah, iris kecil', amount: 8, unit: 'buah', notes: 'Tingkat pedas sesuai selera' },
          { name: 'Bawang merah, iris tipis', amount: 2, unit: 'butir', notes: 'Iris mentah' },
          { name: 'Air perasan jeruk limau / nipis', amount: 1, unit: 'sdt', notes: 'Penyegar sambal kecap' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Meracik Bumbu Halus Mendoan',
        instruction: 'Ulek bawang putih, bawang merah, ketumbar sangrai, kencur, kunyit, dan garam hingga benar-benar halus dan beraroma wangi herba.',
        timerMinutes: 5,
        tip: 'Kencur sedikit saja, cukup untuk memberikan aroma semilir tanpa mendominasi rasa ketumbar.'
      },
      {
        stepNumber: 2,
        title: 'Membuat Adonan Tepung Daun Bawang',
        instruction: 'Campurkan tepung terigu, tepung beras, dan bumbu halus ke dalam mangkuk. Tuang air dingin secara bertahap sambil diaduk dengan whisk hingga tercampur licin tanpa gumpalan. Masukkan irisan daun bawang melimpah, aduk rata.',
        timerMinutes: 5,
        tip: 'Kekentalan adonan harus pas (tidak terlalu encer dan tidak terlalu padat) agar menempel tipis merata pada tempe.'
      },
      {
        stepNumber: 3,
        title: 'Mencelup Tempe ke Adonan',
        instruction: 'Buka bungkus daun tempe mendoan. Celupkan lembaran tempe ke dalam adonan tepung hingga seluruh permukaan tertutup lapisan bumbu dan daun bawang.',
        timerMinutes: 2,
        tip: 'Gunakan tempe tipis khusus mendoan; jika menggunakan tempe balok biasa, iris setipis mungkin sekitar 3–4 mm.'
      },
      {
        stepNumber: 4,
        title: 'Menggoreng Kilat Setengah Matang',
        instruction: 'Panaskan minyak banyak dalam wajan hingga benar-benar panas. Masukkan tempe mendoan satu per satu. Goreng selama 1 menit, balik sekali saja, lalu masak sisi baliknya selama 1 menit. Angkat segera saat tepung sudah matang namun masih lembut basah dan belum berwarna cokelat.',
        timerMinutes: 3,
        tip: 'Jangan goreng terlalu lama! Inti dari mendoan adalah tepung yang masih empuk dan berair di dalam.'
      },
      {
        stepNumber: 5,
        title: 'Meracik Sambal Kecap & Santap Hangat',
        instruction: 'Campur kecap manis kental, irisan cabai rawit, bawang merah iris, dan perasan jeruk limau dalam mangkuk kecil. Tata mendoan panas di atas piring beralas daun pisang. Nikmati selagi panas mengepul dengan cara mencocolkannya ke sambal kecap.',
        timerMinutes: 2,
        tip: 'Mendoan paling lezat disantap dalam rentang 15 menit setelah diangkat dari wajan penggorengan.'
      }
    ],
    cookingTips: [
      'Gunakan minyak yang banyak (deep fry) agar tempe langsung terapung mengembang seketika saat dimasukkan.',
      'Air dingin es membuat adonan tepung tetap lembut di dalam dengan sedikit renyah di pinggiran saat terkena minyak mendidih.'
    ],
    commonMistakes: [
      'Menggoreng terlalu lama hingga kering cokelat: ini mengubah mendoan menjadi tempe goreng tepung biasa dan menghilangkan sensasi "mendo".',
      'Minyak belum cukup panas saat tempe dimasukkan: membuat tempe menyerap terlalu banyak minyak dan terasa enek.'
    ],
    substitutions: [
      { ingredient: 'Tempe Mendoan Khusus', substitute: 'Tempe papan kedelai diiris tipis lebar melebar' },
      { ingredient: 'Tepung Beras', substitute: 'Tepung maizena 1 sdm untuk kelenturan' }
    ],
    servingSuggestions: 'Sangat nikmat dinikmati di tengah udara sejuk sore hari bersama secangkir teh poci gula batu atau wedang jahe.',
    nutrition: {
      calories: '185 kkal',
      protein: '9 g',
      carbs: '16 g',
      fat: '10 g',
      note: 'Per 1 lembar mendoan basah.'
    },
    relatedRecipeIds: ['lumpia-semarang', 'garang-asem-kudus', 'soto-kudus'],
    legendaryRestaurantIds: ['mendoan-echo-banyumas', 'warung-megono-pak-bon-pekalongan']
  },
  {
    id: 'selat-solo',
    slug: 'selat-solo',
    name: 'Selat Solo Daging Sapi Bestik',
    javaneseName: 'Selat Solo Bestik Ningrat',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Makan Utama / Jamuan Ningrat',
    cookingDuration: '60 Menit',
    prepTime: '25 Menit',
    cookTime: '35 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['manis', 'segar', 'gurih'],
    budgetCategory: 'Menengah ke Atas',
    estimatedCost: 'Rp 65.000 – Rp 90.000',
    image: '/assets/images/recipes/selat-solo.jpg',
    intro: 'Selat Solo adalah bukti elegannya akulturasi kuliner Eropa (Dutch steak/salade) dengan selera ningrat Keraton Surakarta. Potongan daging sapi empuk dimasak dalam kuah bistik encer berempah pala dan kecap manis, disajikan artistik bersama kentang goreng renyah, buncis, wortel rebus, telur pindang, dan saus mustar Jawa kekuningan yang segar.',
    history: 'Pada era kolonial Hindia Belanda, para priyayi dan bangsawan Mangkunegaran bergaul erat dengan pejabat Belanda. Sajian salad dan steak daging sapi ala barat diadaptasi ke lidah Jawa dengan menambahkan kuah encer yang kaya pala, kecap manis lokal, serta mayones kuning berbahan kuning telur dan cuka apel yang disebut mustar Jawa.',
    culturalBackground: 'Nama "Selat" berasal dari serapan kata Belanda "slacht" (daging potong) atau "salade" (salad). Di Solo, hidangan ini disajikan di atas piring porselen bermotif bunga klasik peninggalan era keemasan Mangkunegaran.',
    interestingFacts: [
      'Meskipun terinspirasi dari salad steak barat, Selat Solo disajikan dengan kuah encer manis segar berlimpah yang diseruput hangat.',
      'Saus mustar Solo dibuat secara tradisional dari kuning telur rebus yang dihaluskan bersama margarin, cuka, mustard, dan sedikit gula.',
      'Sayuran seperti buncis dan wortel dipotong seragam seukuran korek api besar dan direbus dengan garam agar tetap berwarna cerah berkilau.'
    ],
    regionalVariations: 'Terdapat variasi Selat Galantin yang menggunakan rolade daging cincang giling sebagai pengganti bistik daging sapi utuh.',
    equipment: ['Wajan bistik / saute pan', 'Panci kuah kaldu', 'Pisau dapur tajam', 'Piring porselen ceper'],
    ingredientGroups: [
      {
        name: 'Bahan Daging & Kuah Bistik',
        items: [
          { name: 'Daging sapi has dalam (tenderloin/sirloin)', amount: 400, unit: 'gram', notes: 'Potong melebar tebal 1,5 cm' },
          { name: 'Kecap manis premium Jawa', amount: 5, unit: 'sdm', notes: 'Kunci warna cokelat mengilap' },
          { name: 'Bawang bombay, iris tipis', amount: 1, unit: 'buah', notes: 'Tumisan kuah' },
          { name: 'Bawang putih cincang halus', amount: 5, unit: 'siung', notes: 'Bumbu tumis' },
          { name: 'Pala bubuk', amount: 0.5, unit: 'sdt', notes: 'Aroma khas bistik kolonial' },
          { name: 'Merica putih bubuk', amount: 1, unit: 'sdt', notes: 'Kehangatan rasa' },
          { name: 'Cengkih utuh', amount: 2, unit: 'butir', notes: 'Aroma wangi' },
          { name: 'Air kaldu sapi', amount: 600, unit: 'ml', notes: 'Kuah encer gurih' },
          { name: 'Margarin / mentega untuk menumis', amount: 2, unit: 'sdm', notes: 'Aroma gurih' }
        ]
      },
      {
        name: 'Sayuran & Telur Pelengkap',
        items: [
          { name: 'Kentang, potong korek tebal lalu goreng renyah', amount: 2, unit: 'buah', notes: 'Goreng keemasan' },
          { name: 'Wortel, potong korek lalu rebus sebentar', amount: 2, unit: 'buah', notes: 'Tiriskan segera' },
          { name: 'Buncis muda, potong 5 cm lalu rebus', amount: 100, unit: 'gram', notes: 'Tetap renyah hijau' },
          { name: 'Daun selada keriting segar', amount: 6, unit: 'lembar', notes: 'Cuci bersih tiriskan' },
          { name: 'Telur rebus bacem / kecap, belah 2', amount: 4, unit: 'butir', notes: 'Warna cokelat cantik' },
          { name: 'Acar mentimun & bawang merah kecil', amount: 3, unit: 'sdm', notes: 'Kesegaran asam renyah' }
        ]
      },
      {
        name: 'Saus Mustar Jawa Tradisional',
        items: [
          { name: 'Kuning telur rebus, haluskan lembut', amount: 2, unit: 'butir', notes: 'Dasar saus kental' },
          { name: 'Margarin leleh', amount: 1, unit: 'sdm', notes: 'Emulsi lembut' },
          { name: 'Mustard bubuk / pasta', amount: 1, unit: 'sdt', notes: 'Sentuhan getir asam' },
          { name: 'Air perasan jeruk nipis / cuka masak', amount: 1, unit: 'sdt', notes: 'Keasaman segar' },
          { name: 'Gula pasir & sedikit garam', amount: 1, unit: 'sdt', notes: 'Larutkan' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Membuat Saus Mustar Jawa',
        instruction: 'Dalam mangkuk kecil, campurkan kuning telur rebus yang sudah dihaluskan saring dengan margarin leleh, mustard pasta, perasan jeruk nipis, gula, dan sedikit garam. Aduk cepat hingga menjadi saus kuning kental yang lembut mengilap. Simpan di wadah tertutup.',
        timerMinutes: 8,
        tip: 'Saring kuning telur rebus dengan saringan kawat agar saus benar-benar lembut seperti vla tanpa butiran kasar.'
      },
      {
        stepNumber: 2,
        title: 'Menumis Daging Bistik',
        instruction: 'Lumuri potongan daging sapi dengan sedikit merica dan garam. Panaskan 2 sdm margarin di wajan bistik. Masukkan potongan daging, masak dengan api sedang hingga kedua sisinya berubah warna kecokelatan dan mengunci sari daging (searing). Angkat daging tiriskan.',
        timerMinutes: 7,
        tip: 'Jangan tusuk-tusuk daging saat dimasak agar sari kaldu alami di dalam daging tidak keluar.'
      },
      {
        stepNumber: 3,
        title: 'Memasak Kuah Bistik Pala Segar',
        instruction: 'Di wajan yang sama, tumis bawang bombay dan bawang putih cincang hingga layu harum keemasan. Masukkan kembali daging sapi. Tuang kecap manis, pala bubuk, cengkih, dan merica. Aduk rata hingga daging terbalut kecap karamel. Tuang air kaldu sapi. Masak dengan api kecil hingga daging empuk dan kuah meresap manis berempah.',
        timerMinutes: 20,
        tip: 'Kuah selat solo harus tetap encer dan bening kecokelatan, tidak kental seperti kuah rendang.'
      },
      {
        stepNumber: 4,
        title: 'Menyiapkan Sayuran Rebus',
        instruction: 'Didihkan air dengan sedikit garam. Rebus potongan wortel selama 3 menit dan buncis selama 2 menit. Angkat dan segera rendam di air es selama 1 menit agar proses pematangan berhenti dan warnanya tetap cerah renyah. Goreng potongan kentang hingga krispi keemasan.',
        timerMinutes: 10,
        tip: 'Mengejutkan sayuran dengan air es adalah rahasia dapur restoran agar selada dan wortel tetap renyah.'
      },
      {
        stepNumber: 5,
        title: 'Penataan Cantik di Piring Saji',
        instruction: 'Bentangkan selembar daun selada segar di atas piring porselen. Tata rapi potongan buncis, wortel rebus, kentang goreng krispi, dan separuh telur rebus. Letakkan irisan bistik daging sapi di tengah. Siramkan kuah bistik hangat di sekeliling piring. Beri sesendok saus mustar kuning di atas selada dan taburi bawang merah goreng.',
        timerMinutes: 5,
        tip: 'Sajikan segera saat kuah bistik masih hangat agar kontras dengan dinginnya saus mustar.'
      }
    ],
    cookingTips: [
      'Gunakan daging bagian has dalam agar empuk dalam waktu singkat tanpa perlu dipresto.',
      'Kecap manis Jawa Tengah memiliki karakter pekat dengan aroma gula kelapa yang tidak terlalu asam.'
    ],
    commonMistakes: [
      'Membuat kuah terlalu kental dengan tepung maizena berlebihan: Selat Solo otentik berkuah encer segar layaknya consomme.',
      'Merebus sayuran terlalu lama hingga lembek dan layu kehitaman.'
    ],
    substitutions: [
      { ingredient: 'Daging Has Dalam', substitute: 'Rolade daging sapi giling (Galantin) atau tahu tempe bacem' },
      { ingredient: 'Mustard', substitute: 'Kuning telur rebus ditambah perasan jeruk nipis dan sedikit lada' }
    ],
    servingSuggestions: 'Sangat elegan disajikan sebagai menu santap siang keluarga atau jamuan perayaan dengan segelas Es Beras Kencur dingin.',
    nutrition: {
      calories: '420 kkal',
      protein: '32 g',
      carbs: '38 g',
      fat: '16 g',
      note: 'Per porsi lengkap dengan kentang dan telur.'
    },
    relatedRecipeIds: ['nasi-liwet-solo', 'sate-buntel-solo', 'tempe-bacem'],
    legendaryRestaurantIds: ['selat-solo-mbak-lies', 'toko-oen-semarang']
  },
  {
    id: 'tempe-bacem',
    slug: 'tempe-bacem',
    name: 'Tempe Bacem Legit Air Kelapa',
    javaneseName: 'Tempe Bacem Legi Klapa',
    regionId: 'surakarta',
    regionName: 'Surakarta / Jawa Tengah',
    mealType: 'Lauk Pendamping Tradisional',
    cookingDuration: '55 Menit',
    prepTime: '15 Menit',
    cookTime: '40 Menit',
    baseServings: 4,
    difficulty: 'Sangat Mudah',
    difficultyLevel: 'Pemula Ramah',
    flavorProfiles: ['manis', 'gurih'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 15.000 – Rp 25.000',
    image: '/assets/images/recipes/tempe-bacem.jpg',
    intro: 'Tempe Bacem adalah lambang kearifan pengawetan alami masyarakat Jawa kuno. Tempe kedelai padat direbus perlahan (ungkep) dalam rendaman air kelapa murni, sisiran gula kelapa nira tebal, ketumbar sangrai, lengkuas memar, dan daun salam hingga cairan menyusut mengilap dan bumbu karamel meresap sampai ke inti serat kedelai.',
    history: 'Teknik "bacem" telah dikenal sejak berabad-abad lampau di wilayah pedalaman Jawa. Menghadapi panen kedelai yang melimpah, masyarakat mengungkep tempe dalam larutan gula jawa pekat dan garam. Kandungan gula yang tinggi berfungsi sebagai pengawet alami sehingga tempe bisa bertahan berhari-hari tanpa lemari pendingin.',
    culturalBackground: 'Baceman mencerminkan filosofi hidup Jawa "alon-alon waton kelakon" (perlahan namun pasti). Memasak bacem tidak boleh tergesa-gesa; api harus dijaga kecil agar bumbu manis gula jawa tidak sekadar melapisi kulit luar melainkan meresap pekat ke pori-pori terdalam.',
    interestingFacts: [
      'Memasak bacem menggunakan air kelapa tua menghasilkan rasa manis gurih yang jauh lebih lembut dan gurih alami dibanding menggunakan air biasa.',
      'Setelah diungkep hingga kuah kering, tempe bacem bisa disantap langsung (bacem basah) atau digoreng kilat sebentar dengan api kecil untuk mendapatkan permukaan karamel mengilap.',
      'Sering dipasangkan dengan jadah ketan putih kenyal menjadi "Jadah Bacem" yang legendaris di lereng gunung.'
    ],
    regionalVariations: 'Di wilayah Banyumas dan Semarang, tempe bacem sering diberi tambahan sedikit asam jawa untuk menyeimbangkan rasa manis legitnya.',
    equipment: ['Wajan cekung tebal / kuali tanah liat', 'Cobek batu', 'Spatula kayu'],
    ingredientGroups: [
      {
        name: 'Bahan Utama',
        items: [
          { name: 'Tempe kedelai padat, potong tebal 2 cm', amount: 2, unit: 'papan', notes: 'Kerat silang tipis di permukaan agar bumbu lekas meresap' },
          { name: 'Air kelapa murni (kelapa tua)', amount: 800, unit: 'ml', notes: 'Kunci rasa manis gurih alami yang legit' },
          { name: 'Gula merah kelapa asli (gula jawa), sisir halus', amount: 120, unit: 'gram', notes: 'Gunakan gula berwarna cokelat gelap' },
          { name: 'Kecap manis kental', amount: 2, unit: 'sdm', notes: 'Pemberi kilau karamel' },
          { name: 'Air asam jawa kental', amount: 1, unit: 'sdm', notes: 'Dari 1 sdt asam jawa dilarutkan 2 sdm air hangat' },
          { name: 'Daun salam segar', amount: 4, unit: 'lembar', notes: 'Aroma wangi herba' },
          { name: 'Lengkuas, memarkan', amount: 4, unit: 'cm', notes: 'Cuci bersih' }
        ]
      },
      {
        name: 'Bumbu Halus Ungkep',
        items: [
          { name: 'Bawang merah lokal', amount: 8, unit: 'butir', notes: 'Ulek halus' },
          { name: 'Bawang putih', amount: 5, unit: 'siung', notes: 'Ulek halus' },
          { name: 'Ketumbar butiran sangrai', amount: 1.5, unit: 'sdm', notes: 'Kunci wangi bacem Jawa' },
          { name: 'Kemiri sangrai', amount: 3, unit: 'butir', notes: 'Gurih penyeimbang' },
          { name: 'Garam laut', amount: 1.5, unit: 'sdt', notes: 'Penyatu rasa' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mempersiapkan Tempe & Bumbu',
        instruction: 'Potong tempe ketebalan 2 cm. Kerat sedikit bagian permukaannya dengan pisau. Ulek bawang merah, bawang putih, ketumbar sangrai, kemiri, dan garam hingga halus lembut.',
        timerMinutes: 8,
        tip: 'Potongan tempe jangan terlalu tipis agar tidak hancur saat diungkep lama.'
      },
      {
        stepNumber: 2,
        title: 'Menata di Panci / Wajan',
        instruction: 'Tata daun salam dan lengkuas memar di dasar wajan. Susun potongan tempe berdampingan secara rapi di atasnya. Balurkan bumbu halus ke seluruh permukaan tempe.',
        timerMinutes: 5,
        tip: 'Menata daun salam di dasar mencegah tempe lengket dan gosong saat kuah gula mulai mengental.'
      },
      {
        stepNumber: 3,
        title: 'Menuang Air Kelapa & Gula Jawa',
        instruction: 'Tuang air kelapa murni hingga tempe terendam rata. Masukkan sisiran gula merah, kecap manis, dan air asam jawa. Aduk perlahan agar gula larut tanpa merusak susunan tempe.',
        timerMinutes: 4,
        tip: 'Gula merah yang berkualitas baik berwarna gelap alami dan tidak berbintik gula pasir putih.'
      },
      {
        stepNumber: 4,
        title: 'Mengungkep dengan Api Kecil (Simmer)',
        instruction: 'Masak dengan api sedang hingga air mendidih. Setelah mendidih, kecilkan api seminimal mungkin dan tutup wajan rapat. Masak perlahan selama 35–40 menit hingga air kelapa menyusut hampir habis dan menghasilkan kuah karamel cokelat kental mengilap.',
        timerMinutes: 40,
        tip: 'Balik tempe sekali saja saat kuah tinggal separuh agar warna cokelat karamel merata di kedua sisi.'
      },
      {
        stepNumber: 5,
        title: 'Pilihan Menggoreng Kilat & Sajian',
        instruction: 'Tempe bacem basah sudah lezat disantap langsung. Jika ingin lapisan luar yang renyah berkilap karamel, panaskan sedikit minyak dengan api kecil, lalu goreng tempe bacem selama 30–45 detik saja per sisi. Angkat dan sajikan bersama cabai rawit hijau segar.',
        timerMinutes: 3,
        tip: 'Hati-hati saat menggoreng; kandungan gula tinggi membuat bacem sangat cepat gosong jika minyak terlalu panas.'
      }
    ],
    cookingTips: [
      'Air kelapa muda bisa digunakan, namun air kelapa dari buah kelapa yang tua memberikan rasa manis alami yang lebih gurih pekat.',
      'Bacem yang didiamkan semalaman di suhu ruang tertutup akan terasa jauh lebih legit karena bumbu semakin meresap ke dalam kedelai.'
    ],
    commonMistakes: [
      'Menggunakan api besar: air cepat menguap sebelum bumbu sempat meresap ke dalam tempe, mengakibatkan luar manis dalam hambar.',
      'Menggoreng terlalu lama di minyak panas hingga gula menjadi hitam gosong dan berasa pahit.'
    ],
    substitutions: [
      { ingredient: 'Air Kelapa', substitute: 'Air matang ditambah 1 lembar daun pandan dan ekstra 30 gram gula jawa' },
      { ingredient: 'Tempe', substitute: 'Tahu putih padat (tahu kedelai cina) atau telur puyuh rebus' }
    ],
    servingSuggestions: 'Sempurna sebagai lauk pendamping Nasi Liwet, Sayur Lodeh, Soto Kudus, atau dimakan langsung bersama cabai rawit ceplusan.',
    nutrition: {
      calories: '160 kkal',
      protein: '11 g',
      carbs: '18 g',
      fat: '6 g',
      note: 'Per 2 potong tempe bacem ukuran sedang.'
    },
    relatedRecipeIds: ['nasi-liwet-solo', 'selat-solo', 'mendoan-banyumas'],
    legendaryRestaurantIds: ['nasi-liwet-wongso-lemu-solo', 'toko-oen-semarang']
  },
  {
    id: 'nasi-megono-pekalongan',
    slug: 'nasi-megono-pekalongan',
    name: 'Nasi Megono Pekalongan Kecombrang',
    javaneseName: 'Sega Megono Pekalongan',
    regionId: 'pekalongan',
    regionName: 'Pekalongan',
    mealType: 'Makan Utama / Sarapan Pesisir',
    cookingDuration: '45 Menit',
    prepTime: '20 Menit',
    cookTime: '25 Menit',
    baseServings: 4,
    difficulty: 'Mudah',
    difficultyLevel: 'Pemula Ramah',
    flavorProfiles: ['kaya-rempah', 'gurih', 'pedas'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 20.000 – Rp 35.000',
    image: '/assets/images/recipes/megono.jpg',
    intro: 'Nasi Megono adalah mahakarya kuliner rakyat pesisir Pekalongan yang sangat bersahaja namun kaya rasa. Nangka muda dicacah sangat halus, dicampur parutan kelapa berbumbu kencur, terasi bakar, ketumbar, dan irisan wangi bunga kecombrang (honje) segar, lalu dikukus hingga lembut gurih. Disajikan hangat di atas nasi putih bersama tempe mendoan panas.',
    history: 'Tradisi megono tercatat telah ada sejak era perang Mataram Islam di pesisir utara Jawa. Para prajurit membutuhkan bekal makanan yang tahan lama, bergizi, dan mengenyangkan. Nangka muda yang melimpah dipadukan dengan parutan kelapa berbumbu rempah kuat sehingga tidak mudah basi di perjalanan.',
    culturalBackground: 'Di Pekalongan, Nasi Megono adalah menu sarapan sejuta umat. Di setiap sudut gang kota batik, warung megono buka sejak subuh menyajikan bungkusan nasi megono daun pisang yang mengepul hangat.',
    interestingFacts: [
      'Bunga kecombrang memberikan aroma citrus-floral yang khas dan berfungsi sebagai pengawet nabati alami.',
      'Nangka muda dicacah menggunakan pisau tajam hingga berukuran sebesar butiran beras (bukan dipotong dadu besar seperti gudeg).',
      'Lauk pendamping wajib megono adalah tempe mendoan lebar, cumi masak hitam pekalongan, dan ikan asin layur renyah.'
    ],
    regionalVariations: 'Di Batang dan Pemalang terdapat variasi megono dengan tambahan rebung cincang atau daun melinjo muda.',
    equipment: ['Panci kukusan', 'Talenan & pisau cincang tajam', 'Cobek ulekan'],
    ingredientGroups: [
      {
        name: 'Bahan Utama Sayur Megono',
        items: [
          { name: 'Nangka muda (gori), cacah sangat halus', amount: 500, unit: 'gram', notes: 'Rebus sebentar dan peras air getahnya' },
          { name: 'Bunga kecombrang (honje) segar, iris halus', amount: 1, unit: 'kuntum', notes: 'Jiwa aroma Megono Pekalongan' },
          { name: 'Kelapa parut setengah tua, kupas kulit arinya', amount: 200, unit: 'gram', notes: 'Gunakan kelapa sedang agar gurih lembut' },
          { name: 'Daun salam segar', amount: 3, unit: 'lembar', notes: 'Aroma wangi' },
          { name: 'Lengkuas, memarkan', amount: 3, unit: 'cm', notes: 'Cuci bersih' },
          { name: 'Serai bagian putih, memarkan', amount: 2, unit: 'batang', notes: 'Aroma sitrun' }
        ]
      },
      {
        name: 'Bumbu Halus Ulek',
        items: [
          { name: 'Bawang merah', amount: 7, unit: 'butir', notes: 'Ulek' },
          { name: 'Bawang putih', amount: 4, unit: 'siung', notes: 'Ulek' },
          { name: 'Cabai merah keriting', amount: 5, unit: 'buah', notes: 'Beri warna' },
          { name: 'Cabai rawit merah', amount: 6, unit: 'buah', notes: 'Pedas selera' },
          { name: 'Kencur segar', amount: 2, unit: 'cm', notes: 'Aroma kunci' },
          { name: 'Ketumbar sangrai', amount: 1, unit: 'sdt', notes: 'Ulek halus' },
          { name: 'Terasi bakar', amount: 1, unit: 'sdt', notes: 'Umami gurih' },
          { name: 'Gula merah sisir & garam', amount: 1.5, unit: 'sdm', notes: 'Penyeimbang rasa' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mencacah Halus Nangka Muda',
        instruction: 'Kupas nangka muda, lumuri tangan dengan sedikit minyak agar getah tidak lengket. Cacah nangka muda dengan pisau tajam hingga menjadi serpihan halus seukuran butiran jagung atau beras. Cuci bersih dan peras airnya.',
        timerMinutes: 10,
        tip: 'Mencacah halus adalah kunci tekstur megono yang pulen menyatu saat diaduk dengan nasi hangat.'
      },
      {
        stepNumber: 2,
        title: 'Mengulek Bumbu Halus',
        instruction: 'Ulek bawang merah, bawang putih, cabai, kencur, ketumbar sangrai, terasi bakar, gula merah, dan garam hingga halus merata.',
        timerMinutes: 6,
        tip: 'Terasi yang dibakar terlebih dahulu mengeluarkan aroma gurih asap yang sangat khas pesisir.'
      },
      {
        stepNumber: 3,
        title: 'Mencampur Nangka, Bumbu, & Kecombrang',
        instruction: 'Dalam wadah mangkuk besar, campurkan cacahan nangka muda, kelapa parut, bumbu halus, dan irisan halus bunga kecombrang. Remas-remas perlahan dengan sarung tangan hingga bumbu merata ke seluruh nangka.',
        timerMinutes: 5,
        tip: 'Pastikan bumbu menyatu merata sebelum dikukus agar kematangan dan kelezatan rempah konsisten.'
      },
      {
        stepNumber: 4,
        title: 'Mengukus Hingga Tanak & Harum',
        instruction: 'Siapkan dandang kukusan yang airnya sudah mendidih. Beri alas daun pisang pada sarangan, lalu masukkan daun salam, lengkuas, serai, dan campuran megono di atasnya. Kukus selama 25 menit hingga nangka empuk dan kelapa matang tanak.',
        timerMinutes: 25,
        tip: 'Kelapa parut yang dikukus matang tanak tidak akan mudah basi dan tahan seharian di suhu ruang.'
      },
      {
        stepNumber: 5,
        title: 'Menyajikan Nasi Megono Hangat',
        instruction: 'Tata nasi putih panas di atas piring atau pincuk daun pisang. Beri topping sayur megono kecombrang melimpah. Sajikan berdampingan dengan tempe mendoan goreng panas dan sambal terasi.',
        timerMinutes: 2,
        tip: 'Aduk megono bersama nasi putih hangat selagi masih berasap untuk sensasi kenikmatan maksimal.'
      }
    ],
    cookingTips: [
      'Pilih bunga kecombrang yang kuncupnya masih rapat segar dan berwarna merah muda merona untuk aroma terbaik.',
      'Sisa sayur megono bisa ditumis sebentar dengan sedikit minyak keesokan harinya untuk sarapan praktis.'
    ],
    commonMistakes: [
      'Memotong nangka terlalu besar: membuat hidangan menyerupai sayur lodeh kering bukan megono Pekalongan.',
      'Menggunakan kelapa terlalu tua yang membuat tekstur menjadi kasar dan berserat di lidah.'
    ],
    substitutions: [
      { ingredient: 'Bunga Kecombrang', substitute: 'Daun jeruk purut iris tipis ditambah perasan jeruk nipis' },
      { ingredient: 'Nangka Muda', substitute: 'Pepaya muda serut cincang' }
    ],
    servingSuggestions: 'Sangat nikmat dinikmati saat sarapan pagi bersama tempe mendoan panas, cumi asin hitam, dan teh melati hangat.',
    nutrition: {
      calories: '210 kkal',
      protein: '6 g',
      carbs: '24 g',
      fat: '11 g',
      note: 'Per porsi porsi sayur megono tanpa nasi putih.'
    },
    relatedRecipeIds: ['mendoan-banyumas', 'garang-asem-kudus', 'soto-kudus'],
    legendaryRestaurantIds: ['warung-megono-pak-bon-pekalongan', 'mendoan-echo-banyumas']
  },
  {
    id: 'sate-buntel-solo',
    slug: 'sate-buntel-solo',
    name: 'Sate Buntel Kambing Khas Solo',
    javaneseName: 'Sate Buntel Wedhus Solo',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Makan Utama / Kuliner Malam',
    cookingDuration: '50 Menit',
    prepTime: '25 Menit',
    cookTime: '25 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['kaya-rempah', 'manis', 'gurih'],
    budgetCategory: 'Menengah ke Atas',
    estimatedCost: 'Rp 65.000 – Rp 95.000',
    image: '/assets/images/recipes/sate-buntel.jpg',
    intro: 'Sate Buntel Solo adalah kreasi kuliner sate daging kambing cincang berbumbu rempah pekat yang dibalut (dibuntel) dengan lembaran lemak tipis jala kambing, lalu dibakar di atas arang batok kelapa sambil diolesi kecap manis berempah. Dagingnya lumer juicy dengan aroma asap manis yang menggoda selera.',
    history: 'Diciptakan pertama kali oleh Pak Min di kawasan Tambaksegaran Solo sekitar tahun 1948. Karena banyak orang tua dan bangsawan sepuh yang kesulitan mengunyah sate kambing tusuk biasa yang kenyal, terciptalah inovasi mencincang daging kambing muda lalu membuntelnya dengan lemak tipis agar tetap empuk dan tidak kering saat dibakar.',
    culturalBackground: 'Kawasan Pasar Kliwon dan Laweyan di Surakarta menjadi pusat pengolahan daging kambing paling terkemuka di Jawa Tengah dengan teknik marinasi rempah tanpa aroma prengus.',
    interestingFacts: [
      'Lemak pembungkus (lemur) berfungsi melindungi sari kaldu daging cincang agar tidak menetes keluar saat dibakar.',
      'Bumbu marinasinya kaya akan ketumbar sangrai, bawang merah, jintan, dan kecap manis kental khas Solo.',
      'Disajikan bersama irisan kol mentah renyah, tomat merah segar, bawang merah mentah utuh, dan cabai rawit ceplusan.'
    ],
    regionalVariations: 'Di Yogyakarta dan Tegal sate kambing disajikan dalam bentuk potongan dadu polos (klathak atau batibul), sedangkan Solo khas dengan sate buntel cincang berempah tebal.',
    equipment: ['Tusuk sate bambu tebal/lebar', 'Panggangan arang batok kelapa', 'Kuas olesan bumbu', 'Food processor / pisau cincang'],
    ingredientGroups: [
      {
        name: 'Bahan Daging & Lemak Pembungkus',
        items: [
          { name: 'Daging kambing muda, cincang halus', amount: 500, unit: 'gram', notes: 'Bisa campur sedikit lemak daging' },
          { name: 'Lemak jala perut kambing tipis (caul fat)', amount: 200, unit: 'gram', notes: 'Untuk membungkus adonan sate' },
          { name: 'Tusuk sate bambu lebar', amount: 8, unit: 'batang', notes: 'Gunakan tusuk pipih kokoh' }
        ]
      },
      {
        name: 'Bumbu Halus Marinasi Daging',
        items: [
          { name: 'Bawang merah lokal', amount: 8, unit: 'butir', notes: 'Ulek' },
          { name: 'Bawang putih', amount: 5, unit: 'siung', notes: 'Ulek' },
          { name: 'Ketumbar sangrai', amount: 1.5, unit: 'sdm', notes: 'Aroma wangi penghilang prengus' },
          { name: 'Jintan sangrai', amount: 0.5, unit: 'sdt', notes: 'Rempah hangat' },
          { name: 'Jahe segar', amount: 2, unit: 'cm', notes: 'Penghangat rasa' },
          { name: 'Kecap manis premium Solo', amount: 4, unit: 'sdm', notes: 'Marinasi manis' },
          { name: 'Garam & merica bubuk', amount: 1, unit: 'sdt', notes: 'Sesuaikan rasa' }
        ]
      },
      {
        name: 'Olesan Bakar & Pelengkap Segar',
        items: [
          { name: 'Kecap manis untuk olesan bakar', amount: 5, unit: 'sdm', notes: 'Campur 1 sdm minyak kelapa' },
          { name: 'Kol putih segar, iris kasar', amount: 150, unit: 'gram', notes: 'Lalapan renyah' },
          { name: 'Tomat merah segar, potong juring', amount: 2, unit: 'buah', notes: 'Penyegar rasa' },
          { name: 'Bawang merah iris & cabai rawit hijau', amount: 3, unit: 'sdm', notes: 'Ceplusan pedas' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Mencincang & Membumbui Daging',
        instruction: 'Cincang daging kambing hingga halus. Campurkan dengan bumbu halus (bawang merah, bawang putih, ketumbar, jintan, jahe, garam, merica) dan kecap manis. Aduk uleni adonan dengan tangan hingga bumbu tercampur rata dan adonan menjadi liat menyatu.',
        timerMinutes: 12,
        tip: 'Diamkan adonan selama 15 menit agar rempah meresap ke dalam pori-pori daging cincang.'
      },
      {
        stepNumber: 2,
        title: 'Mengepal & Membuntel Adonan',
        instruction: 'Ambil segenggam adonan daging (sekitar 70-80 gram), kepalkan memanjang menempel pada tusuk sate bambu lebar. Bungkus rapat adonan daging dengan selembar lemak jala kambing tipis hingga seluruh permukaan tertutup rapi.',
        timerMinutes: 10,
        tip: 'Lemak jala akan mencair saat dibakar dan mengunci sari pati kaldu daging di dalam.'
      },
      {
        stepNumber: 3,
        title: 'Mempersiapkan Bara Arang',
        instruction: 'Nyalakan arang batok kelapa hingga membara merah merata tanpa lidah api menyala. Kipas abu putih di permukaan bara.',
        timerMinutes: 8,
        tip: 'Gunakan arang batok kelapa karena panasnya stabil dan memberikan aroma asap yang harum manis.'
      },
      {
        stepNumber: 4,
        title: 'Membakar Sate Buntel & Olesan Karamel',
        instruction: 'Letakkan sate buntel di atas panggangan bara. Bakar sambil dibalik sesekali hingga lemak pembungkus mulai menciut dan berubah warna kecokelatan. Oleskan campuran kecap manis berulang kali di kedua sisi hingga terbentuk lapisan karamel mengilap dan daging matang sempurna ke bagian dalam.',
        timerMinutes: 15,
        tip: 'Tusuk-tusuk sedikit permukaan lemak dengan lidi saat dibakar agar minyak berlebih mengalir keluar.'
      },
      {
        stepNumber: 5,
        title: 'Penyajian Hangat ala Solo',
        instruction: 'Sajikan sate buntel panas di atas piring bersama irisan kol putih renyah, potongan tomat merah segar, irisan bawang merah mentah, dan cabai rawit hijau. Guyur dengan sedikit kecap manis encer bertabur merica bubuk.',
        timerMinutes: 2,
        tip: 'Nikmati selagi masih mengepul hangat bersama sepiring nasi putih pulen.'
      }
    ],
    cookingTips: [
      'Daging kambing muda bagian paha atau punggung adalah pilihan terbaik karena seratnya halus dan tidak berbau tajam.',
      'Jika sulit mendapatkan lemak jala, adonan daging bisa dibungkus menggunakan daun pisang sebelum dibakar sebentar.'
    ],
    commonMistakes: [
      'Membakar di atas api menyala langsung: membuat lemak pembungkus hangus terbakar sementara bagian dalam masih mentah.',
      'Menggunakan tusuk sate bulat kecil yang membuat daging mudah berputar dan jatuh ke bara.'
    ],
    substitutions: [
      { ingredient: 'Daging Kambing', substitute: 'Daging sapi cincang (beef minced) dengan campuran sedikit lemak' },
      { ingredient: 'Lemak Jala', substitute: 'Kulit kembang tahu tipis basah' }
    ],
    servingSuggestions: 'Sangat nikmat disandingkan dengan kuah gulai kambing encer atau tengkleng kuah bening.',
    nutrition: {
      calories: '390 kkal',
      protein: '28 g',
      carbs: '14 g',
      fat: '26 g',
      note: 'Per 1 tusuk sate buntel ukuran besar.'
    },
    relatedRecipeIds: ['selat-solo', 'nasi-liwet-solo', 'tempe-bacem'],
    legendaryRestaurantIds: ['sate-kambing-pak-manto-solo', 'selat-solo-mbak-lies']
  },
  {
    id: 'tahu-gimbal-semarang',
    slug: 'tahu-gimbal-semarang',
    name: 'Tahu Gimbal Udang Semarang',
    javaneseName: 'Tahu Gimbal Pesisir Semarang',
    regionId: 'semarang',
    regionName: 'Semarang',
    mealType: 'Makan Siang / Santap Sore',
    cookingDuration: '35 Menit',
    prepTime: '20 Menit',
    cookTime: '15 Menit',
    baseServings: 4,
    difficulty: 'Mudah',
    difficultyLevel: 'Pemula Ramah',
    flavorProfiles: ['gurih', 'manis', 'pedas'],
    budgetCategory: 'Terjangkau',
    estimatedCost: 'Rp 30.000 – Rp 45.000',
    image: '/assets/images/recipes/tahu-gimbal.jpg',
    intro: 'Tahu Gimbal adalah sajian legendaris pesisir Semarang yang menyatukan potongan tahu goreng hangat, bakwan udang renyah berukuran lebar (gimbal udang), rajangan kubis segar, tauge seduh, dan lontong kenyal, lalu diguyur saus petis udang dan kacang tanah ulek beralaskan bawang putih tajam yang pekat gurih menggelora.',
    history: 'Kata "Gimbal" dalam bahasa Jawa Semarang merujuk pada bakwan udang goreng yang dibuat melebar berantakan menyerupai rambut gimbal, dengan udang tambak utuh di tengahnya. Menjadi makanan rakyat pesisir yang dipopulerkan di kawasan Simpang Lima dan Taman KB Semarang.',
    culturalBackground: 'Penggunaan petis udang khas pesisir utara membuktikan perpaduan erat cita rasa pesisir nelayan Jawa dengan tradisi bumbu kacang tanah gurih.',
    interestingFacts: [
      'Saus gimbal diulek langsung dadakan di atas cobek besar untuk setiap porsi yang dipesan pelanggan.',
      'Petis udang asli Semarang berwarna hitam kecokelatan pekat dengan aroma udang fermentasi yang harum legit dan tidak berbau amis.',
      'Kerupuk udang renyah yang dihancurkan di atas piring adalah sentuhan akhir yang menyempurnakan tekstur krispi hidangan ini.'
    ],
    regionalVariations: 'Berbeda dengan tahu kupat Solo atau Magelang yang memakai saus kecap cair encer, tahu gimbal Semarang menggunakan saus petis kacang ulek bertekstur kental pekat.',
    equipment: ['Cobek batu besar ulek dadakan', 'Wajan penggorengan', 'Sutil lebar'],
    ingredientGroups: [
      {
        name: 'Bahan Utama & Gimbal Udang',
        items: [
          { name: 'Tahu putih halus, goreng setengah kering lalu potong dadu', amount: 4, unit: 'kotak', notes: 'Goreng hangat' },
          { name: 'Udang basah segar, buang kotoran kepala', amount: 150, unit: 'gram', notes: 'Untuk bakwan gimbal' },
          { name: 'Tepung terigu protein sedang', amount: 100, unit: 'gram', notes: 'Adonan bakwan' },
          { name: 'Tepung beras', amount: 2, unit: 'sdm', notes: 'Pemberi kerenyahan bakwan' },
          { name: 'Lontong matang / ketupat, potong juring', amount: 2, unit: 'lonjor', notes: 'Alas karbohidrat' },
          { name: 'Kol / kubis putih, iris halus mentah', amount: 150, unit: 'gram', notes: 'Sayuran segar' },
          { name: 'Tauge seduh air panas', amount: 100, unit: 'gram', notes: 'Tiriskan' },
          { name: 'Telur ceplok matang / setengah matang', amount: 4, unit: 'butir', notes: 'Topping komplit' }
        ]
      },
      {
        name: 'Bumbu Saus Petis Kacang Dadakan',
        items: [
          { name: 'Kacang tanah goreng, ulek kasar', amount: 150, unit: 'gram', notes: 'Gurih kacang' },
          { name: 'Petis udang asli berkualitas', amount: 3, unit: 'sdm', notes: 'Kunci rasa pekat Semarang' },
          { name: 'Kecap manis premium', amount: 5, unit: 'sdm', notes: 'Manis legit' },
          { name: 'Bawang putih', amount: 4, unit: 'siung', notes: 'Ulek mentah segar' },
          { name: 'Cabai rawit merah & hijau', amount: 8, unit: 'buah', notes: 'Ulek sesuai tingkat pedas' },
          { name: 'Air asam jawa encer', amount: 4, unit: 'sdm', notes: 'Penyeimbang rasa' },
          { name: 'Air matang hangat', amount: 100, unit: 'ml', notes: 'Untuk melarutkan saus kental' },
          { name: 'Garam laut', amount: 1, unit: 'sdt', notes: 'Sesuaikan rasa' }
        ]
      }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Membuat Bakwan Gimbal Udang',
        instruction: 'Campur tepung terigu, tepung beras, 1 siung bawang putih halus, sedikit garam, dan air hingga menjadi adonan kental licin. Masukkan udang basah segar. Sendokkan adonan melebar ke dalam minyak panas, goreng hingga bakwan udang gimbal matang renyah kecokelatan. Tiriskan dan potong-potong kasar.',
        timerMinutes: 10,
        tip: 'Goreng adonan tipis melebar agar udang renyah dan bagian tepung tidak bantat.'
      },
      {
        stepNumber: 2,
        title: 'Menggoreng Tahu Putih',
        instruction: 'Goreng tahu putih dalam minyak panas hingga berkulit tipis keemasan namun bagian dalamnya tetap lembut dan basah. Angkat, tiriskan, dan potong dadu 2 cm.',
        timerMinutes: 6,
        tip: 'Jangan goreng tahu terlalu kering agar saus petis bisa meresap ke dalam pori-pori tahu.'
      },
      {
        stepNumber: 3,
        title: 'Mengulek Saus Petis Kacang Dadakan',
        instruction: 'Di atas cobek, ulek bawang putih, cabai rawit, dan garam hingga halus. Masukkan petis udang dan kacang tanah goreng tumbuk. Tuang air asam jawa, kecap manis, dan sedikit air hangat. Aduk ulek memutar hingga terbentuk saus petis kacang kental kecokelatan yang harum mengilap.',
        timerMinutes: 7,
        tip: 'Petis udang yang berkualitas akan larut lembut dan berbau gurih manis udang tanpa bau asam tengik.'
      },
      {
        stepNumber: 4,
        title: 'Meracik Komposisi di Piring',
        instruction: 'Tata potongan lontong kenyal di dasar piring. Beri potongan tahu goreng hangat, irisan bakwan gimbal udang renyah, irisan kubis segar, dan tauge seduh. Letakkan sebutir telur ceplok di sampingnya.',
        timerMinutes: 4,
        tip: 'Sayuran kol harus segar dan renyah untuk memberikan kontras tekstur dengan saus kental.'
      },
      {
        stepNumber: 5,
        title: 'Menyiram Saus Petis & Taburan Kerupuk',
        instruction: 'Guyurkan saus petis kacang melimpah ke atas susunan tahu gimbal. Taburi daun seledri cincang, bawang merah goreng, dan remasan kerupuk udang renyah. Santap segera selagi gimbal masih krispi.',
        timerMinutes: 2,
        tip: 'Aduk rata bumbu saus petis ke seluruh suapan untuk menikmati simfoni rasa pesisir Semarang.'
      }
    ],
    cookingTips: [
      'Petis udang lokal Semarang dapat ditemukan di pasar tradisional; pilih yang teksturnya legit hitam mengilap.',
      'Kacang tanah jangan diulek terlalu halus seperti selai; biarkan ada butiran kasar untuk sensasi gigitan nutty yang nikmat.'
    ],
    commonMistakes: [
      'Membuat saus terlalu encer sehingga tidak melekat pada potongan tahu dan gimbal udang.',
      'Menyiram saus terlalu lama sebelum dimakan: membuat gimbal udang menjadi lembek basah.'
    ],
    substitutions: [
      { ingredient: 'Petis Udang', substitute: 'Bisa dicampur petis ikan madura atau terasi sangrai berkualitas' },
      { ingredient: 'Lontong', substitute: 'Nasi putih hangat' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan bersama Es Teh Manis dingin atau Es Kelapa Muda di terik siang hari.',
    nutrition: {
      calories: '450 kkal',
      protein: '22 g',
      carbs: '52 g',
      fat: '18 g',
      note: 'Per porsi lengkap dengan lontong dan gimbal udang.'
    },
    relatedRecipeIds: ['lumpia-semarang', 'mendoan-banyumas', 'soto-kudus'],
    legendaryRestaurantIds: ['tahu-gimbal-pak-edy-semarang', 'toko-oen-semarang']
  },

  // 11. Gudeg Komplit Khas Jawa Tengah
  {
    id: 'gudeg-komplit',
    slug: 'gudeg-komplit',
    name: 'Gudeg Komplit Khas Jawa Tengah',
    javaneseName: 'Gudeg Nangka Kendhi',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Makan Utama / Tradisional',
    cookingDuration: '90 Menit',
    prepTime: '30 Menit',
    cookTime: '60 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['manis', 'gurih', 'kaya-rempah'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 55.000 – Rp 75.000',
    image: '/assets/images/recipes/gudeg-komplit.jpg',
    intro: 'Gudeg adalah mahakarya kuliner berbahan nangka muda yang diungkep perlahan bersama santan, gula kelapa asli, daun jati, dan rempah harum. Disajikan lengkap bersama areh santan gurih, telur bebek pindang, tahu bacem, dan sambal goreng krecek pedas.',
    history: 'Gudeg berakar dari abad ke-16 saat pembabatan Hutan Mentaok untuk Kerajaan Mataram Islam. Karena melimpahnya pohon nangka muda dan kelapa, para prajurit memasaknya bersamaan di dalam kuali tanah liat besar dengan api kayu bakar perlahan (hanggudeg).',
    culturalBackground: 'Di Solo dan berbagai penjuru Jawa Tengah, gudeg basah digemari karena kuah areh santannya yang melimpah dan tidak terlalu manis pekat, memberikan perpaduan rasa gurih manis yang seimbang dan nikmat disantap kapan saja.',
    interestingFacts: [
      'Warna cokelat kemerahan alami pada gudeg tradisional berasal dari daun jati muda (godhong jati) yang diletakkan di dasar kuali tanah liat.',
      'Proses memasak perlahan (slow cooking) membuat serat nangka muda empuk lumer seperti daging tanpa hancur.',
      'Areh kental santan gurih di bagian atas menjadi penyeimbang sempurna rasa manis legit nangka muda.'
    ],
    regionalVariations: 'Versi Jawa Tengah dan Solo lebih berkarakter basah (gudeg basah) dengan kuah santan gurih encer dan sambal goreng tolo, berbeda dari gudeg kering Yogyakarta yang dimasak hingga cairan menyusut pekat.',
    equipment: ['Kuali tanah liat (kendhi) atau panci tebal', 'Cobek batu & ulekan', 'Spatula kayu', 'Sendok sayur'],
    ingredientGroups: [
      {
        name: 'Bahan Utama Gudeg',
        items: [
          { name: 'Nangka muda (gori), cacah kasar', amount: 800, unit: 'gram', notes: 'Pilih nangka muda padat tanpa biji besar' },
          { name: 'Santan kelapa kental murni', amount: 800, unit: 'ml', notes: 'Perasan pertama kelapa tua' },
          { name: 'Air kelapa murni', amount: 500, unit: 'ml', notes: 'Membantu mempercepat empuk dan memberi manis alami' },
          { name: 'Telur bebek, rebus dan kupas', amount: 4, unit: 'butir', notes: 'Bisa diganti telur ayam' },
          { name: 'Gula merah kelapa sisir halus', amount: 150, unit: 'gram', notes: 'Gula kelapa asli warna cokelat gelap' },
          { name: 'Daun jati muda', amount: 4, unit: 'lembar', notes: 'Pewarna merah kecokelatan alami' },
          { name: 'Daun salam segar', amount: 5, unit: 'lembar', notes: 'Aroma harum khas' },
          { name: 'Lengkuas tua, memarkan', amount: 5, unit: 'cm', notes: 'Cuci bersih memarkan' }
        ]
      },
      {
        name: 'Bumbu Halus (Ulek)',
        items: [
          { name: 'Bawang merah lokal', amount: 10, unit: 'butir', notes: 'Kupas' },
          { name: 'Bawang putih', amount: 6, unit: 'siung', notes: 'Kupas' },
          { name: 'Kemiri sangrai', amount: 6, unit: 'butir', notes: 'Sangrai hingga harum berminyak' },
          { name: 'Ketumbar sangrai', amount: 1.5, unit: 'sdm', notes: 'Ulek halus' },
          { name: 'Garam laut', amount: 2, unit: 'sdt', notes: 'Sesuaikan selera' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Menata Daun Jati & Nangka di Kuali',
        instruction: 'Alasi dasar panci atau kendhi tanah liat dengan lembaran daun jati muda. Masukkan potongan nangka muda cacah, telur rebus kupas, lengkuas memar, dan daun salam segar.',
        timerMinutes: 10,
        tip: 'Daun jati di dasar kendhi juga mencegah nangka gosong saat diungkep lama.'
      },
      {
        stepNumber: 2,
        title: 'Mencampur Bumbu & Santan',
        instruction: 'Larutkan bumbu halus bersama gula kelapa sisir, air kelapa, dan santan. Tuang ke dalam panci hingga seluruh nangka dan telur terendam rata.',
        timerMinutes: 10,
        tip: 'Gunakan gula kelapa tua berkualitas untuk aroma wangi karamel yang sedap.'
      },
      {
        stepNumber: 3,
        title: 'Mengungkep Api Kecil (Slow Cooking)',
        instruction: 'Tutup panci rapat-rapat. Masak di atas api kecil sedang selama 60 hingga 75 menit hingga air menyusut, nangka empuk lembut, dan telur berubah warna cokelat eksotis.',
        timerMinutes: 60,
        tip: 'Jangan sering diaduk agar potongan nangka muda tidak hancur menjadi bubur.'
      },
      {
        stepNumber: 4,
        title: 'Penyajian dengan Areh Gurih & Krecek',
        instruction: 'Sajikan gudeg hangat di atas piring beralas daun pisang. Beri siraman kuah areh santan kental, sambal goreng krecek pedas, dan telur pindang potong dua.',
        timerMinutes: 10,
        tip: 'Gudeg justru semakin lezat jika diinapkan semalam karena bumbu rempahnya semakin meresap ke serat terdalam.'
      }
    ],
    cookingTips: [
      'Gunakan air kelapa asli saat merebus nangka untuk memperkaya rasa manis gurih tanpa rasa enek.',
      'Gunakan api lilin kecil saat cairan mulai menyusut agar dasar kendhi tidak berkerak gosong.'
    ],
    commonMistakes: [
      'Menggunakan nangka yang terlalu matang: rasa akan manis asam dan tekstur terlalu lembek.',
      'Memakai santan instan tanpa air kelapa: rasa kuah kurang dalam dan mudah basi.'
    ],
    substitutions: [
      { ingredient: 'Daun Jati', substitute: 'Bisa diganti kulit bawang merah atau seduhan teh pekat untuk rona cokelat' },
      { ingredient: 'Telur Bebek', substitute: 'Telur ayam kampung rebus' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan bersama nasi liwet hangat, opor ayam kampung, dan sambal krecek pedas.',
    nutrition: {
      calories: '420 kkal',
      protein: '18 g',
      carbs: '48 g',
      fat: '16 g',
      note: 'Per porsi komplit dengan telur pindang dan kuah areh.'
    },
    relatedRecipeIds: ['nasi-liwet-solo', 'tempe-bacem', 'selat-solo'],
    legendaryRestaurantIds: ['wongso-lemu-solo', 'toko-oen-semarang']
  },

  // 12. Nasi Gandul Asli Pati
  {
    id: 'nasi-gandul-pati',
    slug: 'nasi-gandul-pati',
    name: 'Nasi Gandul Asli Pati',
    javaneseName: 'Sego Gandul Pati',
    regionId: 'kudus',
    regionName: 'Pati',
    mealType: 'Makan Utama',
    cookingDuration: '60 Menit',
    prepTime: '20 Menit',
    cookTime: '40 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['gurih', 'manis', 'kaya-rempah'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 50.000 – Rp 70.000',
    image: '/assets/images/recipes/nasi-gandul.jpg',
    intro: 'Nasi Gandul adalah kuliner legendaris khas Desa Gajahmati, Pati. Nasi hangat beralas daun pisang disiram kuah merah kecokelatan gurih manis santan berempah, disajikan bersama irisan daging sapi empuk, lidah, atau babat bacem.',
    history: 'Dinamakan Gandul karena para penjual aslinya memikul dua bakul kuali di kanan-kiri yang bergelantungan (nggandul) menyusuri jalanan kota Pati menjajakan kuah kaldu rempah hangat.',
    culturalBackground: 'Tradisi makan nasi gandul menggunakan sendok dari daun pisang yang dilipat dua (disebut suru), memberikan aroma wangi khas yang menyatu dengan kehangatan kuah santan kaya rempah.',
    interestingFacts: [
      'Desa Gajahmati di Pati diakui sebagai desa asal muasal terciptanya racikan bumbu nasi gandul sejak awal abad ke-20.',
      'Kuah nasi gandul memiliki warna merah kecokelatan berkat pemakaian cabai merah, gula jawa, terasi udang, dan santan segar.',
      'Lauk pelengkap wajib adalah tempe goreng kering garing yang sangat renyah dan telur asin masir.'
    ],
    regionalVariations: 'Di pesisir Pati selatan sering ditambahkan irisan lidah sapi empuk dan paru bacem goreng kering.',
    equipment: ['Panci sup besar', 'Cobek batu & ulekan', 'Pisau daging tajam', 'Piring anyaman bambu'],
    ingredientGroups: [
      {
        name: 'Bahan Daging & Kuah',
        items: [
          { name: 'Daging sapi has luar / sengkel', amount: 500, unit: 'gram', notes: 'Potong dadu 3 cm' },
          { name: 'Santan kelapa segar sedang', amount: 1200, unit: 'ml', notes: 'Dari 1 butir kelapa parut' },
          { name: 'Kecap manis lokal Pati / Semarang', amount: 3, unit: 'sdm', notes: 'Kecap kental manis gurih' },
          { name: 'Gula merah kelapa', amount: 2, unit: 'sdm', notes: 'Sisir halus' },
          { name: 'Serai, memarkan', amount: 2, unit: 'batang', notes: 'Simpul' },
          { name: 'Daun salam segar', amount: 3, unit: 'lembar', notes: 'Robek tepi' },
          { name: 'Lengkuas, memarkan', amount: 3, unit: 'cm', notes: 'Cuci bersih' }
        ]
      },
      {
        name: 'Bumbu Halus (Ulek)',
        items: [
          { name: 'Bawang merah', amount: 8, unit: 'butir', notes: 'Kupas' },
          { name: 'Bawang putih', amount: 5, unit: 'siung', notes: 'Kupas' },
          { name: 'Cabai merah keriting', amount: 4, unit: 'buah', notes: 'Buang biji jika tak suka pedas' },
          { name: 'Kemiri sangrai', amount: 4, unit: 'butir', notes: 'Sangrai harum' },
          { name: 'Ketumbar sangrai', amount: 1, unit: 'sdt', notes: 'Haluskan' },
          { name: 'Jintan sangrai', amount: 0.25, unit: 'sdt', notes: 'Aroma khas' },
          { name: 'Terasi bakar', amount: 0.5, unit: 'sdt', notes: 'Kunci gurih nasi gandul' },
          { name: 'Kencur', amount: 1.5, unit: 'cm', notes: 'Segar' },
          { name: 'Garam', amount: 2, unit: 'sdt', notes: 'Secukupnya' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Merebus Daging & Membuat Kaldu',
        instruction: 'Rebus daging sapi dalam air mendidih bersama daun salam dan serai hingga empuk. Angkat daging, tiriskan lalu potong-potong melebar tipis. Sisihkan kaldu daging.',
        timerMinutes: 25,
        tip: 'Potong daging berlawanan arah serat agar teksturnya empuk saat digigit.'
      },
      {
        stepNumber: 2,
        title: 'Menumis Bumbu Halus Harum',
        instruction: 'Tumis bumbu halus bersama lengkuas dan daun salam hingga harum matang dan minyak kemerahan keluar. Masukkan potongan daging sapi, aduk rata hingga terselimuti bumbu.',
        timerMinutes: 8,
        tip: 'Pastikan bumbu benar-benar tanak agar kuah tidak berbau langu.'
      },
      {
        stepNumber: 3,
        title: 'Memasak Kuah Santan Gandul',
        instruction: 'Tuang santan kelapa dan sisa kaldu daging ke dalam tumisan. Bumbui dengan kecap manis dan gula kelapa. Masak dengan api sedang sambil sesekali diaduk perlahan agar santan tidak pecah.',
        timerMinutes: 20,
        tip: 'Gunakan api sedang cenderung kecil agar santan menyatu sempurna dengan kaldu daging.'
      },
      {
        stepNumber: 4,
        title: 'Penyajian dengan Daun Pisang & Suru',
        instruction: 'Alasi piring dengan selembar daun pisang segar. Tata nasi putih hangat di tengahnya, letakkan irisan daging sapi empuk, lalu siram dengan kuah gandul panas melimpah. Sajikan dengan tempe goreng renyah.',
        timerMinutes: 7,
        tip: 'Gunakan daun pisang klutuk atau kepok yang layu hangat agar aromanya semerbak harum.'
      }
    ],
    cookingTips: [
      'Gunakan kecap manis tradisional yang memiliki rasa kedelai hitam pekat tanpa pengawet.',
      'Sajikan kuah dalam keadaan mendidih panas agar saat disiram ke nasi hangat aroma daun pisang langsung menguar.'
    ],
    commonMistakes: [
      'Membiarkan santan mendidih kencang tanpa diaduk hingga pecah dan berbusa kasar.',
      'Terlalu banyak kecap sehingga warna kuah menjadi hitam legam alih-alih merah kecokelatan khas Pati.'
    ],
    substitutions: [
      { ingredient: 'Daging Has', substitute: 'Bisa dipadukan dengan babat atau lidah sapi rebus' }
    ],
    servingSuggestions: 'Sangat mantap dinikmati dengan tempe kering renyah, perkedel kentang, dan telur puyuh bacem.',
    nutrition: {
      calories: '460 kkal',
      protein: '26 g',
      carbs: '50 g',
      fat: '17 g',
      note: 'Per porsi komplit dengan daging dan kuah santan.'
    },
    relatedRecipeIds: ['soto-kudus', 'garang-asem-kudus', 'selat-solo'],
    legendaryRestaurantIds: ['sari-rasa-kudus', 'toko-oen-semarang']
  },

  // 13. Mangut Lele Asap Kuah Pedas
  {
    id: 'mangut-lele-asap',
    slug: 'mangut-lele-asap',
    name: 'Mangut Lele Asap Santan Pedas',
    javaneseName: 'Mangut Iwak Lele Asap',
    regionId: 'magelang',
    regionName: 'Magelang & Klaten',
    mealType: 'Makan Utama',
    cookingDuration: '45 Menit',
    prepTime: '15 Menit',
    cookTime: '30 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['pedas', 'gurih', 'segar'],
    budgetCategory: 'Menengah',
    estimatedCost: 'Rp 40.000 – Rp 58.000',
    image: '/assets/images/recipes/mangut-lele.jpg',
    intro: 'Mangut Lele memadukan aroma sangit lele asap tradisional dengan kuah santan kuning pedas menyengat. Diperkaya belimbing wuluh segar, cabai rawit utuh, kencur aromatik, dan daun kemangi harum yang menggugah selera makan.',
    history: 'Tradisi mangut lele asap berkembang pesat di sepanjang aliran Kali Progo dan perbatasan Magelang-Yogyakarta. Pengasapan menggunakan kayu pohon kelapa dan sabut membuat daging lele padat kenyal dan tidak mudah hancur saat digodok santan.',
    culturalBackground: 'Bagi masyarakat pedesaan Jawa Tengah, mangut adalah lauk istimewa di musim penghujan. Sengatan kuah kencur pedas berpadu gurih santan memberikan kehangatan tubuh yang menyegarkan.',
    interestingFacts: [
      'Pengasapan lele memakan waktu 4-6 jam hingga kulitnya kering keemasan dan kadar air berkurang drastis.',
      'Rempah kencur segar dan daun jeruk purut adalah bumbu mutlak yang membedakan mangut dari sayur santan biasa.',
      'Cabai rawit sengaja dimasukkan utuh agar tingkat kepedasan dapat disesuaikan penikmatnya dengan dipencet di piring.'
    ],
    regionalVariations: 'Di daerah pesisir pantura mangut sering menggunakan ikan pari asap (ikan pe), sedangkan di pedalaman Jawa Tengah lele asap menjadi primadona utama.',
    equipment: ['Wajan cekung tebal', 'Cobek batu & ulekan', 'Spatula kayu'],
    ingredientGroups: [
      {
        name: 'Bahan Utama Ikan & Kuah',
        items: [
          { name: 'Ikan lele asap matang', amount: 4, unit: 'ekor', notes: 'Pilih lele asap beraroma sedap tanpa bau tengik' },
          { name: 'Santan kelapa murni', amount: 750, unit: 'ml', notes: 'Kekentalan sedang' },
          { name: 'Cabai rawit merah utuh', amount: 15, unit: 'buah', notes: 'Biarkan utuh bertangkai pendek' },
          { name: 'Belimbing wuluh, belah 2', amount: 4, unit: 'buah', notes: 'Beri rasa asam segar pemecah santan' },
          { name: 'Tomat hijau, potong 4', amount: 2, unit: 'buah', notes: 'Segar renyah' },
          { name: 'Daun kemangi segar', amount: 1, unit: 'ikat', notes: 'Petik daunnya' },
          { name: 'Daun salam & daun jeruk', amount: 3, unit: 'lembar', notes: 'Robek uratnya' },
          { name: 'Lengkuas memarkan', amount: 3, unit: 'cm', notes: 'Cuci bersih' }
        ]
      },
      {
        name: 'Bumbu Halus (Ulek)',
        items: [
          { name: 'Bawang merah lokal', amount: 7, unit: 'butir', notes: 'Kupas' },
          { name: 'Bawang putih', amount: 4, unit: 'siung', notes: 'Kupas' },
          { name: 'Kencur segar', amount: 3, unit: 'cm', notes: 'Aroma mutlak mangut' },
          { name: 'Kunyit bakar', amount: 2.5, unit: 'cm', notes: 'Warna kuning cantik' },
          { name: 'Kemiri sangrai', amount: 4, unit: 'butir', notes: 'Haluskan' },
          { name: 'Cabai merah keriting', amount: 5, unit: 'buah', notes: 'Haluskan' },
          { name: 'Gula merah & garam', amount: 1.5, unit: 'sdt', notes: 'Sesuaikan rasa' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Menumis Bumbu Halus Rempah',
        instruction: 'Panaskan 2 sdm minyak di wajan. Tumis bumbu halus bersama daun salam, daun jeruk, dan lengkuas hingga harum semerbak dan matang berminyak.',
        timerMinutes: 8,
        tip: 'Aroma kencur dan daun jeruk harus menguar matang sebelum santan dituangkan.'
      },
      {
        stepNumber: 2,
        title: 'Menuang Santan & Mematangkan Kuah',
        instruction: 'Tuang santan kelapa sedang secara bertahap sambil diaduk perlahan searah agar santan tidak pecah. Masukkan gula merah dan garam. Masak hingga santan mulai mendidih perlahan.',
        timerMinutes: 12,
        tip: 'Jaga api tetap sedang dan aduk teratur hingga santan mulai menyatu dengan bumbu kuning.'
      },
      {
        stepNumber: 3,
        title: 'Memasukkan Lele Asap & Cabai Rawit',
        instruction: 'Masukkan lele asap, cabai rawit merah utuh, belimbing wuluh, dan irisan tomat hijau. Masak dengan api kecil selama 10 menit agar sari ikan asap meresap ke dalam kuah santan.',
        timerMinutes: 10,
        tip: 'Jangan membolak-balik lele asap secara kasar agar kepalanya tidak patah terpisah.'
      },
      {
        stepNumber: 4,
        title: 'Menambahkan Kemangi Segar',
        instruction: 'Sesaat sebelum diangkat, masukkan segenggam daun kemangi segar. Aduk perlahan hingga kemangi layu harum, lalu matikan api kompor.',
        timerMinutes: 2,
        tip: 'Kemangi dimasukkan di detik terakhir agar warnanya tetap hijau segar dan wanginya tidak hilang.'
      }
    ],
    cookingTips: [
      'Cuci lele asap dengan air hangat mengalir sebentar untuk membersihkan debu abu pembakaran sebelum dimasak.',
      'Jika kuah terasa terlalu pekat, tambahkan sedikit kaldu hangat atau santan encer.'
    ],
    commonMistakes: [
      'Mengaduk terlalu kencang sehingga daging lele hancur berserakan di kuah.',
      'Kurang kencur: mangut akan kehilangan identitas rasa khas Jawa Tengah.'
    ],
    substitutions: [
      { ingredient: 'Lele Asap', substitute: 'Bisa menggunakan ikan pari asap (ikan pe) atau ikan tongkol asap' }
    ],
    servingSuggestions: 'Sangat nikmat disantap bersama nasi putih hangat pulen dan lalapan mentimun renyah.',
    nutrition: {
      calories: '380 kkal',
      protein: '28 g',
      carbs: '12 g',
      fat: '24 g',
      note: 'Per porsi lele asap komplit kuah santan.'
    },
    relatedRecipeIds: ['garang-asem-kudus', 'mendoan-banyumas', 'nasi-megono-pekalongan'],
    legendaryRestaurantIds: ['kupat-tahu-pojok-magelang', 'mendoan-echo-purwokerto']
  },

  // 14. Mie Ongklok Khas Wonosobo
  {
    id: 'mie-ongklok-wonosobo',
    slug: 'mie-ongklok-wonosobo',
    name: 'Mie Ongklok Asli Wonosobo',
    javaneseName: 'Bakmi Ongklok Dieng',
    regionId: 'wonosobo',
    regionName: 'Wonosobo',
    mealType: 'Makan Utama / Hangat',
    cookingDuration: '30 Menit',
    prepTime: '15 Menit',
    cookTime: '15 Menit',
    baseServings: 4,
    difficulty: 'Mudah',
    difficultyLevel: 'Mudah',
    flavorProfiles: ['manis', 'gurih', 'segar'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 28.000 – Rp 42.000',
    image: '/assets/images/recipes/mie-ongklok.jpg',
    intro: 'Mie Ongklok adalah sajian mi khas pegunungan Dieng, Wonosobo. Mi kuning kenyal dan irisan kol segar direbus menggunakan keranjang bambu kecil (ongklok), lalu diguyur kuah kental gurih manis berbahan kaldu ebi, gula jawa, dan tepung kanji bertabur kucai harum.',
    history: 'Diciptakan oleh juru masak lokal Wonosobo pada pertengahan abad ke-20 untuk menghangatkan tubuh masyarakat di tengah sejuknya udara pegunungan Dieng. Teknik mencelup mi dengan keranjang bambu di dalam air mendidih menghasilkan bunyi khas "ongklok-ongklok".',
    culturalBackground: 'Menyantap mie ongklok di Wonosobo belum lengkap tanpa sate sapi bumbu kacang manis dan tempe kemul renyah bertabur daun kucai yang digoreng dadakan di samping gerobak.',
    interestingFacts: [
      'Alat keranjang bambu berongga tempat merebus mi dan sayuran disebut ongklok, yang menjadi nama sajian ini.',
      'Kuah kentalnya yang mengilat dibuat dari larutan tepung kanji (tapioka) dengan kaldu ebi kering sangrai dan gula jawa.',
      'Daun kucai lokal Wonosobo beraroma lebih tajam manis dibandingkan kucai dataran rendah.'
    ],
    regionalVariations: 'Di dataran tinggi Dieng kuahnya cenderung lebih manis legit dan ditambahkan cabai rawit gerus mentah.',
    equipment: ['Panci perebus mie', 'Keranjang saringan mie / ongklok', 'Cobek batu', 'Panci kuah kental'],
    ingredientGroups: [
      {
        name: 'Bahan Mi & Sayuran',
        items: [
          { name: 'Mi basah kuning kenyal', amount: 400, unit: 'gram', notes: 'Bisa mi telur basah berkualitas' },
          { name: 'Kol segar, iris kasar', amount: 150, unit: 'gram', notes: 'Cuci bersih' },
          { name: 'Daun kucai segar, potong 2 cm', amount: 1, unit: 'ikat', notes: 'Ciri khas aroma Wonosobo' },
          { name: 'Bawang merah goreng', amount: 3, unit: 'sdm', notes: 'Taburan harum' }
        ]
      },
      {
        name: 'Bahan Kuah Kental Gurih Manis',
        items: [
          { name: 'Air kaldu sapi / ayam', amount: 800, unit: 'ml', notes: 'Kaldu gurih alami' },
          { name: 'Ebi kering, rendam lalu sangrai', amount: 2, unit: 'sdm', notes: 'Haluskan bersama bumbu' },
          { name: 'Tepung kanji / tapioka', amount: 3.5, unit: 'sdm', notes: 'Larutkan dengan 100 ml air dingin' },
          { name: 'Gula merah kelapa sisir', amount: 2.5, unit: 'sdm', notes: 'Gula jawa asli' },
          { name: 'Kecap manis kental', amount: 2, unit: 'sdm', notes: 'Beri warna cokelat mengilat' },
          { name: 'Bawang putih', amount: 5, unit: 'siung', notes: 'Haluskan' },
          { name: 'Bawang merah', amount: 4, unit: 'butir', notes: 'Haluskan' },
          { name: 'Merica butiran', amount: 0.5, unit: 'sdt', notes: 'Haluskan' },
          { name: 'Garam', amount: 1.5, unit: 'sdt', notes: 'Secukupnya' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Membuat Kuah Kental Ebi Gurih',
        instruction: 'Tumis bumbu halus dan ebi sangrai hingga harum matang. Tuang air kaldu, gula merah, kecap manis, dan garam. Masak hingga mendidih dan gula larut sempurna.',
        timerMinutes: 8,
        tip: 'Ebi harus disangrai harum agar kuah tidak berbau amis.'
      },
      {
        stepNumber: 2,
        title: 'Mengentalkan Kuah dengan Kanji',
        instruction: 'Kecilkan api kompor. Tuang larutan tepung kanji sambil terus diaduk cepat hingga kuah meletup-letup kental, mengilap, dan tidak menggumpal.',
        timerMinutes: 5,
        tip: 'Aduk terus tanpa henti saat menuang kanji agar kuah licin merata.'
      },
      {
        stepNumber: 3,
        title: 'Merebus Mi & Kol dengan Saringan',
        instruction: 'Didihkan air bersih di panci terpisah. Masukkan mi basah dan potongan kol ke dalam saringan/ongklok. Celup-celupkan ke dalam air mendidih selama 1-2 menit hingga layu kenyal. Angkat dan tiriskan.',
        timerMinutes: 3,
        tip: 'Jangan rebus terlalu lama agar kol tetap renyah segar saat dikunyah.'
      },
      {
        stepNumber: 4,
        title: 'Penyajian Hangat Bertabur Kucai',
        instruction: 'Tata mi dan kol rebus di dalam mangkuk. Siram kuah kental panas melimpah di atasnya. Taburi irisan kucai segar dan bawang goreng. Santap hangat bersama sate sapi manis.',
        timerMinutes: 2,
        tip: 'Sajikan selagi kuah masih sangat panas mengepul.'
      }
    ],
    cookingTips: [
      'Gunakan tepung kanji asli (bukan maizena) agar kekentalannya kenyal lentur dan bening mengilat.',
      'Sate daging sapi bumbu kacang manis adalah teman duet mutlak mie ongklok.'
    ],
    commonMistakes: [
      'Kuah terlalu encer seperti bakso biasa: kuah ongklok seharusnya kental membungkus untaian mi.',
      'Mengganti daun kucai dengan seledri: aroma khas Wonosobo akan hilang.'
    ],
    substitutions: [
      { ingredient: 'Ebi Kering', substitute: 'Bisa diganti terasi udang sangrai kualitas super' }
    ],
    servingSuggestions: 'Sangat nikmat disantap di udara sejuk ditemani tempe kemul renyah dan sate sapi bumbu kecap manis.',
    nutrition: {
      calories: '350 kkal',
      protein: '14 g',
      carbs: '60 g',
      fat: '7 g',
      note: 'Per porsi tanpa lauk sate pendamping.'
    },
    relatedRecipeIds: ['tahu-gimbal-semarang', 'mendoan-banyumas', 'soto-kudus'],
    legendaryRestaurantIds: ['kupat-tahu-pojok-magelang', 'mendoan-echo-purwokerto']
  },

  // 15. Tengkleng Kambing Khas Pasar Klewer Solo
  {
    id: 'tengkleng-kambing-solo',
    slug: 'tengkleng-kambing-solo',
    name: 'Tengkleng Kambing Pasar Klewer',
    javaneseName: 'Tengkleng Wedhus Solo',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Makan Utama',
    cookingDuration: '75 Menit',
    prepTime: '20 Menit',
    cookTime: '55 Menit',
    baseServings: 4,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['gurih', 'pedas', 'kaya-rempah'],
    budgetCategory: 'Istimewa',
    estimatedCost: 'Rp 65.000 – Rp 90.000',
    image: '/assets/images/recipes/tengkleng.jpg',
    intro: 'Tengkleng Solo adalah olahan tulang, iga, dan jeroan kambing yang dimasak dalam kuah kuning encer kaya rempah tanpa santan kental. Beraroma wangi serai, kapulaga, cengkih, dan cabai rawit utuh yang memberikan kehangatan segar tanpa membuat enek.',
    history: 'Di era kolonial dan keraton Surakarta, bagian daging kambing terbaik dinikmati oleh bangsawan Belanda dan priyayi keraton. Para abdi dalem dan rakyat jelata mengolah tulang berbalut sedikit daging sisa dengan rebusan bumbu rempah melimpah, melahirkan hidangan tengkleng yang melegenda.',
    culturalBackground: 'Keasyikan menyantap tengkleng terletak pada sensasi menyesap sari sumsum gurih dari rongga tulang dan menggigit daging kenyal yang menempel di sela iga kambing hangat.',
    interestingFacts: [
      'Berbeda dari gule kambing yang bersantan kental pekat, kuah tengkleng Solo asli encer bening kekuningan sehingga terasa ringan dan menyegarkan.',
      'Pasar Klewer dan kawasan Pasar Kliwon Solo adalah sentra lahirnya legenda pedagang tengkleng pikulan sejak puluhan tahun silam.',
      'Kambing yang digunakan umumnya kambing muda agar aromanya harum dan daging tulang lekas empuk lembut.'
    ],
    regionalVariations: 'Terdapat variasi tengkleng rica-rica yang dimasak kembali dengan sedikit kuah dan kecap pedas cabai rawit melimpah.',
    equipment: ['Panci presto atau panci sup besar bertutup tebal', 'Cobek batu & ulekan', 'Sutil kayu'],
    ingredientGroups: [
      {
        name: 'Bahan Tulang Kambing & Kuah',
        items: [
          { name: 'Tulang iga & kaki kambing muda berbalut daging', amount: 800, unit: 'gram', notes: 'Potong kecil-kecil' },
          { name: 'Air bersih untuk kaldu', amount: 1800, unit: 'ml', notes: 'Rebusan pertama dibuang' },
          { name: 'Cabai rawit merah utuh', amount: 15, unit: 'buah', notes: 'Beri sengatan pedas segar' },
          { name: 'Serai, memarkan', amount: 3, unit: 'batang', notes: 'Ambil putihnya' },
          { name: 'Daun salam segar', amount: 4, unit: 'lembar', notes: 'Cuci bersih' },
          { name: 'Daun jeruk purut', amount: 5, unit: 'lembar', notes: 'Robek tulangnya' },
          { name: 'Kayu manis', amount: 3, unit: 'cm', notes: 'Aroma wangi' },
          { name: 'Cengkih utuh', amount: 4, unit: 'butir', notes: 'Hangat aromatik' },
          { name: 'Kapulaga putih', amount: 3, unit: 'butir', notes: 'Memarkan' },
          { name: 'Lengkuas, memarkan', amount: 4, unit: 'cm', notes: 'Cuci' }
        ]
      },
      {
        name: 'Bumbu Halus (Ulek)',
        items: [
          { name: 'Bawang merah lokal', amount: 10, unit: 'butir', notes: 'Kupas' },
          { name: 'Bawang putih', amount: 6, unit: 'siung', notes: 'Kupas' },
          { name: 'Kunyit bakar', amount: 3, unit: 'cm', notes: 'Warna kuning cantik' },
          { name: 'Jahe segar', amount: 3, unit: 'cm', notes: 'Hangat peredam bau perengus' },
          { name: 'Kemiri sangrai', amount: 5, unit: 'butir', notes: 'Sangrai harum' },
          { name: 'Ketumbar sangrai', amount: 1, unit: 'sdm', notes: 'Ulek' },
          { name: 'Merica butiran', amount: 1, unit: 'sdt', notes: 'Ulek' },
          { name: 'Pala bubuk', amount: 0.25, unit: 'sdt', notes: 'Aroma wangi' },
          { name: 'Garam & gula kelapa', amount: 2, unit: 'sdt', notes: 'Sesuaikan rasa' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Merebus & Membersihkan Tulang Kambing',
        instruction: 'Rebus potongan tulang kambing dalam air mendidih selama 10 menit. Buang air rebusan pertama dan busanya untuk menghilangkan bau perengus kotor. Tiriskan tulang.',
        timerMinutes: 15,
        tip: 'Membuang air rebusan pertama adalah rahasia kuah tengkleng yang jernih dan harum sedap.'
      },
      {
        stepNumber: 2,
        title: 'Menumis Bumbu Halus Rempah',
        instruction: 'Tumis bumbu halus bersama serai, daun salam, daun jeruk, lengkuas, kayu manis, cengkih, dan kapulaga hingga harum matang dan wangi rempahnya keluar semerbak.',
        timerMinutes: 8,
        tip: 'Pastikan bumbu matang benar agar tidak meninggalkan sisa rasa pahit.'
      },
      {
        stepNumber: 3,
        title: 'Mengungkep Tulang dalam Kuah Rempah',
        instruction: 'Masukkan tulang kambing ke dalam tumisan bumbu, aduk rata 3 menit. Tuang air bersih hangat. Masak dengan api kecil bertutup selama 45-50 menit hingga daging di sela tulang empuk dan kaldu gurih meresap.',
        timerMinutes: 45,
        tip: 'Gunakan api kecil agar sari sumsum tulang keluar perlahan memperkaya kuah kaldu.'
      },
      {
        stepNumber: 4,
        title: 'Memasukkan Cabai Rawit & Penyajian',
        instruction: 'Masukkan cabai rawit merah utuh, masak 5 menit lagi hingga cabai layu sedikit. Cicipi dan koreksi rasa garam dan gula. Angkat dan sajikan panas-panas dengan taburan bawang goreng.',
        timerMinutes: 7,
        tip: 'Nikmati selagi kuah masih sangat panas bersama sepiring nasi putih hangat.'
      }
    ],
    cookingTips: [
      'Gunakan tulang kambing muda dari bagian iga dan punggung yang masih memiliki lapisan daging lembut.',
      'Sajikan bersama perasan jeruk nipis segar untuk kesegaran ekstra di akhir santapan.'
    ],
    commonMistakes: [
      'Menambahkan santan kental: tengkleng asli Solo berkuah encer ringan tanpa santan berat.',
      'Tidak membuang air rebusan awal tulang: kuah akan keruh dan berbau perengus tajam.'
    ],
    substitutions: [
      { ingredient: 'Tulang Kambing', substitute: 'Bisa diganti iga sapi muda potong pendek' }
    ],
    servingSuggestions: 'Sangat nikmat dinikmati bersama nasi putih pulen, emping melinjo renyah, dan kecap manis rawit potong.',
    nutrition: {
      calories: '410 kkal',
      protein: '32 g',
      carbs: '8 g',
      fat: '28 g',
      note: 'Per porsi mangkuk saji tengkleng tulang kambing.'
    },
    relatedRecipeIds: ['sate-buntel-solo', 'selat-solo', 'nasi-liwet-solo'],
    legendaryRestaurantIds: ['pak-manto-solo', 'wongso-lemu-solo']
  },

  // 16. Wingko Babat Asli Semarang
  {
    id: 'wingko-babat-semarang',
    slug: 'wingko-babat-semarang',
    name: 'Wingko Babat Asli Semarang',
    javaneseName: 'Wingko Kelapa Panggang',
    regionId: 'semarang',
    regionName: 'Semarang',
    mealType: 'Camilan / Kudapan',
    cookingDuration: '40 Menit',
    prepTime: '15 Menit',
    cookTime: '25 Menit',
    baseServings: 6,
    difficulty: 'Mudah',
    difficultyLevel: 'Mudah',
    flavorProfiles: ['manis', 'gurih'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 22.000 – Rp 35.000',
    image: '/assets/images/recipes/wingko-babat.jpg',
    intro: 'Wingko Babat adalah kudapan panggang legendaris berbahan parutan kelapa muda setengah tua, tepung ketan putih pilihan, santan, dan gula pasir. Dipanggang di atas wajan datar hingga permukaannya kecokelatan harum berkaramel legit dengan tekstur kenyal empuk menggoda selera.',
    history: 'Meski berasal dari kota Babat di perbatasan Jawa Timur, wingko mencapai puncak ketenaran dan kejayaan ikoniknya di Stasiun Tawang Semarang sejak tahun 1940-an melalui toko Wingko Babat Cap Kereta Api yang legendaris.',
    culturalBackground: 'Wingko Babat adalah oleh-oleh wajib kebanggaan Semarang yang melambangkan kehangatan persaudaraan dan kelembutan tradisi dapur pesisir Jawa Tengah.',
    interestingFacts: [
      'Kunci kelezatan wingko babat terletak pada kelapa yang diparut memanjang (bukan parut halus santan) agar tekstur gigitannya gurih kenyal.',
      'Aroma harum khas wingko berasal dari karamelisasi gula dan minyak kelapa alami saat bersentuhan dengan wajan panggang panas.',
      'Dapat bertahan hingga 4-5 hari dalam suhu ruang tanpa bahan pengawet apa pun.'
    ],
    regionalVariations: 'Selain rasa kelapa gurih orisinal, kini berkembang variasi rasa nangka, cokelat, dan durian lokal.',
    equipment: ['Wajan teflon datar atau wajan gerabah', 'Mangkuk adonan besar', 'Spatula pipih'],
    ingredientGroups: [
      {
        name: 'Bahan Adonan Wingko',
        items: [
          { name: 'Kelapa setengah tua, kupas kulit ari lalu parut kasar', amount: 300, unit: 'gram', notes: 'Gunakan kelapa segar bukan kelapa kering' },
          { name: 'Tepung ketan putih berkualitas', amount: 250, unit: 'gram', notes: 'Ayak bersih' },
          { name: 'Gula pasir putih', amount: 180, unit: 'gram', notes: 'Sesuaikan tingkat manis' },
          { name: 'Santan kelapa hangat', amount: 150, unit: 'ml', notes: 'Dari perasan kelapa murni' },
          { name: 'Margarin leleh', amount: 2, unit: 'sdm', notes: 'Menambah kelembutan adonan' },
          { name: 'Garam halus', amount: 0.5, unit: 'sdt', notes: 'Pengangkat rasa gurih kelapa' },
          { name: 'Vanili bubuk', amount: 0.25, unit: 'sdt', notes: 'Aroma wangi lembut' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Mencampur Bahan Kering & Kelapa',
        instruction: 'Dalam mangkuk besar, campurkan kelapa parut kasar, tepung ketan putih, gula pasir, garam, dan vanili. Aduk menggunakan tangan bersih atau spatula hingga butiran gula mulai menyatu dengan kelapa.',
        timerMinutes: 8,
        tip: 'Remas perlahan dengan ujung jari agar minyak kelapa alami keluar melembutkan tepung ketan.'
      },
      {
        stepNumber: 2,
        title: 'Menuang Santan & Margarin Leleh',
        instruction: 'Tuang santan hangat dan margarin leleh sedikit demi sedikit sambil diuleni lembut hingga adonan menyatu lembap dan bisa dibentuk padat tanpa terlalu encer.',
        timerMinutes: 7,
        tip: 'Jangan membuat adonan terlalu basah berair agar wingko tidak lembek saat dipanggang.'
      },
      {
        stepNumber: 3,
        title: 'Membentuk & Memanggang Wingko',
        instruction: 'Panaskan wajan datar beroles tipis margarin dengan api sangat kecil. Ambil 2 sdm adonan, bulatkan lalu pipihkan setebal 1.5 cm di atas wajan. Tutup wajan selama 6-8 menit.',
        timerMinutes: 10,
        tip: 'Gunakan api lilin sangat kecil agar bagian dalam matang tanak tanpa membuat kulit luar gosong pahit.'
      },
      {
        stepNumber: 4,
        title: 'Membalik & Mematangkan Kedua Sisi',
        instruction: 'Balik wingko perlahan saat bagian bawah sudah berwarna kecokelatan keemasan beraroma karamel. Panggang sisi baliknya selama 5-7 menit hingga matang sempurna. Angkat dan dinginkan di atas rak kawat.',
        timerMinutes: 8,
        tip: 'Tekstur wingko akan semakin kenyal legit setelah uap panasnya mereda.'
      }
    ],
    cookingTips: [
      'Pilih kelapa yang pas setengah tua (bisa untuk urap); jika terlalu tua tekstur akan keras berserat kasar.',
      'Tutup wajan saat memanggang untuk menciptakan efek oven mini yang mematangkan ketan hingga ke bagian inti.'
    ],
    commonMistakes: [
      'Memanggang dengan api terlalu besar: bagian luar cepat gosong sementara ketan di dalam masih mentah bertepung.',
      'Memakai tepung ketan apek: akan merusak aroma harum alami kelapa panggang.'
    ],
    substitutions: [
      { ingredient: 'Santan Segar', substitute: 'Bisa diganti air kelapa muda hangat untuk rasa lebih legit' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan sebagai teman minum Teh Nasgitel (Panas Legi Kentel) atau Kopi Tubruk hangat.',
    nutrition: {
      calories: '220 kkal',
      protein: '3 g',
      carbs: '32 g',
      fat: '9 g',
      note: 'Per buah potongan wingko babat ukuran sedang.'
    },
    relatedRecipeIds: ['lumpia-semarang', 'tahu-gimbal-semarang', 'mendoan-banyumas'],
    legendaryRestaurantIds: ['toko-oen-semarang', 'lumpia-gang-lombok-semarang']
  },

  // 17. Getuk Trio Lembut Magelang
  {
    id: 'getuk-trio-magelang',
    slug: 'getuk-trio-magelang',
    name: 'Getuk Trio Lembut Magelang',
    javaneseName: 'Getuk Lindri Telung Rupa',
    regionId: 'magelang',
    regionName: 'Magelang',
    mealType: 'Camilan Tradisional',
    cookingDuration: '35 Menit',
    prepTime: '15 Menit',
    cookTime: '20 Menit',
    baseServings: 6,
    difficulty: 'Mudah',
    difficultyLevel: 'Mudah',
    flavorProfiles: ['manis', 'gurih'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 18.000 – Rp 28.000',
    image: '/assets/images/recipes/getuk-trio.jpg',
    intro: 'Getuk Trio Magelang diolah dari singkong pilihan yang dikukus pulen merekah lalu ditumbuk halus bersama gula dan sedikit mentega. Tiga lapis warna alami (cokelat gula jawa, merah muda, dan putih krim) menyajikan kelembutan manis bersahabat bertabur kelapa parut kukus gurih.',
    history: 'Diciptakan oleh masyarakat Magelang pada era penjajahan Jepang ketika beras sulit didapat dan singkong menjadi makanan pokok pengganti. Masyarakat berkreasi menumbuk singkong kukus dengan bumbu gula kelapa hingga lahirlah getuk yang lembut dan lezat.',
    culturalBackground: 'Getuk adalah simbol kesahajaan dan kreativitas masyarakat Jawa dalam mengolah hasil bumi sederhana menjadi sajian istimewa berkelas perjamuan.',
    interestingFacts: [
      'Singkong yang cocok untuk getuk adalah varietas singkong mentega kuning yang empuk merekah (mempur) saat dikukus.',
      'Trio merujuk pada tiga warna khas lapisannya: putih vanila, cokelat gula kelapa, dan merah muda beraroma manis lembut.',
      'Kelapa parut pelengkap harus dikukus dengan sedikit garam agar tidak cepat basi dan menambah kontras gurih.'
    ],
    regionalVariations: 'Di pedesaan Magelang dan Banyumas getuk sering digoreng renyah berkulit garing (getuk goreng Sokaraja).',
    equipment: ['Kukusan dandang', 'Alat penumbuk singkong / cobek kayu besar', 'Loyang cetakan persegi'],
    ingredientGroups: [
      {
        name: 'Bahan Utama Getuk',
        items: [
          { name: 'Singkong kualitas bagus, kupas potong-potong', amount: 800, unit: 'gram', notes: 'Pilih singkong mentega empuk' },
          { name: 'Gula pasir putih', amount: 100, unit: 'gram', notes: 'Untuk lapisan putih & merah muda' },
          { name: 'Gula merah kelapa sisir', amount: 60, unit: 'gram', notes: 'Untuk lapisan cokelat alami' },
          { name: 'Mentega / margarin kualitas bagus', amount: 2, unit: 'sdm', notes: 'Memberi rasa gurih wangi dan tekstur licin' },
          { name: 'Garam halus', amount: 0.5, unit: 'sdt', notes: 'Secukupnya' },
          { name: 'Pewarna merah muda alami', amount: 2, unit: 'tetes', notes: 'Opsional sari bit atau pasta frambozen' }
        ]
      },
      {
        name: 'Bahan Taburan Gurih',
        items: [
          { name: 'Kelapa setengah tua parut memanjang', amount: 150, unit: 'gram', notes: 'Kukus bersama sejumput garam dan daun pandan' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Mengukus Singkong Hingga Merekah',
        instruction: 'Kukus potongan singkong bersih dalam dandang panas selama 20-25 menit hingga benar-benar empuk merekah (mempur). Angkat dan buang serat keras di bagian tengahnya selagi masih panas mengepul.',
        timerMinutes: 20,
        tip: 'Tumbuk singkong saat masih panas membara agar teksturnya bisa lumat halus tanpa butiran kasar bergerindil.'
      },
      {
        stepNumber: 2,
        title: 'Menumbuk Singkong & Membagi Adonan',
        instruction: 'Tumbuk singkong bersama mentega dan garam hingga lembut kenyal. Bagi adonan menjadi 3 bagian sama rata: 1 bagian campur gula merah sisir (cokelat), 1 bagian campur gula pasir (putih), 1 bagian campur gula pasir dan tetesan merah muda.',
        timerMinutes: 10,
        tip: 'Uleni masing-masing bagian hingga warna dan rasa manisnya tercampur merata.'
      },
      {
        stepNumber: 3,
        title: 'Melapis & Memadatkan di Loyang',
        instruction: 'Siapkan loyang beralas plastik bersih. Tata adonan cokelat di dasar, ratakan dan padatkan. Susun adonan putih di tengah, lalu timpa dengan adonan merah muda di bagian paling atas. Tekan-tekan padat dan rapi.',
        timerMinutes: 8,
        tip: 'Gunakan penekan datar agar batas antarwarna terlihat cantik tegas saat dipotong.'
      },
      {
        stepNumber: 4,
        title: 'Memotong & Menyajikan dengan Kelapa',
        instruction: 'Keluarkan getuk dari loyang. Potong-potong persegi panjang rapi menggunakan pisau beralas plastik. Sajikan di atas piring bersama taburan kelapa parut kukus wangi pandan.',
        timerMinutes: 5,
        tip: 'Bungkus pisau dengan selembar plastik agar potongan getuk tidak menempel lengket.'
      }
    ],
    cookingTips: [
      'Kukus kelapa parut selama 10 menit bersama sehelai daun pandan agar tahan seharian tanpa menjadi asam basi.',
      'Gunakan singkong segar yang baru dicabut maksimal 24 jam agar hasil getuk manis pulen tidak pahit.'
    ],
    commonMistakes: [
      'Menumbuk singkong yang sudah mendingin: adonan akan bantat berbutir keras dan tidak bisa lumat halus.',
      'Memakai singkong yang berurat kayu keras: tekstur getuk menjadi berserat kasar.'
    ],
    substitutions: [
      { ingredient: 'Gula Merah', substitute: 'Bisa dipadukan bubuk cokelat kakao asli untuk variasi rasa' }
    ],
    servingSuggestions: 'Sangat nikmat disantap di pagi atau sore hari ditemani secangkir Kopi Robusta Temanggung hangat.',
    nutrition: {
      calories: '180 kkal',
      protein: '2 g',
      carbs: '38 g',
      fat: '4 g',
      note: 'Per potong getuk trio bersama taburan kelapa gurih.'
    },
    relatedRecipeIds: ['mendoan-banyumas', 'tempe-bacem', 'garang-asem-kudus'],
    legendaryRestaurantIds: ['kupat-tahu-pojok-magelang', 'mendoan-echo-purwokerto']
  },

  // 18. Serabi Notosuman Tradisional Solo
  {
    id: 'serabi-notosuman-solo',
    slug: 'serabi-notosuman-solo',
    name: 'Serabi Notosuman Tradisional Solo',
    javaneseName: 'Srabi Notosuman Kinca Areh',
    regionId: 'surakarta',
    regionName: 'Surakarta (Solo)',
    mealType: 'Camilan Tradisional',
    cookingDuration: '35 Menit',
    prepTime: '15 Menit',
    cookTime: '20 Menit',
    baseServings: 6,
    difficulty: 'Sedang',
    difficultyLevel: 'Menengah',
    flavorProfiles: ['manis', 'gurih'],
    budgetCategory: 'Sangat Terjangkau',
    estimatedCost: 'Rp 25.000 – Rp 38.000',
    image: '/assets/images/recipes/serabi-notosuman.jpg',
    intro: 'Serabi Notosuman adalah kue dadar beras khas Solo yang dimasak di atas wajan tanah liat kecil bertutup. Bagian tengahnya begitu lembut lumer berlumur areh santan kental manis, sementara tepiannya tipis garing renyah kecokelatan digulung rapi dalam selembar daun pisang segar.',
    history: 'Diciptakan pertama kali oleh pasangan Hoo Gek Hok dan Tan Giok Lan pada tahun 1923 di Jalan Notosuman (kini Jalan Moh. Yamin), Solo. Resep turun-temurun ini mempertahankan teknik memanggang di atas wajan tanah liat berbahan bakar arang kayu.',
    culturalBackground: 'Bagi masyarakat Solo, serabi notosuman adalah suguhan kehormatan saat menjamu tamu kerabat dan hantaran pengantin dalam tradisi Jawa klasik.',
    interestingFacts: [
      'Serabi Notosuman tidak menggunakan kuah kinca cair terpisah; santan areh kental langsung disendokkan ke atas adonan saat setengah matang di wajan.',
      'Ciri khas penyajiannya adalah digulung dalam daun pisang yang harum tanpa perekat plastik.',
      'Wajan tanah liat tradisional memberikan panas merata dan aroma asap pembakaran yang tidak bisa ditiru wajan logam modern.'
    ],
    regionalVariations: 'Selain rasa putih polos orisinal, varian cokelat meises menjadi favorit anak muda sejak era 1970-an.',
    equipment: ['Wajan tanah liat kecil bertutup (atau wajan cekung kecil anti lengket)', 'Mangkuk adonan', 'Kuas minyak daun pisang', 'Sendok sayur'],
    ingredientGroups: [
      {
        name: 'Bahan Adonan Serabi',
        items: [
          { name: 'Tepung beras putih berkualitas', amount: 200, unit: 'gram', notes: 'Pilih tepung beras baru yang wangi' },
          { name: 'Santan kelapa hangat', amount: 500, unit: 'ml', notes: 'Dari perasan kelapa murni' },
          { name: 'Gula pasir', amount: 60, unit: 'gram', notes: 'Beri manis lembut di adonan' },
          { name: 'Ragi instan', amount: 0.5, unit: 'sdt', notes: 'Membantu pembentukan rongga lembut' },
          { name: 'Garam halus', amount: 0.5, unit: 'sdt', notes: 'Pengangkat rasa gurih' },
          { name: 'Daun pandan wangi', amount: 2, unit: 'lembar', notes: 'Rebus bersama santan' }
        ]
      },
      {
        name: 'Bahan Areh Gurih Kental (Topping)',
        items: [
          { name: 'Santan kental perasan pertama', amount: 150, unit: 'ml', notes: 'Masak dengan sedikit garam hingga kental berminyak' },
          { name: 'Gula pasir', amount: 1.5, unit: 'sdm', notes: 'Larutkan di areh' },
          { name: 'Garam', amount: 0.25, unit: 'sdt', notes: 'Rasa gurih mantap' }
        ]
      }
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Membuat Adonan Serabi Beras',
        instruction: 'Dalam mangkuk, campur tepung beras, ragi instan, gula pasir, dan garam. Tuang santan hangat perlahan sambil dikeplok-keplok dengan telapak tangan selama 10 menit agar udara terperangkap. Diamkan adonan selama 45 menit hingga berbuih ringan.',
        timerMinutes: 15,
        tip: 'Mengeplok adonan adalah kunci terbentuknya pori-pori sarang semut yang lembut lumer.'
      },
      {
        stepNumber: 2,
        title: 'Memasak Areh Santan Kental',
        instruction: 'Rebus santan kental bersama garam dan gula di atas api kecil sambil diaduk perlahan hingga mengental berminyak (areh). Angkat dan sisihkan untuk topping.',
        timerMinutes: 8,
        tip: 'Jaga api tetap kecil agar santan areh tidak gosong berkerak cokelat tua.'
      },
      {
        stepNumber: 3,
        title: 'Memanggang Serabi di Wajan',
        instruction: 'Panaskan wajan tanah liat kecil beroles tipis minyak. Tuang satu sendok sayur adonan serabi. Tekan bagian tengahnya dengan punggung sendok sayur ke arah tepi agar terbentuk renda tipis di pinggirnya. Tutup wajan selama 2 menit.',
        timerMinutes: 4,
        tip: 'Gerakan memutar sendok sayur menciptakan pinggiran tipis renyah (kerak serabi) yang ikonik.'
      },
      {
        stepNumber: 4,
        title: 'Menuang Areh & Menggulung Serabi',
        instruction: 'Buka tutup wajan saat permukaan serabi mulai berpori. Tuang 1 sdm santan areh kental di tengahnya. Tutup kembali hingga matang tanak. Angkat, letakkan di atas selembar daun pisang, lalu gulung rapi selagi hangat.',
        timerMinutes: 4,
        tip: 'Santap hangat agar bagian tengahnya terasa lumer meledak di lidah.'
      }
    ],
    cookingTips: [
      'Gunakan wajan tanah liat yang sudah di-seasoning dengan minyak kelapa agar adonan serabi tidak lengket.',
      'Daun pisang pembungkus harus diolesi sedikit minyak agar serabi tidak menempel saat dibuka.'
    ],
    commonMistakes: [
      'Menuang adonan saat wajan belum cukup panas: serabi akan bantat tanpa renda tipis di pinggirannya.',
      'Areh santan terlalu encer sehingga hanyut ke pinggiran alih-alih menggenang manis di bagian tengah.'
    ],
    substitutions: [
      { ingredient: 'Wajan Tanah Liat', substitute: 'Bisa menggunakan wajan teflon cekung kecil berdiameter 14 cm' }
    ],
    servingSuggestions: 'Sangat nikmat disajikan hangat ditemani secangkir Teh Melati Solo yang wangi sepet legit.',
    nutrition: {
      calories: '160 kkal',
      protein: '3 g',
      carbs: '24 g',
      fat: '6 g',
      note: 'Per buah serabi notosuman gulung daun pisang.'
    },
    relatedRecipeIds: ['nasi-liwet-solo', 'selat-solo', 'sate-buntel-solo'],
    legendaryRestaurantIds: ['wongso-lemu-solo', 'pak-manto-solo']
  }
];
