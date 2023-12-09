let nama, val;
const url_string = document.URL;
const url = new URL(url_string);
let sender;

if (url.searchParams.get('by') != null) {
  sender = url.searchParams.get('by');
} else {
  sender = "Hema";
}

let footer = document.getElementById("credit");
footer.innerHTML = sender;
footer.href = "https://www.instagram.com/Kujiix/";

document.querySelector(".tombol").addEventListener('click', function () {
  Swal.fire("Hallo cantiknya aku ❤️", "Aku mau nanya ke starla 🌟", "question").then(function () {
    Swal.fire("Jawab yang jujur ya!").then(function () {
      Swal.fire("Gak boleh boong yaa hehe", "", "error").then(function () {

        const { value: name } = Swal.fire({
          title: 'Tulis nama kamu boo',
          input: 'text',
          inputLabel: '',
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return 'Isi dulu atuh boo walaupun aku tau nama kamu wkwk'
            } else {
              nama = value;
            }
          }
        }).then(function () {
          const pertanyaan = Swal.fire({
            title: `${nama} sayang gak sama ${sender}?`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: `Sayang`,
            denyButtonText: `Gak`,
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(`${sender} lebih sayang sama kamu hehe ❤️`).then(function () {
                Swal.fire({
                  title: 'Kamu sayang nya berapa banyakk? hehe',
                  icon: 'question',
                  input: 'range',
                  inputLabel: 'Antara 1 - 100 pengennya mah gak ke itung yaa wkwk ',
                  inputAttributes: {
                    min: 1,
                    max: 100,
                    step: 1
                  },
                  inputValue: 50
                }).then((e) => {
                  val = e.value
                  Swal.fire(`Terimakasih ya udah sayang sama akuu ${val}%`).then(function () {
                    Swal.fire({
                      title: `Suka gak sama hadiah nyaa?`,
                      showDenyButton: true,
                      showCancelButton: false,
                      confirmButtonText: `Sukaa`,
                      denyButtonText: `Kurang suka si`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire(`Alhamdulillah kalo kamu sukaa, maaf ya lama ngasih nya hehe sumimase ❤️🙏`).then(function () {
                          Swal.fire('Yang terakhir nih boo').then(function () {
                            Swal.fire('Coba pencet bentuk hati yang ada dibawah hehe')
                          })
                        })
                      } else if (result.isDenied) {
                        Swal.fire('Aku minta maaf kalo kamu gak suka, maafin boo 😭').then(function () {
                          Swal.fire('Maafinn boo 😭')
                        })
                      }
                    })
                  })
                })
              })
            } else if (result.isDenied) {
              Swal.fire(`Kamu beneran tak sayang sama akuu? 😥`, '', 'error').then(function () {
                Swal.fire('Aku minta maaf boo 🙏😭')
              })
            }
          })
        })
      });
    });
  });
});

document.querySelector('.hati').addEventListener('click', function () {
  confetti();
  const teks = document.getElementById('teks');
  const btn = document.querySelector('.tombol');
  teks.classList.remove('d-none')
  btn.classList.add('d-none')
});

'use strict';

var onlyOnKonami = false;

function confetti() {
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000
  var isRunning = true

  setTimeout(() => {
    isRunning = false
  }, runFor);

  var radius = 1 / 10,
    radius2 = radius + radius;

  function createPoisson() {
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i, l, interval, a, b, c, d;

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i + 1], interval = b - a;
        if (dart < measure + interval) {
          spline.push(dart += a - measure);
          break;
        }
        measure += interval;
      }
      c = dart - radius, d = dart + radius;

      for (i = domain.length - 1; i > 0; i -= 2) {
        l = i - 1, a = domain[l], b = domain[i];
        if (a >= c && a < d)
          if (b > d) domain[l] = d;
          else domain.splice(l, 2);
        else if (a < c && b > c)
          if (b <= d) domain[i] = c;
          else domain.splice(i, 0, c, d);
      }

      for (i = domain.length - 1, measure = 0; i >= 0; i -= 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0';
  container.style.left = '0';
  container.style.width = '100%';
  container.style.height = '0';
  container.style.overflow = 'visible';
  container.style.zIndex = '9999';

  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = (5 + 7 * random()) + 'px';
    outerStyle.height = (5 + 7 * random()) + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = .4 + .7 * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -100;
    this.dx = sin(-.1 + -.2 * random());
    this.dy = .13 + .18 * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = 100 * random();
    this.splineY[0] = this.splineY[l] = 100 * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      var phi = this.frame % 7777 / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height;
    };
  }

  function poof() {
    if (!frame) {
      document.body.appendChild(container);
      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random() | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);
          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer = konami[pointer] === event.which ?
      pointer + 1 :
      +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
}

var audioPlaying = false;

function music() {
  var audio = document.getElementById("bgMusic");
  if (!audioPlaying) audio.play();
  else audio.pause();
  audioPlaying = !audioPlaying;
}
