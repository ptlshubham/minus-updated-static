// custom.js - McDonald's

function preload(arrayOfImages) {
    jQuery(arrayOfImages).each(function () {
        jQuery("<img/>")[0].src = this;
        // Alternatively you could use:
        // (new Image()).src = this;
    });
}

// Usage:
preload([
    "https://mcdindia.com/wp-content/uploads/2019/12/preloader.gif",
    "https://mcdindia.com/wp-content/uploads/2022/01/img-makhani-burger-2.jpg",
]);

var isScrolledIntoView = function (elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height() * 0.07;
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
};

var isScrolledIntoFullView = function (elem) {
    var docViewTop = jQuery(window).scrollTop();
    var docViewBottom = docViewTop + jQuery(window).height();
    var elemTop = jQuery(elem).offset().top;
    var elemBottom = elemTop + jQuery(elem).height();
    return elemBottom <= docViewBottom && elemTop >= docViewTop;
};

// Header Responsive Menu
jQuery(function ($) {
    $("body header.mk-header .mk-nav-responsive-link").prepend(
        '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="45" viewBox="0 0 64 45"><g id="Group_430" data-name="Group 430" transform="translate(-338 620)"><path id="Path_5" data-name="Path 5" d="M402-596H370.5c-6.1,0-7.993,3-10.737,3-3.29,0-5.376-3-10.064-3-3.434,0-4.494,1.688-6.034,1.688-1.863,0-3.018-1.688-5.666-1.688" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/><path id="Path_3996" data-name="Path 3996" d="M341.852-585.471v1.8a7.2,7.2,0,0,0,7.2,7.2h39.6a7.2,7.2,0,0,0,7.2-7.2v-1.8" transform="translate(1.148 0.471)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/><path id="Path_3997" data-name="Path 3997" d="M396.756-605c-4.673-7.827-14.958-13.987-27-14s-22.328,6.173-27,14" transform="translate(0.244)" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2"/></g></svg>'
    );
});

// Load Fast JS
jQuery(function ($) {
    $("body .mk-page-section").each(function () {
        var thisElem = $(this);
        // thisElem.addClass('section-loaded');
        // if (isScrolledIntoView(thisElem)) {
        //     thisElem.addClass('section-loaded');
        // }
    });

    $(window).on("scroll", function () {
        $("body .mk-page-section").each(function () {
            var thisElem = $(this);
            if (isScrolledIntoView(thisElem)) {
                thisElem.addClass("section-loaded");
            }
        });
    });
});

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
            var collapsedHeight = $this.data("collapsed-height") || 100;
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
                $this
                    .removeClass("expanded")
                    .addClass("collapsed")
                    .animate(
                        {
                            height: collapsedHeight,
                        },
                        "fast",
                        function () {
                            $button.text("Read More");
                        }
                    );
            }

            function expand() {
                $this
                    .removeClass("collapsed")
                    .addClass("expanded")
                    .animate(
                        {
                            height: originalHeight,
                        },
                        "fast",
                        function () {
                            $this.height("auto");
                            $button.text("Show Less");
                        }
                    );
            }
        });
    };
    $(".expanding-box").expandingBox();
});

