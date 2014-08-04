
; // jshint ignore:line
(function ($, window, document, undefined) {

  // Create the defaults once
  var pluginName = 'omnitag',
    defaults = {
      account: 'Site Catalyst Account',
      downloadlink: true
    };


  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var data,
          events,
          eVar,
          prop;

      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.settings
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.settings).

      //try{
        //console.log(this.element);
        data = $(this.element).data('tagging');
        console.log(data);
        events = data.events;
        eVar = data.eVar;
        prop = data.prop
        value = data.value;

        if(events){
          s.linkTrackVars = 'events,';
          s.linkTrackEvents = events.join();
        }

        if(eVar){
          for(var i= 0; i<eVar.length; i++){
            var name = eVar[i];
            s.linkTrackVars += (name+',');
            s[name] = value[i];
          }
        }

        if(prop){
          for(var i= 0; i<prop.length; i++){
            var name = prop[i];
            s.linkTrackVars += (name+',');
            s[name] = value[i];
          }
          s.linkTrackVars = s.linkTrackVars.substr(0, s.linkTrackVars.length-1);
        }

        this.element.on('click', function(){
          s.tl(this, 'o', data.linkname);
        })

        console.log(s.linkTrackVars);
        console.log(s.linkTrackEvents);
        s.linkTrackVars = '';


//      s.linkTrackVars = 'events,eVar8,prop8,prop13';
//      s.linkTrackEvents='event6'
//      s.events='event6';
//      s.eVar8=s.prop8='delicious';

        //console.log(JSON.parse(data));
//      }
//      catch(err){
//        console.log(err, 'SiteCatalyst not present!');
//      }




    },
    yourOtherFunction: function () {
      // some logic
    }
  });


  $.fn[ pluginName ] = function (options) {
    this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });

    // chain jQuery functions
    return this;
  };

})(jQuery, window, document);
