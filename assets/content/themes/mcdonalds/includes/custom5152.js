// custom.js - McDonald's

function preload(arrayOfImages) {
    jQuery(arrayOfImages).each(function () {
        jQuery('<img/>')[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:
preload([
    'https://mcdindia.com/wp-content/uploads/2019/12/preloader.gif',
]);

var isScrolledIntoView = function (elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + (jQuery(elem).height()) * 0.07;
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var isScrolledIntoFullView = function (elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

// Header Responsive Menu
jQuery(function ($) {
    $('body header.mk-header .mk-nav-responsive-link').prepend('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="45" viewBox="0 0 64 45"><g id="Group_430" data-name="Group 430" transform="translate(-338 620)"><path id="Path_5" data-name="Path 5" d="M402-596H370.5c-6.1,0-7.993,3-10.737,3-3.29,0-5.376-3-10.064-3-3.434,0-4.494,1.688-6.034,1.688-1.863,0-3.018-1.688-5.666-1.688" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/><path id="Path_3996" data-name="Path 3996" d="M341.852-585.471v1.8a7.2,7.2,0,0,0,7.2,7.2h39.6a7.2,7.2,0,0,0,7.2-7.2v-1.8" transform="translate(1.148 0.471)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/><path id="Path_3997" data-name="Path 3997" d="M396.756-605c-4.673-7.827-14.958-13.987-27-14s-22.328,6.173-27,14" transform="translate(0.244)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/></g></svg>');
});


// Load Fast JS
jQuery(function ($) {
    $('body .mk-page-section').each(function () {
        var thisElem = $(this);
        // thisElem.addClass('section-loaded');
        // if (isScrolledIntoView(thisElem)) {
        //     thisElem.addClass('section-loaded');
        // }
    });

    $(window).on('scroll', function () {
        $('body .mk-page-section').each(function () {
            var thisElem = $(this);
            if (isScrolledIntoView(thisElem)) {
                thisElem.addClass('section-loaded');
            }
        });
    });
})


// Expanding Box js
jQuery(function ($) {
    $.fn.expandingBox = function () {
        this.each(function () {
            var $this = $(this);
            $this.addClass("expanding-box");
            var $button = $("<a class='read-more'>").text("Read More");
            $this.after($button);
            $this.css("position", "relative");
            $this.append($("<div class='fade'>"));
            var collapsedHeight = $this.data('collapsed-height') || 100;
            var originalHeight = $this.height();
            $button.click(function () {
                if ($this.hasClass("collapsed")) {
                    expand();
                } else {
                    collapse();
                }
            });
            collapse();

            function collapse() {
                $this.removeClass("expanded").addClass("collapsed").animate({
                    height: collapsedHeight
                }, 'fast', function () {
                    $button.text("Read More");
                });
            }

            function expand() {
                $this.removeClass("collapsed").addClass("expanded").animate({
                    height: originalHeight
                }, 'fast', function () {
                    $this.height('auto');
                    $button.text("Show Less");
                });
            }
        });
    };
    $(".expanding-box").expandingBox();
});

// Menu Slider JS
jQuery(function ($) {
    if ($('body .menu-slider.slider-shortcode').length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on('scroll', function () {
        var menuslidershortcode = $('body .menu-slider.slider-shortcode');
        if (isScrolledIntoView(menuslidershortcode)) {
            if (menuslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                menuslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $('body .menu-slider.slider-shortcode .slide-image').each(function () {
                    var dataimagesrc = $(this).attr('data-image-src');
                    $(this).css('background-image', 'url(' + dataimagesrc + ')');
                });
            }
        }
    });

    // Slider Variables
    var ms_first = 1;
    ms_totalslides = $('body .first-menu-slider .slides-container .slide').length,
        ms_next = ms_first + 1;
    ms_prev = ms_totalslides;

    function ms_nextVal(elem, totalSlides) {
        ms_totalslides = totalSlides;
        elem = elem + 1;
        if (elem > ms_totalslides) {
            elem = 1;
        }
        return elem;
    }

    function ms_prevVal(elem, totalSlides) {
        ms_totalslides = totalSlides;
        elem = elem - 1;
        if (elem < 1) {
            elem = ms_totalslides;
        }
        return elem;
    }

    var ms_nextwait = ms_nextVal(ms_next, ms_totalslides);
    var ms_prevwait = ms_prevVal(ms_prev, ms_totalslides);

    function ms_recalculatePos(totalSlides) {
        ms_next = ms_nextVal(ms_first, totalSlides);
        ms_prev = ms_prevVal(ms_first, totalSlides);
        ms_nextwait = ms_nextVal(ms_next, totalSlides);
        ms_prevwait = ms_prevVal(ms_prev, totalSlides);
    }

    $('.menu-slider.slider-shortcode .inner-slider').addClass('active');
    $('.menu-slider .inner-slider .slide-size-selector .slide-size-options .slide-option.option-1').addClass('active');
    $('.menu-slider .inner-slider .slide-nutrition .nutrition-value .value-text.value-1').addClass('active');

    // Toggle Slider Size Options
    $('.menu-slider .slide-size-selector .slide-size-options .slide-option').on('click', 'h2', function (event) {
        event.preventDefault();
        var sizeOptionActive = $(this).closest('.slide-option').attr('data-optionno');
        $(this).closest('.slide-size-options').find('.slide-option').removeClass('active');
        $(this).closest('.slide-option').addClass('active');

        $(this).closest('.slider-inner').find('.nutrition-value .value-text').removeClass('active');
        $(this).closest('.slider-inner').find('.nutrition-value .value-text.value-' + sizeOptionActive).addClass('active');
    })

    // Toggle Slider JS
    $('.menu-slider.slider-shortcode .menu-slider-navigation').on('click', '.navigation-item', function () {
        var sliderActive = $(this).attr('data-sliderno');
        $('body .menu-slider.slider-shortcode .inner-slider').removeClass('active');
        $('body .menu-slider.slider-shortcode .inner-slider.slider-' + sliderActive).addClass('active');
        $('body .menu-slider.slider-shortcode').attr('data-slider-active', sliderActive);
        $('body .menu-slider.slider-shortcode .menu-slider-navigation .navigation-item').removeClass('active');
        $(this).addClass('active');
    });

    // Assign Positions
    function ms_assignPos(elem) {
        // Remove Classes
        elem.closest('.inner-slider').find('.slides-container .slide, .slide-nav-container .slide').removeClass('first next prev prevwait nextwait');

        // Add Classes
        elem.closest('.inner-slider').find('.slides-container .slide-' + ms_first + ',.slide-nav-container .slide-' + ms_first).addClass('first');
        elem.closest('.inner-slider').find('.slides-container .slide-' + ms_next + ',.slide-nav-container .slide-' + ms_next).addClass('next');
        elem.closest('.inner-slider').find('.slides-container .slide-' + ms_prev + ',.slide-nav-container .slide-' + ms_prev).addClass('prev');
        elem.closest('.inner-slider').find('.slides-container .slide-' + ms_prevwait + ',.slide-nav-container .slide-' + ms_prevwait).addClass('prevwait');
        elem.closest('.inner-slider').find('.slides-container .slide-' + ms_nextwait + ',.slide-nav-container .slide-' + ms_nextwait).addClass('nextwait');
    }

    function ms_nextClick(elem) {
        ms_totalslides = parseInt(elem.closest('.inner-slider').attr('data-total-slides'));
        ms_recalculatePos(ms_totalslides);
        ms_assignPos(elem);

        // Min height accorfing to first slide
        var firstSlideHeight = elem.closest('.inner-slider').find('.slide-' + ms_first).attr('data-slideheight');
        elem.closest('.inner-slider').find('.slides-container').css('min-height', firstSlideHeight + 'px');
    }

    function ms_prevClick(elem) {
        ms_totalslides = parseInt(elem.closest('.inner-slider').attr('data-total-slides'));
        ms_recalculatePos(ms_totalslides);
        ms_assignPos(elem);

        // Min height accorfing to first slide
        var firstSlideHeight = elem.closest('.inner-slider').find('.slide-' + ms_first).attr('data-slideheight');
        elem.closest('.inner-slider').find('.slides-container').css('min-height', firstSlideHeight + 'px');
    }

    $('body .menu-slider.slider-shortcode .slide-nav-container').on('click', '.nav-left', function () {
        ms_first = parseInt($(this).closest('.inner-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ms_totalslides = parseInt($(this).closest('.inner-slider').attr('data-total-slides'));
        ms_first = ms_prevVal(ms_first, ms_totalslides);
        ms_prevClick($(this));

        // Remove Transition
        $(this).closest('.menu-slider.slider-shortcode').find('.slides-container .slide.prevwait, .slide-nav-container .slide.prevwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-slider.slider-shortcode').find('.slides-container .slide.prevwait, .slide-nav-container .slide.prevwait').removeClass('remove-transition');
        }, 100);
    });

    $('body .menu-slider.slider-shortcode .slide-nav-container').on('click', '.nav-right', function () {
        ms_first = parseInt($(this).closest('.inner-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ms_totalslides = parseInt($(this).closest('.inner-slider').attr('data-total-slides'));
        ms_first = ms_nextVal(ms_first, ms_totalslides);
        ms_nextClick($(this));

        // Remove Transition
        $(this).closest('.menu-slider.slider-shortcode').find('.slides-container .slide.nextwait, .slide-nav-container .slide.nextwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-slider.slider-shortcode').find('.slides-container .slide.nextwait, .slide-nav-container .slide.nextwait').removeClass('remove-transition');
        }, 100);
    });

    $('.menu-slider .inner-slider .slide-nav-container .slides-inner').on('click', '.slide.prev', function () {
        ms_first = parseInt($(this).closest('.inner-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ms_totalslides = parseInt($(this).closest('.inner-slider').attr('data-total-slides'));
        ms_first = ms_prevVal(ms_first, ms_totalslides);
        ms_prevClick($(this));

        // Remove Transition
        $(this).closest('.menu-slider.slider-shortcode').find('.slides-container .slide.prevwait, .slide-nav-container .slide.prevwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-slider.slider-shortcode').find('.slides-container .slide.prevwait, .slide-nav-container .slide.prevwait').removeClass('remove-transition');
        }, 100);
    });

    $('.menu-slider .inner-slider .slide-nav-container .slides-inner').on('click', '.slide.next', function () {
        ms_first = parseInt($(this).closest('.inner-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ms_totalslides = parseInt($(this).closest('.inner-slider').attr('data-total-slides'));
        ms_first = ms_nextVal(ms_first, ms_totalslides);
        ms_nextClick($(this));

        // Remove Transition
        $(this).closest('.menu-slider.slider-shortcode').find('.slides-container .slide.nextwait, .slide-nav-container .slide.nextwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-slider.slider-shortcode').find('.slides-container .slide.nextwait, .slide-nav-container .slide.nextwait').removeClass('remove-transition');
        }, 100);
    });

    $(window).on('load', function () {
        $('body .menu-slider.slider-shortcode .inner-slider').each(function () {
            var thisElem = $(this);
            var sliderTotalSlides = parseInt($(this).attr('data-total-slides'));
            ms_recalculatePos(sliderTotalSlides);
            $(this).find('.slide-' + ms_first).addClass('first');
            $(this).find('.slide-' + ms_next).addClass('next');
            $(this).find('.slide-' + ms_prev).addClass('prev');
            $(this).find('.slide-' + ms_prevwait).addClass('prevwait');
            $(this).find('.slide-' + ms_nextwait).addClass('nextwait');

            thisElem.find('.slides-container .slide').each(function () {
                var slideheight = $(this).height();
                $(this).attr('data-slideheight', slideheight);
            });

            // Min height accorfing to first slide
            var firstSlideHeight = $(this).find('.slide-' + ms_first).attr('data-slideheight');
            $(this).find('.slides-container').css('min-height', firstSlideHeight + 'px');
        });

        $('.menu-slider.slider-shortcode .inner-slider').removeClass('active');
        $('.menu-slider.slider-shortcode .inner-slider.slider-1').addClass('active');
    });

    $('body .menu-slider.slider-shortcode').addClass('slider-loaded');

    $('.menu-section .menu-slider .inner-slider .slider-inner .col-2 .slide-ingredients').each(function () {
        var thisElem = $(this);
        if (thisElem.find('.ingredients-text').html() == '') {
            thisElem.addClass('hidethis');
        }
    });
});

// McDelivery Slider JS
jQuery(function ($) {
    if ($('body .mcdelivery-slider.slider-shortcode').length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on('scroll', function () {
        var mcdeliveryslidershortcode = $('body .mcdelivery-slider.slider-shortcode');
        if (isScrolledIntoView(mcdeliveryslidershortcode)) {
            if (mcdeliveryslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                mcdeliveryslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $('body .mcdelivery-slider.slider-shortcode .slide-image').each(function () {
                    var dataimagesrc = $(this).attr('data-image-src');
                    $(this).css('background-image', 'url(' + dataimagesrc + ')');
                });
            }
        }
    });

    // Slider Variables
    var md_first = 1;
    md_totalslides = $('body .mcdelivery-slider .slides-container .slide').length,
        md_next = md_first + 1;
    md_prev = md_totalslides;

    function md_nextVal(elem) {
        elem = elem + 1;
        if (elem > md_totalslides) {
            elem = 1;
        }
        return elem;
    }

    function md_prevVal(elem) {
        elem = elem - 1;
        if (elem < 1) {
            elem = md_totalslides;
        }
        return elem;
    }

    var md_nextwait = md_nextVal(md_next);
    var md_prevwait = md_prevVal(md_prev);

    function md_recalculatePos() {
        md_next = md_nextVal(md_first);
        md_prev = md_prevVal(md_first);
        md_nextwait = md_nextVal(md_next);
        md_prevwait = md_prevVal(md_prev);
    }

    $('body .mcdelivery-slider.slider-shortcode .slide-' + md_first).addClass('first');
    $('body .mcdelivery-slider.slider-shortcode .slide-' + md_next).addClass('next');
    $('body .mcdelivery-slider.slider-shortcode .slide-' + md_prev).addClass('prev');
    $('body .mcdelivery-slider.slider-shortcode .slide-' + md_prevwait).addClass('prevwait');
    $('body .mcdelivery-slider.slider-shortcode .slide-' + md_nextwait).addClass('nextwait');

    // Assign Positions
    function md_assignPos(elem) {
        // Remove Classes
        elem.closest('.mcdelivery-slider').find('.slides-container .slide').removeClass('first next prev prevwait nextwait');

        // Add Classes
        elem.closest('.mcdelivery-slider').find('.slides-container .slide-' + md_first).addClass('first');
        elem.closest('.mcdelivery-slider').find('.slides-container .slide-' + md_next).addClass('next');
        elem.closest('.mcdelivery-slider').find('.slides-container .slide-' + md_prev).addClass('prev');
        elem.closest('.mcdelivery-slider').find('.slides-container .slide-' + md_prevwait).addClass('prevwait');
        elem.closest('.mcdelivery-slider').find('.slides-container .slide-' + md_nextwait).addClass('nextwait');
    }

    function md_nextClick(elem) {
        md_recalculatePos();
        md_assignPos(elem);
    }

    function md_prevClick(elem) {
        md_recalculatePos();
        md_assignPos(elem);
    }

    $('body .mcdelivery-slider.slider-shortcode .slide-nav-container').on('click', '.nav-left', function () {
        md_first = parseInt($(this).closest('.mcdelivery-slider').find('.slides-container .slide.first').attr('data-slideno'));
        md_first = md_prevVal(md_first);
        md_prevClick($(this));

        // Remove Transition
        $(this).closest('.mcdelivery-slider.slider-shortcode').find('.slides-container .slide.prevwait').addClass('remove-transition');
        setTimeout(function () {
            $('.mcdelivery-slider.slider-shortcode').find('.slides-container .slide.prevwait').removeClass('remove-transition');
        }, 100);
    });

    $('body .mcdelivery-slider.slider-shortcode .slide-nav-container').on('click', '.nav-right', function () {
        md_first = parseInt($(this).closest('.mcdelivery-slider').find('.slides-container .slide.first').attr('data-slideno'));
        md_first = md_nextVal(md_first);
        md_nextClick($(this));

        // Remove Transition
        $(this).closest('.mcdelivery-slider.slider-shortcode').find('.slides-container .slide.nextwait').addClass('remove-transition');
        setTimeout(function () {
            $('.mcdelivery-slider.slider-shortcode').find('.slides-container .slide.nextwait').removeClass('remove-transition');
        }, 100);
    });
});

// First Fold Slider Slider JS
jQuery(function ($) {
    if ($('body .first-fold-slider.slider-shortcode').length == 0) {
        return;
    }

    // Assign Background Images
    $('body .first-fold-slider.slider-shortcode .slide-1 .slide-image').each(function () {
        var dataimagesrc = $(this).attr('data-image-src');
        $(this).css('background-image', 'url(' + dataimagesrc + ')');
    });

    // On Hover load other images
    $('.first-fold-slider.slider-shortcode').on('mouseenter', function () {
        var ffslidershortcode = $('body .first-fold-slider.slider-shortcode');
        if (ffslidershortcode.hasClass("images-loaded")) {
            // do nothing
        } else {
            ffslidershortcode.addClass("images-loaded");

            // Assign Background Images
            $('body .first-fold-slider.slider-shortcode .slide-image').each(function () {
                var dataimagesrc = $(this).attr('data-image-src');
                $(this).css('background-image', 'url(' + dataimagesrc + ')');
            });
        }
    });

    // Slider Variables
    var ff_first = 1;
    ff_totalslides = $('body .first-fold-slider .slides-container .slide').length,
        ff_next = ff_first + 1;
    ff_prev = ff_totalslides;

    function ff_nextVal(elem) {
        elem = elem + 1;
        if (elem > ff_totalslides) {
            elem = 1;
        }
        return elem;
    }

    function ff_prevVal(elem) {
        elem = elem - 1;
        if (elem < 1) {
            elem = ff_totalslides;
        }
        return elem;
    }

    var ff_nextwait = ff_nextVal(ff_next);
    var ff_prevwait = ff_prevVal(ff_prev);

    function ff_recalculatePos() {
        ff_next = ff_nextVal(ff_first);
        ff_prev = ff_prevVal(ff_first);
        ff_nextwait = ff_nextVal(ff_next);
        ff_prevwait = ff_prevVal(ff_prev);
    }

    $('body .first-fold-slider.slider-shortcode .slide-' + ff_first).addClass('first');
    $('body .first-fold-slider.slider-shortcode .slide-' + ff_next).addClass('next');
    $('body .first-fold-slider.slider-shortcode .slide-' + ff_prev).addClass('prev');
    $('body .first-fold-slider.slider-shortcode .slide-' + ff_prevwait).addClass('prevwait');
    $('body .first-fold-slider.slider-shortcode .slide-' + ff_nextwait).addClass('nextwait');

    // Assign Positions
    function ff_assignPos(elem) {
        // Remove Classes
        elem.closest('.first-fold-slider').find('.slide-col .slide').removeClass('first next prev prevwait nextwait');

        // Add Classes
        elem.closest('.first-fold-slider').find('.slide-col .slide-' + ff_first).addClass('first');
        elem.closest('.first-fold-slider').find('.slide-col .slide-' + ff_next).addClass('next');
        elem.closest('.first-fold-slider').find('.slide-col .slide-' + ff_prev).addClass('prev');
        elem.closest('.first-fold-slider').find('.slide-col .slide-' + ff_prevwait).addClass('prevwait');
        elem.closest('.first-fold-slider').find('.slide-col .slide-' + ff_nextwait).addClass('nextwait');
    }

    function ff_nextClick(elem) {
        ff_recalculatePos();
        ff_assignPos(elem);
    }

    function ff_prevClick(elem) {
        ff_recalculatePos();
        ff_assignPos(elem);
    }

    $('body .first-fold-slider.slider-shortcode .slide-nav-container').on('click', '.nav-left', function () {
        ff_first = parseInt($(this).closest('.first-fold-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ff_first = ff_prevVal(ff_first);
        ff_prevClick($(this));

        // Remove Transition
        $(this).closest('.first-fold-slider.slider-shortcode').find('.slide-col .slide.prevwait').addClass('remove-transition');
        setTimeout(function () {
            $('.first-fold-slider.slider-shortcode').find('.slide-col .slide.prevwait').removeClass('remove-transition');
        }, 100);
    });

    $('body .first-fold-slider.slider-shortcode .slide-nav-container').on('click', '.nav-right', function () {
        ff_first = parseInt($(this).closest('.first-fold-slider').find('.slides-container .slide.first').attr('data-slideno'));
        ff_first = ff_nextVal(ff_first);
        ff_nextClick($(this));

        // Remove Transition
        $(this).closest('.first-fold-slider.slider-shortcode').find('.slide-col .slide.nextwait').addClass('remove-transition');
        setTimeout(function () {
            $('.first-fold-slider.slider-shortcode').find('.slide-col .slide.nextwait').removeClass('remove-transition');
        }, 100);
    });
});

// Store Selector JS
jQuery(function ($) {
    if ($('body .store-selector').length == 0) {
        return;
    }

    var allcities = [];

    $('.store-selector .stores-content-list .store-item').each(function () {
        var thisElem = $(this);
        var cityname = thisElem.attr('data-city');
        if (allcities.indexOf(cityname) == -1) {
            allcities.push(cityname);
        }
    });

    allcities = allcities.sort();

    var currentCity = allcities[0];

    for (var i = 0; i < allcities.length; i++) {
        var currItem = allcities[i];
        $('.store-selector .select-store-element .select-inner .select-other-options').append('<div class="select-option option-' + (i + 1) + '" data-city="' + currItem + '">' + currItem + '</div>');
    }

    // Setting Default City
    function currentCityAssign(elem) {
        var countCityElem = $('.store-selector .stores-content-list .store-item[data-city="' + elem + '"]').length;
        if (countCityElem == 1) {
            $('body .store-selector .select-search-results .results-no').html(countCityElem + ' Result');
        } else {
            $('body .store-selector .select-search-results .results-no').html(countCityElem + ' Results');
        }
        $('body .store-selector .select-search-results .results-area').html(elem);
        $('body .store-selector .select-store-element .select-inner .select-option').removeClass('active');
        $('body .store-selector .select-store-element .select-inner .select-option[data-city="' + elem + '"]').addClass('active');
        $('body .store-selector .select-store-element .select-inner .select-option.option-active').attr('data-city', elem);
        $('body .store-selector .select-store-element .select-inner .select-option.option-active').html(elem);
        $('.store-selector .stores-content-list .store-item').removeClass('active-city');
        $('.store-selector .stores-content-list .store-item').css('display', 'none');
        $('.store-selector .stores-content-list .store-item[data-city="' + elem + '"]').addClass('active-city');
        $('.store-selector .stores-content-list .store-item[data-city="' + elem + '"]').css('display', 'flex');
        $('body .stores-section').addClass('city-selected');
        // calculateTopPositonVal();
    }

    function filterStoreType() {
        var activefilters = [];
        $('.store-filter-options').find('.filter-option.filter-active').each(function () {
            var thisElem = $(this);
            var storefilter = thisElem.attr('data-storetype');
            if (activefilters.indexOf(storefilter) == -1) {
                activefilters.push(storefilter);
            }
        });
        activefilters = activefilters.sort();
        if (activefilters.length == 0) {
            $('.store-selector .stores-content-list .store-item.active-city').css('display', 'flex');
            return;
        }

        $('.store-selector .stores-content-list .store-item').css('display', 'none');

        for (var i = 0; i < activefilters.length; i++) {
            var currFilter = activefilters[i];
            $('.store-selector .stores-content-list .store-item.active-city').each(function () {
                var thisElem = $(this);
                var storeTypeList = thisElem.attr('data-storetype');
                if (storeTypeList.indexOf(currFilter) >= 0) {
                    thisElem.css('display', 'flex');
                }
            });
        }
    }

    function calculateTopPositonVal() {
        var elemno = 1;
        var elemTotal = $('.store-selector .stores-content-list .store-item.active-city').length;
        $('.store-selector .stores-content-list').css('min-height', 'fit-content');

        $('.store-selector .stores-content-list .store-item.active-city').each(function () {
            var thisElem = $(this);
            if (elemno == 4) {
                var childPos = thisElem.position().top;
                var childHeight = thisElem.height();
                var calculatedPosTop = childPos + childHeight - 5;
                $('.store-selector .stores-content-list').css('min-height', calculatedPosTop + 'px');
            }
            elemno = elemno + 1;
        });
    }

    // currentCityAssign(currentCity);

    function cityStoreTypeFilters() {
        var allstoretypes = [];
        $('.store-selector .stores-content-list .store-item.active-city').each(function () {
            var thisElem = $(this);
            var storetype = thisElem.attr('data-storetype');
            var storetypearray = storetype.split(',');

            for (var i = 0; i < storetypearray.length; i++) {
                var currStoreType = storetypearray[i];
                currStoreType = currStoreType.trim();
                if (allstoretypes.indexOf(currStoreType) == -1) {
                    allstoretypes.push(currStoreType);
                }
            }
        });

        allstoretypes = allstoretypes.sort();

        for (var i = 0; i < allstoretypes.length; i++) {
            var currItem = allstoretypes[i];
            if (currItem != '') {
                var currItemClass = currItem.toLowerCase();
                currItemClass = currItemClass.replace(' ', '-');
                $('.store-selector .store-filters-element .store-filter-options').append('<div class="filter-option option-' + (i + 1) + ' para-text ' + currItemClass + '" data-storetype="' + currItem + '"><p>' + currItem + '</p></div>');
            }
        }
    }

    $('body .store-selector .select-store-element').on('click', '.select-inner', function () {
        $(this).toggleClass('is-opened');
    });

    $('body .store-selector .select-store-element .select-inner').on('click', '.select-option', function () {
        var clickedCity = $(this).attr('data-city');
        currentCityAssign(clickedCity);
        $('.store-selector .store-filters-element .store-filter-options').html('');
        cityStoreTypeFilters();
        setTimeout(function () {
            $(this).closest('.select-inner').removeClass('is-opened');
        }, 100);
    });

    // Filter Select/Unselect
    $('body .store-selector .store-filter-options').on('click', '.filter-option p', function (event) {
        var thisElem = $(this);
        thisElem.closest('.filter-option').toggleClass('filter-active');
        filterStoreType();
        // calculateTopPositonVal();
    });

    $('.store-selector .stores-content-list .store-item').each(function () {
        var thisElem = $(this);
        var dineStatus = thisElem.find('.store-status.dine-in-status .status-text').html();
        var deliveryStatus = thisElem.find('.store-status.delivery-status .status-text').html();

        if (dineStatus == '') {
            thisElem.addClass('default-status');
            thisElem.find('.store-status.dine-in-status').addClass('Closed');
            thisElem.find('.store-status.dine-in-status .status-text').html('Closed');
        }

        if (deliveryStatus == '') {
            thisElem.addClass('default-status');
            thisElem.find('.store-status.delivery-status').addClass('Closed');
            thisElem.find('.store-status.delivery-status .status-text').html('Closed');
        }
    });

    // Keep Open Stores at first
    $('.store-selector .stores-content-list .store-item.Open').prependTo('.store-selector .stores-content-list');

});

// Birthday Page JS
jQuery(function ($) {
    if ($('body.birthday-page .birthday-store.store-selector').length == 0) {
        return;
    }

    $('body.birthday-page #book-popup').appendTo('body.birthday-page');

    $('body.birthday-page #book-popup .gform_wrapper h3.gform_title').append('<span class="store-information"></span>');

    $('body.birthday-page .birthday-store .store-item .booknow-text').on('click', 'a', function (event) {
        event.preventDefault();
        var sendto_email = $(this).attr('data-sendto');
        var store_id = $(this).attr('data-storeid');
        var store_city = $(this).attr('data-storecity');
        var store_name = $(this).attr('data-storename');

        $('body.birthday-page #book-popup').addClass('popup-active');

        $('body.birthday-page #book-popup .store-email-field input').val(sendto_email);
        $('body.birthday-page #book-popup .store-id-field input').val(store_id);
        $('body.birthday-page #book-popup .store-city-field input').val(store_city);
        $('body.birthday-page #book-popup .store-name-field input').val(store_name);

        $('body.birthday-page #book-popup .gform_wrapper h3.gform_title span').html(store_name);
    });

    $('body.birthday-page #book-popup .popup-close-raw').on('click', '.close-popup', function () {
        $('body.birthday-page #book-popup').removeClass('popup-active');
    });

    $('body.birthday-page').on('click', '#book-popup', function () {
        $(this).removeClass('popup-active');
    });

    $('body.birthday-page #book-popup').on('click', '.popup-row', function (event) {
        event.stopPropagation();
    });

    $('body.birthday-page #book-popup .gform_wrapper').on('click', 'input[type="submit"]', function () {
        setTimeout(function () {
            var store_id = $('body.birthday-page #book-popup .store-id-field input').val();
            var store_city = $('body.birthday-page #book-popup .store-city-field input').val();
            var store_name = $('body.birthday-page #book-popup .store-name-field input').val();
            if ($('body.birthday-page #book-popup .gform_wrapper h3.gform_title .store-information').length == 0) {
                $('body.birthday-page #book-popup .gform_wrapper h3.gform_title').append('<span class="store-information">' + store_name + '</span>');
            }
        }, 2000);
    });

});

// Menu Items JS
jQuery(function ($) {
    if (!$('body').hasClass('menu-page')) {
        return;
    }

    $('body.menu-page .menu-items-shortcode .menu-item-heading a:first-child').addClass('active');
    $(window).on('scroll', function () {
        $('body.menu-page .menu-items-shortcode .menu-item-list').each(function () {
            var thisElem = $(this);
            if (isScrolledIntoFullView(thisElem)) {
                var elemID = thisElem.attr('id');
                $('body.menu-page .menu-items-shortcode .menu-item-heading a').removeClass('active');
                $('body.menu-page .menu-items-shortcode .menu-item-heading a[href="#' + elemID + '"]').addClass('active');
            }
        });
    });

    // Slider Variables
    var ms_first = 1;
    ms_totalslides = 0,
        ms_next = ms_first + 1;
    ms_prev = 0,
        ms_nextwait = 0,
        ms_prevwait = 0,
        ms_slider = 0;

    $('body.menu-page .menu-items-shortcode .menu-elems-container').each(function () {
        var thisElem = $(this);
        var totalSlides = thisElem.find('.menu-item-elem').length;
        if (totalSlides > 3) {
            thisElem.addClass('menu-item-slider');
            thisElem.attr('data-total-slides', totalSlides);
            thisElem.closest('.menu-item-list').find('.menu-category').after('<div class="slide-nav-container"><div class="slide-nav-arrows"><div class="slide-nav nav-left"><svg viewBox="0 0 512 512"><path d="M368 505.6c-8 0-16-3.2-22.4-8l-240-225.6c-6.4-6.4-9.6-14.4-9.6-24 0-8 3.2-16 9.6-22.4l240-224c12.8-11.2 33.6-11.2 44.8 1.6 12.8 12.8 11.2 32-1.6 44.8l-214.4 201.6 216 203.2c12.8 11.2 12.8 32 0 44.8-4.8 4.8-14.4 8-22.4 8z"></path></svg></div><div class="slide-nav nav-right"><svg viewBox="0 0 512 512"><path d="M144 505.6c8 0 16-3.2 22.4-8l240-225.6c6.4-6.4 9.6-14.4 9.6-22.4s-3.2-16-9.6-22.4l-240-224c-12.8-12.8-32-12.8-44.8 0s-11.2 32 1.6 44.8l214.4 201.6-216 203.2c-12.8 11.2-12.8 32 0 44.8 6.4 4.8 14.4 8 22.4 8z"></path></svg></div></div></div>');

            var menuItemHeight = $('body.menu-page .menu-items-shortcode .menu-elems-container').height();
            thisElem.css('min-height', menuItemHeight + 'px');
        }

        thisElem.find('.menu-item-elem').each(function (i) {
            var addClassName = 'slide-' + (i + 1);
            $(this).addClass(addClassName);
            $(this).attr('data-slideno', i + 1);
        });

        ms_prevwait = ms_prevVal(totalSlides, thisElem);
        ms_nextwait = ms_nextVal(ms_next, thisElem);

        thisElem.find('.slide-' + ms_first).addClass('first');
        thisElem.find('.slide-' + ms_next).addClass('next');
        thisElem.find('.slide-' + totalSlides).addClass('prev');
        thisElem.find('.slide-' + ms_prevwait).addClass('prevwait');
        thisElem.find('.slide-' + ms_nextwait).addClass('nextwait');
    });

    function ms_nextVal(elem, slider) {
        ms_totalslides = parseInt(slider.attr('data-total-slides'));
        elem = elem + 1;
        if (elem > ms_totalslides) {
            elem = 1;
        }
        return elem;
    }

    function ms_prevVal(elem, slider) {
        ms_totalslides = parseInt(slider.attr('data-total-slides'));
        elem = elem - 1;
        if (elem < 1) {
            elem = ms_totalslides;
        }
        return elem;
    }

    function ms_recalculatePos(elem, slider) {
        ms_next = ms_nextVal(ms_first, slider);
        ms_prev = ms_prevVal(ms_first, slider);
        ms_nextwait = ms_nextVal(ms_next, slider);
        ms_prevwait = ms_prevVal(ms_prev, slider);
    }

    // Assign Positions
    function ms_assignPos(elem) {
        // Remove Classes
        elem.closest('.menu-item-list').find('.menu-elems-container .slide').removeClass('first next prev prevwait nextwait');

        // Add Classes
        elem.closest('.menu-item-list').find('.menu-elems-container .slide-' + ms_first).addClass('first');
        elem.closest('.menu-item-list').find('.menu-elems-container .slide-' + ms_next).addClass('next');
        elem.closest('.menu-item-list').find('.menu-elems-container .slide-' + ms_prev).addClass('prev');
        elem.closest('.menu-item-list').find('.menu-elems-container .slide-' + ms_prevwait).addClass('prevwait');
        elem.closest('.menu-item-list').find('.menu-elems-container .slide-' + ms_nextwait).addClass('nextwait');
    }

    function ms_nextClick(elem) {
        var curr_slider = elem.closest('.menu-item-list').find('.menu-elems-container');
        ms_recalculatePos(elem, curr_slider);
        ms_assignPos(elem);
    }

    function ms_prevClick(elem) {
        var curr_slider = elem.closest('.menu-item-list').find('.menu-elems-container');
        ms_recalculatePos(elem, curr_slider);
        ms_assignPos(elem);
    }

    $('body .menu-item-list .slide-nav-container').on('click', '.nav-left', function () {

        ms_first = parseInt($(this).closest('.menu-item-list').find('.menu-elems-container .slide.first').attr('data-slideno'));
        ms_slider = $(this).closest('.menu-item-list').find('.menu-elems-container');
        ms_first = ms_prevVal(ms_first, ms_slider);
        ms_prevClick($(this));

        // Remove Transition
        $(this).closest('.menu-item-list').find('.menu-elems-container .slide.prevwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-elems-container').find('.slide.prevwait').removeClass('remove-transition');
        }, 100);
    });

    $('body .menu-item-list .slide-nav-container').on('click', '.nav-right', function () {

        ms_first = parseInt($(this).closest('.menu-item-list').find('.menu-elems-container .slide.first').attr('data-slideno'));
        ms_slider = $(this).closest('.menu-item-list').find('.menu-elems-container');
        ms_first = ms_nextVal(ms_first, ms_slider);
        ms_nextClick($(this));

        // Remove Transition
        $(this).closest('.menu-item-list').find('.menu-elems-container .slide.nextwait').addClass('remove-transition');
        setTimeout(function () {
            $('.menu-elems-container').find('.slide.nextwait').removeClass('remove-transition');
        }, 100);
    });

    $('body .menu-item-list .slide-nav-container').on('mouseenter', '.nav-left', function () {
        $(this).closest('.menu-item-list').find('.menu-elems-container').removeClass('right-click');
        $(this).closest('.menu-item-list').find('.menu-elems-container').addClass('left-click');
    });

    $('body .menu-item-list .slide-nav-container').on('mouseenter', '.nav-right', function () {
        $(this).closest('.menu-item-list').find('.menu-elems-container').removeClass('left-click');
        $(this).closest('.menu-item-list').find('.menu-elems-container').addClass('right-click');
    });
});

// Toys Slider Slider JS
jQuery(function ($) {
    if ($('body .toys-slider-shortcode.slider-shortcode').length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on('scroll', function () {
        var toyslidershortcode = $('body .toys-slider-shortcode.slider-shortcode');
        if (isScrolledIntoView(toyslidershortcode)) {
            if (toyslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                toyslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $('body .toys-slider-shortcode.slider-shortcode .slide-image').each(function () {
                    var dataimagesrc = $(this).attr('data-image-src');
                    $(this).css('background-image', 'url(' + dataimagesrc + ')');
                });;
            }
        }
    });

    // Slider Variables
    var toy_first = 1;
    toy_totalslides = $('body .toys-slider-shortcode .slides-container .slide').length,
        toy_next = toy_first + 1;
    toy_prev = toy_totalslides;

    function toy_nextVal(elem) {
        elem = elem + 1;
        if (elem > toy_totalslides) {
            elem = 1;
        }
        return elem;
    }

    function toy_prevVal(elem) {
        elem = elem - 1;
        if (elem < 1) {
            elem = toy_totalslides;
        }
        return elem;
    }

    var toy_nextwait = toy_nextVal(toy_next);
    var toy_nextwait1 = toy_nextVal(toy_nextwait);
    var toy_nextwait2 = toy_nextVal(toy_nextwait1);
    var toy_nextwait3 = toy_nextVal(toy_nextwait2);
    var toy_prevwait = toy_prevVal(toy_prev);

    function toy_recalculatePos() {
        toy_next = toy_nextVal(toy_first);
        toy_prev = toy_prevVal(toy_first);
        toy_nextwait = toy_nextVal(toy_next);
        toy_nextwait1 = toy_nextVal(toy_nextwait);
        toy_nextwait2 = toy_nextVal(toy_nextwait1);
        toy_nextwait3 = toy_nextVal(toy_nextwait2);
        toy_prevwait = toy_prevVal(toy_prev);
    }

    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_first).addClass('first');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_next).addClass('next');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_prev).addClass('prev');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_prevwait).addClass('prevwait');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_nextwait).addClass('nextwait');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_nextwait1).addClass('nextwait1');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_nextwait2).addClass('nextwait2');
    $('body .toys-slider-shortcode.slider-shortcode .slide-' + toy_nextwait3).addClass('nextwait3');

    // Assign Positions
    function toy_assignPos(elem) {
        // Remove Classes
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide').removeClass('first next prev prevwait nextwait nextwait1 nextwait2 nextwait3');

        // Add Classes
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_first).addClass('first');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_next).addClass('next');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_prev).addClass('prev');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_prevwait).addClass('prevwait');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_nextwait).addClass('nextwait');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_nextwait1).addClass('nextwait1');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_nextwait2).addClass('nextwait2');
        elem.closest('.toys-slider-shortcode').find('.slides-container .slide-' + toy_nextwait3).addClass('nextwait3');
    }

    function toy_nextClick(elem) {
        toy_recalculatePos();
        toy_assignPos(elem);
    }

    function toy_prevClick(elem) {
        toy_recalculatePos();
        toy_assignPos(elem);
    }

    $('body .toys-slider-shortcode.slider-shortcode .slide-nav-container').on('click', '.nav-left', function () {
        toy_first = parseInt($(this).closest('.toys-slider-shortcode').find('.slides-container .slide.first').attr('data-slideno'));
        toy_first = toy_prevVal(toy_first);
        toy_prevClick($(this));

        // Remove Transition
        $(this).closest('.toys-slider-shortcode.slider-shortcode').find('.slides-container .slide.prev').addClass('remove-transition');
        setTimeout(function () {
            $('.toys-slider-shortcode.slider-shortcode').find('.slides-container .slide.prev').removeClass('remove-transition');
        }, 100);
    });

    $('body .toys-slider-shortcode.slider-shortcode .slide-nav-container').on('click', '.nav-right', function () {
        toy_first = parseInt($(this).closest('.toys-slider-shortcode').find('.slides-container .slide.first').attr('data-slideno'));
        toy_first = toy_nextVal(toy_first);
        toy_nextClick($(this));

        // Remove Transition
        $(this).closest('.toys-slider-shortcode.slider-shortcode').find('.slides-container .slide.nextwait3').addClass('remove-transition');
        setTimeout(function () {
            $('.toys-slider-shortcode.slider-shortcode').find('.slides-container .slide.nextwait3').removeClass('remove-transition');
        }, 100);
    });
});

