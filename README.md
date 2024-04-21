<h1 align="center">i-Weather-App</h1>

Read this README in: [Türkçe](README.md) | [English](README.en.md)


  <p align="center">
 <img src="public/images/icons/Vector.png" alt="Logo" width="60" height="80">
  </a>
    <br />
   <a href="https://github.com/emrahbyz/iWeatherApp"><strong>Kaynak Kodları »</strong></a>
    <br />
    <br />
    <a href="https://i-weather-app-wine.vercel.app">Projeye Git</a>
    ·
    <a href="https://github.com/emrahbyz/iWeatherApp/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/emrahbyz/iWeatherApp/issues/new?labels=enhancement&template=feature-request---.md">İstek</a>
  </p>
</div>

<details>
  <summary>İçerik</summary>
  <ol>
    <li>
      <a href="#proje-hakkında">Proje Hakkında</a>
      <ul>
        <li><a href="#ana-özellikler">Ana Özellikler</a></li>
        <li><a href="#ek-paketler">Ek Paketler</a></li>
      </ul>
    </li>
    <li>
      <a href="#kurulum">Kurulum</a>
    </li>
    <li><a href="#kullanım">Kullanım</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#iletişim">İletişim</a></li>
    <li><a href="#teşekkürler">Teşekkür</a></li>
  </ol>
</details>

## Proje Hakkında


<p align="center">
  <img src="src/screenshots/gif.gif" width="600" alt="GIF">
</p>

 <p align="center"> 
  <img src="src/screenshots/13.png" width="500" height="500" alt="Logo">
  <img src="src/screenshots/12.png" width="500" height="500" alt="Logo">
 
</p>




### Ana Özellikler

- **Hava Durumu Bilgisi:** Gerçek zamanlı hava durumu verilerini (sıcaklık, rüzgar hızı, nem, basınç) ve haftalık detaylı tahminleri görüntüleyin.

- **Şehir Keşfi:** Dünyanın herhangi bir şehrini arayın ve hava durumunun yanı sıra en iyi restoranlarını keşfedin.

- **Restoran Keşfi:** Kullanıcı puanlarına, mutfak türlerine ve fotoğraflara göre popüler restoranları bulun (restoran API entegrasyonu gerektirir).

- **Duyarlı Tasarım:** Web uygulaması, farklı cihazlarda (telefon, tablet, masaüstü) sorunsuz çalışacak şekilde duyarlı bir tasarıma sahiptir.

### Kullanılan Teknolojiler

Bu projeyi oluşturmak için şu ana teknolojiler kullanılmıştır:

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" height="60" alt="React Logo">
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1200px-Vitejs-logo.svg.png" width="60" height="60" alt="Vite Logo">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="60" height="60" alt="Tailwind CSS Logo">
</p>

- **React**: Kullanıcı arayüzü geliştirmek için kullanılan JavaScript kütüphanesi.
- **Vite**: Hızlı ve modern bir geliştirme ortamı sağlayan JavaScript aracı.
- **Tailwind CSS**: Hızlı ve esnek bir CSS framework'ü.

### Ek Paketler

Bu projede kullanılan ek paketler ve kütüphaneler:

- **react-select**: Kullanıcı dostu şehir seçimi açılır menüsü sağlar.
- **phosphor-react**: Modern ve özelleştirilebilir hava durumu simgeleri için kullanılır.
- **debounce-promise**: Kullanıcı etkileşimlerini hızla ele alarak performansı optimize eder.
- **axios**: Hava durumu verilerini almak için HTTP istekleri yapar.
- **react-icons**: Font Awesome ve Material Design gibi popüler simge setlerine erişim sağlar.
- **react-geolocated**: Kullanıcının konumunu otomatik olarak belirleyerek hava durumu verilerini alma işlemi için kullanılır.

### Kurulum

1. Depoyu klonlayın:

    ```bash
    git clone https://github.com/emrahbyz/iWeatherApp.git
    ```

2. Proje dizinine gidin:

    ```bash
    cd iWeatherApp
    ```

3. Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

4. (Opsiyonel) Restoran API anahtarınızı konfigürasyon dosyasında ayarlayın (detaylar kod içinde mevcuttur).

5. Geliştirme sunucusunu başlatın:

    ```bash
    npm run dev
    ```

Bu işlem, uygulamayı genellikle [http://localhost:3000](http://localhost:3000) adresinde varsayılan web tarayıcınızda başlatacaktır.



## Kullanım

i-Weather-App, hava durumu bilgilerini görüntülemek ve şehir keşfi yapmak için kullanıcı dostu bir web uygulamasıdır. İşte uygulamanın özellikleri:

- **Hava Durumu Görüntüleme**:
  - Hava durumunu görüntülemek istediğiniz şehrin adını arama çubuğuna girin veya konum hizmetlerinin bulunduğunuz yeri algılamasına izin verin.
  - Sıcaklık, rüzgar hızı, nem, basınç ve haftalık tahmin gibi hava durumu detayları görüntülenecektir.

- **Şehir Keşfi**:
  - Kullanıcı dostu bir arayüz üzerinden şehir keşfi yapın.

- **Restoran Keşfi**:
  - Şehirdeki popüler restoranları keşfedin.

Uygulama, hava durumu bilgilerini gerçek zamanlı olarak görüntüler ve kullanıcıların şehirlerdeki restoranları keşfetmelerine olanak tanır. Harita işlevselliği ile kullanıcılar istedikleri şehirleri görsel olarak keşfedebilir ve hava durumu detaylarına erişebilirler.




## Roadmap

### Hava Durumu Uyarıları

- [ ] Şiddetli hava koşullarında bildirim sağlayan hava durumu uyarıları ekleyin.
  
### Görsel Şehir Keşfi

- [ ] Görsel şehir keşfi için harita işlevsellikleri ekleyin.
  
### Kullanıcı Kimlik Doğrulama Özellikleri

- [ ] Kişiselleştirilmiş deneyimler ve kaydedilen konumlar için kullanıcı kimlik doğrulama özellikleri ekleyin.

### Çoklu Dil Desteği

- [x] Çoklu dil desteği ekle.
  - [ ] Çince
  - [ ] İspanyolca
  - [x] İngilizce


## Katkıda Bulunma

i-Weather-App'i geliştirmek için katkılarınızı memnuniyetle karşılarım! Depoyu forklayın, geliştirmelerinizle pull request'ler oluşturun veya sorunları bildirerek bu uygulamayı daha da iyi hale getirmemize yardımcı olun.

## Iletişim

E-posta: [song.emrah@gmail.com](mailto:song.emrah@gmail.com)

## Teşekkürler

Bu projeyi oluşturmama vesile olan [@ozcanzaferayan](https://github.com/ozcanzaferayan) ve [React-Staj-2024](https://github.com/React-Staj-2024) ekibine teşekkür ederim.


