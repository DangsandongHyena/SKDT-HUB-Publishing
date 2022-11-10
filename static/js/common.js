//Header GNB
function initHeaderGnb() {
    var header = $("header#header");
    var gnb = header.find(">nav.gnb");
    var gDeps1List = gnb.find(">ul");
    var gDeps1Item = gDeps1List.find(">li");
    var currentDeps1Num = gDeps1List.find(">li>a.active").parent().index();
    var gDeps2List = gDeps1Item.find(">.deps_navi")
    var bgModal = $("#bg_modal");
    var deps2OpenIs = false;
    var maxTitHeight = 0;

    gDeps1Item.find(">a").on("mouseenter focusin",function(e) {
        currentDeps2Menu = $(this).next(".deps_navi");
        gDeps1Item.find(">a").removeClass("active");
        $(this).addClass("active");
        if(header.hasClass("gnb_open") == false) {
            header.addClass("gnb_open")

            bgModal.removeAttr("style")
            bgModal.css({"opacity":0.6})
            bgModal.stop().delay(100).fadeIn(300)

            
        } else if(header.hasClass("gnb_open") == true && $(this).next(".deps_navi").length == 0) {
            gDeps2List.stop().slideUp(150);
            deps2OpenIs = false;
        }

        if($(this).next(".deps_navi").length > 0 && $(this).next(".deps_navi").is(":visible") == false) {
            setTimeout(function() {
                currentDeps2Menu.find(">ul>li").each(function(i) {
                    if(currentDeps2Menu.find(">ul>li").eq(i).find(">a").height() > currentDeps2Menu.find(">ul>li").eq(i-1).find(">a").height()) {
                        maxTitHeight = currentDeps2Menu.find(">ul>li").eq(i).find(">a").height()
                    }
                })

                if(maxTitHeight > 0) {
                    currentDeps2Menu.find(">ul>li").find(">a").css({
                        "height": maxTitHeight+"px"
                    })
                }
            },150)
            gDeps2List.stop().slideUp(150);
            currentDeps2Menu.stop().delay(100).slideDown(300);
            maxTitHeight = 0
            deps2OpenIs = true;
        }

        e.stopPropagation();
    })

    gnb.on("mouseleave",closeDepsMenu)
    header.find("h1>a, nav.user_menu>ul>li>button").on("focusin",closeDepsMenu)

    function closeDepsMenu() {
        if(header.hasClass("gnb_open") == true) {
            if(deps2OpenIs == true) {
                gDeps2List.stop().slideUp(300,function() {
                    setTimeout(function() {
                        gDeps2List.hide();
                    } ,300)
                })
                bgModal.stop().fadeOut(300,function() {
                    header.removeClass("gnb_open")
                    gDeps1Item.find(">a").removeClass("active");
                    gDeps2List.hide();
                    if(currentDeps1Num >= 0) {
                        gDeps1Item.eq(currentDeps1Num).find(">a").addClass("active");
                    }
                })

                deps2OpenIs = false
            } else {
                gDeps1Item.find(">a").removeClass("active");
                if(currentDeps1Num >= 0) {
                    gDeps1Item.eq(currentDeps1Num).find(">a").addClass("active");
                }
                bgModal.stop().fadeOut(300,function() {
                    header.removeClass("gnb_open")
                })
            }
        }
    }
}