// Menu Slider JS
jQuery(function ($) {
    if ($("body .menu-slider.slider-shortcode").length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on("scroll", function () {
        var menuslidershortcode = $("body .menu-slider.slider-shortcode");
        if (isScrolledIntoView(menuslidershortcode)) {
            if (menuslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                menuslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $("body .menu-slider.slider-shortcode .slide-image").each(
                    function () {
                        var dataimagesrc = $(this).attr("data-image-src");
                        $(this).css(
                            "background-image",
                            "url(" + dataimagesrc + ")"
                        );
                    }
                );
            }
        }
    });

    // Slider Variables
    var ms_first = 1;
    (ms_totalslides = $(
        "body .first-menu-slider .slides-container .slide"
    ).length),
        (ms_next = ms_first + 1);
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

    $(".menu-slider.slider-shortcode .inner-slider").addClass("active");
    $(
        ".menu-slider .inner-slider .slide-size-selector .slide-size-options .slide-option.option-1"
    ).addClass("active");
    $(
        ".menu-slider .inner-slider .slide-nutrition .nutrition-value .value-text.value-1"
    ).addClass("active");

    // Toggle Slider Size Options
    $(".menu-slider .slide-size-selector .slide-size-options .slide-option").on(
        "click",
        "h2",
        function (event) {
            event.preventDefault();
            var sizeOptionActive = $(this)
                .closest(".slide-option")
                .attr("data-optionno");
            $(this)
                .closest(".slide-size-options")
                .find(".slide-option")
                .removeClass("active");
            $(this).closest(".slide-option").addClass("active");

            $(this)
                .closest(".slider-inner")
                .find(".nutrition-value .value-text")
                .removeClass("active");
            $(this)
                .closest(".slider-inner")
                .find(".nutrition-value .value-text.value-" + sizeOptionActive)
                .addClass("active");
        }
    );

    // Toggle Slider JS
    $(".menu-slider.slider-shortcode .menu-slider-navigation").on(
        "click",
        ".navigation-item",
        function () {
            var sliderActive = $(this).attr("data-sliderno");
            $("body .menu-slider.slider-shortcode .inner-slider").removeClass(
                "active"
            );
            $(
                "body .menu-slider.slider-shortcode .inner-slider.slider-" +
                sliderActive
            ).addClass("active");
            $("body .menu-slider.slider-shortcode").attr(
                "data-slider-active",
                sliderActive
            );
            $(
                "body .menu-slider.slider-shortcode .menu-slider-navigation .navigation-item"
            ).removeClass("active");
            $(this).addClass("active");
        }
    );

    // Assign Positions
    function ms_assignPos(elem) {
        // Remove Classes
        elem.closest(".inner-slider")
            .find(".slides-container .slide, .slide-nav-container .slide")
            .removeClass("first next prev prevwait nextwait");

        // Add Classes
        elem.closest(".inner-slider")
            .find(
                ".slides-container .slide-" +
                ms_first +
                ",.slide-nav-container .slide-" +
                ms_first
            )
            .addClass("first");
        elem.closest(".inner-slider")
            .find(
                ".slides-container .slide-" +
                ms_next +
                ",.slide-nav-container .slide-" +
                ms_next
            )
            .addClass("next");
        elem.closest(".inner-slider")
            .find(
                ".slides-container .slide-" +
                ms_prev +
                ",.slide-nav-container .slide-" +
                ms_prev
            )
            .addClass("prev");
        elem.closest(".inner-slider")
            .find(
                ".slides-container .slide-" +
                ms_prevwait +
                ",.slide-nav-container .slide-" +
                ms_prevwait
            )
            .addClass("prevwait");
        elem.closest(".inner-slider")
            .find(
                ".slides-container .slide-" +
                ms_nextwait +
                ",.slide-nav-container .slide-" +
                ms_nextwait
            )
            .addClass("nextwait");
    }

    function ms_nextClick(elem) {
        ms_totalslides = parseInt(
            elem.closest(".inner-slider").attr("data-total-slides")
        );
        ms_recalculatePos(ms_totalslides);
        ms_assignPos(elem);

        // Min height accorfing to first slide
        var firstSlideHeight = elem
            .closest(".inner-slider")
            .find(".slide-" + ms_first)
            .attr("data-slideheight");
        elem.closest(".inner-slider")
            .find(".slides-container")
            .css("min-height", firstSlideHeight + "px");
    }

    function ms_prevClick(elem) {
        ms_totalslides = parseInt(
            elem.closest(".inner-slider").attr("data-total-slides")
        );
        ms_recalculatePos(ms_totalslides);
        ms_assignPos(elem);

        // Min height accorfing to first slide
        var firstSlideHeight = elem
            .closest(".inner-slider")
            .find(".slide-" + ms_first)
            .attr("data-slideheight");
        elem.closest(".inner-slider")
            .find(".slides-container")
            .css("min-height", firstSlideHeight + "px");
    }

    $("body .menu-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-left",
        function () {
            ms_first = parseInt(
                $(this)
                    .closest(".inner-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ms_totalslides = parseInt(
                $(this).closest(".inner-slider").attr("data-total-slides")
            );
            ms_first = ms_prevVal(ms_first, ms_totalslides);
            ms_prevClick($(this));

            // Remove Transition
            $(this)
                .closest(".menu-slider.slider-shortcode")
                .find(
                    ".slides-container .slide.prevwait, .slide-nav-container .slide.prevwait"
                )
                .addClass("remove-transition");
            setTimeout(function () {
                $(".menu-slider.slider-shortcode")
                    .find(
                        ".slides-container .slide.prevwait, .slide-nav-container .slide.prevwait"
                    )
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $("body .menu-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-right",
        function () {
            ms_first = parseInt(
                $(this)
                    .closest(".inner-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ms_totalslides = parseInt(
                $(this).closest(".inner-slider").attr("data-total-slides")
            );
            ms_first = ms_nextVal(ms_first, ms_totalslides);
            ms_nextClick($(this));

            // Remove Transition
            $(this)
                .closest(".menu-slider.slider-shortcode")
                .find(
                    ".slides-container .slide.nextwait, .slide-nav-container .slide.nextwait"
                )
                .addClass("remove-transition");
            setTimeout(function () {
                $(".menu-slider.slider-shortcode")
                    .find(
                        ".slides-container .slide.nextwait, .slide-nav-container .slide.nextwait"
                    )
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $(".menu-slider .inner-slider .slide-nav-container .slides-inner").on(
        "click",
        ".slide.prev",
        function () {
            ms_first = parseInt(
                $(this)
                    .closest(".inner-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ms_totalslides = parseInt(
                $(this).closest(".inner-slider").attr("data-total-slides")
            );
            ms_first = ms_prevVal(ms_first, ms_totalslides);
            ms_prevClick($(this));

            // Remove Transition
            $(this)
                .closest(".menu-slider.slider-shortcode")
                .find(
                    ".slides-container .slide.prevwait, .slide-nav-container .slide.prevwait"
                )
                .addClass("remove-transition");
            setTimeout(function () {
                $(".menu-slider.slider-shortcode")
                    .find(
                        ".slides-container .slide.prevwait, .slide-nav-container .slide.prevwait"
                    )
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $(".menu-slider .inner-slider .slide-nav-container .slides-inner").on(
        "click",
        ".slide.next",
        function () {
            ms_first = parseInt(
                $(this)
                    .closest(".inner-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ms_totalslides = parseInt(
                $(this).closest(".inner-slider").attr("data-total-slides")
            );
            ms_first = ms_nextVal(ms_first, ms_totalslides);
            ms_nextClick($(this));

            // Remove Transition
            $(this)
                .closest(".menu-slider.slider-shortcode")
                .find(
                    ".slides-container .slide.nextwait, .slide-nav-container .slide.nextwait"
                )
                .addClass("remove-transition");
            setTimeout(function () {
                $(".menu-slider.slider-shortcode")
                    .find(
                        ".slides-container .slide.nextwait, .slide-nav-container .slide.nextwait"
                    )
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $(window).on("load", function () {
        $("body .menu-slider.slider-shortcode .inner-slider").each(function () {
            var thisElem = $(this);
            var sliderTotalSlides = parseInt($(this).attr("data-total-slides"));
            ms_recalculatePos(sliderTotalSlides);
            $(this)
                .find(".slide-" + ms_first)
                .addClass("first");
            $(this)
                .find(".slide-" + ms_next)
                .addClass("next");
            $(this)
                .find(".slide-" + ms_prev)
                .addClass("prev");
            $(this)
                .find(".slide-" + ms_prevwait)
                .addClass("prevwait");
            $(this)
                .find(".slide-" + ms_nextwait)
                .addClass("nextwait");

            thisElem.find(".slides-container .slide").each(function () {
                var slideheight = $(this).height();
                $(this).attr("data-slideheight", slideheight);
            });

            // Min height accorfing to first slide
            var firstSlideHeight = $(this)
                .find(".slide-" + ms_first)
                .attr("data-slideheight");
            $(this)
                .find(".slides-container")
                .css("min-height", firstSlideHeight + "px");
        });

        $(".menu-slider.slider-shortcode .inner-slider").removeClass("active");
        $(".menu-slider.slider-shortcode .inner-slider.slider-1").addClass(
            "active"
        );
    });

    $("body .menu-slider.slider-shortcode").addClass("slider-loaded");

    $(
        ".menu-section .menu-slider .inner-slider .slider-inner .col-2 .slide-ingredients"
    ).each(function () {
        var thisElem = $(this);
        if (thisElem.find(".ingredients-text").html() == "") {
            thisElem.addClass("hidethis");
        }
    });

    $('.menu-section .menu-slider .inner-slider .slider-inner .col-1 .slide-desc .slide-serving-info').each(function () {
        var thisElem1 = $(this);
        if (thisElem1.find('.slide-serving-value').html() == '') {
            thisElem1.addClass('hidethis');
        }
    });

    $('.menu-section .menu-slider .inner-slider .slider-inner .col-1 .slide-desc .slide-allergen-info').each(function () {
        var thisEl = $(this);
        if (thisEl.find('.slide-allergen-value').html() == '') {
            thisEl.addClass('hidethis');
        }
    });

});

// McDelivery Slider JS
jQuery(function ($) {
    if ($("body .mcdelivery-slider.slider-shortcode").length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on("scroll", function () {
        var mcdeliveryslidershortcode = $(
            "body .mcdelivery-slider.slider-shortcode"
        );
        if (isScrolledIntoView(mcdeliveryslidershortcode)) {
            if (mcdeliveryslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                mcdeliveryslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $("body .mcdelivery-slider.slider-shortcode .slide-image").each(
                    function () {
                        var dataimagesrc = $(this).attr("data-image-src");
                        $(this).css(
                            "background-image",
                            "url(" + dataimagesrc + ")"
                        );
                    }
                );
            }
        }
    });

    // Slider Variables
    var md_first = 1;
    (md_totalslides = $(
        "body .mcdelivery-slider .slides-container .slide"
    ).length),
        (md_next = md_first + 1);
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

    $("body .mcdelivery-slider.slider-shortcode .slide-" + md_first).addClass(
        "first"
    );
    $("body .mcdelivery-slider.slider-shortcode .slide-" + md_next).addClass(
        "next"
    );
    $("body .mcdelivery-slider.slider-shortcode .slide-" + md_prev).addClass(
        "prev"
    );
    $(
        "body .mcdelivery-slider.slider-shortcode .slide-" + md_prevwait
    ).addClass("prevwait");
    $(
        "body .mcdelivery-slider.slider-shortcode .slide-" + md_nextwait
    ).addClass("nextwait");

    // Assign Positions
    function md_assignPos(elem) {
        // Remove Classes
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide")
            .removeClass("first next prev prevwait nextwait");

        // Add Classes
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide-" + md_first)
            .addClass("first");
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide-" + md_next)
            .addClass("next");
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide-" + md_prev)
            .addClass("prev");
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide-" + md_prevwait)
            .addClass("prevwait");
        elem.closest(".mcdelivery-slider")
            .find(".slides-container .slide-" + md_nextwait)
            .addClass("nextwait");
    }

    function md_nextClick(elem) {
        md_recalculatePos();
        md_assignPos(elem);
    }

    function md_prevClick(elem) {
        md_recalculatePos();
        md_assignPos(elem);
    }

    $("body .mcdelivery-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-left",
        function () {
            md_first = parseInt(
                $(this)
                    .closest(".mcdelivery-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            md_first = md_prevVal(md_first);
            md_prevClick($(this));

            // Remove Transition
            $(this)
                .closest(".mcdelivery-slider.slider-shortcode")
                .find(".slides-container .slide.prevwait")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".mcdelivery-slider.slider-shortcode")
                    .find(".slides-container .slide.prevwait")
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $("body .mcdelivery-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-right",
        function () {
            md_first = parseInt(
                $(this)
                    .closest(".mcdelivery-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            md_first = md_nextVal(md_first);
            md_nextClick($(this));

            // Remove Transition
            $(this)
                .closest(".mcdelivery-slider.slider-shortcode")
                .find(".slides-container .slide.nextwait")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".mcdelivery-slider.slider-shortcode")
                    .find(".slides-container .slide.nextwait")
                    .removeClass("remove-transition");
            }, 100);
        }
    );
});

// First Fold Slider Slider JS
jQuery(function ($) {
    if ($("body .first-fold-slider.slider-shortcode").length == 0) {
        return;
    }

    // Assign Background Images
    $("body .first-fold-slider.slider-shortcode .slide-1 .slide-image").each(
        function () {
            var dataimagesrc = $(this).attr("data-image-src");
            $(this).css("background-image", "url(" + dataimagesrc + ")");
        }
    );

    // On Hover load other images
    $(".first-fold-slider.slider-shortcode").on("mouseenter", function () {
        var ffslidershortcode = $("body .first-fold-slider.slider-shortcode");
        if (ffslidershortcode.hasClass("images-loaded")) {
            // do nothing
        } else {
            ffslidershortcode.addClass("images-loaded");

            // Assign Background Images
            $("body .first-fold-slider.slider-shortcode .slide-image").each(
                function () {
                    var dataimagesrc = $(this).attr("data-image-src");
                    $(this).css(
                        "background-image",
                        "url(" + dataimagesrc + ")"
                    );
                }
            );
        }
    });

    // Slider Variables
    var ff_first = 1;
    (ff_totalslides = $(
        "body .first-fold-slider .slides-container .slide"
    ).length),
        (ff_next = ff_first + 1);
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

    $("body .first-fold-slider.slider-shortcode .slide-" + ff_first).addClass(
        "first"
    );
    $("body .first-fold-slider.slider-shortcode .slide-" + ff_next).addClass(
        "next"
    );
    $("body .first-fold-slider.slider-shortcode .slide-" + ff_prev).addClass(
        "prev"
    );
    $(
        "body .first-fold-slider.slider-shortcode .slide-" + ff_prevwait
    ).addClass("prevwait");
    $(
        "body .first-fold-slider.slider-shortcode .slide-" + ff_nextwait
    ).addClass("nextwait");

    // Assign Positions
    function ff_assignPos(elem) {
        // Remove Classes
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide")
            .removeClass("first next prev prevwait nextwait");

        // Add Classes
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide-" + ff_first)
            .addClass("first");
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide-" + ff_next)
            .addClass("next");
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide-" + ff_prev)
            .addClass("prev");
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide-" + ff_prevwait)
            .addClass("prevwait");
        elem.closest(".first-fold-slider")
            .find(".slide-col .slide-" + ff_nextwait)
            .addClass("nextwait");
    }

    function ff_nextClick(elem) {
        ff_recalculatePos();
        ff_assignPos(elem);
    }

    function ff_prevClick(elem) {
        ff_recalculatePos();
        ff_assignPos(elem);
    }

    $("body .first-fold-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-left",
        function () {
            ff_first = parseInt(
                $(this)
                    .closest(".first-fold-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ff_first = ff_prevVal(ff_first);
            ff_prevClick($(this));

            // Remove Transition
            $(this)
                .closest(".first-fold-slider.slider-shortcode")
                .find(".slide-col .slide.prevwait")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".first-fold-slider.slider-shortcode")
                    .find(".slide-col .slide.prevwait")
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $("body .first-fold-slider.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-right",
        function () {
            ff_first = parseInt(
                $(this)
                    .closest(".first-fold-slider")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            ff_first = ff_nextVal(ff_first);
            ff_nextClick($(this));

            // Remove Transition
            $(this)
                .closest(".first-fold-slider.slider-shortcode")
                .find(".slide-col .slide.nextwait")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".first-fold-slider.slider-shortcode")
                    .find(".slide-col .slide.nextwait")
                    .removeClass("remove-transition");
            }, 100);
        }
    );
});

// Store Selector JS
jQuery(function ($) {
    if ($("body .store-selector").length == 0) {
        return;
    }

    var allcities = [];

    $(".store-selector .stores-content-list .store-item").each(function () {
        var thisElem = $(this);
        var cityname = thisElem.attr("data-city");
        if (allcities.indexOf(cityname) == -1) {
            allcities.push(cityname);
        }
    });

    allcities = allcities.sort();

    var currentCity = allcities[0];

    for (var i = 0; i < allcities.length; i++) {
        var currItem = allcities[i];
        $(
            ".store-selector .select-store-element .select-inner .select-other-options"
        ).append(
            '<div class="select-option option-' +
            (i + 1) +
            '" data-city="' +
            currItem +
            '">' +
            currItem +
            "</div>"
        );
    }

    // Setting Default City
    function currentCityAssign(elem) {
        var countCityElem = $(
            '.store-selector .stores-content-list .store-item[data-city="' +
            elem +
            '"]'
        ).length;
        if (countCityElem == 1) {
            $("body .store-selector .select-search-results .results-no").html(
                countCityElem + " Result"
            );
        } else {
            $("body .store-selector .select-search-results .results-no").html(
                countCityElem + " Results"
            );
        }
        $("body .store-selector .select-search-results .results-area").html(
            elem
        );
        $(
            "body .store-selector .select-store-element .select-inner .select-option"
        ).removeClass("active");
        $(
            'body .store-selector .select-store-element .select-inner .select-option[data-city="' +
            elem +
            '"]'
        ).addClass("active");
        $(
            "body .store-selector .select-store-element .select-inner .select-option.option-active"
        ).attr("data-city", elem);
        $(
            "body .store-selector .select-store-element .select-inner .select-option.option-active"
        ).html(elem);
        $(".store-selector .stores-content-list .store-item").removeClass(
            "active-city"
        );
        $(".store-selector .stores-content-list .store-item").css(
            "display",
            "none"
        );
        $(
            '.store-selector .stores-content-list .store-item[data-city="' +
            elem +
            '"]'
        ).addClass("active-city");
        $(
            '.store-selector .stores-content-list .store-item[data-city="' +
            elem +
            '"]'
        ).css("display", "flex");
        $("body .stores-section").addClass("city-selected");
        // calculateTopPositonVal();
    }

    function filterStoreType() {
        var activefilters = [];
        $(".store-filter-options")
            .find(".filter-option.filter-active")
            .each(function () {
                var thisElem = $(this);
                var storefilter = thisElem.attr("data-storetype");
                if (activefilters.indexOf(storefilter) == -1) {
                    activefilters.push(storefilter);
                }
            });
        activefilters = activefilters.sort();
        if (activefilters.length == 0) {
            $(
                ".store-selector .stores-content-list .store-item.active-city"
            ).css("display", "flex");
            return;
        }

        $(".store-selector .stores-content-list .store-item").css(
            "display",
            "none"
        );

        for (var i = 0; i < activefilters.length; i++) {
            var currFilter = activefilters[i];
            $(
                ".store-selector .stores-content-list .store-item.active-city"
            ).each(function () {
                var thisElem = $(this);
                var storeTypeList = thisElem.attr("data-storetype");
                if (storeTypeList.indexOf(currFilter) >= 0) {
                    thisElem.css("display", "flex");
                }
            });
        }
    }

    function calculateTopPositonVal() {
        var elemno = 1;
        var elemTotal = $(
            ".store-selector .stores-content-list .store-item.active-city"
        ).length;
        $(".store-selector .stores-content-list").css(
            "min-height",
            "fit-content"
        );

        $(".store-selector .stores-content-list .store-item.active-city").each(
            function () {
                var thisElem = $(this);
                if (elemno == 4) {
                    var childPos = thisElem.position().top;
                    var childHeight = thisElem.height();
                    var calculatedPosTop = childPos + childHeight - 5;
                    $(".store-selector .stores-content-list").css(
                        "min-height",
                        calculatedPosTop + "px"
                    );
                }
                elemno = elemno + 1;
            }
        );
    }

    // currentCityAssign(currentCity);

    function cityStoreTypeFilters() {
        var allstoretypes = [];
        $(".store-selector .stores-content-list .store-item.active-city").each(
            function () {
                var thisElem = $(this);
                var storetype = thisElem.attr("data-storetype");
                var storetypearray = storetype.split(",");

                for (var i = 0; i < storetypearray.length; i++) {
                    var currStoreType = storetypearray[i];
                    currStoreType = currStoreType.trim();
                    if (allstoretypes.indexOf(currStoreType) == -1) {
                        allstoretypes.push(currStoreType);
                    }
                }
            }
        );

        allstoretypes = allstoretypes.sort();

        for (var i = 0; i < allstoretypes.length; i++) {
            var currItem = allstoretypes[i];
            if (currItem != "") {
                var currItemClass = currItem.toLowerCase();
                currItemClass = currItemClass.replace(" ", "-");
                $(
                    ".store-selector .store-filters-element .store-filter-options"
                ).append(
                    '<div class="filter-option option-' +
                    (i + 1) +
                    " para-text " +
                    currItemClass +
                    '" data-storetype="' +
                    currItem +
                    '"><p>' +
                    currItem +
                    "</p></div>"
                );
            }
        }
    }

    $("body .store-selector .select-store-element").on(
        "click",
        ".select-inner",
        function () {
            $(this).toggleClass("is-opened");
        }
    );

    $("body .store-selector .select-store-element .select-inner").on(
        "click",
        ".select-option",
        function () {
            var clickedCity = $(this).attr("data-city");
            currentCityAssign(clickedCity);
            $(
                ".store-selector .store-filters-element .store-filter-options"
            ).html("");
            cityStoreTypeFilters();
            setTimeout(function () {
                $(this).closest(".select-inner").removeClass("is-opened");
            }, 100);
        }
    );

    // Filter Select/Unselect
    $("body .store-selector .store-filter-options").on(
        "click",
        ".filter-option p",
        function (event) {
            var thisElem = $(this);
            thisElem.closest(".filter-option").toggleClass("filter-active");
            filterStoreType();
            // calculateTopPositonVal();
        }
    );

    $(".store-selector .stores-content-list .store-item").each(function () {
        var thisElem = $(this);
        var dineStatus = thisElem
            .find(".store-status.dine-in-status .status-text")
            .html();
        var deliveryStatus = thisElem
            .find(".store-status.delivery-status .status-text")
            .html();

        if (dineStatus == "") {
            thisElem.addClass("default-status");
            thisElem.find(".store-status.dine-in-status").addClass("Closed");
            thisElem
                .find(".store-status.dine-in-status .status-text")
                .html("Closed");
        }

        if (deliveryStatus == "") {
            thisElem.addClass("default-status");
            thisElem.find(".store-status.delivery-status").addClass("Closed");
            thisElem
                .find(".store-status.delivery-status .status-text")
                .html("Closed");
        }
    });

    // Keep Open Stores at first
    $(".store-selector .stores-content-list .store-item.Open").prependTo(
        ".store-selector .stores-content-list"
    );
});

// Toys Slider Slider JS
jQuery(function ($) {
    if ($("body .toys-slider-shortcode.slider-shortcode").length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on("scroll", function () {
        var toyslidershortcode = $(
            "body .toys-slider-shortcode.slider-shortcode"
        );
        if (isScrolledIntoView(toyslidershortcode)) {
            if (toyslidershortcode.hasClass("images-loaded")) {
                // do nothing
            } else {
                toyslidershortcode.addClass("images-loaded");
                // Assign Background Images
                $(
                    "body .toys-slider-shortcode.slider-shortcode .slide-image"
                ).each(function () {
                    var dataimagesrc = $(this).attr("data-image-src");
                    $(this).css(
                        "background-image",
                        "url(" + dataimagesrc + ")"
                    );
                });
            }
        }
    });

    // Slider Variables
    var toy_first = 1;
    (toy_totalslides = $(
        "body .toys-slider-shortcode .slides-container .slide"
    ).length),
        (toy_next = toy_first + 1);
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

    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_first
    ).addClass("first");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_next
    ).addClass("next");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_prev
    ).addClass("prev");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_prevwait
    ).addClass("prevwait");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_nextwait
    ).addClass("nextwait");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_nextwait1
    ).addClass("nextwait1");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_nextwait2
    ).addClass("nextwait2");
    $(
        "body .toys-slider-shortcode.slider-shortcode .slide-" + toy_nextwait3
    ).addClass("nextwait3");

    // Assign Positions
    function toy_assignPos(elem) {
        // Remove Classes
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide")
            .removeClass(
                "first next prev prevwait nextwait nextwait1 nextwait2 nextwait3"
            );

        // Add Classes
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_first)
            .addClass("first");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_next)
            .addClass("next");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_prev)
            .addClass("prev");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_prevwait)
            .addClass("prevwait");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_nextwait)
            .addClass("nextwait");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_nextwait1)
            .addClass("nextwait1");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_nextwait2)
            .addClass("nextwait2");
        elem.closest(".toys-slider-shortcode")
            .find(".slides-container .slide-" + toy_nextwait3)
            .addClass("nextwait3");
    }

    function toy_nextClick(elem) {
        toy_recalculatePos();
        toy_assignPos(elem);
    }

    function toy_prevClick(elem) {
        toy_recalculatePos();
        toy_assignPos(elem);
    }

    $("body .toys-slider-shortcode.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-left",
        function () {
            toy_first = parseInt(
                $(this)
                    .closest(".toys-slider-shortcode")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            toy_first = toy_prevVal(toy_first);
            toy_prevClick($(this));

            // Remove Transition
            $(this)
                .closest(".toys-slider-shortcode.slider-shortcode")
                .find(".slides-container .slide.prev")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".toys-slider-shortcode.slider-shortcode")
                    .find(".slides-container .slide.prev")
                    .removeClass("remove-transition");
            }, 100);
        }
    );

    $("body .toys-slider-shortcode.slider-shortcode .slide-nav-container").on(
        "click",
        ".nav-right",
        function () {
            toy_first = parseInt(
                $(this)
                    .closest(".toys-slider-shortcode")
                    .find(".slides-container .slide.first")
                    .attr("data-slideno")
            );
            toy_first = toy_nextVal(toy_first);
            toy_nextClick($(this));

            // Remove Transition
            $(this)
                .closest(".toys-slider-shortcode.slider-shortcode")
                .find(".slides-container .slide.nextwait3")
                .addClass("remove-transition");
            setTimeout(function () {
                $(".toys-slider-shortcode.slider-shortcode")
                    .find(".slides-container .slide.nextwait3")
                    .removeClass("remove-transition");
            }, 100);
        }
    );
});

// Parallax Text effect
(function ($) {
    var elements = [];
    var windowHeight,
        windowScrollTop,
        isRunning = false;

    $.fn.parallaxScrolling = function (options) {
        options = options || {};
        var move = options.move || 20;
        this.each(function () {
            var $this = $(this);
            elements.push({
                $: $this,
                move: move,
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
            if (el.top > windowScrollTop + windowHeight) {
                newTranslateY = el.move;
            } else if (el.bottom < windowScrollTop) {
                newTranslateY = -el.move;
            } else {
                var ratio =
                    (el.middle - windowMiddle) /
                    ((el.height + windowHeight) / 2);
                var targetTranslateY = Math.round(ratio * el.move);
                // Only move 10% of the way there.
                newTranslateY =
                    currentTranslateY +
                    (targetTranslateY - currentTranslateY) * 0.1;
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
        setTimeout(hack, 2000);
    })();
})(jQuery);

jQuery(function ($) {
    if ($(window).width() < 768) {
        return;
    }
    // var move = $(window).width() < 768 ? 50 : 100;
    var move = 100;

    jQuery(
        [
            //Home
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
        ].join(", ")
    ).parallaxScrolling({
        move: move,
    });
});

// Instagram Feed JS
jQuery(function ($) {
    if ($('.instagram-feed-shortcode').length == 0) {
        return;
    }

    var instagram_feed = $('.instagram-feed');

    function loadInstagramImages() {
        var imagecount = 1;
        var allinstagramimages = $('.api-shortcode').find('.insta-gallery-feed .insta-gallery-list .insta-gallery-item .insta-gallery-image-wrap');
        allinstagramimages.each(function () {
            var thisElem = $(this);
            var imageLink = thisElem.find('.insta-gallery-link').attr('href');
            var imageSrc = thisElem.find('.insta-gallery-image').attr('src');

            if (imageSrc == undefined) {

            } else {
                if (imagecount <= 6) {
                    $('body .loop-slider .loop-container.container-1').append('<div class="slide slide-' + imagecount + '" style="background-image: url(' + imageSrc + ')"><a href="' + imageLink + '" rel="noopener" target="_blank"></a></div>');
                    imagecount = imagecount + 1;
                } else if (imagecount > 6 && imagecount <= 12) {
                    $('body .loop-slider .loop-container.container-2').append('<div class="slide slide-' + imagecount + '" style="background-image: url(' + imageSrc + ')"><a href="' + imageLink + '" rel="noopener" target="_blank"></a></div>');
                    imagecount = imagecount + 1;
                }
            }
        });
    }

    $(window).on('scroll', function () {
        if (isScrolledIntoView(instagram_feed)) {
            if (instagram_feed.hasClass('loaded')) {
                // do nothing
            } else {
                var allinstagramimages = $('.api-shortcode').find('.insta-gallery-feed .insta-gallery-list .insta-gallery-item .insta-gallery-image-wrap');
                if (allinstagramimages.length == 0) {
                    var instagram_interval = setInterval(() => {
                        if (allinstagramimages.length != 0) {
                            loadInstagramImages();
                            instagram_feed.addClass('loaded');
                            clearInterval(instagram_interval);
                        }
                    }, 1000);
                } else {
                    loadInstagramImages();
                    instagram_feed.addClass('loaded');
                }
            }
        }
    });
});

// Happy Meal App JS
jQuery(function ($) {
    if ($("body .happymeal-app-shortcode").length == 0) {
        return;
    }

    // Asign background-images to Slides
    $(window).on("scroll", function () {
        var happymealappshortcode = $("body .happymeal-app-shortcode");
        if (isScrolledIntoView(happymealappshortcode)) {
            if (happymealappshortcode.hasClass("video-loaded")) {
                // do nothing
            } else {
                happymealappshortcode.addClass("video-loaded");
                // Add Video Element
                var videoSrc = happymealappshortcode
                    .find(".happymeal-video")
                    .attr("data-video-src");
                happymealappshortcode
                    .find(".happymeal-video")
                    .html(
                        '<video class="background-video" autoplay="" loop="" muted="" playsinline=""><source src="' +
                        videoSrc +
                        '"></video>'
                    );
            }
        }
    });
});

console.log(
    "%c MADE IN THE MOUNTAINS BY ",
    "font-weight: bold; font-size: 24px;color: #151515;"
);
console.log(
    "%c SIDDATWORK ",
    "font-weight: bold; font-size: 50px;color: #151515;  border:5px solid #151515"
);