// FAQ Section JS
jQuery(function ($) {
    if ($('body .faq-section').length == 0) {
        return;
    }

    $(window).on('load', function () {
        $('.faq-section .mk-faq-container .mk-faq-toggle:nth-child(1) .mk-toggle-title').trigger('click');
    });
});

// Parallax Text effect
(function ($) {
    var elements = [];
    var windowHeight, windowScrollTop, isRunning = false;

    $.fn.parallaxScrolling = function (options) {
        options = options || {};
        var move = options.move || 20;
        this.each(function () {
            var $this = $(this);
            elements.push({
                $: $this,
                move: move
            });
        });
        recalculate();
        resume();
        return this;
    };

    var $window = $(window);
    $window.on("resize orientationchange", recalculate);
    $window.on("scroll", function () {
        windowScrollTop = $window.scrollTop();
        resume();
    });

    function recalculate() {
        windowHeight = $window.height();
        windowScrollTop = $window.scrollTop();

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var transform = el.$.css("transform");
            el.$.css("transform", "");
            el.height = el.$.outerHeight();
            el.top = el.$.offset().top;
            el.bottom = el.top + el.height;
            el.middle = (el.top + el.bottom) / 2;
            el.$.css("transform", transform);
        }
    }

    function resume() {
        if (!isRunning) {
            isRunning = true;
            requestAnimationFrame(tick);
        }
    }

    function pause() {
        isRunning = false;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var transform = el.$.css("transform");
            if (transform != "none") {
                var currentTranslateY = parseFloat(transform.split(",")[5]);
                var newTranslateY = Math.round(currentTranslateY);
                el.$.css("transform", "translateY(" + newTranslateY + "px)");
            }
        }
    }

    function tick() {
        var anyChanged = false;
        var windowMiddle = windowScrollTop + windowHeight / 2;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];

            var currentTranslateY = 0;
            var transform = el.$.css("transform");
            if (transform != "none") {
                currentTranslateY = parseFloat(transform.split(",")[5]);
            }

            var newTranslateY;
            if (el.top > (windowScrollTop + windowHeight)) {
                newTranslateY = el.move;
            } else if (el.bottom < windowScrollTop) {
                newTranslateY = -el.move;
            } else {
                var ratio = (el.middle - windowMiddle) / ((el.height + windowHeight) / 2);
                var targetTranslateY = Math.round(ratio * el.move);
                // Only move 10% of the way there.
                newTranslateY = currentTranslateY + (targetTranslateY - currentTranslateY) * 0.1;
            }

            // newTranslateY = Math.round(newTranslateY);

            if (!almostEqual(currentTranslateY, newTranslateY)) {
                anyChanged = true;
                el.$.css("transform", "translateY(" + newTranslateY + "px)");
            }

        }
        if (anyChanged) {
            requestAnimationFrame(tick);
        } else {
            pause();
        }
    }

    function almostEqual(x, y) {
        return Math.abs(x - y) < 0.001;
    }

    // HACK
    (function hack() {
        recalculate();
        setTimeout(hack, 2000)
    })();
})(jQuery);

