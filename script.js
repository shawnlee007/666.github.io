class PhotoAlbum {
    constructor() {
        this.photos = [
            {
                url: 'images/cartoon1.jpg',
                description: '可爱的卡通画像 1'
            },
            {
                url: 'images/cartoon2.jpg',
                description: '可爱的卡通画像 2'
            },
            {
                url: 'images/cartoon3.jpg',
                description: '可爱的卡通画像 3'
            }
        ];
        
        console.log('初始化相册，图片路径：', this.photos.map(p => p.url));
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 3000; // 3秒切换一次
        
        this.initElements();
        this.setupEventListeners();
        this.showPhoto(0);
        this.createThumbnails();
    }

    initElements() {
        this.currentPhoto = document.getElementById('current-photo');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.playBtn = document.querySelector('.play-btn');
        this.pauseBtn = document.querySelector('.pause-btn');
        this.thumbnailContainer = document.querySelector('.thumbnail-container');
        this.photoDescription = document.querySelector('.photo-description');
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.showPrevPhoto());
        this.nextBtn.addEventListener('click', () => this.showNextPhoto());
        this.playBtn.addEventListener('click', () => this.startAutoPlay());
        this.pauseBtn.addEventListener('click', () => this.stopAutoPlay());
    }

    showPhoto(index) {
        this.currentIndex = index;
        const loadingText = document.querySelector('.loading-text');
        loadingText.style.display = 'block';
        
        const photo = this.photos[index];
        console.log('当前图片路径:', photo.url);
        
        const img = new Image();
        
        img.onload = () => {
            console.log('图片加载成功:', photo.url);
            this.currentPhoto.classList.remove('show');
            setTimeout(() => {
                this.currentPhoto.src = photo.url;
                this.currentPhoto.classList.add('show');
                this.photoDescription.textContent = photo.description;
                loadingText.style.display = 'none';
            }, 500);
        };
        
        img.onerror = (e) => {
            console.error('图片加载失败:', photo.url);
            console.error('错误详情:', e);
            loadingText.textContent = '图片加载失败 - ' + photo.url;
            loadingText.style.display = 'block';
        };
        
        img.src = photo.url;
        this.updateThumbnails();
    }

    startAutoPlay() {
        this.playBtn.style.display = 'none';
        this.pauseBtn.style.display = 'inline-block';
        this.autoPlayInterval = setInterval(() => {
            this.showNextPhoto();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        this.playBtn.style.display = 'inline-block';
        this.pauseBtn.style.display = 'none';
        clearInterval(this.autoPlayInterval);
    }

    showPrevPhoto() {
        const newIndex = (this.currentIndex - 1 + this.photos.length) % this.photos.length;
        this.showPhoto(newIndex);
    }

    showNextPhoto() {
        const newIndex = (this.currentIndex + 1) % this.photos.length;
        this.showPhoto(newIndex);
    }

    createThumbnails() {
        this.photos.forEach((photo, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `<img src="${photo.url}" alt="缩略图 ${index + 1}">`;
            thumbnail.addEventListener('click', () => {
                this.stopAutoPlay();
                this.showPhoto(index);
            });
            this.thumbnailContainer.appendChild(thumbnail);
        });
    }

    updateThumbnails() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhotoAlbum();
}); 