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
  }
];