jQuery(function ($) {
    if ($(window).width() < 768) {
        return;
    }
    // var move = $(window).width() < 768 ? 50 : 100;
    var move = 100;

    jQuery([//Home
        "body #theme-page .first-fold-section .first-fold-slider .col-1",
        "body #theme-page .menu-section .page-section-content",
        "body #theme-page .happymeal-section .row-1 .col-1 .vc_column-inner",
        "body #theme-page .birthday-parties-section .page-section-content",
        "body #theme-page .mcdelivery-section .row-1 .col-1 .vc_column-inner",
        "body #theme-page .news-section .page-section-content",
        "body #theme-page .stores-section .page-section-content",
        "body #theme-page .instagram-section .instagram-feed-shortcode .row-1 .col-1 .text-container",
        "body #theme-page .subscribe-section .page-section-content",
        "body #theme-page .icons-section .page-section-content",
        "body #theme-page .bp-first-fold-section .page-section-content",
        "body #theme-page .hm-app-section .page-section-content",

    ].join(", ")).parallaxScrolling({
        move: move
    });
});

// Instagram JS
(function ($) {
    var defaults = {
        'host': "https://www.instagram.com/",
        'username': '',
        'tag': '',
        'container': '',
        'display_profile': true,
        'display_biography': true,
        'display_gallery': true,
        'display_igtv': false,
        'get_data': false,
        'callback': null,
        'styling': true,
        'items': 8,
        'items_per_row': 4,
        'margin': 0.5,
        'image_size': 640
    };
    var image_sizes = {
        "150": 0,
        "240": 1,
        "320": 2,
        "480": 3,
        "640": 4
    };
    var escape_map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    function escape_string(str) {
        return str.replace(/[&<>"'`=\/]/g, function (char) {
            return escape_map[char];
        });
    }

    $.instagramFeed = function (opts) {
        var options = $.fn.extend({}, defaults, opts);
        if (options.username == "" && options.tag == "") {
            console.error("Instagram Feed: Error, no username or tag found.");
            return false;
        }
        if (typeof options.get_raw_json !== "undefined") {
            console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead");
            options.get_data = options.get_raw_json;
        }
        if (!options.get_data && options.container == "") {
            console.error("Instagram Feed: Error, no container found.");
            return false;
        }
        if (options.get_data && options.callback == null) {
            console.error("Instagram Feed: Error, no callback defined to get the raw json");
            return false;
        }

        var is_tag = options.username == "",
            url = is_tag ? options.host + "explore/tags/" + options.tag + "/" : options.host + options.username + "/";

        $.get(url, function (data) {
            data = data.split("window._sharedData = ")[1].split("<\/script>")[0];
            data = JSON.parse(data.substr(0, data.length - 1));
            data = data.entry_data.ProfilePage || data.entry_data.TagPage;
            if (typeof data === "undefined") {
                console.error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25");
                return;
            }
            data = data[0].graphql.user || data[0].graphql.hashtag;

            if (options.get_data) {
                options.callback(data);
                return;
            }

            //Setting styles
            var styles = {
                'profile_container': "",
                'profile_image': "",
                'profile_name': "",
                'profile_biography': "",
                'gallery_image': ""
            };
            if (options.styling) {
                styles.profile_container = " style='text-align:center;'";
                styles.profile_image = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'";
                styles.profile_name = " style='font-size:1.2em;'";
                styles.profile_biography = " style='font-size:1em;'";
                var width = (100 - options.margin * 2 * options.items_per_row) / options.items_per_row;
                styles.gallery_image = " style='margin:" + options.margin + "% " + options.margin + "%;width:" + width + "%;float:left;'";
            }

            var html = "";

            //image size
            var image_index = typeof image_sizes[options.image_size] !== "undefined" ? image_sizes[options.image_size] : image_sizes[640];

            if (options.display_gallery) {
                if (typeof data.is_private !== "undefined" && data.is_private === true) {
                    html += "<p class='instagram_private'><strong>This profile is private</strong></p>";
                } else {
                    var imgs = (data.edge_owner_to_timeline_media || data.edge_hashtag_to_media).edges;
                    max = (imgs.length > options.items) ? options.items : imgs.length;

                    html += "<div class='loop-slider travel-loop-slider'>";
                    html += "<div class='loop-container container-1'>";
                    var count1 = 1;
                    for (var i = 0; i < (max / 2); i++) {
                        var url = "https://www.instagram.com/p/" + imgs[i].node.shortcode,
                            image, type_resource, caption;

                        switch (imgs[i].node.__typename) {
                            case "GraphSidecar":
                                type_resource = "sidecar"
                                image = imgs[i].node.thumbnail_resources[image_index].src;
                                break;
                            case "GraphVideo":
                                type_resource = "video";
                                image = imgs[i].node.thumbnail_src
                                break;
                            default:
                                type_resource = "image";
                                image = imgs[i].node.thumbnail_resources[image_index].src;
                        }

                        if (
                            typeof imgs[i].node.edge_media_to_caption.edges[0] !== "undefined" &&
                            typeof imgs[i].node.edge_media_to_caption.edges[0].node !== "undefined" &&
                            typeof imgs[i].node.edge_media_to_caption.edges[0].node.text !== "undefined" &&
                            imgs[i].node.edge_media_to_caption.edges[0].node.text !== null
                        ) {
                            caption = imgs[i].node.edge_media_to_caption.edges[0].node.text;
                        } else if (
                            typeof imgs[i].node.accessibility_caption !== "undefined" &&
                            imgs[i].node.accessibility_caption !== null
                        ) {
                            caption = imgs[i].node.accessibility_caption;
                        } else {
                            caption = (is_tag ? data.name : data.username) + " image " + i;
                        }

                        html += "<div class='slide slide-" + count1 + "' data-image-src='" + image + "'><a href='" + url + "' rel='noopener' target='_blank'></a></div>";
                        count1 = count1 + 1;
                    }
                    html += "</div>";

                    html += "<div class='loop-container container-2'>";
                    var count1 = 1;
                    for (var i = (max / 2); i < max; i++) {
                        var url = "https://www.instagram.com/p/" + imgs[i].node.shortcode,
                            image, type_resource, caption;

                        switch (imgs[i].node.__typename) {
                            case "GraphSidecar":
                                type_resource = "sidecar"
                                image = imgs[i].node.thumbnail_resources[image_index].src;
                                break;
                            case "GraphVideo":
                                type_resource = "video";
                                image = imgs[i].node.thumbnail_src
                                break;
                            default:
                                type_resource = "image";
                                image = imgs[i].node.thumbnail_resources[image_index].src;
                        }

                        if (
                            typeof imgs[i].node.edge_media_to_caption.edges[0] !== "undefined" &&
                            typeof imgs[i].node.edge_media_to_caption.edges[0].node !== "undefined" &&
                            typeof imgs[i].node.edge_media_to_caption.edges[0].node.text !== "undefined" &&
                            imgs[i].node.edge_media_to_caption.edges[0].node.text !== null
                        ) {
                            caption = imgs[i].node.edge_media_to_caption.edges[0].node.text;
                        } else if (
                            typeof imgs[i].node.accessibility_caption !== "undefined" &&
                            imgs[i].node.accessibility_caption !== null
                        ) {
                            caption = imgs[i].node.accessibility_caption;
                        } else {
                            caption = (is_tag ? data.name : data.username) + " image " + i;
                        }

                        html += "<div class='slide slide-" + count1 + "' data-image-src='" + image + "'><a href='" + url + "' rel='noopener' target='_blank'></a></div>";
                        count1 = count1 + 1;
                    }
                    html += "</div>";
                }
            }

            $(options.container).html(html);

        }).fail(function (e) {
            console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ", e.status);
        });

        return true;
    };

})(jQuery);

