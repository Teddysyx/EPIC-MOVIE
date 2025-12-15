let allChannels = [];
let currentHeroMovie = null;
let controlsTimeout;
let hls = null;

const featuredMovies = [
    {
        title: "Někdo to rád blond",
        background: "https://image.tmdb.org/t/p/original/8L7FEp6yY9E1qQODqx3H7ah9qxA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5z7b2SxNZnpN7iYQ8x8ZX6O3u9p.png",
        description: "Dva agenti FBI černé pleti mají ochránit dvě bílé holky z bohaté rodiny před únosem a nenapadne jim nic lepšího, než se za ně prostě převléknout.",
        streamUrl: "https://pixeldrain.com/api/file/1cYyBHPh"
    },
    {
        title: "Adamsova rodina 2",
        background: "https://image.tmdb.org/t/p/original/sZhTfYouKM1iV3rVbgIVEQFQogA.jpg",
        logo: "https://image.tmdb.org/t/p/original/5zP0Em4MjK0m4ehOzqzMuMaBbMb.png",
        description: "Sourozenci Wednesday a Pugsley Addamsovi udělají všechno pro to, aby se zbavili nejmladšího brášky Puberta, kterého rodiče Gomez a Morticia zbožňují.",
        streamUrl: "https://pixeldrain.com/api/file/dAMhaKDR"
    },
    {
        title: "BATMAN",
        background: "https://image.tmdb.org/t/p/original/tRS6jvPM9qPrrnx2KRp3ew96Yot.jpg",
        logo: "https://pixeldrain.com/api/file/pMNZ7xTz",
        description: "Batman už druhým rokem bojuje proti zločinu a odhaluje korupci v Gothamu. Pronásleduje sériového vraha Riddlera, který se zaměřuje na místní smetánku.",
        streamUrl: "https://pixeldrain.com/api/file/j4gnSaKr"
    },
    {
        title: "Křižovatka smrti",
        background: "https://image.tmdb.org/t/p/original/qUOaR1ongf8sz9pZcL7ARrnpGKw.jpg",
        logo: "https://image.tmdb.org/t/p/original/dMvZk3Qb0Z1n2An6B5M0PqYf8Fq.png",
        description: "Pokus o atentát pošle inspektora Leeho a detektiva Cartera do Paříže, aby chránili klíčového svědka, zatímco se snaží dostat gang Triády před spravedlnost.",
        streamUrl: "https://pixeldrain.com/api/file/9QWAvwXs"
    },
    {
        title: "Spider-Man 3",
        background: "https://image.tmdb.org/t/p/original/uPWkD0dZ4eyKIPY82HpbIipjSBb.jpg",
        logo: "https://image.tmdb.org/t/p/original/wcCvcacqg4TiiuI017RyGEPeenE.png",
        description: "Peter Parker od sebe odhání svoje nejbližší a bojuje s nepřáteli, zloduchy i tajemnou silou, která přidává temné odstíny jeho pavoučímu převleku.",
        streamUrl: "https://pixeldrain.com/api/file/zTaD9STY"
    },
    {
        title: "Avengers: Endgame",
        background: "https://image.tmdb.org/t/p/original/h9q0ozwMWy7CK5U7FSZsMVtbsCQ.jpg",
        logo: "https://image.tmdb.org/t/p/original/pjZSBgMDYjEhyanp8aahfE1KcAn.png",
        description: "Čtvrtý díl ságy o Avengers je vyvrcholením 22 propojených snímků z filmového světa studia Marvel a zároveň zakončením epické cesty superhrdinů.",
        streamUrl: "https://pixeldrain.com/api/file/qiD2RvuX"
    },
    {
        title: "Shrek",
        background: "https://image.tmdb.org/t/p/original/j46mGvyoGK9TBH2c1syEg6jGSAO.jpg",
        logo: "https://image.tmdb.org/t/p/original/aHdDXMXOAgejOVoupZBULvcfcQG.png",
        description: "Pro záchranu svého domova se zlobr a oslík dohodnou s intrikánským lordem, že osvobodí krásnou princeznu.",
        streamUrl: "https://pixeldrain.com/api/file/R5AYiRTR"
    },
    {
        title: "Madagaskar 3",
        background: "https://image.tmdb.org/t/p/original/9VbNbdVqVBISn4pe6gvYkvVWggm.jpg",
        logo: "https://image.tmdb.org/t/p/original/zFdwQ5XJ8h8uAH943jNSorEWOUM.png",
        description: "Na útěku před francouzskou policistkou pro kontrolu zvířat se Alex a jeho přátelé schovávají v putovním cirkusu.",
        streamUrl: "https://pixeldrain.com/api/file/9qag2HJX"
    },
    {
        title: "Mrtvá nevěsta",
        background: "https://image.tmdb.org/t/p/original/jQ1T7mThUYEFhQrfOFCRepVGe1v.jpg",
        logo: "https://image.tmdb.org/t/p/original/hrTz8M55rwC08IBf0MoW8BBBAfc.png",
        description: "Van Dortovi a Everglotovi chystají svatbu svých dětí. Snoubenci, kteří se poprvé setkají až těsně před sňatkem, se do sebe okamžitě zamilují.",
        streamUrl: "https://pixeldrain.com/api/file/xs3nCanV"
    },
    {
        title: "Creed 2",
        background: "https://image.tmdb.org/t/p/original/uYJQeakgSrp7peOoH7d0GfUBsyN.jpg",
        logo: "https://image.tmdb.org/t/p/original/bSvErsk6t4UwMiMW2aaLzHShFqP.png",
        description: "Další kapitola příběhu Adonise Creeda pojednává o jeho zážitcích v ringu i mimo něj. Hlavní hrdina se potýká s nově nabytou slávou a problémy s rodinou.",
        streamUrl: "https://pixeldrain.com/api/file/VHaCtTCC"
    }
];

