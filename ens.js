var $messageTimeout = 10000;

$().ready(function () {
	$("input[watermark]").blur(function (e) {
		if ($(this).val() == "" || $(this).val() == $(this).attr("watermark")) {
			$(this).val($(this).attr("watermark")).css({ color: $(this).attr("watermark-color") });
		}
		else {
			$(this).css({ color: "black" });
		}
	}).focus(function (e) {
		if ($(this).val() == $(this).attr("watermark")) {
			$(this).val("").css({ color: "black" });
		}
	});

	$("#tabLinks li:has(a[href='javascript:'])").click(function (e) {
		var menu = $(this).find(".nav-menu");
		if (menu.length > 0) {
			if (menu.css("display") == "none") {
				ShowTabMenu($(this).find("a:first"), menu);
			}
			else {
				HideTabMenu($(this).find("a:first"), menu);
			}
		}
		CancelEventBubble(e);
	});
	$(".nav-menu").click(function (e) { CancelEventBubble(e); });
	$("body").click(function (e) {
		$("#tabLinks li:has(a[href='javascript:'])").each(function () { HideTabMenu($(this).find("a:first"), $(this).find(".nav-menu")); });
	});

	//ShowTabMenu($("#tabLinks li:first a:first"), $("#tabLinks li:first .nav-menu"));
	$("input.button").hover(function () { $(this).addClass("buttonHover"); }, function () { $(this).removeClass("buttonHover"); });
});
function addAlerts(alerts, element) {
	if (alerts == undefined || alerts.length == 0) return;

	var $container = $(".message-container");
	if ($container.length == 0) alert("Container could not be found.");

	var alertsContent = "";
	for (var i = 0; i < alerts.length; i++) {
		var text = alerts[i].text.toString().replace(/\\"/gi, "\"");
		if (text.length == 0) text = "There was an unknown error.";
		if (text[0] == "\"") {
			text = text.substring(1);
			if (text[text.length - 1] == "\"") text = text.substring(0, text.length - 1);
		}
		alertsContent += "<div alert='' class='" + alerts[i].status + "'>" + text.replace(/\\r\\n/gi, "<br />") + "</div>";
	}

	if ($container.find("div.Alert").length == 0)
		$container.append("<div class=\"Alert\">" + alertsContent + "</div");
	else
		$container.find("div.Alert").append(alertsContent);

	if (element == undefined) {
		$container.find("div[alert]").each(function () {
			$(this).delay($messageTimeout).fadeOut(1200, function () {
				$(this).remove();
				if ($container.find("div[alert]").length == 0) $container.fadeOut();
			});
		});
		$container.show();
	}
}
function HideTabMenu(tab, menu) {
	menu.fadeOut("fast");
	tab.removeClass("hover");
}
function ShowTabMenu(tab, menu) {
	$("#tabLinks li:has(a[href='javascript:'])").each(function () { HideTabMenu($(this).find("a:first"), $(this).find(".nav-menu")); });

	menu.fadeIn("fast");
	tab.addClass("hover");

	var pageLeftSide = $(".main:first").position().left;
	var pageRightSide = pageLeftSide + $(".main:first").width();
	var tabLeftSide = tab.closest("li").position().left;
	
	if ((tabLeftSide + menu.width()) > pageRightSide) {
		menu.css("right", "0px");
		menu.css("left", "Auto");

		if ((tabLeftSide + menu.position().left) < pageLeftSide) {
			menu.css("right", "Auto");
			while ((tabLeftSide + menu.position().left + menu.width()) > pageRightSide - 100) {
				menu.css("left", (menu.position().left - 50) + "px");
			}
		}
	}
}
function CancelEventBubble(e) { e.preventDefault(); if (window.event) window.event.cancelBubble = true; else e.stopPropagation(); }