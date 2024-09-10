import './style.css'
import dom2image from 'dom-to-image'
import FileSaver from 'file-saver'
import { copyImageToClipboard } from 'copy-image-clipboard'
import bg from './images/bg-illustration.svg'

document.querySelector('#app').innerHTML = `
  <div id='container'>
        <img src={bg} class='bg-image'>
    <div class="main">
        <img src="/images/logo-qr-generator.svg" alt="qr-generator" class="logo">
        <div class="input-div">
            <input type="text" required placeholder='Enter an url' class='inpt' size='38'>
            <button class="btn">QR code</button>
        </div>

    </div>
    <div class='qr-main' id='qr-div'>
        <div class="logo-div">
            <img src='/images/logo-qr-generator.svg' id='back-logo'>
        </div>
        <div>
        <div class="circle" id='circle'>
            <div id="qrcode">

            </div>

        </div>
        <div class="btn-div">
            <button class='btn-b' id='download-btn'>Download <img src='./images/down.svg'></button>
            <button class='btn-b' id='share-btn'>Share <img src='./images/link.svg'></button>
        </div>
        </div>
    </div>
  </div>
`

let btn = document.querySelector('.btn')
let inpt = document.querySelector('.inpt')
let container = document.getElementById('container')
let main = document.querySelector('.main')
let qr = document.getElementById('qr-div')
let back = document.getElementById('back-logo')


window.addEventListener('DOMContentLoaded', removeQRDiv)
back.addEventListener('click',()=> window.location.reload())



function removeQRDiv() {
    console.log('qr', qr)
    container.removeChild(qr)
}
btn.addEventListener('click', createQR)

function createQR() {
    if (inpt.value) {
        container.appendChild(qr)
        container.removeChild(main)
        
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: inpt.value,
            width: 220,
            height: 220,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });


        
    }

    let download = document.getElementById('download-btn')
  download.addEventListener('click', handleDownload)
  let share = document.getElementById('share-btn')
  share.addEventListener('click',handleShare)
}


function handleDownload() {
  let circle = document.getElementById('circle')
  
    
    dom2image.toJpeg(document.getElementById('circle'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
    });
}
function handleShare() {
  let circle = document.getElementById('circle')
  
    
    dom2image.toJpeg(document.getElementById('circle'), { quality: 0.95 })
    .then(function (dataUrl) {
      copyImageToClipboard(dataUrl).then(() => {
          alert('Image Copied To Clipboard')
        })
    });
}




