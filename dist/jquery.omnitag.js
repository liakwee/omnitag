/*
 *  jQuery omnitag - v0.0.2
 *  A Omniture SiteCatalyst custom link helper
 *  https://github.com/liakwee/omnitag
 *
 *  Made by Lee Liak Wee
 *  Under MIT License
 */

; // jshint ignore:line
(function ($, window, document, undefined) {

  // Create the defaults once
  var pluginName = 'omnitag',
    defaults = {
      delay: 300,
      account: 'Site Catalyst Account',
      trackDownloadLinks: true,
      trackExternalLinks: false,
      taggingData: undefined
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
      var _this = this;

      s.trackDownloadLinks = this.settings.trackDownloadLinks;
      s.trackExternalLinks = this.settings.trackExternalLinks;
      s.forcedLinkTrackingTimeout = this.settings.delay;
      s.useForcedLinkTracking = 1;


      $(this.element).on('click', function(e){
        e.preventDefault();
        _this.triggerTagging();
        setTimeout(function(){
          _this.openURI(_this.element);
        },_this.settings.delay);
      });
    },

    triggerTagging: function () {
      var data,
        events,
        eVar,
        prop,
        name;

      data = $(this.element).data('tagging');


      if(!data){
        data = this.settings.taggingData;
      }

      //console.log(data);
      if(data){

        events = data.events;
        eVar = data.eVar;
        prop = data.prop;
        value = data.value;

        try{
          if(events){
            s.linkTrackVars = 'events,';
            s.linkTrackEvents = events.join();
            s.events = events.join();
          }

          if(eVar){
            for(var i= 0; i<eVar.length; i++){
              name = eVar[i];
              s.linkTrackVars += (name+',');
              s[name] = value[i];
            }
          }

          if(prop){
            for(var j= 0; j<prop.length; j++){
              name = prop[j];
              s.linkTrackVars += (name+',');
              s[name] = value[j];
            }
            s.linkTrackVars = s.linkTrackVars.substr(0, s.linkTrackVars.length-1);
          }

          s.tl(this, 'o', data.linkname);
          s.linkTrackVars = '';
        }
        catch(err){
          console.log(err);
        }
      }
    },

    openURI: function(link){
      //console.log(link.target);
      if(link.target === '_blank'){
        window.open(link.href);
      }
      else{
        window.location.href = link.href;
      }

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