allChannels = [
    {name: "Někdo to rád blond", logo: "https://www.kfilmu.net/obrazky/plakaty/nekdo-to-rad-blond-2807.jpg", url: "https://pixeldrain.com/api/file/1cYyBHPh"},
    {name: "Machři 1", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/159/513/159513786_b9038e.jpg", url: "https://pixeldrain.com/api/file/hbSr1SYF"},
    {name: "Machři 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/118/158118125_b68d70.jpg", url: "https://pixeldrain.com/api/file/bpJf55L1"},
    {name: "Malý Nicky – Satan Junior", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/254/159254771_c93b9c.jpg", url: "https://pixeldrain.com/api/file/EMcuAzYp"},
    {name: "Angry Birds", logo: "https://www.kfilmu.net/obrazky/plakaty/angry-birds-ve-filmu-13739.jpg", url: "https://pixeldrain.com/api/file/LRWbCjbz"},
    {name: "Angry Birds 2", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/163/480/163480625_7a28ac.jpg", url: "https://pixeldrain.com/api/file/Fz7jUDbn"},
    {name: "Zootropolis", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/160/442/160442355_b4ad6a.jpg", url: "https://pixeldrain.com/api/file/yvDc9L6e"},
    {name: "Raubíř Ralf", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/166/288/166288802_663574.jpg", url: "https://pixeldrain.com/api/file/ntsjdbtM"},
    {name: "Raubíř Ralf a internet", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/162/695/162695105_e0235a.jpg", url: "https://pixeldrain.com/api/file/5SRWH6HV"},
    {name: "Křižovatka smrti 1", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/527/159527790_d5d1c9.jpg", url: "https://pixeldrain.com/api/file/NgPcA6EE"},
    {name: "Křižovatka smrti 2", logo: "https://image.tmdb.org/t/p/original/aBQf2vMiCINeVC9v6BGVYKXurTh.jpg", url: "https://pixeldrain.com/api/file/xHqaHXqM"},
    {name: "Křižovatka smrti 3", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/164/948/164948615_db3b15.jpg", url: "https://pixeldrain.com/api/file/9QWAvwXs"},
    {name: "Scary Movie", logo: "https://i.ebayimg.com/images/g/R~cAAOSwRTBkPgQ-/s-l400.jpg", url: "https://pixeldrain.com/api/file/ZqMyk8E8"},
    {name: "Scary Movie 2", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/000/010/10778_de4817.jpg", url: "https://pixeldrain.com/api/file/jsRzZnai"},
    {name: "Scary Movie 3", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/434/161434966_e10424.jpg", url: "https://pixeldrain.com/api/file/k53y6JdG"},
    {name: "Scary movie 4", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/167/732/167732462_f2dzn5.jpg", url: "https://pixeldrain.com/api/file/4ULJWxup"},
    {name: "Scary movie 5", logo: "https://m.media-amazon.com/images/I/519XnbegXXL._AC_UF894%2C1000_QL80_.jpg", url: "https://pixeldrain.com/api/file/Qu6VP8VK"},
    {name: "Batman (2022)", logo: "https://static.posters.cz/image/1300/133032.jpg", url: "https://pixeldrain.com/api/file/qrbu9wQK"},
    {name: "Borat", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/599/158599614_8d2f4b.jpg", url: "https://pixeldrain.com/api/file/6K5YKxSk"},
    {name: "Borat 2", logo: "https://lh4.googleusercontent.com/proxy/UOL_9DuQYKru49r7TsFtSeKMDe93gmjUikZF7pxHTZ_Ct0cYQttEK5DZPfWXYZf6X4L4IjthlGiP0pGrmCuYi1S1S8YeEorb4w", url: "https://pixeldrain.com/api/file/NaWa5iCb"},
    {name: "Addamsova rodina", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/166/892/166892149_d4b27b.jpg", url: "https://pixeldrain.com/api/file/sDgGTXXj"},
    {name: "Addamsova rodina 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/169/146/169146723_6xbh4g.jpg", url: "https://pixeldrain.com/api/file/L6xHvAMk"},
    {name: "Minecraft", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/169/885/169885462_7jqwju.jpg", url: "https://pixeldrain.com/api/file/y1gjNsGk"},
    {name: "Superbad", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/159/809/159809466_44d92a.jpg", url: "https://pixeldrain.com/api/file/ugohtG4N"},
    {name: "Frčíme", logo: "https://pres.upmedia.cz/media/k2/items/cache/5c4f813e2066d2d9ce42072ff38ede04_XL.jpg", url: "https://pixeldrain.com/api/file/Q9WjW7ra"},
    {name: "Úžasňákovi", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/630/159630162_434cd5.jpg", url: "https://pixeldrain.com/api/file/cdkQN28t"},
    {name: "Úžasňákovi 2", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/162/829/162829490_1d4cf5.jpg", url: "https://pixeldrain.com/api/file/skdyT3wJ"},
    {name: "Blbý a blbější", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/527/159527667_b0f3ea.jpg", url: "https://pixeldrain.com/api/file/fGByPvXs"},
    {name: "Blbý a blbější 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/254/159254630_274693.jpg", url: "https://pixeldrain.com/api/file/1D28gme9"},
    {name: "Spider-man", logo: "https://i.ebayimg.com/images/g/R5oAAOSwZpBmCt-U/s-l1200.jpg", url: "https://pixeldrain.com/api/file/ue1M7SBZ"},
    {name: "Spider-man 2", logo: "https://i.pinimg.com/736x/b2/74/dc/b274dc791c2c737f4fede7d42bd2de66.jpg", url: "https://pixeldrain.com/api/file/37ARJ93A"},
    {name: "Spider-man 3", logo: "https://m.media-amazon.com/images/S/pv-target-images/2d7b36c419b03a1f82ee0c543c0e629a5dc690a567217d543afb4d12dd62b302.jpg", url: "https://pixeldrain.com/api/file/dtLRZ4ny"},
    {name: "Amazing Spider-man", logo: "https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_.jpg", url: "https://pixeldrain.com/api/file/WpqAi56B"},
    {name: "Amazing Spider-man 2", logo: "https://static.posters.cz/image/750/20688.jpg", url: "https://pixeldrain.com/api/file/ZKEHUtB5"},
    {name: "Spider-man Homecoming", logo: "https://m.media-amazon.com/images/M/MV5BODY2MTAzOTQ4M15BMl5BanBnXkFtZTgwNzg5MTE0MjI@._V1_FMjpg_UX1000_.jpg", url: "https://pixeldrain.com/api/file/R3JVNkNm"},
    {name: "Spider-Man: Daleko od domova", logo: "https://b829919.smushcdn.com/829919/wp-content/uploads/2019/03/26/spider-man_daleko_od_domova_poster_03.jpg?lossy=2&strip=0&webp=1", url: "https://pixeldrain.com/api/file/uCfWGays"},
    {name: "Spider-man Bez domova", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/165/927/165927284_806550.jpg", url: "https://pixeldrain.com/api/file/5bs4cmMu"},
    {name: "Spider-Man: Paralelní světy", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/117/163117221_970aa3.jpg", url: "https://pixeldrain.com/api/file/pm4TP9WS"},
    {name: "Spider-Man: Napříč paralelními světy", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/167/473/167473003_995qp3.png", url: "https://pixeldrain.com/api/file/HLwJEtxY"},
    {name: "Iron man", logo: "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_FMjpg_UX1000_.jpg", url: "https://pixeldrain.com/api/file/YrCNCian"},
    {name: "Iron man 2", logo: "https://static.posters.cz/image/750/7902.jpg", url: "https://pixeldrain.com/api/file/jzRrU9j2"},
    {name: "Iron man 3", logo: "https://static.posters.cz/image/1300/14372.jpg", url: "https://pixeldrain.com/api/file/Q7iiAdFf"},
    {name: "Avengers", logo: "https://pbs.twimg.com/media/FrJUfMbXgAULB0S?format=jpg&name=4096x4096", url: "https://pixeldrain.com/api/file/ZXQvnNuf"},
    {name: "Avengers age of Ultron", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/613/159613585_47cc95.jpg", url: "https://pixeldrain.com/api/file/ui9G7cot"},
    {name: "Avengers infinity war", logo: "https://static.posters.cz/image/1300/122134.jpg", url: "https://pixeldrain.com/api/file/dgG74R3F"},
    {name: "Avengers endgame", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/434/163434385_4255c9.png", url: "https://pixeldrain.com/api/file/qiD2RvuX"},
    {name: "Deadpool", logo: "https://upload.wikimedia.org/wikipedia/en/2/23/Deadpool_%282016_poster%29.png", url: "https://pixeldrain.com/api/file/VjBKxyp5"},
    {name: "Deadpool 2", logo: "https://lumiere-a.akamaihd.net/v1/images/deadpool2_feature-poster_584x800_69bc155b.jpeg?region=0%2C0%2C584%2C800", url: "https://pixeldrain.com/api/file/EuFbXa89"},
    {name: "Deadpool & Wolverine", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/168/956/168956852_whtfuc.jpg", url: "https://pixeldrain.com/api/file/7DQo1DXz"},
    {name: "IT", logo: "https://musicart.xboxlive.com/7/17d24700-0000-0000-0000-000000000002/504/image.jpg", url: "https://pixeldrain.com/api/file/ryb1kAfn"},
    {name: "IT Kapitola 2", logo: "https://static.posters.cz/image/1300/130006.jpg", url: "https://pixeldrain.com/api/file/W2d77uB4"},
    {name: "Žába k zulíbání", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/962/159962721_xs28dj.jpg", url: "https://pixeldrain.com/api/file/HBkyurmU"},
    {name: "Zvíře", logo: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p27783_p_v10_ac.jpg", url: "https://pixeldrain.com/api/file/xQxMpt9x"},
    {name: "Velká šestka", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/369/159369244_9e45b8.jpg", url: "https://pixeldrain.com/api/file/EbTk6Ys5"},
    {name: "Toy Story", logo: "https://m.media-amazon.com/images/I/71aBLaC4TzL.jpg", url: "https://pixeldrain.com/api/file/ja9s3bEW"},
    {name: "Toy Story 2", logo: "https://i.ebayimg.com/images/g/Pl0AAOSwd4tT-~pC/s-l1200.jpg", url: "https://pixeldrain.com/api/file/vpbSjJs5"},
    {name: "Toy Story 3", logo: "https://resizing.flixster.com/F4qdcvTFMYoEmut3WmhBVmYeSVI=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzlhZDg3ZjU1LTk3ZTAtNDMzMC04MzliLTNiMzE5YmQ3ZDQ4OC53ZWJw", url: "https://pixeldrain.com/api/file/rc8Xb5ML"},
    {name: "Toy Story 4", logo: "https://www.origosky.cz/fotky89342/fotos/_vyr_2223_plakat-toy-story.jpg", url: "https://pixeldrain.com/api/file/VMV2iEhD"},
    {name: "Auta", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/597/158597606_279039.jpg", url: "https://pixeldrain.com/api/file/tpv5r3qJ"},
    {name: "Auta 2", logo: "https://www.zona-zabavy.cz/i/?i=0908359_03.jpg&w=325&h=483", url: "https://pixeldrain.com/api/file/YaU4YgEg"},
    {name: "Auta 3", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/161/748/161748624_65bdd6.jpg", url: "https://pixeldrain.com/api/file/bWUyfSTE"},
    {name: "V hlavě", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/931/159931165_be2491.jpg", url: "https://pixeldrain.com/api/file/JdL4i1XF"},
    {name: "V hlavě 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/168/714/168714795_o5bchr.jpg", url: "https://pixeldrain.com/api/file/1BXC7oSW"},
    {name: "Pátek", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/165/821/165821441_f2c53b.jpg", url: "https://pixeldrain.com/api/file/9PH3afPi"},
    {name: "Zkurvenej pátek", logo: "https://image.tmdb.org/t/p/original/dP4fYCGQZzg17ta7FvLwJVCwwt9.jpg", url: "https://pixeldrain.com/api/file/Asg1bnsG"},
    {name: "Nevyhrožuj", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/169/757/169757230_1r6cjq.jpg", url: "https://pixeldrain.com/api/file/4qUnGxu6"},
    {name: "Konečně Doma", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/574/159574781_27371b.jpg", url: "https://pixeldrain.com/api/file/VHKCMS9W"},
    {name: "Příšerky s.r.o", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/167/162/167162519_df7ec0.png", url: "https://pixeldrain.com/api/file/Mo4jkkpv"},
    {name: "Univerzita pro přišerky", logo: "https://www.dvd-premiery.cz/data/imgauto/6/0/114465_01.jpg", url: "https://pixeldrain.com/api/file/sL3kLnuz"},
    {name: "RRRrrrr!!!", logo: "https://m.media-amazon.com/images/M/MV5BZjUwZDNlZDMtNzFmMy00MWE4LWFjNzItZjA4OWRhMDE1Mjk4XkEyXkFqcGc@._V1_.jpg", url: "https://pixeldrain.com/api/file/6LfD51mi"},
    {name: "Hledá se Nemo", logo: "https://play-lh.googleusercontent.com/0DvygwDnzU_NLLko_lYrktJA-tltD99mhx8y_t5MsVH_sxnbJo1-s0vj0RGClBRkCPit", url: "https://pixeldrain.com/api/file/CLcUYSmW"},
    {name: "Hledá se Dory", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/160/744/160744841_17e362.jpg", url: "https://pixeldrain.com/api/file/JAR8Zbfd"},
    {name: "Wall-e", logo: "https://image.tmdb.org/t/p/original/fLXLNDsOBZxpNleWF9Z4hubxBUQ.jpg", url: "https://pixeldrain.com/api/file/vXyvSiCd"},
    {name: "Mezi živly", logo: "https://www.cine-max.cz/fileadmin/_processed_/5/6/csm_mezi-zivly-00cz_0859128e01.jpg", url: "https://pixeldrain.com/api/file/Rsi28N5P"},
    {name: "Proměna", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/165/848/165848299_29e33a.jpg", url: "https://pixeldrain.com/api/file/y5JrXXGs"},
    {name: "Ratatouille", logo: "https://play-lh.googleusercontent.com/S1XJJTrSxRFSQOlpgYNPNFpZmY0us07JlUPHcg38UtwSwuzR0NYNbCxn3gcdFRPtohlShQ", url: "https://pixeldrain.com/api/file/pAS41SX5"},
    {name: "Rebelka", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/165/049/165049360_908843.jpg", url: "https://pixeldrain.com/api/file/Zc8BezS7"},
    {name: "Duše", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/164/291/164291838_5ad2fd.jpg", url: "https://pixeldrain.com/api/file/rJgas46M"},
    {name: "Shrek", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/450/159450261_4baed7.jpg", url: "https://pixeldrain.com/api/file/R5AYiRTR"},
    {name: "Shrek 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/450/159450263_fdb61d.jpg", url: "https://pixeldrain.com/api/file/feA5VYwP"},
    {name: "Shrek 3", logo: "https://m.media-amazon.com/images/M/MV5BOTgyMjc3ODk2MV5BMl5BanBnXkFtZTcwMjY0MjEzMw@@._V1_FMjpg_UX1000_.jpg", url: "https://pixeldrain.com/api/file/iUreJe9n"},
    {name: "Shrek Zvonec a konec", logo: "https://b829919.smushcdn.com/829919/wp-content/uploads/2016/06/shrek_zvonec_a_konec_2010_plakat.jpg?lossy=2&strip=0&webp=1", url: "https://pixeldrain.com/api/file/5w4QdyZZ"},
    {name: "Hodný dinosaurus", logo: "https://www.dvd-premiery.cz/data/imgauto/6/0/116884_01.jpg", url: "https://pixeldrain.com/api/file/BRKDbqdy"},
    {name: "Splachnutej", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/396/159396917_214e97.jpg", url: "https://pixeldrain.com/api/file/U6iZcZqg"},
    {name: "Za plotem", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/705/158705032_8001b7.jpg", url: "https://pixeldrain.com/api/file/o5A9DUXp"},
    {name: "Příběh žraloka", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/417/159417451_51e2ef.jpg", url: "https://pixeldrain.com/api/file/9ceq664o"},
    {name: "Madagaskar", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/513/159513716_33238b.jpg", url: "https://pixeldrain.com/api/file/3HyA1pdh"},
    {name: "Madagaskar 2", logo: "https://mrtns.sk/tovar/_l/61/l61509.jpg?v=17457266432", url: "https://pixeldrain.com/api/file/rfzop3y1"},
    {name: "Madagaskar 3", logo: "https://m.media-amazon.com/images/M/MV5BYTM5OWRiZTAtOTNkMS00NzNhLTkwYmYtMWI1MzkyMjE3MWE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", url: "https://pixeldrain.com/api/file/9qag2HJX"},
    {name: "Monstra vs. Vetřelci", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/167/116/167116043_93ef15.jpg", url: "https://pixeldrain.com/api/file/TYML9Ttq"},
    {name: "Kung Fu Panda", logo: "https://storage.googleapis.com/pod_public/1300/261561.jpg", url: "https://pixeldrain.com/api/file/uTHYoXhV"},
    {name: "Kung Fu Panda 2", logo: "https://storage.googleapis.com/pod_public/750/261562.jpg", url: "https://pixeldrain.com/api/file/rniyr343"},
    {name: "Kung Fu Panda 3", logo: "https://m.media-amazon.com/images/I/712JkdNS5uL.jpg", url: "https://pixeldrain.com/api/file/bQBhqE5G"},
    {name: "Kung Fu Panda 4", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/168/547/168547713_d4nayi.jpg", url: "https://pixeldrain.com/api/file/C3pCMNQm"},
    {name: "Jak vycvičit draka", logo: "https://image.pmgstatic.com/cache/resized/w140/files/images/film/posters/000/054/54585_72a8e4.jpg", url: "https://pixeldrain.com/api/file/sDgKxkxV"},
    {name: "Jak vycvičit draka 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/543/158543004_3e89db.jpg", url: "https://pixeldrain.com/api/file/FkxMWLQX"},
    {name: "Jak vycvičit draka 3", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/200/163200532_1b1d14.png", url: "https://pixeldrain.com/api/file/tDuDLvje"},
    {name: "Kocour v botách", logo: "https://www.filmarena.cz/obrazky/film_16560_2.jpg", url: "https://pixeldrain.com/api/file/RHnHBHd9"},
    {name: "Kocour v botách Poslední přání", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/166/887/166887811_a46ea6.jpg", url: "https://pixeldrain.com/api/file/LN2g5twg"},
    {name: "Ukradené Vánoce", logo: "https://deti-noci.cz/wp-content/uploads/nightmare_burton.jpg", url: "https://pixeldrain.com/api/file/Wrc11g5L"},
    {name: "Croodsovi", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/162/442/162442068_f752e8.png", url: "https://pixeldrain.com/api/file/RDKx5mYz"},
    {name: "Croodsovi Nový věk", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/165/516/165516466_83e5d2.jpg", url: "https://pixeldrain.com/api/file/R3pBrKDo"},
    {name: "Megamysl", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/167/359/167359811_904212.jpg", url: "https://pixeldrain.com/api/file/fzyjE4Ay"},
    {name: "Coco", logo: "https://lumiere-a.akamaihd.net/v1/images/p_coco_19736_fd5fa537.jpeg", url: "https://pixeldrain.com/api/file/7iHkcBUq"},
    {name: "legendární parta", logo: "https://www.fandimefilmu.cz/files/images/2017/08/15/n9peyy5t8qrjvnzu", url: "https://pixeldrain.com/api/file/L9t5XV6w"},
    {name: "Turbo", logo: "https://play-lh.googleusercontent.com/DCH4iI3Riwu6Bpu7F6J-qmSVSuowqFHAsUjGo2JJRlGcvocaKOmqCBc9mSIEq24PqXOb", url: "https://pixeldrain.com/api/file/cHpMePBd"},
    {name: "Tučňáci z Madagaskaru", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/159/323/159323975_1d3959.jpg", url: "https://pixeldrain.com/api/file/M7WFg6Yq"},
    {name: "Dobrodružství pana Peabodyho a Shermana", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/287/158287140_90c971.jpg", url: "https://pixeldrain.com/api/file/ACsFB94c"},
    {name: "Kapitán Bombarďák ve filmu", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/164/245/164245032_ac53bc.jpg", url: "https://pixeldrain.com/api/file/eqk1FQrg"},
    {name: "Sněžný kluk", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/782/163782822_0698f6.png", url: "https://pixeldrain.com/api/file/K7jYVezn"},
    {name: "Zlouni", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/166/146/166146272_5d9f18.jpg", url: "https://pixeldrain.com/api/file/tCyWdKew"},
    {name: "Já padouch", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG0MjFMNE7zmlCGSYJWiyGl4U9g5ssrDa9hR0ED6aUl1qU4tb55jf0VI0&s=10", url: "https://pixeldrain.com/api/file/xGA5wXfn"},
    {name: "Já padouch 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/157/803/157803377_fe8608.jpg", url: "https://pixeldrain.com/api/file/osxGWkva"},
    {name: "Já padouch 3", logo: "https://www.kinopohoda.cz/data-files/kino/event/images/ja-padouch-3-18105.jpg", url: "https://pixeldrain.com/api/file/GQiP51Ax"},
    {name: "Já padouch 4", logo: "https://www.dkteplice.cz/wp-content/uploads/2024/05/168921918_ychotf1-1.jpg", url: "https://pixeldrain.com/api/file/mxGSHxeu"},
    {name: "Mini šef", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/161/658/161658681_c0a0f7.jpg", url: "https://pixeldrain.com/api/file/HciXtULh"},
    {name: "Mimoni", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/159/932/159932980_c7f99a.jpg", url: "https://pixeldrain.com/api/file/ac2X5FFJ"},
    {name: "Mimoni 2", logo: "https://www.cinemart.cz/wp-content/uploads/2020/01/MN2_DIGTAL_1_SHEET_OTTO_CZE_web.jpg", url: "https://pixeldrain.com/api/file/HRDiUNEs"},
    {name: "Tajný život mazlíčků", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/555/161555685_d6dd7f.jpg", url: "https://pixeldrain.com/api/file/8FBXXvTa"},
    {name: "Tajný život mazlíčků 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/163/494/163494242_1997b4.png", url: "https://pixeldrain.com/api/file/cEgp6Cgi"},
    {name: "Buchty a klobásy", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWH4zRmxilMuVuN7FIh8TeRwcGuvzGSgduG-uw-UMREw&s=10", url: "https://pixeldrain.com/api/file/jHeLNFsU"},
    {name: "Zpívej", logo: "https://image.pmgstatic.com/cache/resized/w663/files/images/film/posters/161/635/161635756_4adb20.jpg", url: "https://pixeldrain.com/api/file/N1ByYFz9"},
    {name: "Zpívej 2", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/165/852/165852893_3ced12.png", url: "https://pixeldrain.com/api/file/GxEYxpkH"},
    {name: "Koralína a svět za tajnými dveřmi", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/000/033/33000_274499.jpg", url: "https://pixeldrain.com/api/file/osWZNghX"},
    {name: "Mrtvá nevěsta", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/158/603/158603200_c5c5de.jpg", url: "https://pixeldrain.com/api/file/xs3nCanV"},
    {name: "Grinch", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/162/136/162136476_66f951.jpg", url: "https://pixeldrain.com/api/file/Xiqer6vy"},
    {name: "Grinch 2018", logo: "https://www.kinopohoda.cz/data-files/kino/event/images/the-grinch-2018-movie-poster.jpg", url: "https://pixeldrain.com/api/file/kG4nz94d"},
    {name: "frankenweenie", logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/Frankenweenie_%282012_film%29_poster.jpg", url: "https://pixeldrain.com/api/file/c6ngzUTU"},
    {name: "Super Mario Bros. ve filmu", logo: "https://upload.wikimedia.org/wikipedia/en/4/44/The_Super_Mario_Bros._Movie_poster.jpg", url: "https://pixeldrain.com/api/file/AegGKZQM"},
    {name: "Pokémon: Detektiv Pikachu", logo: "https://m.media-amazon.com/images/S/pv-target-images/a3eabe8c808c4e889f5f38c2b5cc2a062a50999948e46c2a519759b1bb4b6103.jpg", url: "https://pixeldrain.com/api/file/yuttutG4"},
    {name: "Creed", logo: "https://play-lh.googleusercontent.com/Uv---zpvWpFlK8p2DH2wHWLiUj6-yRzBLX7pI8c_pKIu--LqQOuou50v-H7HF-n4FgQ_", url: "https://pixeldrain.com/api/file/66aXna4B"},
    {name: "Creed 2", logo: "https://img-cdn.heureka.group/v1/0d61c973-52f5-4037-ae66-82df055189fb.jpg", url: "https://pixeldrain.com/api/file/VHaCtTCC"},
    {name: "Creed 3", logo: "https://image.tmdb.org/t/p/original/5KPhH9fVuq05W1LHKmRCguy7HTr.jpg", url: "https://pixeldrain.com/api/file/mqE2n3S2"},
    {name: "Klik - život na dálkové ovládání", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1HBOCBCGEXlH6ucfBHDW551Z2TyLoSa_A6fqPINvtfTqPS6lixzh-lRCR&s=10", url: "https://pixeldrain.com/api/file/xG3ejiXV"},
    {name: "50x a stále poprvé", logo: "https://image.pmgstatic.com/cache/resized/w420/files/images/film/posters/162/261/162261442_b13e4t.jpg", url: "https://pixeldrain.com/api/file/v6diEmCe"},
    {name: "JOBS", logo: "https://image.tmdb.org/t/p/original/mOyZ0UAWaOJartFq2G3Cv0soFtQ.jpg", url: "https://pixeldrain.com/api/file/DKEzYMqf"},
    {name: "Yes man", logo: "https://image.tmdb.org/t/p/original/16zVbgFLTUaUTG1wQHuGjfWNuDM.jpg", url: "https://pixeldrain.com/api/file/HkFtCCT5"},
    {name: "Rocky", logo: "https://image.tmdb.org/t/p/original/wLJ5tnjC2hHwsxbdkkkvOJ8TPRH.jpg", url: "https://pixeldrain.com/api/file/oGG3bBnJ"},
    {name: "Rocky 2", logo: "https://image.tmdb.org/t/p/original/iUjveF2SX2YC1C6qFyIuG0Xds0g.jpg", url: "https://pixeldrain.com/api/file/NS6Uvgsk"},
    {name: "Rocky 3", logo: "https://image.tmdb.org/t/p/original/iPwA2IhIdN8Uho6QJjGqFpk95NN.jpg", url: "https://pixeldrain.com/api/file/dtB5tLzr"},
    {name: "Rocky 4", logo: "https://image.tmdb.org/t/p/original/leEgCoRZm9thg9POMcPV8okmVJq.jpg", url: "https://pixeldrain.com/api/file/fvFKTEYo"},
    {name: "Rocky 5", logo: "https://image.tmdb.org/t/p/original/jUM5XFZbJX4QhKCsLkG7wSdW6hj.jpg", url: "https://pixeldrain.com/api/file/2AGi4ZW5"},
    {name: "Rocky 6", logo: "https://image.tmdb.org/t/p/original/bgheMOLFVkpiZ3KhG3PGrMAPdXn.jpg", url: "https://pixeldrain.com/api/file/43ge2RhB"},
    {name: "Truman show", logo: "https://image.tmdb.org/t/p/original/vuza0WqY239yBXOadKlGwJsZJFE.jpg", url: "https://pixeldrain.com/api/file/sgesLm43"},
    {name: "Sociální síť", logo: "https://image.tmdb.org/t/p/original/wwhfLPo8sgBFlYmyqRo3Uj2PTZD.jpg", url: "https://pixeldrain.com/api/file/UaPzgzzY"},
    {name: "Vlk z Wall Street", logo: "https://image.tmdb.org/t/p/original/di5Cs1uex5RPwJNzNsJS30fhCxT.jpg", url: "https://pixeldrain.com/api/file/x1VwRJYo"},
    {name: "Prci prci prcičky", logo: "https://image.tmdb.org/t/p/original/5P68by2Thn8wHAziyWGEw2O7hco.jpg", url: "https://pixeldrain.com/api/file/ivLJ58oa"},
    {name: "Prci prci prcičky 2", logo: "https://image.tmdb.org/t/p/original/1EUeYASNK2nuUITfqDDNbZzGZaP.jpg", url: "https://pixeldrain.com/api/file/EXXjJnnx"},
    {name: "Prci prci prcičky 3 Svatba", logo: "https://image.tmdb.org/t/p/original/pCO3lJv2PzPkJty29APxCVSjyoE.jpg", url: "https://pixeldrain.com/api/file/P2DzJej2"},
    {name: "Prci prci prcičky Školní sraz", logo: "https://image.tmdb.org/t/p/original/iK1Z7eCSdiVfxkRliCWNEwRK6rc.jpg", url: "https://pixeldrain.com/api/file/rcxhMeZY"},
    {name: "Harry Potter a Kámen mudrců", logo: "https://image.tmdb.org/t/p/original/7OKkzHV4ouyRggS8gEX7N9WwS66.jpg", url: "https://pixeldrain.com/api/file/1yJnKdeS"},
    {name: "Harry Potter a Tajemná komnata", logo: "https://image.tmdb.org/t/p/original/n6zpzAOoGx3kYrEzgAMHQZyF5cE.jpg", url: "https://pixeldrain.com/api/file/Shaxg9Gz"},
    {name: "Harry Potter a Vězeň z Azkabanu", logo: "https://image.tmdb.org/t/p/original/sCrAJB4mwiUu9ymq0aRFWY6DcM1.jpg", url: "https://pixeldrain.com/api/file/TfYQSt3S"},
    {name: "Harry Potter a Ohnivý pohár", logo: "https://image.tmdb.org/t/p/original/7VRkmVB23rloRbZHsCRPscXlgQp.jpg", url: "https://pixeldrain.com/api/file/studjC8Y"},
    {name: "Harry Potter a Fénixův řád", logo: "https://image.tmdb.org/t/p/original/sMMjm3NCC3qiDxwVJZd554nCt98.jpg", url: "https://pixeldrain.com/api/file/uTKooA5A"},
    {name: "Harry Potter a Princ dvojí krve", logo: "https://image.tmdb.org/t/p/original/kMGBMPZRAfPMBgSE9LldHYJXoMf.jpg", url: "https://pixeldrain.com/api/file/b5agm5JC"},
    {name: "Harry Potter a Relikvie smrti čast 1", logo: "https://image.tmdb.org/t/p/original/9DqVe6ptXZpY25YTLrOl9MHMN15.jpg", url: "https://pixeldrain.com/api/file/9fvujxjB"}
];

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.visibility = 'hidden';
    }
    
    setRandomHeroMovie();
    displayMovies(allChannels);
    setupCustomControls();
    setupSearchToggle();
});

function getRandomFeaturedMovie() {
    const randomIndex = Math.floor(Math.random() * featuredMovies.length);
    return featuredMovies[randomIndex];
}

function setRandomHeroMovie() {
    const randomMovie = getRandomFeaturedMovie();
    currentHeroMovie = randomMovie;
    
    const heroSection = document.querySelector('.hero');
    const heroLogo = document.querySelector('.hero-logo');
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroSection) {
        heroSection.style.background = `linear-gradient(to right, rgba(20,20,20,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%), url('${randomMovie.background}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
        heroSection.style.visibility = 'visible';
    }
    
    if (heroLogo) {
        heroLogo.src = randomMovie.logo;
        heroLogo.alt = randomMovie.title;
    }
    
    if (heroDescription) {
        heroDescription.textContent = randomMovie.description;
    }
}

function displayMovies(channels) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    channels.forEach(channel => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie-item';
        movieElement.innerHTML = `
            <img src="${channel.logo}" alt="${channel.name}" class="movie-poster" 
                 onerror="this.src='https://via.placeholder.com/200x300/333333/666666?text=EPIC+MOVIE'">
        `;
        
        movieElement.addEventListener('click', () => playChannel(channel.url, channel.name));
        movieContainer.appendChild(movieElement);
    });
}

function playChannel(streamUrl, channelName) {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    videoPlayer.className = 'video-player-visible';
    document.body.style.overflow = 'hidden';
    
    if (hls) {
        hls.destroy();
        hls = null;
    }
    
    video.pause();
    video.removeAttribute('src');
    video.load();
    
    if (Hls.isSupported() && streamUrl.includes('.m3u8')) {
        hls = new Hls({
            debug: false,
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90
        });
        hls.loadSource(streamUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
            video.play();
        });
    } else {
        video.src = streamUrl;
        video.load();
        video.play();
    }
}

function setupCustomControls() {
    const closeBtn = document.querySelector('.close-player-btn-simple');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePlayer);
    }
}

function hidePlayer() {
    const videoPlayer = document.getElementById('video-player');
    const video = document.getElementById('video');
    
    video.pause();
    video.src = '';