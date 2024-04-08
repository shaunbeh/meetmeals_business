(function ($) {
  $(document).ready(function () {
    $('.header-mm').click(function (e) {
      e.preventDefault();
      $('#mask').fadeIn(500);
      $('#menumobile').addClass('come-menumobile');
    });
    $('#mask').click(function () {
      $(this).fadeOut(500);
      $('#menumobile').removeClass('come-menumobile');
      $('.sub-menu').removeClass('come-submenu');
      $('#requestform').fadeOut(500);
      $('.video-popup').fadeOut(500);
    });
    $('.video-popup .close').click(function () {
      $('.video-popup').fadeOut(500);
      $('#mask').fadeOut(500);
    });
    $('#nomenumobile').click(function () {
      $('#mask').fadeOut(500);
      $('#menumobile').removeClass('come-menumobile');
      $('.sub-menu').removeClass('come-submenu');
    });
    $('#menumobile .main-mm ul > .menu-item-has-children > a').append(
      "<span class='childer'><i></i></span>"
    );
    $('#menumobile .sub-menu').prepend(
      "<li class='title-sub-head'><span class='sub-closer float-left'><i></i></span><strong class='float-right title-subcome'>بازگشت</strong></li>"
    );
    $('#menumobile .sub-closer').click(function () {
      $(this).parent().parent().removeClass('come-submenu');
    });
    $('#menumobile .childer').click(function (e) {
      e.preventDefault();
      var textmenu = $(this).parent().text();
      $(this).parent().next().addClass('come-submenu');
      $(this)
        .parent()
        .next()
        .find('.title-sub-head')
        .find('.title-subcome')
        .html(textmenu);
    });
    jQuery('.help-heading ul li a, .access-post a , .more-tax-desc').on(
      'click',
      function (e) {
        e.preventDefault();
        var hash = this.hash;
        jQuery('html, body').animate(
          { scrollTop: jQuery(hash).offset().top },
          800
        );
      }
    );
    jQuery('.header-search').click(function (e) {
      e.preventDefault();
      jQuery('.search-pup-up').fadeIn(500);
      jQuery('.search-pup-up').addClass('popup-search-active');
    });
    jQuery('.fd-outer').click(function (e) {
      e.preventDefault();
      jQuery('.search-pup-up').fadeOut(500);
      jQuery('.search-pup-up').removeClass('popup-search-active');
    });
    jQuery('.search-close').click(function () {
      jQuery('.search-results-box').html('').fadeOut();
      jQuery('#search-text').val('');
    });
    $.fn.donetyping = function (callback) {
      var _this = $(this);
      var x_timer;
      _this.keyup(function () {
        clearTimeout(x_timer);
        x_timer = setTimeout(clear_timer, 1000);
      });
      function clear_timer() {
        clearTimeout(x_timer);
        callback.call(_this);
      }
    };
    jQuery('#search-text').donetyping(function () {
      var subject = jQuery(this).val().trim();
      if (subject.length > 2) {
        jQuery
          .ajax({
            type: 'post',
            async: true,
            url: ajax_data.url,
            data: {
              action: 'results_search',
              subject: subject,
              keyword: jQuery('#search-text').val(),
            },
            dataType: 'html',
          })
          .done(function (data) {
            jQuery('.search-results-box').html('').html(data).fadeIn(400);
            jQuery('#head_search form').addClass('sc_open');
          });
      } else {
        jQuery('.search-results-box').html('').fadeOut(400);
      }
    });
  });
  jQuery('.tab-links li').click(function (e) {
    e.preventDefault();
    jQuery('.tab-links li').removeClass('active');
    jQuery(this).addClass('active');
    jQuery('.tab-content').removeClass('active in');
    var activeTab = jQuery(this).find('a').attr('href');
    jQuery(activeTab).addClass('active in');
  });
  jQuery('.accordion')
    .off('click')
    .on('click', function (e) {
      e.preventDefault();
      var $this = jQuery(this);
      if ($this.next().hasClass('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
        $this.parent().removeClass('active');
      } else {
        $this.parent().addClass('active');
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
      }
    });
  jQuery('.cat-item .children').slideUp();
  jQuery('.cat-item ')
    .children('.children')
    .after("<span class='caticon'><i class='icon-arrow-down'></i></span>");
  jQuery('.children').parent().addClass('cat-parent');
  jQuery('.cat-parent .caticon').each(function (index) {
    jQuery(this).on('click', function () {
      jQuery(this).toggleClass('active');
      jQuery(this).siblings('.children').slideToggle(300);
      jQuery(this).parent().toggleClass('active');
    });
  });
  jQuery('.sidebar-btn').on('click', function () {
    jQuery(this).siblings('#sidebar').toggleClass('active');
  });
  jQuery('#sidebar').on('click', '.sidebar-close', function () {
    jQuery(this).parent('#sidebar').toggleClass('active');
  });
  function refreshCaptcha() {
    var img = document.images['captchaimg'];
    img.src =
      img.src.substring(0, img.src.lastIndexOf('?')) +
      '?rand=' +
      new Date().getTime();
  }
  function debounce(func) {
    let timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }
  let vh = window.innerHeight * 0.01;
  window.addEventListener(
    'resize',
    debounce(function () {})
  );
  if ($('.item-cat').length) {
    $('.item-cat').readmore({
      speed: 75,
      lessLink:
        '<a class="toggle-more less" href="#">کمتر<i class="icon-arrow-line-left rotate90"></i></a>',
      moreLink:
        '<a class="toggle-more" href="#">بیشتر<i class="icon-arrow-line-left rotate-90"></i></a>',
    });
  }
  const swiperDuplicate = function (el, varname, options) {
    document.querySelectorAll(`.${el}`).forEach((element, i) => {
      let $this = $(element);
      let parent = $this.closest('.sw');
      let target = `${el}-${i}`;
      let pagination = `${el}-pg-${i}`;
      let next = `${el}-nxt-${i}`;
      let prev = `${el}-prv-${i}`;
      let scrollbar = `${el}-scrollbar-${i}`;
      $this.addClass(target);
      parent.find('.swiper-pagination').addClass(pagination);
      parent.find('.swiper-button-next').addClass(next);
      parent.find('.swiper-button-prev').addClass(prev);
      parent.find('.swiper-scrollbar').addClass(scrollbar);
      window[varname] = new Swiper(`.${target}`, {
        ...options,
        pagination: { el: `.${pagination}`, clickable: true },
        scrollbar: { el: `.${scrollbar}`, draggable: true },
        navigation: { nextEl: `.${next}`, prevEl: `.${prev}` },
      });
      console.log(options);
    });
  };
  // const swTumbHero = new Swiper(`.sw-thumbhero`, {
  //   speed: 600,
  //   grabCursor: true,
  //   allowTouchMove: false,
  //   slidesPerView: 6,
  //   direction: 'vertical',
  //   spaceBetween: 10,
  // });
  // const swHero = new Swiper(`.sw-hero`, {
  //   speed: 600,
  //   effect: 'fade',
  //   slidesPerView: 1,
  //   spaceBetween: 10,
  //   autoplay: { delay: 2000 },
  //   thumbs: { swiper: swTumbHero },
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  // });
  // const swProduct = new Swiper(`.sw-product`, {
  //   speed: 300,
  //   slidesPerView: 3,
  //   spaceBetween: 20,
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.5, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 2.5, spaceBetween: 20 },
  //     1200: { slidesPerView: 3, spaceBetween: 20 },
  //   },
  // });
  // const swRelatedCourse = new Swiper(`.sw-course-related`, {
  //   speed: 300,
  //   slidesPerView: 4,
  //   spaceBetween: 12,
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.2, spaceBetween: 10 },
  //     460: { slidesPerView: 1.2, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 3, spaceBetween: 12 },
  //     1200: { slidesPerView: 4, spaceBetween: 12 },
  //   },
  // });
  // const swCheckoutCourse = new Swiper(`.sw-checkout-course`, {
  //   speed: 300,
  //   slidesPerView: 3,
  //   spaceBetween: 12,
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.5, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 3, spaceBetween: 12 },
  //   },
  // });
  // const swArchiveCourseCategory = new Swiper(`.sw-archive-course-category`, {
  //   speed: 300,
  //   spaceBetween: 32,
  //   slidesPerView: 'auto',
  //   breakpoints: { 0: { spaceBetween: 12 }, 576: { spaceBetween: 32 } },
  // });
  // const swblogv2 = new Swiper(`.sw-blogv2`, {
  //   speed: 300,
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.5, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 2.5, spaceBetween: 20 },
  //     1200: { slidesPerView: 3, spaceBetween: 20 },
  //   },
  // });
  // const swblogv4 = new Swiper(`.sw-blogv4`, {
  //   speed: 300,
  //   pagination: { el: '.swiper-pagination', clickable: true },
  //   breakpoints: {
  //     0: { slidesPerView: 1, spaceBetween: 10 },
  //     380: { slidesPerView: 1.2, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 2.5, spaceBetween: 20 },
  //     1200: { slidesPerView: 4, spaceBetween: 20 },
  //   },
  // });
  // const swTestimonials = new Swiper(`.sw-testimonials`, {
  //   speed: 500,
  //   centeredSlides: true,
  //   loop: true,
  //   pagination: { el: '.swiper-pagination', clickable: true },
  //   breakpoints: {
  //     0: { slidesPerView: 1, spaceBetween: 10 },
  //     576: { slidesPerView: 2, spaceBetween: 10 },
  //     768: { slidesPerView: 2.5, spaceBetween: 10 },
  //     992: { slidesPerView: 3, spaceBetween: 20 },
  //   },
  // });
  // const swAwards = new Swiper(`.sw-awards`, {
  //   speed: 300,
  //   centeredSlides: true,
  //   loop: true,
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.5, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 3, spaceBetween: 20 },
  //     1200: { slidesPerView: 5, spaceBetween: 20 },
  //   },
  // });
  // const swGallery = new Swiper(`.sw-gallery`, {
  //   speed: 300,
  //   slidesPerView: 4,
  //   spaceBetween: 15,
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   breakpoints: {
  //     0: { slidesPerView: 1.2, spaceBetween: 10 },
  //     380: { slidesPerView: 1.5, spaceBetween: 10 },
  //     460: { slidesPerView: 1.8, spaceBetween: 10 },
  //     560: { slidesPerView: 2.2, spaceBetween: 10 },
  //     576: { slidesPerView: 2.2, spaceBetween: 10 },
  //     680: { slidesPerView: 2.5, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 10 },
  //     992: { slidesPerView: 3, spaceBetween: 15 },
  //     1200: { slidesPerView: 4, spaceBetween: 15 },
  //   },
  // });
  // const swFaqCat = new Swiper(`.faq-cats .swiper-container`, {
  //   navigation: {
  //     nextEl: `.swiper-button-next`,
  //     prevEl: `.swiper-button-prev`,
  //   },
  //   speed: 300,
  //   breakpoints: {
  //     0: { slidesPerView: 1.5, spaceBetween: 10 },
  //     380: { slidesPerView: 2, spaceBetween: 10 },
  //     460: { slidesPerView: 3, spaceBetween: 10 },
  //     560: { slidesPerView: 3, spaceBetween: 10 },
  //     576: { slidesPerView: 4, spaceBetween: 10 },
  //     680: { slidesPerView: 5, spaceBetween: 10 },
  //     768: { slidesPerView: 6, spaceBetween: 10 },
  //     992: { slidesPerView: 7, spaceBetween: 15 },
  //     1200: { slidesPerView: 8, spaceBetween: 15 },
  //   },
  // });
  // const swSideblog = new Swiper(`.sw-sideblog`, {
  //   speed: 400,
  //   direction: 'vertical',
  //   touchReleaseOnEdges: true,
  //   freeMode: { enabled: true, sticky: true },
  //   waitForTransition: false,
  //   reverseDirection: true,
  //   scrollbar: { el: '.swiper-scrollbar', draggable: true },
  //   mousewheel: { releaseOnEdges: true },
  //   breakpoints: {
  //     0: { slidesPerView: 4, spaceBetween: 4 },
  //     444: { slidesPerView: 3, spaceBetween: 10 },
  //     576: { slidesPerView: 3, spaceBetween: 10 },
  //     768: { slidesPerView: 3, spaceBetween: 20 },
  //     992: { slidesPerView: 7, spaceBetween: 20 },
  //     1200: { slidesPerView: 7, spaceBetween: 20 },
  //   },
  //   on: {
  //     reachEnd: function () {
  //       swSideblog.el.classList.add('remove-mask');
  //     },
  //     reachBeginning: function () {
  //       console.log(this);
  //       swSideblog.el.classList.remove('remove-mask');
  //     },
  //   },
  // });
  const el = document.querySelector('.sw-thumbhero');
  const tab = document.querySelector('.tabs-hero');
  const elAll = document.querySelectorAll('.sw-thumbhero .swiper-slide');
  elAll.forEach((el, i) => {
    el.addEventListener('mouseenter', function () {
      swHero.slideTo(i);
    });
  });
  let tabsHeroSlider = $('.tabs-hero>.item-tab');
  $(tabsHeroSlider).each(function (index, element) {
    $(element).click(function (e) {
      e.preventDefault();
      let currentTab = $(this);
      let tabIndex = currentTab.data('index');
      currentTab.parents('.section-hero').addClass('loading');
      jQuery
        .ajax({
          type: 'post',
          async: true,
          url: ajax_data.url,
          data: {
            action: 'get_home_page_slider_post_by_index',
            tabIndex: tabIndex,
            page_id: currentTab.parents('.section-hero').data('page-id'),
          },
          dataType: 'json',
        })
        .done(function (data) {
          currentTab
            .parents('.section-hero')
            .find('.sw-hero .swiper-wrapper')
            .html('')
            .html(data.data.hero_slides);
          currentTab
            .parents('.section-hero')
            .find('.sw-thumbhero .swiper-wrapper')
            .html('')
            .html(data.data.hero_second_slides);
          currentTab.addClass('active').siblings().removeClass('active');
          swHero.update();
          swTumbHero.update();
          currentTab.parents('.section-hero').removeClass('loading');
        });
    });
  });
  swiperDuplicate('sw-blog', 'swBlog', {
    speed: 300,
    grabCursor: true,
    breakpoints: {
      0: { slidesPerView: 2, spaceBetween: 10 },
      444: { slidesPerView: 2, spaceBetween: 10 },
      576: { slidesPerView: 2, spaceBetween: 10 },
      768: { slidesPerView: 2, spaceBetween: 10 },
      992: { slidesPerView: 3, spaceBetween: 10 },
      1200: { slidesPerView: 4, spaceBetween: 30 },
    },
  });
  let vid = document.querySelectorAll('.video-sm');
  let vidCard = document.querySelectorAll('.card-video-sm');
  if (vidCard) {
    vidCard.forEach((el) => {
      let durtimetext = el.querySelector('.durtimetext');
      let video = el.querySelector('.video-sm video');
      if (video) {
        $(video).on('loadedmetadata', function () {
          let durmins = Math.floor(parseFloat(this.duration / 60));
          let dursecs = Math.floor(parseFloat(this.duration - durmins * 60));
          if (dursecs < 10) {
            dursecs = '0' + dursecs;
          }
          if (durmins < 10) {
            durmins = '0' + durmins;
          }
          durtimetext.innerHTML = durmins + ':' + dursecs;
        });
        video.addEventListener('timeupdate', seektimeupdate, false);
        function seektimeupdate() {
          video.onloadedmetadata = function () {
            var nt = video.currentTime * (100 / vid.duration);
            var curmins = Math.floor(video.currentTime / 60);
            var cursecs = Math.floor(video.currentTime - curmins * 60);
            var durmins = Math.floor(parseFloat(video.duration / 60));
            var dursecs = Math.floor(parseFloat(video.duration - durmins * 60));
            if (cursecs < 10) {
              cursecs = '0' + cursecs;
            }
            if (dursecs < 10) {
              dursecs = '0' + dursecs;
            }
            if (curmins < 10) {
              curmins = '0' + curmins;
            }
            if (durmins < 10) {
              durmins = '0' + durmins;
            }
            durtimetext.innerHTML = durmins + ':' + dursecs;
          };
        }
      }
    });
  }
  window.addEventListener('load', function (e) {
    vid.forEach(function (el) {
      if (el && el.querySelector('video')) {
        el.querySelector('video').setAttribute('muted', 'muted');
        el.querySelector('video').muted = true;
        el.querySelector('.mejs-container.wp-video-shortcode');
        el.addEventListener(
          'mouseover',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.querySelector('video').play();
          },
          true
        );
        el.addEventListener('mouseout', function (e) {
          e.preventDefault();
          e.stopPropagation();
          el.querySelector('video').pause();
        });
      }
    }, true);
  });
  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
  function counter() {
    $('.product-item').each(function () {
      let exptime = $(this).find('.product-sale-expire').val();
      if (exptime != null) {
        let ar = exptime.split('-', 3);
        let myear = ar[0];
        let mmonth = ar[1];
        let mday = ar[2];
        let mhour = '00';
        let mmint = '00';
        let mscnd = '00';
        if (exptime != '') {
          let countDownDate = new Date(
            '' +
              mmonth +
              ' ' +
              mday +
              ', ' +
              myear +
              ' ' +
              mhour +
              ':' +
              mmint +
              ':' +
              mscnd +
              ''
          ).getTime();
          let now = new Date().getTime();
          var distance = countDownDate - now;
          let days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)), 2);
          let hours = pad(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            2
          );
          let minutes = pad(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            2
          );
          let seconds = pad(Math.floor((distance % (1000 * 60)) / 1000), 2);
          $(this)
            .find('.countdown')
            .html(
              '<span>' +
                days +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                hours +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                minutes +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                seconds +
                '</span>'
            );
        }
        if (distance < 0) {
          $(this).find('.product-timer').remove();
        }
      }
    });
    $('.course-item').each(function () {
      let exptime = $(this).find('.course-sale-expire').val();
      if (exptime != null) {
        let ar = exptime.split('-', 3);
        let myear = ar[0];
        let mmonth = ar[1];
        let mday = ar[2];
        let mhour = '00';
        let mmint = '00';
        let mscnd = '00';
        if (exptime != '') {
          let countDownDate = new Date(
            '' +
              mmonth +
              ' ' +
              mday +
              ', ' +
              myear +
              ' ' +
              mhour +
              ':' +
              mmint +
              ':' +
              mscnd +
              ''
          ).getTime();
          let now = new Date().getTime();
          var distance = countDownDate - now;
          let days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)), 2);
          let hours = pad(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            2
          );
          let minutes = pad(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            2
          );
          let seconds = pad(Math.floor((distance % (1000 * 60)) / 1000), 2);
          $(this)
            .find('.countdown')
            .html(
              '<span>' +
                days +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                hours +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                minutes +
                '</span>' +
                '<span>:</span>' +
                '<span>' +
                seconds +
                '</span>'
            );
        }
        if (distance < 0) {
          $(this).find('.product-timer').remove();
        }
      }
    });
  }
  var stimer = setInterval(counter, 1000);
  jQuery('.blog-layout .grid').click(function () {
    if (!jQuery(this).hasClass('active')) {
      jQuery('.blog-layout .list').removeClass('active');
      jQuery('.blog-layout .grid').addClass('active');
      jQuery('.blog-page').addClass('grid');
      jQuery('.blog-page').removeClass('list');
      jQuery('article.postv4').each(function (index, element) {
        jQuery(this).parent().removeClass('col-12');
        jQuery(this).parent().addClass('col-lg-4 col-sm-6 col-md-6');
        jQuery(this).removeClass('d-flex align-items-center');
      });
    }
  });
  jQuery('.blog-layout .list').click(function () {
    if (!jQuery(this).hasClass('active')) {
      jQuery('.blog-layout .grid').removeClass('active');
      jQuery('.blog-layout .list').addClass('active');
      jQuery('.blog-page').addClass('list');
      jQuery('.blog-page').removeClass('grid');
      jQuery('article.postv4').each(function (index, element) {
        jQuery(this).parent().removeClass('col-lg-4 col-sm-6 col-md-6');
        jQuery(this).parent().addClass('col-12');
        jQuery(this).addClass('d-flex align-items-center');
      });
    }
  });
  if ($('.spotplayer-copy-btn').length) {
    $('.spotplayer-copy-btn').each(function (index, element) {
      $(element).click(function () {
        var spotplayerCopy = element;
        var elementLink = $(element).siblings('.spotplayer-copy-link')[0];
        copyToClipboard(elementLink);
        $(spotplayerCopy).addClass('show');
        setTimeout(function () {
          $(spotplayerCopy).removeClass('show');
        }, 2000);
      });
    });
  }
  if ($('#copyButton').length) {
    document
      .getElementById('copyButton')
      .addEventListener('click', function () {
        let status = copyToClipboard(document.getElementById('copyTarget'));
        $('#copyButton').addClass('show');
        setTimeout(function () {
          $('#copyButton').removeClass('show');
        }, 2000);
      });
  }
  jQuery('.auth-container .auth-header .btn-close').click(function () {
    $('.auth-popup').fadeOut();
  });
  jQuery('.auth-btn').click(function () {
    $('.auth-popup').fadeIn().css('display', 'flex');
  });
  var loading_text = 'در حال ارسال اطلاعات...';
  var mobile_required = 'لطفا شماره موبایل خود را وارد نمایید.';
  var mobile_validation = 'شماره موبایل وارد شده معتبر نمی باشد.';
  var added_notify_msg = 'انصراف از اطلاع موجودی محصول';
  var removed_notify_msg = 'اطلاع از موجودی محصول';
  jQuery(document).ready(function ($) {
    if (jQuery('#requestform').length) {
      // $.validator.addMethod('custommobile', function (value, element) {
      //   return (
      //     this.optional(element) ||
      //     /^[0][9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/.test(value)
      //   );
      // });
      var request_rules = request_dyn_data.request_rules;
      var request_messages = request_dyn_data.request_messages;
      // jQuery('#requestform').validate({
      //   rules: request_rules,
      //   messages: request_messages,
      //   submitHandler: function (form) {
      //     dataString = $('#requestform').serialize();
      //     jQuery.ajax({
      //       type: 'post',
      //       dataType: 'json',
      //       data: dataString,
      //       url: request_dyn_data.admin_ajax,
      //       beforeSend: function () {
      //         jQuery('#requestform').append(
      //           '<div class="alert bg-primary">' + loading_text + '</div>'
      //         );
      //         $alert = jQuery('#requestform').find('.alert');
      //       },
      //       success: function (response) {
      //         if (response.status == 0) {
      //           $alert.removeClass('bg-danger bg-success bg-primary');
      //           $alert.addClass('bg-danger');
      //           $alert.text(response.msg);
      //           setTimeout(function () {
      //             $alert.fadeOut('slow', function () {
      //               $alert.remove();
      //             });
      //           }, 2000);
      //         }
      //         if (response.status == 1) {
      //           $alert.removeClass('bg-danger bg-success bg-primary');
      //           $alert.addClass('bg-success');
      //           $alert.text(response.msg);
      //           setTimeout(function () {
      //             $alert.fadeOut('slow', function () {
      //               $alert.remove();
      //             });
      //           }, 2000);
      //         }
      //       },
      //       error: function () {
      //         alert('no');
      //       },
      //     });
      //   },
      // });
    }
  });
  jQuery('#request-btn').click(function () {
    $('#mask').fadeIn(500);
    $('#requestform').fadeIn(500);
  });
  jQuery('#request-close').click(function () {
    $('#mask').fadeOut(500);
    $('#requestform').fadeOut(500);
  });
  if (jQuery('#course_headings .item').length) {
    jQuery('#course_headings .item').each(function (index, element) {
      jQuery(element)
        .children('.top')
        .click(function (e) {
          e.preventDefault();
          jQuery(this)
            .parent()
            .toggleClass('show')
            .siblings()
            .removeClass('show');
          jQuery(this).siblings('.bottom').slideToggle();
          jQuery(this).parent().siblings().children('.bottom').slideUp();
        });
    });
  }
  if (jQuery('#single_course_desc .editor-content').length) {
    let contentHeight = $('#single_course_desc .editor-content').height();
    if (contentHeight > 300) {
      $('#single_course_desc').addClass('has-more');
      $('#single_course_desc .editor-content').css('max-height', 300);
    } else {
      $('#single_course_desc .read-more-btn').remove();
    }
    $('#single_course_desc .read-more-btn').click(function (e) {
      e.preventDefault();
      $(this).parent().toggleClass('show');
      if ($(this).parent().hasClass('show')) {
        $('#single_course_desc .editor-content').css(
          'max-height',
          contentHeight
        );
        $(this).children('span').text('مشاهده کمتر');
      } else {
        $('#single_course_desc .editor-content').css('max-height', 300);
        $(this).children('span').text('مشاهده بیشتر');
      }
    });
  }
  $('.dashboard-sidebar .dropdown-btn').click(function (e) {
    $(this).toggleClass('show');
    $(this).siblings('.list-group').slideToggle();
  });
  if (jQuery('.sw-gallery').length > 0) {
    $('.page_lightgallery').each(function (index, element) {
      lightGallery(element, {
        thumbnail: true,
        selector: '.gallery_item a',
        subHtmlSelectorRelative: true,
      });
    });
  }
  var player = null;
  $('#course_headings .item .bottom span.view').each(function (index, element) {
    $(this).click(function (e) {
      e.preventDefault();
      let video_src = $(this).data('video');
      if ($('#player').length) {
        $('#player source').attr('src', video_src);
        $('#mask').fadeIn(500);
        $('.video-popup').fadeIn(500);
        player = new Plyr('#player');
        player.source = {
          type: 'video',
          title: 'Example title',
          sources: [{ src: video_src, type: 'video/mp4', size: 720 }],
        };
      }
    });
  });
  $('.profile_image_btn').click(function (e) {
    e.preventDefault();
    $('#profile_image').trigger('click');
  });
  $('#profile_image').change(function () {
    if (this.files && this.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        $('.no-image').slideUp();
        $('#has-image').attr('src', e.target.result);
        $('#has-image').slideDown();
        $('#profile_image_delete').val('0');
        $('.profile_image_container').addClass('has-image');
        $('.profile_image_btn').addClass('has-image');
        $('.profile_image_container').removeClass('remove-image');
      };
      reader.readAsDataURL(this.files[0]);
    }
  });
  $('.has-image .trash').click(function (e) {
    e.preventDefault();
    $('#has-image').attr('src', '');
    $('#has-image').hide();
    $('.no-image').slideDown().css('display', 'flex');
    $('#profile_image_delete').val('1');
    $('.profile_image_container').removeClass('has-image');
    $('.profile_image_btn').removeClass('has-image');
    $('.profile_image_container').addClass('remove-image');
  });
})(jQuery);
// if (lightGallery) {
//   let lg = document.querySelectorAll('.sw-awards');
//   for (var i = 0; i < lg.length; i++) {
//     lightGallery(lg[i], {
//       thumbnail: true,
//       selector: '.item-award .item-image',
//       subHtmlSelectorRelative: true,
//     });
//   }
// }
function copyToClipboard(elem) {
  let targetId = '_hiddenCopyText_';
  let isInput = elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA';
  let origSelectionStart, origSelectionEnd;
  if (isInput) {
    target = elem;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
  } else {
    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement('textarea');
      target.style.position = 'absolute';
      target.style.left = '-9999px';
      target.style.top = '0';
      target.id = targetId;
      document.body.appendChild(target);
    }
    target.textContent = elem.textContent;
  }
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);
  var succeed;
  try {
    succeed = document.execCommand('copy');
  } catch (e) {
    succeed = false;
  }
  if (currentFocus && typeof currentFocus.focus === 'function') {
    currentFocus.focus();
  }
  if (isInput) {
    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
    target.textContent = '';
  }
  return succeed;
}
jQuery('.editor-content.main-content > table').each(function (index) {
  jQuery(this).after(
    '<div class="sh-scrollable" id="container_table_' + index + '"></div>'
  );
  jQuery('#container_table_' + index).append(jQuery(this));
  setTimeout(function () {
    jQuery('.editor-content.main-content table').attr(
      'style',
      'display:table!important'
    );
  }, 200);
});
jQuery('.editor-content.main-content a').each(function (index) {
  if (jQuery(this).attr('href').includes('clinicsarmayeh.com')) {
    jQuery(this).attr('target', '_self');
  } else {
    jQuery(this).attr('target', '_blank');
  }
});