// Instagram Feed JS
jQuery(function ($) {
    setTimeout(function () {
        $.instagramFeed({
            'username': 'mcdonaldsinindia',
            'container': "#instagram-feed",
            'items': 12,
        });


    }, 6000);

    setTimeout(function () {
        // Asign background-images to Slides
        $('body #instagram-feed').find('.travel-loop-slider .loop-container .slide').each(function () {
            var dataimagesrc = $(this).attr('data-image-src');
            $(this).css('background-image', 'url(' + dataimagesrc + ')');
        });
    }, 7400);

});

// Happy Meal App JS
jQuery(function ($) {
    if ($('body .happymeal-app-shortcode').length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on('scroll', function () {
        var happymealappshortcode = $('body .happymeal-app-shortcode');
        if (isScrolledIntoView(happymealappshortcode)) {
            if (happymealappshortcode.hasClass("video-loaded")) {
                // do nothing
            } else {
                happymealappshortcode.addClass("video-loaded");
                // Add Video Element
                var videoSrc = happymealappshortcode.find('.happymeal-video').attr('data-video-src');
                happymealappshortcode.find('.happymeal-video').html('<video class="background-video" autoplay="" loop="" muted="" playsinline=""><source src="' + videoSrc + '"></video>');
            }
        }
    });
});

console.log('%c MADE IN THE MOUNTAINS BY ', 'font-weight: bold; font-size: 24px;color: #151515;');
console.log('%c SIDDATWORK ', 'font-weight: bold; font-size: 50px;color: #151515;  border:5px solid #151515');
