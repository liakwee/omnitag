# jQuery Omnitag

### A Omniture SiteCatalyst custom link helper


## Usage

1. Include jQuery:

	```  
    html:    
	<a class="omnitagging" href="http://www.google.com" target="_blank" data-tagging='{"events":["event34","event35"],"eVar":["eVar34","eVar56"],"prop":["prop34","prop56"],"value":["this is home","this is anothe value"],"linkname":"this is linkname"}'>test tagging 1</a>
	```

2. Include plugin's code:

	```  
    html:
	<script src="dist/jquery.omnitag.min.js"></script>
	```

3. Call the plugin:

	```  
    javascript:  
	$(".omnitagging").omnitag({	  
      delay: 300,
      trackExternalLinks: false
    });
	```

.

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
