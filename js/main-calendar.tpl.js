(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['main-calendar'] = template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                    <div id=\"class_tile_"
    + alias3(((helper = (helper = helpers.dayIndex || (depth0 != null ? depth0.dayIndex : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dayIndex","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"wl-event non-selected\" style=\"height: "
    + alias3(((helper = (helper = helpers.cellHeight || (depth0 != null ? depth0.cellHeight : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cellHeight","hash":{},"data":data}) : helper)))
    + "px; top: "
    + alias3(((helper = (helper = helpers.cellTopPos || (depth0 != null ? depth0.cellTopPos : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cellTopPos","hash":{},"data":data}) : helper)))
    + "px; left: "
    + alias3(((helper = (helper = helpers.cellLeftPos || (depth0 != null ? depth0.cellLeftPos : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cellLeftPos","hash":{},"data":data}) : helper)))
    + "px;\">\r\n                      <div class=\"wl-event-title\">\r\n                        "
    + alias3(((helper = (helper = helpers.courseName || (depth0 != null ? depth0.courseName : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"courseName","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.sectionNumber || (depth0 != null ? depth0.sectionNumber : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"sectionNumber","hash":{},"data":data}) : helper)))
    + "\r\n                      </div>\r\n                      <div class=\"wl-event-details\">\r\n                        "
    + alias3(((helper = (helper = helpers.beginTime || (depth0 != null ? depth0.beginTime : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"beginTime","hash":{},"data":data}) : helper)))
    + " - "
    + alias3(((helper = (helper = helpers.endTime || (depth0 != null ? depth0.endTime : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"endTime","hash":{},"data":data}) : helper)))
    + "\r\n                        <br>\r\n                        "
    + alias3(((helper = (helper = helpers.room || (depth0 != null ? depth0.room : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"room","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers.building || (depth0 != null ? depth0.building : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"building","hash":{},"data":data}) : helper)))
    + "\r\n                        <br>\r\n                        "
    + alias3(((helper = (helper = helpers.instructor || (depth0 != null ? depth0.instructor : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"instructor","hash":{},"data":data}) : helper)))
    + "\r\n                      </div>\r\n                    </div>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "                            <tr>\r\n                              <th>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</th>\r\n                              <td><div>&nbsp;</div></td>\r\n                            </tr>\r\n                            <tr>\r\n                              <th>&nbsp;</th>\r\n                              <td><div>&nbsp;</div></td>\r\n                            </tr>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"wrapper-outer\">\r\n    <div id=\"calendar\" class=\"wrapper-inner\">\r\n        <!-- CALENDAR BACKDROP -->\r\n        <table id=\"wl-columns\" cellspacing=\"0\" class=\"wl border-separate wl-border\">\r\n            <thead>\r\n                <tr>\r\n                    <th class=\"wl-border\">&nbsp;</th>\r\n                    <th class=\"wl-border\">Mon</th>\r\n                    <th class=\"wl-border\">Tue</th>\r\n                    <th class=\"wl-border\">Wed</th>\r\n                    <th class=\"wl-border\">Thu</th>\r\n                    <th class=\"wl-border\">Fri</th>\r\n                    <th class=\"wl-border\">Sat</th>\r\n                    <th class=\"wl-border gutter\">&nbsp;</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <tr>\r\n                    <th class=\"wl-border\">&nbsp;</th>\r\n                    <td class=\"wl-border\"><div id=\"col-0\" class=\"wl-column wl-vspacer\" style=\"height: "
    + alias3(((helper = (helper = helpers.calendarHeight || (depth0 != null ? depth0.calendarHeight : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"calendarHeight","hash":{},"data":data}) : helper)))
    + "px;\">&nbsp;</div></td>\r\n                    <td class=\"wl-border\"><div id=\"col-1\" class=\"wl-column\"></div></td>\r\n                    <td class=\"wl-border\"><div id=\"col-2\" class=\"wl-column\"></div></td>\r\n                    <td class=\"wl-border\"><div id=\"col-3\" class=\"wl-column\"></div></td>\r\n                    <td class=\"wl-border\"><div id=\"col-4\" class=\"wl-column\"></div></td>\r\n                    <td class=\"wl-border\"><div id=\"col-5\" class=\"wl-column\"></div></td>\r\n                    <td class=\"wl-border gutter\">&nbsp;</td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n\r\n        <div class=\"wl-event-wrapper\">\r\n            <hr class=\"wl-divider\">\r\n\r\n            <div class=\"wl-events\" style=\"height: "
    + alias3(((helper = (helper = helpers.calendarHeight || (depth0 != null ? depth0.calendarHeight : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"calendarHeight","hash":{},"data":data}) : helper)))
    + "px;\">\r\n\r\n                <!-- CLASS CELLS -->\r\n                <div id=\"classes\">\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.classes : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n                </div>\r\n          \r\n                <!-- CALENDAR BASE STRUCTURE -->\r\n                <div id=\"wl-rows\">\r\n                    <table cellspacing=\"0\" class=\"wl-event-slots\">\r\n                        <tbody>\r\n\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.hours : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n                        </tbody>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();