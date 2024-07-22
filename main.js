    // CUSTOM CURSOR
    {block:ifCustomcursor}
        const ball = new Cotton('#ball', {
            speed: 1, 
            models: ['a', 'label', '.custom_audio_buttons']
        });
        const ballBorder = new Cotton('#ball_border', {
            speed: 0.25, 
            models: '.pill-btn',
            on: {
                enterModel(cotton, model) {
                this.stop();
                magnet(cotton, model, 10);
            },
            leaveModel(cotton, model) {
                this.move();
                cotton.setAttribute('style', '');
                }
            }
        });
        function magnet(cotton, model, space) {
            const w = model.getBoundingClientRect().width,
            h = model.getBoundingClientRect().height,
            top = model.getBoundingClientRect().top,
            left = model.getBoundingClientRect().left,
            radius = parseInt(getComputedStyle(model).borderRadius);
                cotton.style.top = top - space + 'px';
                cotton.style.left = left - space + 'px';
                cotton.style.width = w + space * 2 + 'px';
                cotton.style.height = h + space * 1.75 + 'px';
                cotton.style.borderRadius = radius + space + '50px';
                cotton.style.transform = 'none';
                cotton.style.transition = '0.5s';
        }
    {/block:ifCustomcursor}


    // DAY/NIGHT TOGGLE BY MOURNSTERA
    const modeBtns = document.querySelectorAll(".theme-toggle");
    modeBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
    
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const targetTheme = currentTheme === "light" ? "dark" : "light";
            document.documentElement.classList.add("theme-transition");
            document.documentElement.setAttribute("data-theme", targetTheme);
            localStorage.setItem("theme", targetTheme);
            
            setTimeout(function () {
                document.documentElement.classList.remove("theme-transition");
            }, 250);
        });
    });
    
    
    // LUCIDE ICONS
    lucide.createIcons();
    
    
    // TOGGLES
    // day/night mode strikethrough toggle
    $(".theme-toggle").click(function () {
        $(".head button.theme-toggle").toggleClass("active");
    });
    
    // controls toggle
    $("#controls").click(function () {
        $(".tmblr-iframe").toggleClass("active");
    });
    
    
    // CUSTOM TOOLTIPS BY TIPPY.JS
    tippy('[title]', {
        theme: 'custom',
        duration: 0,
        arrow: false,
        animation: 'shift-toward-subtle',
        followCursor: true,
        zIndex: 9999999999,
        content(reference) {
            const title = reference.getAttribute('title');
            reference.removeAttribute('title');
            return title;
        },
    });
    
    
    // GSAP ANIMATIONS
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin) 
    
    // scroll to top on click
    document.getElementById("totop").addEventListener("click", () => {
        gsap.to(window, {duration: 1, scrollTo: 0});
    });
    
    // landing zoom out animation on load
    gsap.fromTo("#land_border", {
        scale: 1.0, 
        opacity: 1.0
    }, {
        scale: 2.5, 
        duration: 1.75,
        ease: "power4.inOut",
        delay: 0.025, 
        opacity: 0.75
    });
    
    // slide landing bio on load
    gsap.set("#land_bio_sub", { autoAlpha: 1 });
    gsap.fromTo("#land_bio_sub", {
        yPercent: 100,

     }, {
        duration: 1.75,
        yPercent: 0,
        ease: "power4.inOut",
        repeat: false
     });
     
    // slide header/footer on load
    function landSlide(elementName, start) {
        gsap.fromTo(elementName, {
            autoAlpha: 0.0, 
            yPercent: start,
        }, {
            autoAlpha: 1.0, 
            duration: 1.75,
            yPercent: 0,
            ease: "power4.inOut",
            repeat: false, 
            delay: 0.5
        });
    }
    landSlide(".head", -15)
    landSlide(".foot", 15)
    landSlide(".tag_page h1", -45)
    landSlide(".search_page h1", -45)

    
    // trigger for scrolling past landing 
    var landAnim = gsap.timeline({
        scrollTrigger: {
            trigger: ".posts_wrap",
            start: "top top+=35%",
            toggleActions: "play play reverse reverse"
        }
    });
    
    // changing elements color w/above trigger
    function landColor(elementName) {
        landAnim.fromTo(elementName, {
            color: "{color:Background}", 
            {block:TagPage}
                color: "var(--text)"
            {/block:TagPage}
            {block:SearchPage}
                color: "var(--text)"
            {/block:SearchPage}
            {block:PermalinkPage}
                color: "var(--text)"
            {/block:PermalinkPage}
        }, {
            color: "var(--text)"
        }, 0);
    }
    landColor(".land")
    landColor(".head")
    landColor(".head button")
    landColor(".head a")
    landColor(".foot")
    landColor(".foot button")
    landColor(".foot a")
    
    // changing element visibility w/above trigger
    function landAppear(start, end, elementName) {
        landAnim.fromTo(elementName, {
            opacity: start
        }, {
            opacity: end
        }, 0);
    }
    landAppear(0.5, 1.0, "#totop")
    landAppear(0.0, 1.0, "#head_title")
    landAppear(0.0, 1.0, "#head_bio")
    landAppear(0.0, 1.0, "#foot_bio")
    landAppear(0.0, 1.0, "#head_links")
    landAppear(0.0, 1.0, "#foot_pagi")
    landAppear(1.0, 0.0, "#land_bio")
    
    //changing day/night strikethrough color w/above trigger
    function landBackground(elementName) {
        landAnim.fromTo(elementName, {
            backgroundImage: "linear-gradient({color:Background}, {color:Background})",
            {block:PermalinkPage}
                backgroundImage: "linear-gradient(var(--text), var(--text))"
            {/block:PermalinkPage}
        }, {
            backgroundImage: "linear-gradient(var(--text), var(--text))"
        }, 0);
    }
    landBackground(".head button.theme-toggle")
    landBackground(".head button.theme-toggle.active")
    
    // parallax landing image
    var landPara = gsap.timeline({
        scrollTrigger: {
            trigger: ".land",
            scrub: 1, 
            pin: false
        }
    });
    landPara.fromTo("#land_img img", {
        yPercent: 20, 
        ease: "none"
    }, {
        yPercent: -20, 
        ease: "none"
    });
    
    
    // POST FIXES
    // aos scroll 
    AOS.init({
        duration: 750,
        easing: "ease-in-out", 
        once: false,
        mirror: true
    });
    
    // audio fix by annasthms
    customAudio({
    	post: ".posts",
    	wrappers: {
    		audio: ".custom_audio_wrapper",
    		buttons: ".custom_audio_buttons",
    		seekbar: ".custom_audio_seekbar"
    	},
    	default: false,
    	pauseAll: true,
    	playButton: "<i data-lucide='play'></i>",
    	pauseButton: "<i data-lucide='pause'></i>",
    	errorIcon: "<i data-lucide='alert-circle'></i>",
    	hideInfoIfError: true,
    	callAfterLoad: () => {
    		lucide.createIcons();
    	}
    });
    
    // short note numbers by shythemes
    var $container = $(".info_notes");
       $container.find(".notecount").each(function(){
           var n = $(this).html().split(' ')[0].replace(/,/g, "");
           if (n > 999) {
               n = Math.floor(n / 100) / 10;
               $(this).text(n + "k");
           }
       });
    
    // no.js photosets by annasthms and eggdesign 
    initPhotosets();
    
    
    // 404 ERROR PAGE BY FUKUO
    $(document).ready(function() { 
        if ($('p:contains("The URL you requested could not be found.")').html()) { 
        $(".error_wrap").css( "visibility", "visible" );  
        $(".article_position").remove();  
        $('title').prepend( "Not Found — " ); }
    });
