(function ( $ ) {

    $.fn.mjfTabBar = function(options) {
        var defaults = {
            onClick: function() {}
        };

        var settings = $.extend(true, {}, defaults, options);

        var tabBarPlugin = this;

        tabBarPlugin.onSelect = function(e) {
            return e;
        };

        tabBarPlugin.bindClick = function() {
            var _tabs = $('#'+settings.tabBarId+' .mjfTab');

            _tabs.click(function(e) {
                var clickedTab = $(e.currentTarget);

                if (!clickedTab.hasClass('mjfTabActive')) {

                    $('#'+settings.tabBarId+' .mjfTab').removeClass('mjfTabActive mjfTabInactive').addClass('mjfTabInactive');
                    clickedTab.toggleClass('mjfTabInactive mjfTabActive');

                    if (settings.activeTabColor) {
                        $('.mjfTab.mjfTabActive').css({
                            backgroundColor: settings.activeTabColor
                        });
                    }

                    if (settings.inActiveTabColor) {
                        $('.mjfTab.mjfTabInactive').css({
                            backgroundColor: settings.inActiveTabColor
                        });
                    }

                    if (settings.inActiveHoverTabColor) {
                        $('.mjfTab.mjfTabInactive').hover(function(){
                            $(this).css("background-color", settings.inActiveHoverTabColor);
                        }, function(){
                            $(this).css("background-color", settings.inActiveTabColor);
                        });
                    }

                    var tabId = clickedTab.attr('id'),
                        tabIndex = parseInt(clickedTab.data('index')),
                        tabText = clickedTab.text(),
                        data = {
                            index: tabIndex,
                            id: tabId,
                            text: tabText
                        };

                    settings.onSelect(data);
                }
            })
        };

        tabBarPlugin.init = function(settings) {
            if (!settings.tabBarId) {
                settings.tabBarId = 'mjfTabBar_' + Date.now();
            }

            var html = "",
                tabBarTitle = settings.tabBarId;

            if (settings.tabs) {

                html = '<div id="'+tabBarTitle+'" class="mjfTabBar">';

                $.each(settings.tabs, function( index, value ) {

                    var _id = value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_') + '_tab';

                    if (index === 0) {
                        html += '<div data-index="'+index+'" id="'+_id+'" class="mjfTab mjfLeftTab mjfTabActive">' + value + '</div>';
                    } else if ((index > 0) && (index !== settings.tabs.length - 1)) {
                        html += '<div data-index="'+index+'" id="'+_id+'" class="mjfTab mjfTabInactive">' + value + '</div>';
                    } else if (index === settings.tabs.length - 1) {
                        html += '<div data-index="'+index+'" id="'+_id+'" class="mjfTab mjfRightTab mjfTabInactive">' + value + '</div>';
                    }

                });

                html += '</div>';

                // Add the tab HTML to the given <div> element
                tabBarPlugin.append(html);

                // Bind click event to the tabs
                tabBarPlugin.bindClick();

                // Default tabBar style rules in a compressed CSS string
                var cssRules = '.mjfTabBar{cursor:pointer;position:relative;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;top:-10px;overflow:hidden;width:100%;border-top:0}.mjfTab{flex-grow:1;text-align:center;height:38px;vertical-align:middle;line-height:38px;border-top:0;border-right:1px solid lightgray;border-bottom:1px solid lightgray;border-left:1px solid lightgray;-webkit-box-shadow:inset 0 4px 10px -1px #3f3f3f;-moz-box-shadow:inset 0 4px 10px -1px #3f3f3f;box-shadow:inset 0 4px 10px -1px #3f3f3f;font-size:18px}.mjfTabInactive{background-color:#9e9e9e}.mjfLeftTab{-webkit-border-radius:0 0 0 5px;-moz-border-radius:0 0 0 5px;border-radius:0 0 0 5px}.mjfRightTab{-webkit-border-radius:0 0 5px 0;-moz-border-radius:0 0 5px 0;border-radius:0 0 5px 0}.mjfTabInactive:hover{background-color:#4594ec}.mjfTabActive{background-color:#fff;-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none;font-weight:bold;height:43px;line-height:43px}';

                // Create the style element
                var styleElement = document.createElement('style');

                // Add style rules to the style element
                styleElement.appendChild(document.createTextNode(cssRules));

                // Attach the style element to the document head
                document.getElementsByTagName('head')[0].appendChild(styleElement);

                if (settings.activeTabColor) {
                    $('.mjfTab.mjfTabActive').css({
                        backgroundColor: settings.activeTabColor
                    });
                }

                if (settings.inActiveHoverTabColor) {
                    $('.mjfTab.mjfTabInactive').hover(function(){
                        $(this).css("background-color", settings.inActiveHoverTabColor);
                    }, function(){
                        $(this).css("background-color", settings.inActiveTabColor);
                    });
                }

            }
        };

        tabBarPlugin.init(settings);

    };

}( jQuery ));